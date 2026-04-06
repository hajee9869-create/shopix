import React, { useState } from 'react';
import { Cpu, Settings2, Save, ArrowDownUp, RefreshCw } from 'lucide-react';
import './AlgorithmView.css';

const AlgorithmView = () => {
  const [activeTab, setActiveTab] = useState('marketplace');

  const [weights, setWeights] = useState({
    rating: 40,
    sales: 30,
    recency: 15,
    price: 15
  });

  const handleSliderChange = (e, key) => {
    setWeights({...weights, [key]: parseInt(e.target.value)});
  };

  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title flex items-center gap-2">
            <Cpu size={28} className="text-primary" />
            Algorithm Configuration
          </h1>
          <p className="view-subtitle">Fine-tune the ranking and recommendation engines running the marketplace.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Save size={16} /> Save Configuration
        </button>
      </div>

      <div className="algo-layout">
        <div className="algo-tabs glass flex flex-col gap-2 p-4">
          <button 
            className={`algo-tab ${activeTab === 'marketplace' ? 'active' : ''}`}
            onClick={() => setActiveTab('marketplace')}
          >
            <ArrowDownUp size={18} /> Default Sorting Engine
          </button>
          <button 
            className={`algo-tab ${activeTab === 'recommendation' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendation')}
          >
            <RefreshCw size={18} /> Recommendation Engine
          </button>
          <button 
            className={`algo-tab ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            <Settings2 size={18} /> Search Relevancy
          </button>
        </div>

        <div className="algo-content glass p-6">
          {activeTab === 'marketplace' && (
            <div className="fade-in">
              <h2 className="panel-title mb-2">Marketplace Ranking Weights</h2>
              <p className="text-secondary text-sm mb-6">Adjust the specific weights used by the algorithm to calculate a product's visibility score on the homepage.</p>
              
              <div className="sliders-container">
                <div className="slider-group">
                  <div className="flex justify-between mb-2">
                    <label className="font-semibold text-primary">Seller Rating Weight</label>
                    <span className="font-mono text-primary bg-indigo-50 px-2 py-1 rounded text-sm">{weights.rating}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={weights.rating} onChange={(e) => handleSliderChange(e, 'rating')} className="slider" />
                  <p className="text-xs text-secondary mt-1">Impact of seller's average review score on product rank.</p>
                </div>

                <div className="slider-group mt-6">
                  <div className="flex justify-between mb-2">
                    <label className="font-semibold text-primary">Sales Velocity Weight</label>
                    <span className="font-mono text-primary bg-indigo-50 px-2 py-1 rounded text-sm">{weights.sales}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={weights.sales} onChange={(e) => handleSliderChange(e, 'sales')} className="slider" />
                  <p className="text-xs text-secondary mt-1">Impact of the number of recent unit sales.</p>
                </div>

                <div className="slider-group mt-6">
                  <div className="flex justify-between mb-2">
                    <label className="font-semibold text-primary">Publication Recency Weight</label>
                    <span className="font-mono text-primary bg-indigo-50 px-2 py-1 rounded text-sm">{weights.recency}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={weights.recency} onChange={(e) => handleSliderChange(e, 'recency')} className="slider" />
                  <p className="text-xs text-secondary mt-1">Boost given to newly listed products.</p>
                </div>

                <div className="slider-group mt-6">
                  <div className="flex justify-between mb-2">
                    <label className="font-semibold text-primary">Price Competitiveness</label>
                    <span className="font-mono text-primary bg-indigo-50 px-2 py-1 rounded text-sm">{weights.price}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={weights.price} onChange={(e) => handleSliderChange(e, 'price')} className="slider" />
                  <p className="text-xs text-secondary mt-1">Bonus score for products priced lower than the category average.</p>
                </div>
              </div>

              <div className="total-weight-calc mt-8 p-4 bg-gray-50 rounded-lg flex justify-between items-center border border-color">
                <span className="font-semibold text-gray-700">Total Weight Confidence</span>
                <span className={`text-xl font-bold ${Object.values(weights).reduce((a,b)=>a+b,0) === 100 ? 'text-success' : 'text-danger'}`}>
                  {Object.values(weights).reduce((a,b)=>a+b,0)}%
                </span>
              </div>
              {Object.values(weights).reduce((a,b)=>a+b,0) !== 100 && (
                <p className="text-xs text-danger mt-2">Warning: Absolute aggregate weights should ideally equal 100%.</p>
              )}
            </div>
          )}

          {activeTab !== 'marketplace' && (
            <div className="flex-center min-h-[300px] text-secondary">
              <p>Configuration panel for {activeTab} engine is coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmView;
