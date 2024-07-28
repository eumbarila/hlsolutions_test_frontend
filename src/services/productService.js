import axios from 'axios';

const PRODUCTS_URL = 'http://localhost:4001/products';

/**
 * Service for managing products.
 * @namespace productService
 */
const productService = {
  /**
   * Retrieves all products.
   * @memberof productService
   * @returns {Promise} A promise that resolves to the response containing all products.
   */
  get_all() {
    return axios.get(`${PRODUCTS_URL}/`);
  },
  
  /**
   * Retrieves a product by its UUID.
   * @memberof productService
   * @param {string} id_product - The UUID of the product to retrieve.
   * @returns {Promise} A promise that resolves to the response containing the product.
   */
  get_by_uuid(id_product) {
    return axios.get(`${PRODUCTS_URL}/${id_product}`);
  },
  
  /**
   * Creates a new product.
   * @memberof productService
   * @param {object} data - The data of the product to create.
   * @returns {Promise} A promise that resolves to the response containing the created product.
   */
  create_product(data) {
    return axios.post(`${PRODUCTS_URL}/`, data);
  },
  
  /**
   * Updates a product by its ID.
   * @memberof productService
   * @param {string} id_product - The ID of the product to update.
   * @param {object} data - The updated data of the product.
   * @returns {Promise} A promise that resolves to the response containing the updated product.
   */
  put(id_product, data) {
    return axios.put(`${PRODUCTS_URL}/${id_product}`, data);
  },
  
  /**
   * Deletes a product by its ID.
   * @memberof productService
   * @param {string} id_product - The ID of the product to delete.
   * @returns {Promise} A promise that resolves to the response indicating the success of the deletion.
   */
  delete(id_product) {
    return axios.delete(`${PRODUCTS_URL}/${id_product}`);
  }
};

export default productService;