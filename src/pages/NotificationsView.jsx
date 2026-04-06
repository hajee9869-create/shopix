import React, { useState } from 'react';
import { Bell, Send, CheckCircle, AlertTriangle, Info, Clock, Trash2, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './UsersView.css';
import './NotificationsView.css';

const NotificationsView = () => {
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setAlerts(data || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);
  
  const getIcon = (type) => {
    switch(type) {
      case 'info': return <Info size={18} className="text-secondary" />;
      case 'warning': return <AlertTriangle size={18} className="text-warning" />;
      case 'success': return <CheckCircle size={18} className="text-success" />;
      default: return <Bell size={18} />;
    }
  };

  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title">Notifications</h1>
          <p className="view-subtitle">Send announcements to users and manage system alerts.</p>
        </div>
      </div>

      <div className="notifications-grid">
        <div className="compose-panel glass">
          <h2 className="panel-title mb-4">Send Announcement</h2>
          
          <div className="form-group">
            <label>Audience</label>
            <select className="form-control">
              <option>All Users & Sellers</option>
              <option>All Sellers Only</option>
              <option>All Customers Only</option>
              <option>Specific Roles...</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notification Title</label>
            <input type="text" className="form-control" placeholder="E.g. Holiday Sale Starts Tomorrow!" />
          </div>

          <div className="form-group">
            <label>Message Content</label>
            <textarea className="form-control" rows="5" placeholder="Write your announcement details here..."></textarea>
          </div>

          <div className="flex gap-2">
            <button className="btn-primary flex items-center gap-2">
              <Send size={16} /> Send Now
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Clock size={16} /> Schedule
            </button>
          </div>
        </div>

        <div className="alerts-panel glass">
          <div className="panel-toolbar flex justify-between items-center mb-4">
            <h2 className="panel-title">System Alerts History</h2>
            <div className="search-box inline-search">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search alerts..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="alerts-list">
            {loading ? (
              <div className="flex-center min-h-[200px] text-secondary">Loading alerts...</div>
            ) : alerts.length === 0 ? (
              <div className="flex-center min-h-[200px] text-secondary">No alerts found.</div>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className="alert-card">
                  <div className={`alert-icon-wrapper ${alert.type || 'info'}`}>
                    {getIcon(alert.type)}
                  </div>
                  <div className="alert-content">
                    <div className="flex justify-between items-start">
                      <h3 className="alert-title">{alert.type.toUpperCase()} ALERT</h3>
                      <span className="text-xs text-secondary">{new Date(alert.created_at).toLocaleString()}</span>
                    </div>
                    <p className="alert-msg">{alert.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`status-badge ${alert.is_read ? 'badge-neutral' : 'badge-primary'} text-xs`}>
                        {alert.is_read ? 'Read' : 'Active'}
                      </span>
                      <button className="btn-icon"><Trash2 size={14} className="text-danger opacity-70 hover:opacity-100" /></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsView;
