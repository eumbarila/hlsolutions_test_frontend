import React, { useState, useEffect } from 'react';
import categoryService from '../services/categoryService';
import '../styles.css';

/**
 * CreateProductForm component.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.onSave - The function to be called when the form is submitted.
 * @param {Function} props.onCancel - The function to be called when the cancel button is clicked.
 * @returns {JSX.Element} The CreateProductForm component.
 */
const CreateProductForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    quantity: '',
    price: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService.get_all()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  /**
   * Handles the change event of the input fields.
   * 
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Handles the form submission.
   * 
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="product-form">
      <form onSubmit={handleSubmit}>
        <h2>Create Product</h2>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Category
          <br></br>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id_category} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Description
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Quantity
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </label>
        <label>
          Price
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;