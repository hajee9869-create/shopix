import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Store, Star, StarHalf, ShieldCheck, AlertCircle, BadgeCheck, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './UsersView.css'; // Reusing generic table styles
import './SellersView.css';

const SellersView = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('stores')
        .select(`
          *,
          owner:profiles(full_name),
          products(id)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSellers(data || []);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    if (rating === 0) return <span className="text-secondary text-sm">No ratings</span>;
    return (
      <div className="flex items-center gap-1">
        <Star size={14} className="star-icon filled" />
        <span className="rating-text">{rating}</span>
      </div>
    );
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved': return <span className="status-badge badge-success"><ShieldCheck size={12}/> Approved</span>;
      case 'Pending Approval': return <span className="status-badge badge-warning"><AlertCircle size={12}/> Pending</span>;
      case 'Suspended': return <span className="status-badge badge-danger"><AlertCircle size={12}/> Suspended</span>;
      default: return <span className="status-badge badge-neutral">{status}</span>;
    }
  };

  const handleApprove = async (id) => {
    try {
      await supabase.from('stores').update({ is_verified: true }).eq('id', id);
      fetchSellers();
    } catch (e) {
      console.error(e);
    }
  };

  const handleVerifyApprove = async (id) => {
    try {
      await supabase.from('stores').update({ is_verified: true }).eq('id', id);
      fetchSellers();
    } catch (e) {
      console.error(e);
    }
  };

  const handleVerifyReject = async (id) => {
    try {
      await supabase.from('stores').update({ is_verified: false }).eq('id', id);
      fetchSellers();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title">Seller Management</h1>
          <p className="view-subtitle">Monitor vendor stores, approve applications, and manage seller metrics.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">Export Data</button>
        </div>
      </div>

      <div className="stats-grid mb-4">
        <div className="stat-card glass p-4">
          <div className="text-sm font-semibold text-secondary uppercase tracking-wider">Total Sellers</div>
          <div className="text-2xl font-bold mt-2">{sellers.length}</div>
        </div>
        <div className="stat-card glass p-4">
          <div className="text-sm font-semibold text-secondary uppercase tracking-wider">Pending Approvals</div>
          <div className="text-2xl font-bold mt-2 text-warning">{sellers.filter(s => !s.is_verified).length}</div>
        </div>
        <div className="stat-card glass p-4">
          <div className="text-sm font-semibold text-secondary uppercase tracking-wider">Suspended</div>
          <div className="text-2xl font-bold mt-2 text-danger">0</div>
        </div>
      </div>

      <div className="data-panel glass">
        <div className="panel-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search store name or owner..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-icon-text">
            <Filter size={18} /> Filter Status
          </button>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Store Details</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Products</th>
                <th>Rating</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-secondary">Loading sellers...</td>
                </tr>
              ) : sellers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-secondary">No sellers found.</td>
                </tr>
              ) : (
                sellers.map((seller) => (
                  <tr key={seller.id}>
                    <td>
                      <div className="store-cell">
                        <div className="store-icon"><Store size={18} /></div>
                        <div className="user-details flex items-center gap-1">
                          <span className="user-name">{seller.name}</span>
                          {seller.is_verified && <BadgeCheck size={16} className="text-primary" title="Verified Seller" />}
                        </div>
                        <span className="font-mono text-xs text-secondary mt-1 block" title={seller.id}>{seller.id.split('-')[0]}...</span>
                      </div>
                    </td>
                    <td>{seller.owner?.full_name || 'Unknown'}</td>
                    <td>{getStatusBadge(seller.is_verified ? 'Approved' : 'Pending Approval')}</td>
                    <td>{seller.products?.length || 0} items</td>
                    <td>{renderStars(seller.is_verified ? 4.8 : 0)}</td>
                    <td className="text-right action-cell">
                      {!seller.is_verified ? (
                        <button className="btn-primary" style={{padding: '0.4rem 0.75rem', fontSize: '0.8rem'}} onClick={() => handleApprove(seller.id)}>Approve</button>
                      ) : (
                        <div className="flex justify-end gap-1">
                          <button className="btn-icon" title="Menu"><MoreVertical size={16} /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="pagination">
          <span className="pagination-info">Showing 1 to {sellers.length} of {sellers.length} entries</span>
          <div className="pagination-controls">
            <button className="btn-page" disabled>Previous</button>
            <button className="btn-page active">1</button>
            <button className="btn-page">2</button>
            <button className="btn-page">3</button>
            <button className="btn-page">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellersView;
