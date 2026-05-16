import { useState } from 'react';
import { useAuthcontext } from './useauthcontext';
import axios from 'axios';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthcontext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
            const res = await axios.post(`${backendUrl}/api/user/login`, { email, password });
            
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(res.data));

            // update auth context
            dispatch({ type: 'LOGIN', payload: res.data });

        } catch (err) {
            setError(err.response?.data?.error || "An error occurred during login.");
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
