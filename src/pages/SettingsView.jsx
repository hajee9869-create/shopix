import React, { useState } from 'react';
import { Save, Globe, CreditCard, LayoutGrid, Shield, BellRing } from 'lucide-react';
import './SettingsView.css';

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: <Globe size={18} /> },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard size={18} /> },
    { id: 'categories', label: 'Categories', icon: <LayoutGrid size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <BellRing size={18} /> },
  ];

  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title">Platform Settings</h1>
          <p className="view-subtitle">Configure global parameters, payment gateways, and marketplace features.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary flex items-center gap-1">
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar glass">
          <ul className="settings-nav">
            {tabs.map(tab => (
              <li 
                key={tab.id}
                className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="settings-content glass">
          {activeTab === 'general' && (
            <div className="settings-panel fade-in">
              <h2 className="panel-title">General Information</h2>
              
              <div className="form-group">
                <label>Platform Name</label>
                <input type="text" className="form-control" defaultValue="MarketAdmin Multi-vendor" />
              </div>
              
              <div className="form-group">
                <label>Support Email</label>
                <input type="email" className="form-control" defaultValue="support@marketadmin.com" />
              </div>
              
              <div className="form-group">
                <label>Default Currency</label>
                <select className="form-control">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Global Commission Rate (%)</label>
                <input type="number" className="form-control" defaultValue="10" />
                <p className="form-help">This is the default cut the platform takes from each sale.</p>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="settings-panel fade-in">
              <h2 className="panel-title">Payment Configurations</h2>
              
              <div className="gateway-card">
                <div className="gateway-header">
                  <div className="gateway-title">
                    <span className="gateway-name">Stripe</span>
                    <span className="status-badge badge-success" style={{marginLeft: '10px'}}>Connected</span>
                  </div>
                  <input type="checkbox" className="toggle-switch" defaultChecked />
                </div>
                <div className="gateway-body">
                  <div className="form-group">
                     <label>Public Key</label>
                     <input type="text" className="form-control" defaultValue="pk_test_...89xY" />
                  </div>
                  <div className="form-group">
                     <label>Secret Key</label>
                     <input type="password" className="form-control" defaultValue="sk_test_...32zA" />
                  </div>
                </div>
              </div>

              <div className="gateway-card mt-4">
                <div className="gateway-header">
                  <div className="gateway-title">
                    <span className="gateway-name">PayPal</span>
                    <span className="status-badge badge-neutral" style={{marginLeft: '10px'}}>Disabled</span>
                  </div>
                  <input type="checkbox" className="toggle-switch" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
             <div className="settings-panel fade-in">
             <h2 className="panel-title">Manage Categories</h2>
             <p className="text-secondary text-sm mb-4">Define product classifications for your sellers.</p>
             
             <ul className="category-list">
               {['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Sports & Outdoors'].map((cat, i) => (
                 <li key={i} className="category-item">
                   <span>{cat}</span>
                   <button className="text-danger">Remove</button>
                 </li>
               ))}
             </ul>
             <div className="add-category mt-4">
               <input type="text" className="form-control inline-input" placeholder="New Category Name..." />
               <button className="btn-secondary">Add Category</button>
             </div>
           </div>
          )}
          
          {(activeTab !== 'general' && activeTab !== 'payment' && activeTab !== 'categories') && (
            <div className="settings-panel fade-in flex-center text-secondary min-h-[300px]">
              <p>Configuration options for {tabs.find(t => t.id === activeTab)?.label} will be implemented here.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SettingsView;
