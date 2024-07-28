import React, { useState } from 'react';
import './ProductList.css';

const CreateCategoryForm = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name });
  };

return (
    <div className="create-category-form">
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
            <div className="create-category-form-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    </div>
);
};

export default CreateCategoryForm;