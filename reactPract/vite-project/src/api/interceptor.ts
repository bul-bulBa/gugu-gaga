import axios from 'axios'
import { authorize} from './api'

export const PORT = 'http://localhost:5000/api'

export const request = axios.create({
    baseURL: PORT,
    withCredentials: true
})

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
};

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          originalRequest._retry = true;
          return request(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await authorize.refresh(); // токен оновиться в cookie
        isRefreshing = false;
        processQueue(); // сповіщаємо інші очікуючі запити
        return request(originalRequest); // повторюємо запит
      } catch (err) {
        isRefreshing = false;
        processQueue(err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);