import axios from 'axios';

const api = axios.create({
  baseURL: 'http://web-helpers.ru:5006/',
});

export default api;