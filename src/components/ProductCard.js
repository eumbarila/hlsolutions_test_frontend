import React from 'react';
import '../styles.css';

/**
 * Renders a product card component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product object to display.
 * @param {Function} props.onEdit - The function to handle the edit action.
 * @param {Function} props.onDelete - The function to handle the delete action.
 * @returns {JSX.Element} The rendered product card component.
 */
const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
      <div className="product-card">
        <div>
          <p className='category-text'>{product.category}</p>
          <h2>{product.name}</h2>
          <p className='description-text'>{product.description}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>Price (unit):</strong> ${product.price}</p>
        </div>
        <div className="product-card-actions">
          <button onClick={() => onEdit(product)}>Edit</button>
          <button onClick={() => onDelete(product.id_product)}>Delete</button>
        </div>
      </div>
    );
  };

export default ProductCard;