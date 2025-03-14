import axios from 'axios';
import { store } from '../store';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});
console.log("API URL desde Render:", import.meta.env.VITE_API_URL);
api.interceptors.request.use((config) => {
  let token = store.getState().auth.token;

  if (!token) {
    token = localStorage.getItem('_token');
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export const authAPI = {
  register: async (email: string, name:string, password: string, rol_id: number) => {
    const response = await api.post('/auth/register', { email, name, password,  rol_id });
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  checkEmail: async (email: string) => {
    const response = await api.post('/auth/check-email', { email });
    return response.data.exists; // Devuelve true si el email ya está registrado
  },
};

export const productsAPI = {
  getAllProducts: async () => {
    const response = await api.get('/product/ver');
    return response.data;
  },
  register: async (productData:any) => {
    const response = await api.post("/product/register", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  getUserProducts: async (user_id:number) => {
    const response = await api.post('/product/user', {user_id});
    return response.data;
  },
};

export default api;