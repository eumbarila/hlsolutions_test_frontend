import React from 'react';
import '../styles.css';

/**
 * Renders a category card component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.category - The category object.
 * @param {Function} props.onEdit - The function to handle the edit action.
 * @returns {JSX.Element} The rendered category card.
 */
const CategoryCard = ({ category, onEdit }) => {
    return (
      <div className="category-card" onClick={() => onEdit(category)}>
        <h2>{category.name}</h2>
      </div>
    );
  };

export default CategoryCard;