import { useState } from 'react';
import { useAuthcontext } from './useauthcontext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthcontext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const apiurl = import.meta.env.VITE_API_URL || "http://localhost:3000";
            const response = await fetch(`${apiurl}/api/user/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password })
            });
            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error || 'Failed to login');
            }
            if (response.ok) {
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json));

                // update the auth context
                dispatch({type: 'LOGIN', payload: json});

                setIsLoading(false);
            }
        } catch (err) {
            setIsLoading(false);
            setError("Cannot connect to server. Please ensure the backend is running.");
        }
    };

    return { login, isLoading, error };
};
