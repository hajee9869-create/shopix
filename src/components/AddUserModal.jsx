import React, { useState } from 'react';
import { X, Check, Shield } from 'lucide-react';
import './AddUserModal.css';

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Customer',
    access: {
      dashboard: true,
      users: false,
      sellers: false,
      products: true,
      orders: true,
      payments: false,
      reports: false,
      settings: false,
    }
  });

  if (!isOpen) return null;

  const handleAccessChange = (feature) => {
    setFormData(prev => ({
      ...prev,
      access: {
        ...prev.access,
        [feature]: !prev.access[feature]
      }
    }));
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    let newAccess = { ...formData.access };
    
    if (role === 'Administrator') {
      Object.keys(newAccess).forEach(k => newAccess[k] = true);
    } else if (role === 'Seller') {
      newAccess = { dashboard: true, users: false, sellers: false, products: true, orders: true, payments: true, reports: true, settings: false };
    } else {
      newAccess = { dashboard: true, users: false, sellers: false, products: true, orders: true, payments: false, reports: false, settings: false };
    }

    setFormData({ ...formData, role, access: newAccess });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser({
      id: `USR-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: 'Active',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
    setFormData({name: '', email: '', role: 'Customer', access: { dashboard: true, users: false, sellers: false, products: true, orders: true, payments: false, reports: false, settings: false }});
    onClose();
  };

  const accessOptions = [
    { id: 'dashboard', label: 'Dashboard Overview' },
    { id: 'users', label: 'User Management' },
    { id: 'sellers', label: 'Seller Management' },
    { id: 'products', label: 'Product Catalog' },
    { id: 'orders', label: 'Order Processing' },
    { id: 'payments', label: 'Payments & Commission' },
    { id: 'reports', label: 'Reports & Analytics' },
    { id: 'settings', label: 'Platform Settings' },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content fade-in">
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <h2 className="modal-title">Add New User</h2>
            <Shield size={18} className="text-primary" />
          </div>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group mb-4">
            <label>Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. John Doe" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required 
            />
          </div>
          <div className="form-group mb-4">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="user@example.com" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>
          <div className="form-group mb-5">
            <label>Role</label>
            <select className="form-control" value={formData.role} onChange={handleRoleChange}>
              <option value="Customer">Customer</option>
              <option value="Seller">Seller</option>
              <option value="Manager">Manager</option>
              <option value="Administrator">Administrator</option>
            </select>
            <p className="text-xs text-secondary mt-1">Selecting a role presets the access controls below.</p>
          </div>

          <label className="font-semibold mb-2 block border-t pt-4 border-color">Feature Access Control</label>
          <div className="access-grid">
            {accessOptions.map(option => (
              <label key={option.id} className={`access-card ${formData.access[option.id] ? 'active' : ''}`}>
                <div className="flex items-center gap-2">
                  <div className={`checkbox ${formData.access[option.id] ? 'checked' : ''}`}>
                    {formData.access[option.id] && <Check size={12} />}
                  </div>
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
                <input 
                  type="checkbox" 
                  className="hidden-checkbox" 
                  checked={formData.access[option.id]} 
                  onChange={() => handleAccessChange(option.id)} 
                />
              </label>
            ))}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Create User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
