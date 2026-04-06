import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, FolderTree, ArrowRight, MoreVertical } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './UsersView.css'; // Reusing generic table styles
import './CategoriesView.css';
const CategoriesView = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*, products(id)')
          .order('name');
        
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title flex items-center gap-2">
            <FolderTree size={28} className="text-primary" />
            Category Management
          </h1>
          <p className="view-subtitle">Create and organize the product taxonomy for the marketplace.</p>
        </div>
        <button className="btn-primary flex items-center gap-1">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="category-layout">
        <div className="data-panel glass flex-1">
          <div className="panel-toolbar">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search categories..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Slug</th>
                  <th>Parent Category</th>
                  <th>Products</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-secondary">Loading categories...</td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-secondary">No categories found.</td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id}>
                      <td>
                        <div className="flex items-center gap-2 font-medium text-primary">
                          {cat.name}
                        </div>
                      </td>
                      <td className="font-mono text-xs text-secondary">{cat.slug}</td>
                      <td>-</td>
                      <td><span className="badge-neutral rounded px-2 py-1 text-xs">{cat.products?.length || 0}</span></td>
                      <td>
                        <span className={`status-badge badge-success`}>
                          Active
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
        </div>

        <div className="category-sidebar glass p-5">
           <h3 className="font-semibold mb-4 border-b border-color pb-2">Quick Add Category</h3>
           <div className="form-group mb-4">
             <label>Category Name</label>
             <input type="text" className="form-control" placeholder="e.g. Laptops" />
           </div>
           <div className="form-group mb-4">
             <label>Parent Category</label>
             <select className="form-control">
               <option>None (Top Level)</option>
               <option>Electronics</option>
               <option>Clothing</option>
               <option>Home & Kitchen</option>
             </select>
           </div>
           <div className="form-group mb-5">
             <label>Description (Optional)</label>
             <textarea className="form-control" rows="3" placeholder="Category description..."></textarea>
           </div>
           <button className="btn-primary w-full justify-center">Save Category</button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesView;
