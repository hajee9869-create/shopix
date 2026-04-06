import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { Settings, Users, ShoppingCart, PackageSearch, LayoutDashboard, Bell, BarChart3, CreditCard, Store, Bot, FolderTree, LineChart, Cpu, Truck } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import UsersView from './pages/UsersView';
import SellersView from './pages/SellersView';
import ProductsView from './pages/ProductsView';
import OrdersView from './pages/OrdersView';
import PaymentsView from './pages/PaymentsView';
import ReportsView from './pages/ReportsView';
import NotificationsView from './pages/NotificationsView';
import SettingsView from './pages/SettingsView';
import AgentView from './pages/AgentView';
import CategoriesView from './pages/CategoriesView';
import AnalyticsView from './pages/AnalyticsView';
import AlgorithmView from './pages/AlgorithmView';
import DeliveriesView from './pages/DeliveriesView';
import SellerAIAgent from './components/SellerAIAgent';
import UserLayout from './layouts/UserLayout';
import Home from './pages/user/Home';
import Shop from './pages/user/Shop';
import Cart from './pages/user/Cart';
import Auth from './pages/user/Auth';
import UserProfile from './pages/user/UserProfile';
import StoreProfile from './pages/user/StoreProfile';
import './App.css'; // Optional component CSS

// We'll replace these with actual components later
const Placeholder = ({ title }) => (
  <div style={{ padding: '2rem' }}>
    <h1 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h1>
    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Content for {title.toLowerCase()} goes here...</p>
  </div>
);

const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-brand">
      <div className="logo-icon"><PackageSearch size={24} /></div>
      <h2>SHOPIX</h2>
    </div>
    <nav className="sidebar-nav">
      <ul>
        <li>
          <NavLink to="/admin/dashboard" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <Users size={20} /> Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/sellers" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <Store size={20} /> Sellers
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <PackageSearch size={20} /> Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <FolderTree size={20} /> Categories
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <ShoppingCart size={20} /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/payments" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <CreditCard size={20} /> Payments
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/analytics" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <LineChart size={20} /> Analytics
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/reports" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <BarChart3 size={20} /> Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/notifications" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <Bell size={20} /> Notifications
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/settings" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings size={20} /> Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/algorithm" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <Cpu size={20} /> Algorithms
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/agent" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <Bot size={20} /> AI Agent
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/deliveries" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <Truck size={20} /> Deliveries
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>
);

const Header = () => (
  <header className="header glass">
    <div className="header-search">
      <input type="text" placeholder="Search across platform..." />
    </div>
    <div className="header-actions">
      <button className="action-btn">
        <Bell size={20} />
        <span className="badge">3</span>
      </button>
      <div className="user-profile">
        <div className="avatar">A</div>
        <div className="user-info">
          <span className="name">Admin User</span>
          <span className="role">Superadmin</span>
        </div>
      </div>
    </div>
  </header>
);

const AdminLayout = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UsersView />} />
            <Route path="sellers" element={<SellersView />} />
            <Route path="products" element={<ProductsView />} />
            <Route path="categories" element={<CategoriesView />} />
            <Route path="orders" element={<OrdersView />} />
            <Route path="payments" element={<PaymentsView />} />
            <Route path="analytics" element={<AnalyticsView />} />
            <Route path="reports" element={<ReportsView />} />
            <Route path="notifications" element={<NotificationsView />} />
            <Route path="settings" element={<SettingsView />} />
            <Route path="algorithm" element={<AlgorithmView />} />
            <Route path="agent" element={<AgentView />} />
            <Route path="deliveries" element={<DeliveriesView />} />
          </Routes>
        </main>
        <SellerAIAgent />
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/*" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
        <Route path="auth" element={<Auth />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="store/:id" element={<StoreProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
