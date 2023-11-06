import axios from 'axios';
import { User } from '@/entities/User';

// const BASE_URL = 'http://localhost:8000/api';
const BASE_URL = 'http://192.168.0.16:8000/api';
// consts BASE_URL = 'https://kickspeak-api.onrender.com/api';

export const $api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});


$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<User>(`${BASE_URL}/refresh`, {
                withCredentials: true
            })
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest)
        } catch (error) {
            console.log("Пользователь не авторизован")
        }
    }
    throw error;
})
