import React, { useState } from 'react';
import { Filter, Star, ShoppingCart, ChevronDown } from 'lucide-react';
import './UserPages.css';

// Mock data
const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Premium Product ${i + 1}`,
  price: `$${(Math.random() * 200 + 20).toFixed(2)}`,
  category: ['Electronics', 'Home', 'Fashion', 'Beauty'][Math.floor(Math.random() * 4)],
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 500 + 10)
}));

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="store-container fade-in" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      
      {/* Sidebar Filters */}
      <aside className="shop-sidebar glass" style={{ width: '280px', padding: '1.5rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>
        <div className="flex items-center gap-2 mb-6 text-primary font-bold text-lg">
          <Filter size={20} /> Filters
        </div>

        <div className="filter-group mb-6">
          <h4 className="font-semibold mb-3">Categories</h4>
          <ul className="flex flex-col gap-2">
            {['All', 'Electronics', 'Home', 'Fashion', 'Beauty', 'Sports'].map(cat => (
              <li 
                key={cat} 
                className={`cursor-pointer transition hover:text-primary ${activeCategory === cat ? 'text-primary font-semibold' : 'text-secondary'}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="filter-group mb-6">
          <h4 className="font-semibold mb-3">Price Range</h4>
          <div className="flex items-center gap-2">
            <input type="number" placeholder="Min" className="search-input" style={{ width: '80px', padding: '0.5rem' }} />
            <span>-</span>
            <input type="number" placeholder="Max" className="search-input" style={{ width: '80px', padding: '0.5rem' }} />
          </div>
        </div>

        <button className="btn-primary w-full mt-2">Apply Filters</button>
      </aside>

      {/* Product Grid */}
      <div className="shop-content flex-1">
        <div className="flex justify-between items-center mb-6 glass" style={{ padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <p className="text-secondary">Showing 1-12 of 145 products</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by:</span>
            <button className="flex items-center gap-1 font-semibold text-primary">
              Recommended <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div className="products-grid">
          {mockProducts.map(product => (
            <div key={product.id} className="product-card glass fade-in">
              <div className="product-image-container">
                 <div className="product-image-mock"></div>
                 <button className="add-to-cart-quick btn-icon bg-white text-primary shadow-md">
                   <ShoppingCart size={18} />
                 </button>
              </div>
              <div className="product-info">
                <span className="text-xs text-secondary font-medium uppercase tracking-wider">{product.category}</span>
                <h3 className="product-title">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={14} className="text-warning fill-warning" />
                  <span className="text-sm font-semibold">{product.rating}</span>
                  <span className="text-xs text-secondary">({product.reviews})</span>
                </div>
                <div className="product-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12 mb-8">
          <button className="btn-secondary px-6 py-2">Load More Products</button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
