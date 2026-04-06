import React, { useState } from 'react';
import { User, Store, ArrowRight, ShieldCheck, Mail, Lock, UserPlus, Github, Facebook } from 'lucide-react';
import './UserPages.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [accountType, setAccountType] = useState('buyer');

  return (
    <div className="store-container flex-center min-h-[80vh] fade-in">
      <div className="glass p-8 w-full max-w-md" style={{ borderRadius: 'var(--radius-lg)' }}>
        
        {/* Toggle Login / Register */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <button 
            className={`text-lg font-bold transition ${isLogin ? 'text-primary' : 'text-secondary'}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button 
            className={`text-lg font-bold transition ${!isLogin ? 'text-primary' : 'text-secondary'}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Account Type Selector for Registration */}
        {!isLogin && (
          <div className="flex gap-4 mb-6">
            <button 
              className={`flex-1 flex flex-col items-center p-3 border-2 rounded-lg transition ${accountType === 'buyer' ? 'border-primary bg-indigo-50 text-primary' : 'border-gray-200 text-secondary'}`}
              onClick={() => setAccountType('buyer')}
            >
              <User size={24} className="mb-2" />
              <span className="font-semibold text-sm">Customer</span>
            </button>
            <button 
              className={`flex-1 flex flex-col items-center p-3 border-2 rounded-lg transition ${accountType === 'seller' ? 'border-primary bg-indigo-50 text-primary' : 'border-gray-200 text-secondary'}`}
              onClick={() => setAccountType('seller')}
            >
              <Store size={24} className="mb-2" />
              <span className="font-semibold text-sm">Seller</span>
            </button>
          </div>
        )}

        {/* Form Inputs */}
        <div className="flex flex-col gap-4">
          {!isLogin && (
            <div className="input-group">
              <label className="block text-sm font-semibold mb-1 text-secondary">{accountType === 'seller' ? 'Store Name' : 'Full Name'}</label>
              <div className="search-bar-wrapper" style={{ width: '100%', borderRadius: 'var(--radius-md)' }}>
                <input type="text" className="search-input w-full" placeholder={accountType === 'seller' ? "My Premium Store" : "John Doe"} />
              </div>
            </div>
          )}

          <div className="input-group">
            <label className="block text-sm font-semibold mb-1 text-secondary">Email Address</label>
            <div className="search-bar-wrapper" style={{ width: '100%', borderRadius: 'var(--radius-md)' }}>
              <Mail size={16} className="ml-3 text-secondary" />
              <input type="email" className="search-input w-full" placeholder="you@example.com" />
            </div>
          </div>

          <div className="input-group">
             <div className="flex justify-between mb-1">
               <label className="block text-sm font-semibold text-secondary">Password</label>
               {isLogin && <button className="text-xs text-primary font-medium">Forgot Password?</button>}
             </div>
            <div className="search-bar-wrapper" style={{ width: '100%', borderRadius: 'var(--radius-md)' }}>
              <Lock size={16} className="ml-3 text-secondary" />
              <input type="password" className="search-input w-full" placeholder="••••••••" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button className="btn-primary w-full mt-8 py-3 flex justify-center items-center gap-2">
           {isLogin ? 'Sign In' : (accountType === 'seller' ? 'Apply as Seller' : 'Create Account')}
           {isLogin ? <ArrowRight size={18} /> : <UserPlus size={18} />}
        </button>

        {!isLogin && accountType === 'seller' && (
          <p className="text-xs text-center text-secondary mt-4 flex items-center justify-center gap-1">
            <ShieldCheck size={14} className="text-success" /> Seller applications are manually reviewed.
          </p>
        )}

        <div className="relative mt-8 mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-secondary">Or continue with</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="btn-secondary w-full py-2 flex justify-center items-center gap-2 border border-gray-200 shadow-sm hover:bg-gray-50 transition">
             <span className="font-bold text-[18px]" style={{color: '#EA4335'}}>G</span> Continue with Google
          </button>
          <button className="w-full py-2 flex justify-center items-center gap-2 border border-blue-600 bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-sm transition font-semibold" style={{borderRadius: 'var(--radius-md)'}}>
             <Facebook size={18} fill="currentColor" /> Continue with Facebook
          </button>
          <button className="w-full py-2 flex justify-center items-center gap-2 border border-gray-800 bg-gray-50 text-gray-800 hover:bg-gray-200 shadow-sm transition font-semibold" style={{borderRadius: 'var(--radius-md)'}}>
             <Github size={18} /> Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
