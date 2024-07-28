import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import ProductCard from './ProductCard';
import '../styles.css';
import EditProductForm from './EditProductForm';
import CreateProductForm from './CreateProductForm';

/**
 * Renders a list of products with options to edit, delete, and create new products.
 * @component
 */
const ProductList = () => {
  /**
   * State variable to store the list of products.
   * @type {Array}
   */
  const [products, setProducts] = useState([]);

  /**
   * State variable to indicate if the products are being loaded.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(true);

  /**
   * State variable to store the product being edited.
   * @type {Object|null}
   */
  const [editingProduct, setEditingProduct] = useState(null);

  /**
   * State variable to indicate if a new product is being created.
   * @type {boolean}
   */
  const [creatingProduct, setCreatingProduct] = useState(false);

  /**
   * Fetches the list of products from the server when the component mounts.
   */
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

  /**
   * Sets the editingProduct state variable to the selected product.
   * @param {Object} product - The product to be edited.
   */
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  /**
   * Updates the product with the given id_product with the updatedProduct data.
   * @param {number} id_product - The id of the product to be updated.
   * @param {Object} updatedProduct - The updated product data.
   */
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

  /**
   * Cancels the editing of the product.
   */
  const handleEditCancel = () => {
    setEditingProduct(null);
  };

  /**
   * Deletes the product with the given id_product.
   * @param {number} id_product - The id of the product to be deleted.
   */
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

  /**
   * Sets the creatingProduct state variable to true to show the create product form.
   */
  const handleCreateProduct = () => {
    setCreatingProduct(true);
  };

  /**
   * Saves the new product to the server and updates the products list.
   * @param {Object} newProduct - The new product data.
   */
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

  /**
   * Cancels the creation of a new product.
   */
  const handleCancelCreate = () => {
    setCreatingProduct(false);
  };

  /**
   * Renders the loading message if the products are still being loaded,
   * otherwise renders the list of products and the create product form.
   * @returns {JSX.Element} The rendered component.
   */
  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="product-container">
      <div className="subdivision-header">
        <h1 className='products-title'>Available products</h1>
        <button onClick={handleCreateProduct} className='product-add-button'>New product</button>
      </div>

      <div className="product-list">
        {products.map(product => (
          <ProductCard 
            key={product.id_product} 
            product={product} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </div>

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
  );
};

export default ProductList;