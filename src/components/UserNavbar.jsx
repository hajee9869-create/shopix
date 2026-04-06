import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, PackageSearch, Sparkles } from 'lucide-react';
import './UserNavbar.css';

const UserNavbar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);

  const mockProducts = [
    'Wireless Noise-Canceling Headphones',
    'Minimalist Ceramic Vase',
    'Smart Fitness Tracker',
    'Premium Leather Wallet',
    'Mechanical Gaming Keyboard',
    '4K Ultra HD Projector'
  ];

  React.useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = mockProducts.filter(p => 
        p.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);
  return (
    <header className="user-navbar glass">
      <div className="navbar-container">
        <div className="navbar-brand">
          <PackageSearch size={28} className="text-primary" />
          <span className="brand-name">SHOPIX</span>
        </div>

        <div className="search-bar-wrapper relative">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for products, brands and more..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn"><Search size={18} /></button>
          
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg z-50 overflow-hidden border-t border-gray-100">
              {suggestions.map((s, i) => (
                <div key={i} className="p-3 hover:bg-gray-50 flex items-center gap-2 cursor-pointer transition" onClick={() => { setSearchQuery(s); setSuggestions([]); }}>
                  <Sparkles size={14} className="text-primary opacity-50" />
                  <span className="text-sm">{s}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <nav className="navbar-links">
          <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/shop" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Shop</NavLink>
          <NavLink to="/categories" className="nav-link">Categories</NavLink>
        </nav>

        <div className="navbar-actions">
          <NavLink to="/admin" className="nav-link text-sm font-medium text-secondary mr-4">Seller Portal</NavLink>
          <NavLink to="/auth" className="nav-link font-semibold text-primary mr-2">Sign In</NavLink>
          <NavLink to="/cart" className="action-btn cart-btn">
            <ShoppingCart size={22} />
            <span className="cart-badge">3</span>
          </NavLink>
          <NavLink to="/profile" className="action-btn ml-2" title="My Account">
            <User size={22} />
          </NavLink>
          <button className="mobile-menu-btn"><Menu size={24} /></button>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
