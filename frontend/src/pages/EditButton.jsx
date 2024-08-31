import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { backend } from '../../config';
import { PropTypes } from 'prop-types';

export const Update= ({ blogId }) => {
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${backend}/blog/${blogId}`);
                const authorName = response.data.users.author.name;
                setPost(response.data);

                const currentUserId = localStorage.getItem('name');
                setIsOwner(authorName === currentUserId);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [blogId]);

    const handleEdit = () => {
        navigate(`/update/${blogId}`);
    };

    if (!post) {
        return <div></div>;
    }

    return (
        <div>
            {isOwner && (
                <button
                    onClick={handleEdit}
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    Edit
                </button>
            )}
        </div>
    );
};


Update.propTypes = {
    blogId: PropTypes.func.isRequired,
   
};
