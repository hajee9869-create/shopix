import React from "react";
import './Dashboard.css';

const DigitalDashboard = () => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">💻 Digital Seller Dashboard</h2>
        <button 
          className={`btn-${isEditMode ? 'primary' : 'secondary'} flex items-center gap-2 text-sm px-3 py-1.5`}
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {isEditMode ? '✅ Save Layout' : '✏️ Customize Layout'}
        </button>
      </div>

      <div className="dashboard-grid">
        <div className={`dashboard-card glass ${isEditMode ? 'border-2 border-dashed border-indigo-300 relative cursor-pointer hover:bg-indigo-50' : ''}`}>
          {isEditMode && <div className="absolute top-2 right-2 text-xs bg-white px-1.5 py-0.5 rounded font-bold text-primary shadow-sm">Edit</div>}
          <h4 className="text-secondary text-sm uppercase font-bold tracking-wider mb-2">Total Sales</h4>
          <div className="text-3xl font-extrabold text-primary">80</div>
        </div>
        <div className={`dashboard-card glass ${isEditMode ? 'border-2 border-dashed border-indigo-300 relative cursor-pointer hover:bg-indigo-50' : ''}`}>
          {isEditMode && <div className="absolute top-2 right-2 text-xs bg-white px-1.5 py-0.5 rounded font-bold text-primary shadow-sm">Edit</div>}
          <h4 className="text-secondary text-sm uppercase font-bold tracking-wider mb-2">Revenue</h4>
          <div className="text-3xl font-extrabold text-primary">$1,800</div>
        </div>
        <div className="dashboard-card glass">
          <h4 className="text-secondary text-sm uppercase font-bold tracking-wider mb-2">Downloads</h4>
          <div className="text-3xl font-extrabold text-indigo-500">300</div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4 border-b border-gray-100 pb-2">Top Products</h3>
        <ul className="space-y-3">
          <li className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-white transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-500 flex items-center justify-center rounded-md text-xl">📄</div>
              <span className="font-semibold">UI Design Course</span>
            </div>
            <button className="text-sm font-semibold text-primary hover:underline">Manage links</button>
          </li>
          <li className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-white transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-500 flex items-center justify-center rounded-md text-xl">📘</div>
              <span className="font-semibold">React Ebook</span>
            </div>
            <button className="text-sm font-semibold text-primary hover:underline">Manage files</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DigitalDashboard;
