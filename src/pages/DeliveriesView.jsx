import React, { useState, useEffect } from 'react';
import { Truck, Plus, Globe, Shield, ExternalLink, Trash2, Edit } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './DeliveriesView.css';

const DeliveriesView = () => {
  const [couriers, setCouriers] = useState([
    { id: 1, name: 'FedEx', trackingUrl: 'https://www.fedex.com/track/{id}', status: 'Active', region: 'Global' },
    { id: 2, name: 'DHL Express', trackingUrl: 'https://www.dhl.com/en/express/tracking.html?AWB={id}', status: 'Active', region: 'Global' },
    { id: 3, name: 'USPS', trackingUrl: 'https://tools.usps.com/go/TrackConfirmAction?tLabels={id}', status: 'Active', region: 'USA' },
  ]);
  const [loading, setLoading] = useState(false);

  // In a real app, we'd fetch these from Supabase
  // useEffect(() => { fetchCouriers(); }, []);

  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title flex items-center gap-2">
            <Truck size={28} className="text-primary" />
            Delivery Management
          </h1>
          <p className="view-subtitle">Configure shipping partners, tracking systems, and delivery zones.</p>
        </div>
        <button className="btn-primary add-delivery-btn">
          <Plus size={18} /> Add New Partner
        </button>
      </div>

      <div className="stats-grid mb-6">
        <div className="stat-card glass p-4">
          <div className="text-sm font-semibold text-secondary uppercase tracking-wider">Active Partners</div>
          <div className="text-2xl font-bold mt-2">12</div>
        </div>
        <div className="stat-card glass p-4">
          <div className="text-sm font-semibold text-secondary uppercase tracking-wider">Deliveries Today</div>
          <div className="text-2xl font-bold mt-2 text-primary">847</div>
        </div>
        <div className="stat-card glass p-4">
          <div className="text-sm font-semibold text-secondary uppercase tracking-wider">Avg. Delivery Time</div>
          <div className="text-2xl font-bold mt-2 text-success">2.4 Days</div>
        </div>
      </div>

      <div className="deliveries-grid">
        {couriers.map((courier) => (
          <div key={courier.id} className="delivery-card glass">
            <div className="delivery-header">
              <div className="flex items-center gap-3">
                <div className="courier-logo">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="courier-name">{courier.name}</h3>
                  <span className="text-xs text-secondary flex items-center gap-1">
                    <Globe size={12} /> {courier.region}
                  </span>
                </div>
              </div>
              <span className={`status-badge text-xs px-2 py-1 rounded-full ${courier.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                {courier.status}
              </span>
            </div>

            <div className="tracking-info">
              <span className="font-semibold text-xs uppercase tracking-tight">Tracking Template</span>
              <code>{courier.trackingUrl}</code>
            </div>

            <div className="delivery-footer">
              <div className="flex gap-2">
                <button className="btn-icon" title="Edit Partner"><Edit size={16} /></button>
                <button className="btn-icon text-danger" title="Delete Partner"><Trash2 size={16} /></button>
              </div>
              <button className="btn-text text-sm flex items-center gap-1">
                Test API <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveriesView;
