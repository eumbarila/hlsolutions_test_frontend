import React, { useState } from 'react';
import '../styles.css';

/**
 * Represents a form for creating a category.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onSave - The function to be called when the form is submitted.
 * @param {Function} props.onCancel - The function to be called when the form is canceled.
 * @returns {JSX.Element} The JSX element representing the create category form.
 */
const CreateCategoryForm = ({ onSave, onCancel }) => {
    const [name, setName] = useState('');

    /**
     * Handles the form submission.
     *
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name });
    };

    return (
        <div className="product-form">
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
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCategoryForm;