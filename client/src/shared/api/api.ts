import axios from 'axios';
import { User } from '@/entities/User';

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;

export const $api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<User>(`${BASE_URL}/refresh`, {
                    withCredentials: true,
                });
                localStorage.setItem('token', response.data.accessToken);
                return $api.request(originalRequest);
            } catch (error) {
                console.log('Пользователь не авторизован');
            }
        }
        throw error;
    },
);
