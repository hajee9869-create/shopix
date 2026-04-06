import React, { useState } from 'react';
import { ShieldCheck, Star, Users, MapPin, Search, ChevronDown, PackageSearch } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './UserPages.css';

const StoreProfile = () => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback to the inserted mock store ID if no ID is present in the URL
  const storeId = id || 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  const TEST_USER_ID = '11111111-1111-1111-1111-111111111111';

  React.useEffect(() => {
    const fetchStoreData = async () => {
      setLoading(true);
      try {
        // Fetch Store
        const { data: storeData, error: storeError } = await supabase
          .from('stores')
          .select('*')
          .eq('id', storeId)
          .single();

        if (storeError) throw storeError;
        setStore(storeData);

        // Fetch Products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*, category:categories(name)')
          .eq('store_id', storeId);

        if (productsError) throw productsError;
        setProducts(productsData || []);

        // Check if following
        const { data: followData } = await supabase
          .from('store_followers')
          .select('*')
          .eq('user_id', TEST_USER_ID)
          .eq('store_id', storeId)
          .single();
        
        setIsFollowing(!!followData);

      } catch (error) {
        console.error('Error fetching store data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [storeId]);

  const toggleFollow = async () => {
    if (isFollowing) {
      await supabase.from('store_followers').delete().match({ user_id: TEST_USER_ID, store_id: storeId });
      setIsFollowing(false);
    } else {
      await supabase.from('store_followers').insert({ user_id: TEST_USER_ID, store_id: storeId });
      setIsFollowing(true);
    }
  };

  if (loading) return <div className="store-container p-8 text-secondary">Loading store details...</div>;
  if (!store) return <div className="store-container p-8 text-danger">Store not found.</div>;

  return (
    <div className="store-container fade-in text-left">
      {/* Store Banner & Info Header */}
      <div className="glass overflow-hidden mb-8" style={{ borderRadius: 'var(--radius-lg)' }}>
        <div className="h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
          <div className="absolute -bottom-10 left-8 w-24 h-24 bg-white rounded-full p-1 shadow-lg">
             <div className="w-full h-full bg-gray-100 rounded-full flex-center text-primary font-bold text-2xl">
               TH
             </div>
          </div>
        </div>
        
         <div className="px-8 pt-14 pb-6 flex justify-between items-start">
           <div>
             <h1 className="text-3xl font-bold flex items-center gap-2">
               {store.name} {store.is_verified && <ShieldCheck size={24} className="text-primary" title="Verified Premium Seller" />}
             </h1>
             <p className="text-secondary mt-1 flex items-center gap-4">
               <span className="flex items-center gap-1"><MapPin size={16}/> Global</span>
               <span className="flex items-center gap-1 text-warning font-semibold"><Star size={16} className="fill-warning"/> 4.8</span>
             </p>
             <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary">
               {store.description || 'Welcome to our store! Check out our collection of premium products.'}
             </p>
           </div>
           
           <div className="flex flex-col items-end gap-3">
              <button 
                className={`px-6 py-2 rounded-full font-semibold transition ${isFollowing ? 'border-2 border-gray-300 text-secondary' : 'bg-primary text-white shadow-md hover:-translate-y-1'}`}
                onClick={toggleFollow}
              >
                {isFollowing ? 'Following' : 'Follow Store'}
              </button>
              <button className="text-primary text-sm font-medium hover:underline">Contact Seller</button>
           </div>
         </div>
      </div>

      {/* Store Products */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Products ({products.length})</h2>
        <div className="flex gap-4">
           <div className="search-bar-wrapper border border-gray-200">
             <input type="text" placeholder="Search this store..." className="search-input py-2" />
             <Search size={16} className="text-secondary mr-3" />
           </div>
           <button className="btn-secondary flex items-center gap-2">Sort by <ChevronDown size={16} /></button>
        </div>
      </div>

      <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card glass fade-in">
              <div className="product-image-container">
                 <div className="product-image-mock bg-gray-100 w-full h-48 rounded-md mb-3 flex-center text-secondary">
                    {product.title[0]}
                 </div>
                 <button className="add-to-cart-quick btn-icon bg-white text-primary shadow-md">
                   <PackageSearch size={18} />
                 </button>
              </div>
              <div className="product-info">
                <span className="text-xs text-secondary font-medium uppercase tracking-wider">{product.category?.name || 'Uncategorized'}</span>
                <h3 className="product-title font-semibold">{product.title}</h3>
                <div className="product-price mt-2 font-bold">${product.price}</div>
              </div>
            </div>
          ))}
          
          {products.length === 0 && (
            <div className="col-span-full text-center py-12 text-secondary">
               No products available in this store yet.
            </div>
          )}
      </div>
    </div>
  );
};

export default StoreProfile;
