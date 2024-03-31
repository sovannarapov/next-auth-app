"use client"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const onLogout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Log out successfully');
            router.push('/login');
        } catch (err: any) {
            console.error('Logout failed', err.response.data.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl py-2">Profile Page</h1>
            <hr />
            <h2 className="p-2 m-2 rounded bg-green-500">
                {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <hr />
            <button
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onLogout}
            >
                Logout
            </button>
            <button
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={getUserDetails}
            >
                Get User Details
            </button>

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
    )
}