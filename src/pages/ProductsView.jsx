import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Edit, Trash2, PackageSearch, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './UsersView.css'; // Reusing generic table styles
import './ProductsView.css';

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, store:stores(name), category:categories(name)')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getStatusBadgeClass = (stock) => {
    if (stock > 10) return 'badge-success';
    if (stock > 0 && stock <= 10) return 'badge-warning';
    return 'badge-danger';
  };

  const getStatusText = (stock) => {
    if (stock > 10) return 'Published';
    if (stock > 0 && stock <= 10) return 'Low Stock';
    return 'Out of Stock';
  };

  const formatedPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title">Product Management</h1>
          <p className="view-subtitle">Review, monitor, and moderate all platform products.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">Export Catalog</button>
        </div>
      </div>

      <div className="data-panel glass">
        <div className="panel-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products by name or SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="btn-icon-text">
              <Filter size={18} /> Category
            </button>
            <button className="btn-icon-text">
              <Filter size={18} /> Status
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product Info</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-secondary">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-secondary">No products found.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-cell">
                        <div className="product-image-placeholder">
                          <ImageIcon size={20} className="text-secondary opacity-50" />
                        </div>
                        <div className="product-details">
                          <span className="product-name" title={product.title}>{product.title}</span>
                          <div className="text-xs text-secondary mt-1">
                            <span className="font-mono">{product.id.split('-')[0]}...</span>
                            <span className="mx-2">•</span>
                            <span>Seller: {product.store?.name || 'Unknown'}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="role-tag">{product.category?.name || 'Uncategorized'}</span>
                    </td>
                    <td className="font-semibold text-primary">{formatedPrice(product.price)}</td>
                    <td>
                      <span className={product.stock_quantity === 0 ? 'text-danger font-semibold' : ''}>
                        {product.stock_quantity} units
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(product.stock_quantity)}`}>
                        {getStatusText(product.stock_quantity)}
                      </span>
                    </td>
                    <td className="text-right action-cell">
                      <button className="btn-icon" title="Edit"><Edit size={16} /></button>
                      <button className="btn-icon text-danger" title="Delete"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="pagination">
          <span className="pagination-info">Showing 1 to {products.length} of {products.length} entries</span>
          <div className="pagination-controls">
            <button className="btn-page" disabled>Previous</button>
            <button className="btn-page active">1</button>
            <button className="btn-page">2</button>
            <button className="btn-page">...</button>
            <button className="btn-page">1,699</button>
            <button className="btn-page">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
