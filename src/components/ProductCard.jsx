import React from "react";
import '../dashboard/Dashboard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image || "https://placehold.co/400?text=Product"} alt={product.title} className="product-image" />

      <h3 className="font-bold text-lg mt-3">{product.title}</h3>
      <p className="text-secondary font-semibold">${product.price}</p>

      <span className={`inline-block mt-2 mb-3 px-2 py-1 text-xs font-bold rounded-full ${product.type === 'digital' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'}`}>
        {product.type === "digital" ? "💻 Digital" : "📦 Physical"}
      </span>

      <button className="btn-primary w-full shadow-sm hover:shadow-md transition">Order Now</button>
    </div>
  );
};

export default ProductCard;
