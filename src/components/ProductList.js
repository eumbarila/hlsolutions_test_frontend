import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import ProductCard from './ProductCard';
import './ProductList.css';
import EditProductForm from './EditProductForm';
import CreateProductForm from './CreateProductForm';
import CategoryList from './CategoryList';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [creatingProduct, setCreatingProduct] = useState(false);
  
  useEffect(() => {
    productService.get_all()
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleEditSave = (id_product, updatedProduct) => {
    productService.put(id_product, updatedProduct)
      .then(response => {
        setProducts(products.map(product => 
          product.id_product === id_product ? response.data : product
        ));
        setEditingProduct(null);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleEditCancel = () => {
    setEditingProduct(null);
  };

  const handleDelete = (id_product) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      productService.delete(id_product)
        .then(() => {
          setProducts(products.filter(product => product.id_product !== id_product));
          window.alert('Product successfully deleted');
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    }
  };

  const handleCreateProduct = () => {
    setCreatingProduct(true);
  };

  const handleSaveNewProduct = (newProduct) => {
    productService.create_product(newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setCreatingProduct(false);
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  const handleCancelCreate = () => {
    setCreatingProduct(false);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="product-overall">
      <CategoryList/>
      <div className="product-list">
        {products.map(product => (
          <ProductCard 
            key={product.id_product} 
            product={product} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
        {editingProduct && (
          <div className="modal">
            <EditProductForm 
              product={editingProduct} 
              onSave={handleEditSave} 
              onCancel={handleEditCancel} 
            />
          </div>
        )}
        {creatingProduct && (
        <div className="modal">
          <CreateProductForm 
            onSave={handleSaveNewProduct} 
            onCancel={handleCancelCreate} 
          />
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductList;