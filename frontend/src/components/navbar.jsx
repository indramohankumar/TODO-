import React from "react";
import { Link } from "react-router-dom";
import { useAuthcontext } from "../hooks/useauthcontext";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
    const { user } = useAuthcontext();
    const { logout } = useLogout();

    const handleClick = () => {
        logout();
    };

    return (
        <header className="site-header bg-white shadow-md p-4 border-b border-gray-200">
            <div className="site-header__inner flex justify-between items-center w-full max-w-6xl mx-auto">
                <Link to="/" className="flex items-center gap-1 no-underline">
                    <span className="site-header__logo font-bold text-2xl text-purple-600">Todo App</span>
                    <span className="brand_title text-gray-800 font-bold text-lg">List</span>
                </Link>
                <nav className="flex gap-4 items-center">
                    {user && (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-600 hidden md:block">{user.email}</span>
                            <button 
                                onClick={handleClick}
                                className="bg-white border-2 border-purple-600 text-purple-600 px-4 py-1.5 rounded-md hover:bg-purple-50 transition-colors font-medium text-sm"
                            >
                                Log out
                            </button>
                        </div>
                    )}
                    {!user && (
                        <div className="flex gap-4">
                            <Link to="/login" className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium">Login</Link>
                            <Link to="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors font-medium">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;