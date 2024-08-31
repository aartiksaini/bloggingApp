import axios from 'axios';

import { backend } from '../../config';

export async function deleteBlogs(blogId, navigate) {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/signin");
        return 'User not signed in';
    }
    try {
        const response = await axios.delete(`${backend}/blog/delete/${blogId}`, {
            headers: {
                Authorization: token,
            },
        });
        console.log(response.data.message);
        return response.data.message;
    } catch (error) {
        console.error('Error deleting the blog:', error);
        return 'Failed to delete the blog';
    }
}