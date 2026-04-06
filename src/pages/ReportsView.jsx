import React from 'react';
import { Download, Calendar, TrendingUp, BarChart2, PieChart as PieChartIcon, Activity } from 'lucide-react';
import './ReportsView.css';

const ReportCard = ({ title, description, icon, primaryBtn, secondaryBtn }) => (
  <div className="report-card glass">
    <div className="report-icon-container">
      {icon}
    </div>
    <div className="report-content">
      <h3 className="report-title">{title}</h3>
      <p className="report-desc">{description}</p>
    </div>
    <div className="report-actions">
      {primaryBtn && <button className="btn-primary flex items-center gap-1 text-sm py-1 px-3"><Download size={14} /> {primaryBtn}</button>}
      {secondaryBtn && <button className="btn-secondary text-sm py-1 px-3" style={{padding: '0.4rem 1rem'}}>{secondaryBtn}</button>}
    </div>
  </div>
);

const ReportsView = () => {
  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title">Reports & Analytics</h1>
          <p className="view-subtitle">Generate insights, export data, and analyze platform performance.</p>
        </div>
        <div className="flex gap-2">
          <div className="date-picker-mock">
            <Calendar size={16} className="text-secondary" />
            <span>Last 30 Days</span>
          </div>
        </div>
      </div>

      <div className="reports-section-title">
        <Activity size={20} className="text-primary" />
        <h2>Platform Analytics</h2>
      </div>

      <div className="analytics-overview-grid">
         <div className="chart-box glass">
           <div className="cb-header">
             <h3>Revenue vs Orders</h3>
             <select className="btn-secondary text-xs" style={{padding: '0.2rem 0.5rem'}}>
               <option>Weekly</option>
               <option>Monthly</option>
             </select>
           </div>
           <div className="cb-body flex-center min-h-[250px] text-secondary">
             <div className="text-center flex flex-col items-center gap-2">
               <TrendingUp size={48} className="opacity-30 text-primary" />
               <p>Line Chart Visualization (Revenue trend)</p>
             </div>
           </div>
         </div>
         <div className="chart-box glass">
           <div className="cb-header">
             <h3>Top Selling Categories</h3>
             <button className="btn-icon"><MoreVertical size={16}/></button>
           </div>
           <div className="cb-body flex-center min-h-[250px] text-secondary">
              <div className="text-center flex flex-col items-center gap-2">
               <PieChartIcon size={48} className="opacity-30 text-secondary" />
               <p>Pie Chart Visualization (Category split)</p>
             </div>
           </div>
         </div>
      </div>

      <div className="reports-section-title mt-6">
        <Download size={20} className="text-primary" />
        <h2>Available Reports</h2>
      </div>

      <div className="reports-grid">
        <ReportCard 
          title="Sales Report" 
          description="Detailed breakdown of gross revenue, commissions, and refunds."
          icon={<TrendingUp size={24} className="text-success" />}
          primaryBtn="Export CSV"
          secondaryBtn="Preview"
        />
        <ReportCard 
          title="Top Sellers Analysis" 
          description="Performance metrics for platform vendors (GMV, orders, reviews)."
          icon={<BarChart2 size={24} className="text-primary" />}
          primaryBtn="Export PDF"
          secondaryBtn="Preview"
        />
        <ReportCard 
          title="User Growth" 
          description="Customer acquisition, retention rates, and demographic data."
          icon={<Activity size={24} className="text-warning" />}
          primaryBtn="Export CSV"
          secondaryBtn="Preview"
        />
        <ReportCard 
          title="Tax & Compliance" 
          description="Consolidated tax reports collected across all active marketplace regions."
          icon={<PieChartIcon size={24} className="text-danger" />}
          primaryBtn="Generate Report"
        />
      </div>
    </div>
  );
};

export default ReportsView;
