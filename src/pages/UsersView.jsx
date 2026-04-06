import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Edit, Ban, Trash2, CheckCircle } from 'lucide-react';
import AddUserModal from '../components/AddUserModal';
import { supabase } from '../lib/supabase';
import './UsersView.css';

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = (newUser) => {
    setUsers([newUser, ...users]);
  };

  const getStatusBadgeClass = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'badge-success';
      case 'blocked': return 'badge-danger';
      case 'pending': return 'badge-warning';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title">User Management</h1>
          <p className="view-subtitle">Manage platform users, roles, and statuses.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Add New User</button>
      </div>

      <div className="data-panel glass">
        <div className="panel-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-icon-text">
            <Filter size={18} /> Filter
          </button>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-secondary">Loading users...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-secondary">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="font-mono text-sm text-secondary">{user.id.split('-')[0]}...</td>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">{user.full_name?.charAt(0) || '-'}</div>
                        <div className="user-details">
                          <span className="user-name">{user.full_name || 'Unknown'}</span>
                          <span className="user-email">{user.email || 'No email'}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="role-tag">{user.role}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(user.status || 'Active')}`}>
                        {(user.status || 'Active') === 'Active' && <CheckCircle size={12} />}
                        {(user.status || 'Active') === 'Blocked' && <Ban size={12} />}
                        {user.status || 'Active'}
                      </span>
                    </td>
                    <td className="text-secondary">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="text-right action-cell">
                      <button className="btn-icon" title="Edit"><Edit size={16} /></button>
                      {(user.status || 'Active') === 'Active' ? (
                        <button className="btn-icon text-warning" title="Block"><Ban size={16} /></button>
                      ) : (
                        <button className="btn-icon text-success" title="Unblock"><CheckCircle size={16} /></button>
                      )}
                      <button className="btn-icon text-danger" title="Delete"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="pagination">
          <span className="pagination-info">Showing 1 to {users.length} of {users.length} entries</span>
          <div className="pagination-controls">
            <button className="btn-page" disabled>Previous</button>
            <button className="btn-page active">1</button>
            <button className="btn-page" disabled>Next</button>
          </div>
        </div>
      </div>

      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddUser={handleAddUser} 
      />
    </div>
  );
};

export default UsersView;
