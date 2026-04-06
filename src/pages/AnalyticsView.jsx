import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Calendar, Download, TrendingUp, Users, ShoppingBag } from 'lucide-react';
import './AnalyticsView.css';

const revenueData = [
  { name: 'Mon', revenue: 4000, orders: 240 },
  { name: 'Tue', revenue: 3000, orders: 138 },
  { name: 'Wed', revenue: 2000, orders: 980 },
  { name: 'Thu', revenue: 2780, orders: 390 },
  { name: 'Fri', revenue: 1890, orders: 480 },
  { name: 'Sat', revenue: 2390, orders: 380 },
  { name: 'Sun', revenue: 3490, orders: 430 },
];

const categoryData = [
  { name: 'Electronics', sales: 4000 },
  { name: 'Clothing', sales: 3000 },
  { name: 'Home', sales: 2000 },
  { name: 'Beauty', sales: 2780 },
  { name: 'Sports', sales: 1890 },
];

const AnalyticsView = () => {
  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title">Detailed Analytics</h1>
          <p className="view-subtitle">Interactive visualizations of marketplace performance metrics.</p>
        </div>
        <div className="flex gap-2">
          <div className="date-picker-mock bg-surface">
            <Calendar size={16} className="text-secondary" />
            <span>This Week</span>
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Download size={16} /> Export Data
          </button>
        </div>
      </div>

      <div className="analytics-kpi-grid mb-6">
        <div className="kpi-card glass">
          <div className="kpi-icon bg-indigo-100 text-primary"><TrendingUp size={24} /></div>
          <div className="kpi-info">
            <span className="kpi-label">Gross Volume</span>
            <span className="kpi-value">$19,550</span>
            <span className="text-success text-xs font-medium">+14.2% vs last week</span>
          </div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon bg-emerald-100 text-success"><ShoppingBag size={24} /></div>
          <div className="kpi-info">
            <span className="kpi-label">Total Orders</span>
            <span className="kpi-value">3,038</span>
            <span className="text-success text-xs font-medium">+5.1% vs last week</span>
          </div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon bg-amber-100 text-warning"><Users size={24} /></div>
          <div className="kpi-info">
            <span className="kpi-label">Active Buyers</span>
            <span className="kpi-value">1,204</span>
            <span className="text-danger text-xs font-medium">-2.4% vs last week</span>
          </div>
        </div>
      </div>

      <div className="charts-grid-main">
        <div className="chart-panel glass">
          <div className="panel-header border-b border-color pb-4 mb-4">
            <h2 className="panel-title m-0">Revenue Overview</h2>
          </div>
          <div className="chart-wrapper min-h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} tickFormatter={(value) => `$${value}`} />
                <RechartsTooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-panel glass">
          <div className="panel-header border-b border-color pb-4 mb-4">
            <h2 className="panel-title m-0">Orders vs Categories</h2>
          </div>
          <div className="chart-wrapper min-h-[300px]">
             <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} />
                <RechartsTooltip cursor={{fill: 'rgba(79, 70, 229, 0.05)'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="sales" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
