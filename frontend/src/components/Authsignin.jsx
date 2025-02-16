import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { SigninType } from "@ankit1478/common-mediumproject"
import axios from "axios"
// import { BACKEND_URL } from "../config";
import { backend } from "../../config";

import PropTypes from 'prop-types';

export const SigninAuth = ({ type }) => {
    const [error, setEror] = useState(null);
    const [postInput, setPostInput] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    async function sendRequest() {
        try {
            const res = await axios.post(`${backend}/user/signin`, postInput);

            const jwt = res.data.token;
            const id = res.data.user.id;
            const name = res.data.user.name;


            if (jwt) {
                localStorage.setItem("token", jwt);
                localStorage.setItem("user", id);
                localStorage.setItem("name", name)
                navigate("/blog");
            } else {
                console.error("No token received in response");
            }
        } catch (err) {
            setEror(err)
        }
    }
    // async function demo() {
    //     const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlN2MyMjY4LWQzMDItNGYzMS04NTgyLTZmMjQwM2JmYWIzYSJ9.ZKeeyrsCc3O-edIfjDA136W1WcE88L65RI2N1PIIa5g";
    //     const id = "8e7c2268-d302-4f31-8582-6f2403bfab3a";
    //     const name = "Sam";
    //     if (jwt) {
    //         localStorage.setItem("token", jwt);
    //         localStorage.setItem("user", id);
    //         localStorage.setItem("name", name)
    //         navigate("/blog");
    //     }
    //     else
    //         setEror("error occurs")
    // }

    return (
        <div>
            <div className="flex justify-center">
                {error && (
                    <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-emerald-800 dark:border-red-800" role="alert">
                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div className="ms-3 text-sm font-medium">
                            please Enter Valid details
                        </div>
                    </div>
                )}

            </div>

            <div className="h-screen flex justify-center flex-col">

                <div className="flex justify-center">
                    <div>
                        <div className="px-10">
                            <div className="text-3xl font-bold text-emerald-900">
                                Create an account
                            </div>
                            <div className="text-slate-400">
                                {type === "signin" ? "Don't have an account" : "Already have an account?"}
                                <Link className="underline" to={type === "signin" ? "/signup" : "/signin"}>
                                    {type === "signup" ? " Sign in" : " Sign up"}
                                </Link>
                            </div>
                        </div>



                        <div className="pt-2">
                            <LabelInput
                                label="Email"
                                placeholder="ankit@gmail.com"
                                onChange={(e) => {
                                    setPostInput((currentInput) => ({
                                        ...currentInput,
                                        email: e.target.value
                                    }));
                                }}
                            />
                        </div>

                        <div className="pt-2">
                            <LabelInput
                                label="Password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => {
                                    setPostInput((currentInput) => ({
                                        ...currentInput,
                                        password: e.target.value
                                    }));
                                }}
                            />
                        </div>

                        <div className="pt-5">
                            <button
                                type="button"
                                className="w-full text-white bg-emerald-900 hover:bg-emerald-900/90 
                            focus:ring-4 focus:outline-none focus:ring-bg-emerald-900/50 font-medium rounded-lg 
                            text-sm px-5 py-2.5 text-center inline-flex items-center justify-center 
                            dark:focus:ring-bg-emerald-900/50 dark:hover:bg-emerald-900/30 me-2 mb-2"
                                onClick={sendRequest}
                            >
                                {type === "signup" ? "Sign up" : "Sign in"}
                            </button>
                        </div>
                        {/* <button
                            type="button"
                            className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 
                            focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg 
                            text-sm px-5 py-2.5 text-center inline-flex items-center justify-center 
                            dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
                            onClick={demo}> Login without credential
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );

}



export const LabelInput = ({ label, placeholder, onChange, type="text" }) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-emerald-900 dark:text-black">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-emerald-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    )
}

LabelInput.propTypes = {
    label: PropTypes.func.isRequired,
    placeholder: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.func.isRequired,
};

SigninAuth.propTypes = {
    type: PropTypes.func.isRequired,
}
