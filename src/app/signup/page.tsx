"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSignup = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log('Signup successful', response.data);
            toast.success(response.data.message);
            router.push('/login');
        } catch (err: any) {
            console.error('Signup failed', err.response.data.message);
            toast.error(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="px-16 py-1 m-2 text-xl bg-gray-600 border-solid border-2">
                { isLoading ? "Loading..." : "Sign Up" }
            </h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text"
                id="username"
                value={user.username}
                placeholder="username"
                disabled={isLoading}
                onChange={(event) => setUser({ ...user, username: event.target.value })}
            />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text"
                id="email"
                value={user.email}
                placeholder="email"
                disabled={isLoading}
                onChange={(event) => setUser({ ...user, email: event.target.value })}
            />
            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password"
                id="password"
                value={user.password}
                placeholder="password"
                disabled={isLoading}
                onChange={(event) => setUser({ ...user, password: event.target.value })}
            />

            <button
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 enabled:opacity-100 disabled:opacity-50"
                disabled={isDisabled && !isLoading}
                onClick={onSignup}
            >
                Signup
            </button>
            <hr />
            <p>Already register? Click <Link href="/login" className="text-white hover:text-sky-500">here</Link></p>

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    success: {
                        duration: 3000
                    },
                    error: {
                        duration: 3000
                    }
                }}
            />
        </div>
    );
}
