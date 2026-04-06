import React from 'react';
import { Users, Store, PackageSearch, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Dashboard.css';

const StatCard = ({ title, value, icon, trend, trendUp, isEditMode }) => (
  <div className={`stat-card glass ${isEditMode ? 'border-2 border-dashed border-indigo-300 relative cursor-pointer hover:bg-indigo-50' : ''}`}>
    {isEditMode && <div className="absolute top-2 right-2 p-1 bg-white rounded shadow-sm text-xs text-primary font-bold z-10">Edit</div>}
    <div className="stat-header">
      <div className="stat-info">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-value">{value}</p>
      </div>
      <div className="stat-icon-wrapper">
        {icon}
      </div>
    </div>
    <div className={`stat-trend ${trendUp ? 'trend-up' : 'trend-down'}`}>
      <span>{trend}</span>
      <span className="trend-label">vs last month</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = React.useState({
    revenue: 0,
    users: 0,
    sellers: 0,
    orders: 0
  });
  const [recentOrders, setRecentOrders] = React.useState([]);
  const [isEditMode, setIsEditMode] = React.useState(false);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch counts
        const [{ count: usersCount }, { count: storesCount }, { count: ordersCount }, { data: revenueData }] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('stores').select('*', { count: 'exact', head: true }),
          supabase.from('orders').select('*', { count: 'exact', head: true }),
          supabase.from('orders').select('total_amount').eq('status', 'delivered')
        ]);

        const revenue = revenueData ? revenueData.reduce((sum, order) => sum + Number(order.total_amount), 0) : 0;

        setStats({
          revenue,
          users: usersCount || 0,
          sellers: storesCount || 0,
          orders: ordersCount || 0
        });

        // Fetch recent activity
        const { data: recent } = await supabase
          .from('orders')
          .select('id, created_at, total_amount')
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (recent) setRecentOrders(recent);
      } catch (e) {
        console.error('Error fetching dashboard stats:', e);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back, Admin. Here is what's happening today.</p>
        </div>
        <button 
          className={`btn-${isEditMode ? 'primary' : 'secondary'} flex items-center gap-2`}
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {isEditMode ? '✅ Save Changes' : '✏️ Edit Dashboard'}
        </button>
      </div>

      <div className="stats-grid">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} 
          icon={<DollarSign size={24} className="icon-revenue"/>} 
          trend="+20.1%" 
          trendUp={true} 
          isEditMode={isEditMode}
        />
        <StatCard 
          title="Active Users" 
          value={stats.users.toLocaleString()} 
          icon={<Users size={24} className="icon-users"/>} 
          trend="+15.2%" 
          trendUp={true} 
          isEditMode={isEditMode}
        />
        <StatCard 
          title="Total Sellers" 
          value={stats.sellers.toLocaleString()} 
          icon={<Store size={24} className="icon-sellers"/>} 
          trend="+5.4%" 
          trendUp={true} 
          isEditMode={isEditMode}
        />
        <StatCard 
          title="Total Orders" 
          value={stats.orders.toLocaleString()} 
          icon={<ShoppingCart size={24} className="icon-orders"/>} 
          trend="-2.1%" 
          trendUp={false} 
          isEditMode={isEditMode}
        />
      </div>

      <div className="dashboard-content-grid">
        <div className="chart-container glass">
          <div className="section-header">
            <h2>Revenue Overview</h2>
            <button className="btn-secondary">Export</button>
          </div>
          <div className="chart-placeholder">
            <TrendingUp size={48} color="var(--primary)" opacity={0.2} />
            <p>Sales Analytics Chart will render here</p>
          </div>
        </div>

        <div className="recent-activity glass">
          <div className="section-header">
            <h2>Recent Orders</h2>
          </div>
          <div className="activity-list">
            {recentOrders.map((order) => (
              <div key={order.id} className="activity-item">
                <div className="activity-icon">
                   <PackageSearch size={16} />
                </div>
                <div className="activity-details">
                  <p className="activity-title">Order #{order.id.split('-')[0]} placed</p>
                  <p className="activity-time">{new Date(order.created_at).toLocaleString()}</p>
                </div>
                <div className="activity-amount">
                  ${order.total_amount}
                </div>
              </div>
            ))}
            {recentOrders.length === 0 && <p className="text-secondary text-sm">No recent activity.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
