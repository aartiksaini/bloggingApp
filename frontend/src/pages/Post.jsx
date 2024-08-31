import axios from "axios";
import {  useState } from "react";

import PropTypes from 'prop-types';
import { backend } from "../../config";
import { Appbar } from "../components/Appbar";
import { useNavigate } from "react-router-dom";

export const Post = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        // Retrieve the token from localStorage and format it
        const token = localStorage.getItem("token");
        const authHeader = token ? token : '';
        // console.log(authHeader)

        try {
            const res = await axios.post(`${backend}/blog`, {
                title,
                content
            }, {
                headers: {
                    Authorization: authHeader
                }
            });

            localStorage.setItem("authorId", res.data.user_id);
            localStorage.setItem("postId", res.data.id);
            
            
            navigate(`/blog/${res.data.id}`)
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            <Appbar />
            <div className="flex flex-col gap-8 p-4 md:p-10">
                <div className="my-2 w-full border border-green-800">
                    <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 text-gray-900 text-lg hover:border-blue-500 focus:border-blue-800 active:border-blue-800 outline-none block w-full p-4"
                        placeholder="Title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <TextEditor onChange={(e) => setContent(e.target.value)} />
                <div className="my-1 ">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="mt-0 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-white dark:focus:ring-green-900 hover:bg-green-800 border border-white "
                    >
                        Publish post
                    </button>
                </div>
            </div>


        </div>
    );
};

function TextEditor({ onChange }) {
    return (
        <div className="w-full mb-4 border border-green-800">
            <div className="flex items-center justify-between border">
                <div className="my-2 bg-white rounded-b-lg w-full">
                    <label className="sr-only">Publish post</label>
                    <textarea
                        id="editor"
                        rows={8}
                        className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                        placeholder="Write an article..."
                        required
                        onChange={onChange} 
                    />
                </div>
            </div>
        </div>
    );
}

TextEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default TextEditor;