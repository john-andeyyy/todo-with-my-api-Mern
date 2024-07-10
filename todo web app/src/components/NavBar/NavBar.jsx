import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ toggleSidebar }) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    // Check if the token exists and update the state accordingly
    useEffect(() => {
        const token = localStorage.getItem('idToken');
        if (token) {
            setIsUserLoggedIn(true);
        }
    }, []);

    const handleLinkClick = () => {
        toggleSidebar();
    };

    const handleLogout = async () => {


        try {
            const LogoutURL = 'http://localhost:3000/auth/Logout'
            const response = await fetch(LogoutURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const data = await response.json();

            console.log(data)

        } catch (error) {
            console.error(error)
        }

        localStorage.removeItem('expiresIn');
        localStorage.removeItem('idToken');
        localStorage.removeItem('localId');
        localStorage.removeItem('expiryTime');

        // handleLinkClick();
        // setIsUserLoggedIn(false);
    };

    return (
        <div>
            <nav className='flex'>
                <ul className='space-y-4 m-auto text-white text-xl'>
                    {isUserLoggedIn ? (
                        <>
                            <li className='flex items-center'>
                                <span className="material-symbols-outlined px-2">
                                    Dashboard
                                </span>
                                <Link to="/TodoDashboard" onClick={handleLinkClick}>Dashboard</Link>
                            </li>
                            <li className='flex items-center'>
                                <span className="material-symbols-outlined px-2">
                                    lock
                                </span>
                                <Link to="/UserChangepass" onClick={handleLinkClick}>Change Password</Link>
                            </li>

                            <li className="flex items-center">
                                <span className="material-symbols-outlined px-2">
                                    logout
                                </span>
                                <Link to="/" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="flex items-center">
                                <span className="material-symbols-outlined px-2">
                                    home
                                </span>
                                <Link to="/" onClick={handleLinkClick}>Landing Page</Link>
                            </li>
                            <li className="flex items-center">
                                <span className="material-symbols-outlined px-2">
                                    login
                                </span>
                                <Link to="/LoginPage" onClick={handleLinkClick}>Login</Link>
                            </li>
                            <li className="flex items-center">
                                <span className="material-symbols-outlined px-2">
                                    add
                                </span>
                                <Link to="/SignupPage" onClick={handleLinkClick}>Signup</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}
