import axios from 'axios';

const CATEGORIES_URL = 'http://localhost:8000/categories';

/**
 * Service for managing categories.
 * @namespace categoryService
 */
const categoryService = {
  /**
   * Retrieves all categories.
   *
   * @returns {Promise} A promise that resolves to the response containing all categories.
   * @memberof categoryService
   * @function get_all
   */
  get_all() {
    return axios.get(`${CATEGORIES_URL}/`);
  },

  /**
   * Retrieves a category by its UUID.
   *
   * @param {string} id_category - The UUID of the category to retrieve.
   * @returns {Promise} A promise that resolves to the response containing the category.
   * @memberof categoryService
   * @function get_by_uuid
   */
  get_by_uuid(id_category) {
    return axios.get(`${CATEGORIES_URL}/${id_category}/`);
  },

  /**
   * Creates a new category.
   *
   * @param {Object} data - The data of the category to create.
   * @returns {Promise} A promise that resolves to the response containing the created category.
   * @memberof categoryService
   * @function create_category
   */
  create_category(data) {
    return axios.post(`${CATEGORIES_URL}/`, data);
  },

  /**
   * Updates a category by its UUID.
   *
   * @param {string} id_category - The UUID of the category to update.
   * @param {Object} data - The updated data of the category.
   * @returns {Promise} A promise that resolves to the response containing the updated category.
   * @memberof categoryService
   * @function put
   */
  put(id_category, data) {
    return axios.put(`${CATEGORIES_URL}/${id_category}/`, data);
  },

  /**
   * Deletes a category by its UUID.
   *
   * @param {string} id_category - The UUID of the category to delete.
   * @returns {Promise} A promise that resolves to the response indicating the deletion status.
   * @memberof categoryService
   * @function delete
   */
  delete(id_category) {
    return axios.delete(`${CATEGORIES_URL}/${id_category}/`);
  }
};

export default categoryService;