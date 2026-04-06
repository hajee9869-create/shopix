import React from 'react';
import { ArrowRight, Star, ShoppingCart, Sparkles } from 'lucide-react';
import './UserPages.css';

const featuredProducts = [
  { id: 1, name: 'Wireless Noise-Canceling Headphones', price: '$299.00', category: 'Electronics', rating: 4.8, reviews: 124 },
  { id: 2, name: 'Minimalist Ceramic Vase', price: '$45.00', category: 'Home', rating: 4.9, reviews: 32 },
  { id: 3, name: 'Smart Fitness Tracker', price: '$129.00', category: 'Gadgets', rating: 4.5, reviews: 89 },
  { id: 4, name: 'Premium Leather Wallet', price: '$85.00', category: 'Accessories', rating: 4.7, reviews: 210 },
];

const Home = () => {
  return (
    <div className="store-container fade-in">
      {/* Hero Section */}
      <section className="hero-section glass">
        <div className="hero-content">
          <span className="badge-primary tag-pill">New Arrival</span>
          <h1 className="hero-title">Discover Premium Products Every Day</h1>
          <p className="hero-subtitle">Shop from thousands of independent sellers offering unique goods, latest electronics, and essential everyday items.</p>
          <div className="flex gap-4 mt-6">
            <button className="btn-primary flex items-center gap-2 px-6 py-3 text-lg">
              Shop Now <ArrowRight size={20} />
            </button>
            <button className="btn-secondary px-6 py-3 text-lg">View Categories</button>
          </div>
        </div>
        <div className="hero-image-placeholder">
          {/* Abstract geometric shapes to represent a premium hero image */}
          <div className="abstract-shape shape-1"></div>
          <div className="abstract-shape shape-2"></div>
          <div className="abstract-shape shape-3"></div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories-section mt-12">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports'].map(cat => (
             <div key={cat} className="category-card glass fade-in">
                <div className="category-image"></div>
                <h3 className="category-name">{cat}</h3>
             </div>
          ))}
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="recommendations-section mt-12">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="text-primary" size={24} />
          <h2 className="section-title m-0">Recommended For You</h2>
          <span className="badge-primary text-[10px] py-1 px-2 ml-2">Personalized</span>
        </div>
        <div className="products-grid">
          {featuredProducts.slice(0, 3).map(product => (
            <div key={`rec-${product.id}`} className="product-card glass fade-in border-primary/20 bg-primary/5">
              <div className="product-image-container">
                 <div className="product-image-mock bg-primary/10"></div>
                 <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-primary flex items-center gap-1 shadow-sm">
                   <Sparkles size={10} /> 98% Match
                 </div>
              </div>
              <div className="product-info">
                <span className="text-xs text-primary font-bold uppercase tracking-wider">{product.category}</span>
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price text-primary">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="trending-section mt-12 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title m-0">Trending This Week</h2>
          <button className="btn-text flex items-center gap-1 text-primary font-semibold">
            View All <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="products-grid">
          {featuredProducts.map(product => (
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
      </section>
    </div>
  );
};

export default Home;
