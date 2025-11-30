import axios from 'axios';
import { env } from '~/env';
import { tokenService } from './auth/tokenService';

/**
 * Axios instance configured with the back-end API base URL
 */
export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor - adds auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional - for error handling)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here if needed
    return Promise.reject(error);
  }
);

export default apiClient;
