"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


const ForgotPassword = () => {

    const [error, setError] = useState(false);
    const [user, setUser] = useState({
        email: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        if (user.email) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user])


    const forgotPassword = async () => {
        try {
            await axios.post('/api/users/forgotpassword', { email: user.email })
        } catch (error: any) {
            setError(true);
            toast.error(error.message.data.error)
            console.log(error.response.data?.error);
        }
    }


    // useEffect(() => {
    //     if (token.length > 0) {
    //         resetPassword();
    //     }
    // }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Forgot Password</h1>
            <br />
            <hr />

            <label htmlFor="email" >Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="email"
                value={user.email}
                placeholder="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <button
                className="p-2 border border-gray-300 rounded-lg bg-gray-500 mb-4 focus:outline-none focus:border-gray-600 text-white disabled:bg-gray-400"
                onClick={forgotPassword}
                disabled={buttonDisabled}
            >
                Send reset email
            </button>
        </div>
    )
}

export default ForgotPassword






