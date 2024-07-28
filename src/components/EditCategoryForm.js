import React, { useState, useEffect } from 'react';
import './ProductList.css';

const EditCategoryForm = ({ category, onSave, onCancel, onDelete }) => {
  const [name, setName] = useState(category.name);

  useEffect(() => {
    setName(category.name);
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(category.id_category, { ...category, name });
  };

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this category?');
    if (confirmed) {
      onDelete(category.id_category);
    }
  };

return (
    <div className="edit-category-form">
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </label>
            <div className="category-form-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
                <button type="button" onClick={handleDelete}>Delete</button>
            </div>
        </form>
    </div>
);
};

export default EditCategoryForm;