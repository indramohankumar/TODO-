import { useState } from 'react';
import { useAuthcontext } from './useauthcontext';
import axios from 'axios';

export const useSignup = () => {
    const { dispatch } = useAuthcontext();
    const [signupError, setSignupError] = useState(null);
    const [isSigningUp, setIsSigningUp] = useState(false);

    const signup = async (email, password) => {
        setIsSigningUp(true);
        setSignupError(null);

        try {
            const url = import.meta.env.VITE_API_URL || "http://localhost:3000";
            
            const { data } = await axios.post(`${url}/api/user/signup`, {
                email,
                password
            });

            // save to localStorage
            localStorage.setItem('user', JSON.stringify(data));
            
            // update state
            dispatch({ type: 'LOGIN', payload: data });
            
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setSignupError(err.response.data.error);
            } else {
                setSignupError("Failed to connect to the server.");
            }
        } finally {
            setIsSigningUp(false);
        }
    };

    // Note: returning isLoading and error aliases so components using this hook don't break
    return { signup, isLoading: isSigningUp, error: signupError };
};
