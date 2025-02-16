// import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Done = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/blog');
    };

    return (
        <div>
            <button
                onClick={handleSubmit}
                type="button"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                Done
            </button>
        </div>
    );
};
