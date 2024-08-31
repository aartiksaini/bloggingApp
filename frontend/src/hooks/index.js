import axios from "axios";
import { useEffect, useState } from "react";
// import { BACKEND_URL } from "../config";
// import { useNavigate } from "react-router-dom";
import { backend } from "../../config";
export const useBlog = ({ id }) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState({});
   
    useEffect(() => {
        axios.get(`${backend}/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token") || '',
            },
        })
            .then(response => {
                setBlogs(response.data.users);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch blogs:", error);
                setLoading(false);
            });
    }, [id]);

    return {
        loading,
        blogs,
    };
};

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        axios.get(`${backend}/blog/getall`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.users);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch blogs:", error);
                setLoading(false);
            });
    }, []);

    return {
        loading,
        blogs
    };
}

