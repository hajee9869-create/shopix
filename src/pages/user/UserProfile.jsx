import React, { useState } from 'react';
import { Package, Heart, Settings, MapPin, Store, CreditCard, LogOut, ExternalLink, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SellerDashboard from '../../dashboard/SellerDashboard';
import { supabase } from '../../lib/supabase';
import './UserPages.css';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [followedStores, setFollowedStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sellerType, setSellerType] = useState('physical');

  // Hardcoded mock user ID for testing the integration
  const TEST_USER_ID = '11111111-1111-1111-1111-111111111111';

  React.useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Fetch Orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              quantity,
              price_at_time,
              product:products (title, store:stores(name))
            )
          `)
          .eq('user_id', TEST_USER_ID)
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;
        setOrders(ordersData || []);

        // Fetch Followed Stores
        const { data: followsData, error: followsError } = await supabase
          .from('store_followers')
          .select(`
            store:stores(id, name, is_verified)
          `)
          .eq('user_id', TEST_USER_ID);

        if (followsError) throw followsError;
        setFollowedStores(followsData?.map(f => f.store) || []);

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="store-container fade-in" style={{ display: 'flex', gap: '2rem' }}>
      
      {/* Sidebar Navigation */}
      <aside className="glass p-6" style={{ width: '280px', borderRadius: 'var(--radius-lg)', alignSelf: 'flex-start' }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary flex-center text-white font-bold text-xl">
            JD
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">John Doe</h3>
            <p className="text-xs text-secondary">Premium Member</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <button onClick={() => setActiveTab('seller_dashboard')} className={`flex items-center gap-3 p-3 rounded-md transition ${activeTab === 'seller_dashboard' ? 'bg-indigo-50 text-primary font-semibold' : 'text-secondary hover:bg-gray-50'}`}>
            <LayoutDashboard size={18} /> Seller Dashboard
          </button>
          <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-3 p-3 rounded-md transition ${activeTab === 'orders' ? 'bg-indigo-50 text-primary font-semibold' : 'text-secondary hover:bg-gray-50'}`}>
            <Package size={18} /> Order History
          </button>
          <button onClick={() => setActiveTab('following')} className={`flex items-center gap-3 p-3 rounded-md transition ${activeTab === 'following' ? 'bg-indigo-50 text-primary font-semibold' : 'text-secondary hover:bg-gray-50'}`}>
            <Heart size={18} /> Followed Stores
          </button>
          <button onClick={() => setActiveTab('addresses')} className={`flex items-center gap-3 p-3 rounded-md transition ${activeTab === 'addresses' ? 'bg-indigo-50 text-primary font-semibold' : 'text-secondary hover:bg-gray-50'}`}>
            <MapPin size={18} /> Addresses
          </button>
          <button onClick={() => setActiveTab('payment')} className={`flex items-center gap-3 p-3 rounded-md transition ${activeTab === 'payment' ? 'bg-indigo-50 text-primary font-semibold' : 'text-secondary hover:bg-gray-50'}`}>
            <CreditCard size={18} /> Payment Methods
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 p-3 rounded-md transition ${activeTab === 'settings' ? 'bg-indigo-50 text-primary font-semibold' : 'text-secondary hover:bg-gray-50'}`}>
            <Settings size={18} /> Account Settings
          </button>
        </nav>

        <button className="flex items-center gap-3 p-3 rounded-md text-danger hover:bg-red-50 mt-8 w-full transition">
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 glass p-8" style={{ borderRadius: 'var(--radius-lg)' }}>
        
        {activeTab === 'orders' && (
          <div className="fade-in">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-100 pb-4">Order History</h2>
            
            {loading ? (
              <p className="text-secondary">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-secondary">No orders found.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                      <div>
                        <span className="font-semibold cursor-pointer hover:text-primary transition" title={order.id}>
                          Order #{order.id.split('-')[0]}
                        </span>
                        <p className="text-xs text-secondary mt-1">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`status-badge badge-${order.status === 'delivered' ? 'success' : order.status === 'pending' ? 'warning' : 'primary'}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    
                    {order.order_items?.map((item, idx) => (
                      <div key={idx} className="flex gap-4 mt-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-md"></div>
                        <div>
                          <h4 className="font-semibold text-sm">{item.product?.title || 'Unknown Product'}</h4>
                          <p className="text-xs text-secondary mt-1">Qty: {item.quantity} • Sold by: <span className="text-primary hover:underline cursor-pointer">{item.product?.store?.name || 'Unknown Store'}</span></p>
                          <div className="font-bold text-sm mt-2">${item.price_at_time}</div>
                        </div>
                      </div>
                    ))}

                    {/* Tracking Timeline */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-secondary mb-4">Track Order</h5>
                      <div className="flex justify-between relative px-2">
                        {/* Connecting Line */}
                        <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200 -z-0"></div>
                        <div className={`absolute top-3 left-0 h-0.5 bg-primary transition-all duration-500 -z-0`} style={{ 
                          width: order.status === 'delivered' ? '100%' : order.status === 'shipped' ? '66%' : order.status === 'processing' ? '33%' : '0%' 
                        }}></div>

                        {['ordered', 'processing', 'shipped', 'delivered'].map((step, i) => {
                          const isActive = order.status === step || 
                            (step === 'ordered') || 
                            (step === 'processing' && ['shipped', 'delivered'].includes(order.status)) ||
                            (step === 'shipped' && order.status === 'delivered');
                          
                          return (
                            <div key={step} className="flex flex-col items-center gap-2 relative z-10">
                              <div className={`w-6 h-6 rounded-full flex-center text-[10px] font-bold border-2 transition-colors ${isActive ? 'bg-primary border-primary text-white' : 'bg-white border-gray-200 text-gray-300'}`}>
                                {i + 1}
                              </div>
                              <span className={`text-[10px] font-bold uppercase ${isActive ? 'text-primary' : 'text-gray-400'}`}>{step}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'following' && (
          <div className="fade-in">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-100 pb-4">Followed Stores</h2>
            
            {loading ? (
              <p className="text-secondary">Loading followed stores...</p>
            ) : followedStores.length === 0 ? (
              <p className="text-secondary">You are not following any stores yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {followedStores.map((store) => (
                  <div key={store.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:border-indigo-100 transition shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex-center text-primary"><Store size={20} /></div>
                      <div>
                        <h4 className="font-semibold flex items-center gap-1">
                          {store.name} 
                          {store.is_verified && <ShieldCheck size={14} className="text-primary" />}
                        </h4>
                        <p className="text-xs text-secondary flex items-center gap-1 mt-1">Visit store to see products</p>
                      </div>
                    </div>
                    <NavLink to={`/store/${store.id}`} className="btn-secondary text-sm px-3 py-1 flex items-center gap-1 hover:bg-indigo-50 hover:text-primary transition">Visit <ExternalLink size={14}/></NavLink>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'seller_dashboard' && (
          <div className="fade-in">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-bold">Seller Dashboard</h2>
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-secondary">Seller Type:</label>
                <select
                  value={sellerType}
                  onChange={(e) => setSellerType(e.target.value)}
                  className="p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:outline-none bg-white text-sm"
                >
                  <option value="physical">📦 Physical</option>
                  <option value="digital">💻 Digital</option>
                  <option value="hybrid">🔀 Hybrid</option>
                </select>
              </div>
            </div>
            <SellerDashboard sellerType={sellerType} />
          </div>
        )}

        {['addresses', 'payment', 'settings'].includes(activeTab) && (
          <div className="fade-in flex-center h-48 text-secondary">
            Settings panel for {activeTab} coming soon.
          </div>
        )}

      </div>
    </div>
  );
};

export default UserProfile;
