import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=';
        const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
        const payload = {
            requestType: "PASSWORD_RESET",
            email: email,
        };

        try {
            const response = await fetch(url + apiKey, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Password reset email sent. Please check your inbox.');
            } else {
                setError(data.error.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className='text-center flex px-2'>
            <div className="m-auto">
                <h1 className="flex text-3xl font-bold p-3 rounded-xl py-4 my-5 w-[31rem] mx-auto text-white">Forgot Password</h1>
                {message && <p className="text-green-500 text-center">{message}</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handlePasswordReset} className='w-[31rem]'>
                    <div className="mb-5">
                        <input
                            className="flex w-[31rem] py-4 px-4 rounded-lg border border-gray focus:outline-none shadow text-xl mx-auto
                                bg-[#222630] outline-none text-white transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                            name="email"
                            placeholder="Enter email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete='off'
                        />
                    </div>
                    <div className="text-white rounded-3xl font-bold mt-5 text-center">
                        <button className='py-3 px-10 bg-blue-500 rounded-lg text-xl' type="submit">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
