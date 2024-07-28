import axios from 'axios';

const CATEGORIES_URL = 'http://localhost:8000/categories';

const categoryService = {
  get_all() {
    return axios.get(`${CATEGORIES_URL}/`);
  },
  get_by_uuid(id_category) {
    return axios.get(`${CATEGORIES_URL}/${id_category}/`);
  },
  create_category(data) {
    return axios.post(`${CATEGORIES_URL}/`, data);
  },
  put(id_category, data) {
    return axios.put(`${CATEGORIES_URL}/${id_category}/`, data);
  },
  delete(id_category) {
    return axios.delete(`${CATEGORIES_URL}/${id_category}/`);
  }
};

export default categoryService;