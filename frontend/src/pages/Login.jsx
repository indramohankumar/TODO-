import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <form className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-5 mt-12" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Log In</h3>
            
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Email:</label>
                <input 
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                />
            </div>
            
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Password:</label>
                <input 
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                />
            </div>

            <button 
                disabled={isLoading}
                className="mt-4 bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-md active:scale-95 disabled:opacity-50"
            >
                Log In
            </button>
            {error && <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm text-center mt-2">{error}</div>}
        </form>
    );
}

export default Login;
