import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { deleteBlogs } from '../hooks/DeletePost';
import { backend } from '../../config';
import PropTypes from 'prop-types';


export const BlogComponent= ({blogId}) => {
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${backend}/blog/${blogId}`)

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

    const handleDelete = async () => {
        if (!isOwner) {
            alert("You are not authorized to delete this blog");
            return;
        }

        try {
            const result = await deleteBlogs(blogId, navigate);
            if (result === 'Successfully deleted blog') {
                navigate('/blog');
            } else {
                alert("Failed to delete blog");
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert("Failed to delete blog");
        }
    };

    if (!post) {
        return <div></div>;
    }

    return (
        <div>
            {isOwner && (
                <button
                    onClick={handleDelete}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                    Delete
                </button>
            )}
        </div>
    );
};

BlogComponent.propTypes = {
    blogId: PropTypes.func.isRequired,
   
};
