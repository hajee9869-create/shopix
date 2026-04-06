import React, { useState } from 'react';
import { Search, Filter, MoreVertical, DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './UsersView.css'; // Reusing generic table styles
import './PaymentsView.css';

const PaymentsView = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('payments')
          .select('*, order:orders(user:profiles(full_name))')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setPayments(data || []);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Paid': return <span className="status-badge badge-success">Paid</span>;
      case 'Pending': return <span className="status-badge badge-warning"><Clock size={12}/> Pending</span>;
      case 'Processing': return <span className="status-badge badge-primary">Processing</span>;
      case 'Failed': return <span className="status-badge badge-danger">Failed</span>;
      default: return <span className="status-badge badge-neutral">{status}</span>;
    }
  };

  const formatedPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title">Payments & Commission</h1>
          <p className="view-subtitle">Manage platform revenue, seller payouts, and commission rates.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">Settings</button>
          <button className="btn-primary flex items-center gap-1">
            <DollarSign size={16} /> Process Payouts
          </button>
        </div>
      </div>

      <div className="finance-grid">
        <div className="finance-card glass gross-revenue">
          <div className="fc-icon"><CreditCard size={24} /></div>
          <div className="fc-details">
            <span className="fc-label">Gross Processed (30d)</span>
            <span className="fc-value">$142,390.50</span>
            <div className="fc-trend trend-up"><ArrowUpRight size={14} /> +12.5%</div>
          </div>
        </div>
        <div className="finance-card glass commission-revenue">
          <div className="fc-icon"><DollarSign size={24} /></div>
          <div className="fc-details">
            <span className="fc-label">Platform Commission (10%)</span>
            <span className="fc-value">$14,239.05</span>
            <div className="fc-trend trend-up"><ArrowUpRight size={14} /> +12.5%</div>
          </div>
        </div>
        <div className="finance-card glass pending-payouts">
          <div className="fc-icon"><Clock size={24} /></div>
          <div className="fc-details">
            <span className="fc-label">Pending Payouts</span>
            <span className="fc-value">$28,450.00</span>
            <div className="fc-trend trend-down"><ArrowDownRight size={14} /> -3.2%</div>
          </div>
        </div>
      </div>

      <div className="data-panel glass">
        <div className="panel-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by Transaction ID or Seller..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="btn-icon-text">
              <Filter size={18} /> Date
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
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Seller</th>
                <th className="text-right">Total Amount</th>
                <th className="text-right">Commission</th>
                <th className="text-right">Net Payout</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-secondary">Loading payments...</td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-secondary">No payments found.</td>
                </tr>
              ) : (
                payments.map((payment) => {
                  const amount = Number(payment.amount) || 0;
                  const commission = amount * 0.10; // 10% platform fee
                  const net = amount - commission;
                  
                  return (
                    <tr key={payment.id}>
                      <td className="font-mono text-sm" title={payment.id}>{payment.id.split('-')[0]}...</td>
                      <td className="text-secondary text-sm">{new Date(payment.created_at).toLocaleDateString()}</td>
                      <td className="font-medium text-primary cursor-pointer hover-underline">{payment.order?.user?.full_name || 'System'}</td>
                      <td className="text-right">{formatedPrice(amount)}</td>
                      <td className="text-right text-success font-medium">+{formatedPrice(commission)}</td>
                      <td className="text-right font-bold">{formatedPrice(net)}</td>
                      <td>{getStatusBadge(payment.status ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1) : 'Pending')}</td>
                      <td className="text-right action-cell">
                        <button className="btn-icon" title="View Details"><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsView;
