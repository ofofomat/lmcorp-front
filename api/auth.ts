// authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust the URL as needed

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        if ((error as any).isAxiosError && error.response) {
            throw new Error(error.response.data.message || 'Login failed');
        } else {
            throw new Error('Login failed');
        }
    }
};

export const register = async (email: string, confirmEmail: string, password: string, confirmPassword: string) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { email, confirmEmail, password, confirmPassword });
        return response.data;
    } catch (error) {
        if ((error as any).isAxiosError && error.response) {
            throw new Error(error.response.data.message || 'Registration failed');
        } else {
            throw new Error('Registration failed');
        }
    }
};