import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getProducts = () => axios.get(`${BASE_URL}/products`);
export const addToCart = (productId, qty) => axios.post(`${BASE_URL}/cart`, { productId, qty });
export const getCart = () => axios.get(`${BASE_URL}/cart`);
export const removeFromCart = (id) => axios.delete(`${BASE_URL}/cart/${id}`);
export const checkout = () => axios.post(`${BASE_URL}/checkout`);