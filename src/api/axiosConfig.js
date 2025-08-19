
import axios from 'axios';
import { getData  } from './StorageService';

const api = axios.create({
  baseURL: 'http://44.210.90.61:8080/v1',
});

api.interceptors.request.use(
  async (config) => {
    // Recupera o token do storage (ex: 'userToken')
    const token = await getData('authToken');

    // Se o token existir, adiciona no header 'Authorization'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros globais (opcional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido/expirou? Redirecione para login
      console.log('Token inválido! Redirecionando...');
      // Exemplo: NavigationService.navigate('Login');
    }
    return Promise.reject(error);
  }
);
export default api;