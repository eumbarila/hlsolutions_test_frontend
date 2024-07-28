import React from 'react';
import './ProductList.css';

const CategoryCard = ({ category, onEdit }) => {
    return (
      <div className="category-card" onClick={() => onEdit(category)}>
        <h2>{category.name}</h2>
      </div>
    );
  };

export default CategoryCard;