import React, { useEffect, useState } from 'react';
import categoryService from '../services/categoryService';
import productService from '../services/productService';
import CategoryCard from './CategoryCard';
import EditCategoryForm from './EditCategoryForm';
import CreateCategoryForm from './CreateCategoryForm';
import CreateProductForm from './CreateProductForm';
import './ProductList.css';

const CategoryList = ({ onCreateProduct }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [creatingProduct, setCreatingProduct] = useState(false);

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

  const handleCreateCategory = () => {
    setCreatingCategory(true);
  };

  const handleCreateProduct = () => {
    setCreatingProduct(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

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

  const handleSaveNewProduct = (newProduct) => {
    productService.create_product(newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setCreatingProduct(false);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  const handleCancelCreate = () => {
    setCreatingProduct(false);
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setCreatingCategory(false);
    setCreatingProduct(false);
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className="category-list-container">
      <div className="category-actions">
        <button onClick={handleCreateCategory}>New Category</button>
        <button onClick={handleCreateProduct}>New Product</button>
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
        <div className="category-modal">
          <EditCategoryForm 
            category={editingCategory} 
            onSave={handleSave} 
            onCancel={handleCancel} 
            onDelete={handleDelete}
          />
        </div>
      )}
      {creatingCategory && (
        <div className="category-modal">
          <CreateCategoryForm 
            onSave={handleCreateCategorySave} 
            onCancel={handleCancel} 
          />
        </div>
      )}
      {creatingProduct && (
        <div className="category-modal">
          <CreateProductForm 
            onSave={handleSaveNewProduct} 
            onCancel={handleCancelCreate} 
          />
        </div>
      )}
    </div>
  );
};

export default CategoryList;