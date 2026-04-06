import React, { useState } from 'react';
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, ShoppingCart } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './UserPages.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const TEST_USER_ID = '11111111-1111-1111-1111-111111111111';

  React.useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id, quantity, product_id,
          product:products(title, price, store:stores(name))
        `)
        .eq('user_id', TEST_USER_ID);
      
      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, currentQty, delta) => {
    const newQ = Math.max(1, currentQty + delta);
    // Optimistic update
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQ } : item));
    
    try {
      await supabase.from('cart_items').update({ quantity: newQ }).eq('id', id);
    } catch (e) {
      console.error(e);
      fetchCart(); // Revert on failure
    }
  };

  const removeItem = async (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    try {
      await supabase.from('cart_items').delete().eq('id', id);
    } catch (e) {
      console.error(e);
      fetchCart();
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.product?.price || 0) * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = 15.00;
  const total = subtotal + tax + shipping;

  return (
    <div className="store-container fade-in" style={{ maxWidth: '1200px' }}>
      <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Your Shopping Cart</h1>
      
      {loading ? (
        <div className="glass flex-center flex-col py-12" style={{ borderRadius: 'var(--radius-lg)' }}>
          <h2 className="text-xl font-semibold mb-2">Loading your cart...</h2>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="glass flex-center flex-col py-12" style={{ borderRadius: 'var(--radius-lg)' }}>
          <ShoppingCart size={48} className="text-secondary mb-4 opacity-50" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-secondary mb-6">Looks like you haven't added anything yet.</p>
          <button className="btn-primary">Continue Shopping</button>
        </div>
      ) : (
        <div className="flex gap-8" style={{ alignItems: 'flex-start' }}>
          
          {/* Cart Items List */}
          <div className="flex-1 glass p-6" style={{ borderRadius: 'var(--radius-lg)' }}>
            <div className="flex flex-col gap-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 pb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ width: '100px', height: '100px', backgroundColor: '#F3F4F6', borderRadius: 'var(--radius-md)' }}></div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{item.product?.title || 'Unknown Product'}</h3>
                        <p className="text-sm text-secondary">Sold by: <span className="text-primary">{item.product?.store?.name || 'Unknown Store'}</span></p>
                      </div>
                      <div className="text-xl font-bold">${(Number(item.product?.price || 0) * item.quantity).toFixed(2)}</div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center bg-gray-50 rounded-md border border-color">
                        <button className="p-2 hover:bg-gray-100 transition text-secondary" onClick={() => updateQuantity(item.id, item.quantity, -1)}>
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button className="p-2 hover:bg-gray-100 transition text-secondary" onClick={() => updateQuantity(item.id, item.quantity, 1)}>
                          <Plus size={16} />
                        </button>
                      </div>
                      <button className="btn-icon text-danger flex items-center gap-1 text-sm font-medium" onClick={() => removeItem(item.id)}>
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="glass p-6" style={{ width: '380px', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Estimated Tax</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Shipping</span>
                <span className="font-semibold">${shipping.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 mb-8" style={{ borderTop: '1px solid var(--border-color)' }}>
              <span className="font-bold text-lg">Total</span>
              <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
            </div>

            <button className="btn-primary w-full py-3 text-lg flex justify-center items-center gap-2 mb-4">
              Proceed to Checkout <ArrowRight size={20} />
            </button>
            <div className="flex items-center justify-center gap-2 text-sm text-secondary">
               <ShieldCheck size={16} className="text-success" /> Secure SSL Checkout
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
