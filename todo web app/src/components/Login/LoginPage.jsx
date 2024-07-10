import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        const url = 'http://localhost:3000/auth/login';
        const payload = {
            email: email,
            password: password
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials: 'include'

            });

            const data = await response.json();

            if (response.ok) {
                // Store token in cookies or localStorage
                // document.cookie = `jwt=${data.token}; max-age=${data.expiresIn}; path=/`;
                localStorage.setItem('idToken', data.token);
                localStorage.setItem('expiryTime', data.expiresIn);

                // Redirect or navigate to your dashboard
                navigate('/TodoDashboard');
            } else {
                setError(data.content);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };


    return (
        <div className='text-center flex px-2'>
            <div className="m-auto">
                <h1 className="flex text-3xl font-bold p-3 rounded-xl py-4 my-5 w-[31rem] mx-auto text-white">Login</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleLogin} className='w-[31rem]'>
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
                    <div className="mb-1">
                        <input
                            className="flex w-[31rem] py-4 px-4 rounded-lg border border-gray focus:outline-none shadow text-xl mx-auto
                                bg-[#222630] outline-none text-white transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                            name="password"
                            placeholder="Enter password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete='off'
                        />
                    </div>

                    <div className="text-center bg-blue-500 text-white rounded-2xl font-bold mt-5">
                        <button
                            className="w-full py-3"
                            type='submit'>
                            Login
                        </button>
                    </div>
                </form>

                <div className="flex justify-between mt-3">
                    <button
                        className="text-blue-400 font-semibold cursor-pointer hover:text-blue-500 hover:underline"
                        onClick={() => navigate('/SignupPage')}
                    >
                        Create an Account
                    </button>

                    <button
                        className="text-white cursor-pointer hover:text-blue-400 hover:underline"
                        onClick={() => navigate('/ForgotPassword')}
                    >
                        Forgot password?
                    </button>
                </div>
            </div>
        </div>
    );  
}
