import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/v1'
});

api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('session');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default api; 