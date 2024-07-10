import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const url = 'http://localhost:3000/auth/register';
        // const apiKey = import.meta.env.VITE_FIREBASE_API_KEY ;

        // console.log(apiKey);
        const payload = {

            
            email: email,
            password: password,
            returnSecureToken: true
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("User signed up successfully!", data);

                navigate('/LoginPage');

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
                <h1 className="flex text-3xl font-bold p-3 rounded-xl py-4 my-5 w-[31rem] mx-auto text-white">Sign Up</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <input
                            className="flex w-[31rem] py-4 px-4 rounded-lg border border-gray focus:outline-none shadow text-xl mx-auto
                        bg-[#222630] outline-none text-white transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                            name="email"
                            placeholder="Enter email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete='off'
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            className="flex w-[31rem] py-4 px-4 rounded-lg border border-gray focus:outline-none shadow text-xl mx-auto
                        bg-[#222630] outline-none text-white transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                            name="password"
                            placeholder="Enter password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete='off'
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}

                    <div className="text-center bg-blue-500 text-white rounded-2xl font-bold mt-8">
                        <button
                            className="w-full py-3"
                            type='submit'>
                            Sign Up
                        </button>
                    </div>
                </form>



                <div className="flex py-3 justify-center text-white">
                    <p clas>Have a account?  </p>
                    <button
                        onClick={() => {
                            navigate('/LoginPage')
                        }}
                    >
                        <span
                            className='pl-1 hover:text-blue-500'
                        > click here.</span>
                    </button>
                </div>
                
            </div>
        </div>
    );
}
