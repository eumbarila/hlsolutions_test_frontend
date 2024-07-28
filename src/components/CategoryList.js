import React, { useEffect, useState } from 'react';
import categoryService from '../services/categoryService';
import CategoryCard from './CategoryCard';
import EditCategoryForm from './EditCategoryForm';
import CreateCategoryForm from './CreateCategoryForm';
import '../styles.css';

/**
 * Represents a component that displays a list of categories.
 * 
 * @component
 * @returns {JSX.Element} The CategoryList component.
 */
/**
 * Renders a list of categories with options to edit, delete, and create new categories.
 * @returns {JSX.Element} The CategoryList component.
 */
const CategoryList = () => {
  /**
   * State variables for categories, loading status, editing category, and creating category.
   */
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [creatingCategory, setCreatingCategory] = useState(false);

  /**
   * Fetches all categories from the server when the component mounts.
   */
  useEffect(() => {
    categoryService.get_all()
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  /**
   * Sets the creatingCategory state to true, indicating that a new category is being created.
   */
  const handleCreateCategory = () => {
    setCreatingCategory(true);
  };

  /**
   * Sets the editingCategory state to the selected category, indicating that it is being edited.
   * @param {Object} category - The category object to be edited.
   */
  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  /**
   * Deletes a category from the server and updates the categories state.
   * @param {number} id_category - The ID of the category to be deleted.
   */
  const handleDelete = (id_category) => {
    categoryService.delete(id_category)
      .then(() => {
        setCategories(categories.filter(category => category.id_category !== id_category));
        window.alert('Category successfully deleted');
        setEditingCategory(null);
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };

  /**
   * Updates a category on the server and updates the categories state.
   * @param {number} id_category - The ID of the category to be updated.
   * @param {Object} updatedCategory - The updated category object.
   */
  const handleSave = (id_category, updatedCategory) => {
    categoryService.put(id_category, updatedCategory)
      .then(response => {
        setCategories(categories.map(category => 
          category.id_category === id_category ? response.data : category
        ));
        setEditingCategory(null);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating category:', error);
      });
  };

  /**
   * Creates a new category on the server and updates the categories state.
   * @param {Object} newCategory - The new category object to be created.
   */
  const handleCreateCategorySave = (newCategory) => {
    categoryService.create_category(newCategory)
      .then(response => {
        setCategories([...categories, response.data]);
        setCreatingCategory(false);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error creating category:', error);
      });
  };

  /**
   * Cancels the editing or creating of a category by resetting the editingCategory and creatingCategory states.
   */
  const handleCancel = () => {
    setEditingCategory(null);
    setCreatingCategory(false);
  };

  /**
   * Renders a loading message if the categories are still being fetched, otherwise renders the category list.
   * @returns {JSX.Element} The loading message or the category list.
   */
  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className="category-container">
      <div className="subdivision-header">
        <h1 className='categories-title'>Categories</h1>
        <button onClick={handleCreateCategory} className='category-add-button'>Add new</button>
      </div>

      <div className="category-list">
        {categories.map(category => (
          <CategoryCard 
            key={category.id_category} 
            category={category} 
            onEdit={handleEdit} 
          />
        ))}
      </div>

      {editingCategory && (
        <div className="modal">
          <EditCategoryForm 
            category={editingCategory} 
            onSave={handleSave} 
            onCancel={handleCancel} 
            onDelete={handleDelete}
          />
        </div>
      )}

      {creatingCategory && (
        <div className="modal">
          <CreateCategoryForm 
            onSave={handleCreateCategorySave} 
            onCancel={handleCancel} 
          />
        </div>
      )}
    </div>
  );
};

export default CategoryList;