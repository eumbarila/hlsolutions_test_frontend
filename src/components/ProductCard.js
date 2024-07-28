import React from 'react';
import './ProductList.css';

const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
      <div className="product-card">
        <h2>{product.name}</h2>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Quantity:</strong> {product.quantity}</p>
        <p><strong>Price (unit):</strong> ${product.price}</p>
        <div className="product-card-actions">
          <button onClick={() => onEdit(product)}>Edit</button>
          <button onClick={() => onDelete(product.id_product)}>Delete</button>
        </div>
      </div>
    );
  };

export default ProductCard;