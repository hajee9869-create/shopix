import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Eye, Truck, Package, RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './UsersView.css'; // Reusing generic table styles
import './OrdersView.css';

const OrdersView = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            user:profiles(full_name),
            order_items(quantity)
          `)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    switch(statusLower) {
      case 'delivered': return <span className="status-badge badge-success"><Package size={12}/> Delivered</span>;
      case 'processing': return <span className="status-badge badge-warning"><MoreVertical size={12}/> Processing</span>;
      case 'shipped': return <span className="status-badge badge-primary"><Truck size={12}/> Shipped</span>;
      case 'cancelled': return <span className="status-badge badge-danger">Cancelled</span>;
      case 'refunded': return <span className="status-badge badge-neutral"><RotateCcw size={12}/> Refunded</span>;
      default: return <span className="status-badge badge-neutral">{status}</span>;
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus.toLowerCase() })
        .eq('id', orderId);
      
      if (error) throw error;
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus.toLowerCase() } : order
      ));

      // Trigger a notification (mock)
      console.log(`Notification sent: Order ${orderId} is now ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update status');
    }
  };

  const formatedPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title">Order Management</h1>
          <p className="view-subtitle">Track, update, and manage customer orders across all vendors.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">Export Invoices</button>
        </div>
      </div>

      <div className="order-stats-bar glass">
        <div className="stat-pill">
          <span className="pill-label">Total Orders Today</span>
          <span className="pill-val">124</span>
        </div>
        <div className="stat-pill">
          <span className="pill-label">Processing</span>
          <span className="pill-val text-warning">45</span>
        </div>
        <div className="stat-pill">
          <span className="pill-label">Shipped Today</span>
          <span className="pill-val text-primary">62</span>
        </div>
        <div className="stat-pill">
          <span className="pill-label">Returns Pending</span>
          <span className="pill-val text-danger">3</span>
        </div>
      </div>

      <div className="data-panel glass">
        <div className="panel-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="btn-icon-text">
              <Filter size={18} /> Date Range
            </button>
            <button className="btn-icon-text">
              <Filter size={18} /> Status
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order Details</th>
                <th>Customer</th>
                <th>Date & Time</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-secondary">Loading orders...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-secondary">No orders found.</td>
                </tr>
              ) : (
                orders.map((order) => {
                  const itemCnt = order.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
                  return (
                    <tr key={order.id}>
                      <td>
                        <div className="flex flex-col">
                          <span className="font-mono text-primary font-semibold" title={order.id}>
                            #{order.id.split('-')[0]}
                          </span>
                          <span className="text-secondary text-xs">{itemCnt} items</span>
                        </div>
                      </td>
                      <td className="font-medium">{order.user?.full_name || 'Unknown'}</td>
                      <td className="text-secondary text-sm">{new Date(order.created_at).toLocaleString()}</td>
                      <td className="font-semibold">{formatedPrice(order.total_amount)}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(order.status)}
                          <select 
                            className="text-xs border border-color rounded px-1 bg-transparent"
                            value={order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                      <td className="text-right action-cell">
                        <button className="btn-primary flex items-center gap-1" style={{padding: '0.4rem 0.75rem', fontSize: '0.8rem'}}>
                          <Eye size={14}/> View
                        </button>
                        <button className="btn-icon"><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        <div className="pagination">
          <span className="pagination-info">Showing 1 to {orders.length} of {orders.length} entries</span>
          <div className="pagination-controls">
            <button className="btn-page" disabled>Previous</button>
            <button className="btn-page active">1</button>
            <button className="btn-page">...</button>
            <button className="btn-page">2,447</button>
            <button className="btn-page">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersView;
