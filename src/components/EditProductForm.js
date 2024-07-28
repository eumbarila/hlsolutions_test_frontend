import React, { useState, useEffect } from 'react';
import categoryService from '../services/categoryService';
import '../styles.css';

/**
 * EditProductForm component for editing a product.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product object to be edited.
 * @param {Function} props.onSave - The function to be called when the form is submitted.
 * @param {Function} props.onCancel - The function to be called when the form is canceled.
 * @returns {JSX.Element} The rendered EditProductForm component.
 */
const EditProductForm = ({ product, onSave, onCancel }) => {
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

    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
      });
    }
  }, [product]);

  /**
   * Handles the change event of the form inputs.
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
    onSave(product.id_product, formData);
  };

  return (
    <div className="product-form">
      <form onSubmit={handleSubmit}>
        <h2>Edit Product</h2>
        <label>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Category<br></br>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
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
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Quantity
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
        </label>
        <label>
          Price
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
        </label>
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;