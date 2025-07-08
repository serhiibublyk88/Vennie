import { env } from '@/shared/config/env';
import axios from 'axios';
import { toast } from 'react-toastify';

export const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 15_000,
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    const message = err?.response?.data?.message ?? err.message;
    toast.error(message);
    return Promise.reject(message);
  }
);
