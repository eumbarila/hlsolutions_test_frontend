import axios from 'axios';

const PRODUCTS_URL = 'http://localhost:4001/products';

const productService = {
  get_all() {
    return axios.get(`${PRODUCTS_URL}/`);
  },
  get_by_uuid(id_product) {
    return axios.get(`${PRODUCTS_URL}/${id_product}`);
  },
  create_product(data) {
    return axios.post(`${PRODUCTS_URL}/`, data);
  },
  put(id_product, data) {
    return axios.put(`${PRODUCTS_URL}/${id_product}`, data);
  },
  delete(id_product) {
    return axios.delete(`${PRODUCTS_URL}/${id_product}`);
  }
};

export default productService;