import React, { useState, useEffect } from 'react';
import '../styles.css';

/**
 * EditCategoryForm component for editing a category.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.category - The category object to be edited.
 * @param {Function} props.onSave - The function to be called when the form is submitted.
 * @param {Function} props.onCancel - The function to be called when the cancel button is clicked.
 * @param {Function} props.onDelete - The function to be called when the delete button is clicked.
 * @returns {JSX.Element} The rendered EditCategoryForm component.
 */
const EditCategoryForm = ({ category, onSave, onCancel, onDelete }) => {
  const [name, setName] = useState(category.name);

  useEffect(() => {
    setName(category.name);
  }, [category]);

  /**
   * Handles the form submission.
   *
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(category.id_category, { ...category, name });
  };

  /**
   * Handles the delete button click.
   */
  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this category?');
    if (confirmed) {
      onDelete(category.id_category);
    }
  };

  return (
    <div className="product-form">
      <div className='category-edit-header'>
        <button type="button" onClick={onCancel} className='category-cancel-button'>X</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={handleDelete}>Delete</button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryForm;