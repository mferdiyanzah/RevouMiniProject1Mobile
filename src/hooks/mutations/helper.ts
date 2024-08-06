import useAuthStore from '@stores/useAuthStore';
import { BASE_API_URL } from '@utils/config';
import axios from 'axios';

const axiosWithAuth = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosWithAuth.interceptors.request.use(config => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosWithAuth;
