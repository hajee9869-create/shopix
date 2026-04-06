import React from "react";
import './Dashboard.css';

const HybridDashboard = () => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">🔀 Hybrid Seller Dashboard</h2>
        <button 
          className={`btn-${isEditMode ? 'primary' : 'secondary'} flex items-center gap-2 text-sm px-3 py-1.5`}
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {isEditMode ? '✅ Save Layout' : '✏️ Customize Layout'}
        </button>
      </div>

      <div className="dashboard-grid">
        <div className={`dashboard-card glass col-span-2 ${isEditMode ? 'border-2 border-dashed border-indigo-300 relative cursor-pointer hover:bg-indigo-50' : ''}`}>
          {isEditMode && <div className="absolute top-2 right-2 text-xs bg-white px-1.5 py-0.5 rounded font-bold text-primary shadow-sm">Edit</div>}
          <h4 className="text-secondary text-sm uppercase font-bold tracking-wider mb-2">Total Revenue</h4>
          <div className="text-4xl font-extrabold text-primary">$5,000</div>
        </div>
        <div className={`dashboard-card glass border-l-4 border-indigo-500 ${isEditMode ? 'border-dashed border-indigo-300 relative cursor-pointer hover:bg-indigo-50' : ''}`}>
          {isEditMode && <div className="absolute top-2 right-2 text-xs bg-white px-1.5 py-0.5 rounded font-bold text-primary shadow-sm">Edit</div>}
          <h4 className="text-secondary text-sm uppercase font-bold tracking-wider mb-2">Physical Orders</h4>
          <div className="text-3xl font-extrabold text-secondary">70</div>
        </div>
        <div className={`dashboard-card glass border-l-4 border-primary ${isEditMode ? 'border-dashed border-indigo-300 relative cursor-pointer hover:bg-indigo-50' : ''}`}>
          {isEditMode && <div className="absolute top-2 right-2 text-xs bg-white px-1.5 py-0.5 rounded font-bold text-primary shadow-sm">Edit</div>}
          <h4 className="text-secondary text-sm uppercase font-bold tracking-wider mb-2">Digital Sales</h4>
          <div className="text-3xl font-extrabold text-secondary">50</div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-100">
        <h3 className="text-lg font-bold text-indigo-900 mb-2">Overview</h3>
        <p className="text-indigo-700">You are selling both Physical and Digital products. Use the dual-capability tools to manage tracking numbers alongside digital downloads.</p>
      </div>
    </div>
  );
};

export default HybridDashboard;
