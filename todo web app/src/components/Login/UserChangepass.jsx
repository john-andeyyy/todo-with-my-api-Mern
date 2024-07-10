import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function UserChangepass() {


    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const idToken = localStorage.getItem('idToken');

    if (!idToken) {
        setError('User not authenticated.'); // Handle the case where idToken is not found
        return;
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=';


        const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
        
        const payload = {
            idToken: idToken,
            password: password,
            returnSecureToken: true
        };

        try {
            const response = await fetch(url + apiKey, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                // console.log("User signed up successfully!", data);

                const expiresIn = data.expiresIn
                const idToken = data.idToken
                const localId = data.localId

                localStorage.setItem('expiresIn', expiresIn);
                localStorage.setItem('idToken', idToken);
                localStorage.setItem('localId', localId);

                navigate('/TodoDashboard');

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

                <form onSubmit={handleLogin}>

                    <div
                        className="text-white py-6 text-2xl font-semibold "
                    >
                        <h1>Change your password</h1>

                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <div className="mb-5">
                        <input
                            className="flex w-[31rem] py-4 px-4 rounded-lg border border-gray focus:outline-none shadow text-sm mx-auto
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

                    <div className="text-white rounded-3xl font-bold mt-8 text-center">
                        <button className='py-3 px-3 bg-blue-500 rounded-lg w-30 text-xl' type="submit">
                            change pass
                        </button>
                    </div>

                </form>
            </div>

        </div>
    )
}
