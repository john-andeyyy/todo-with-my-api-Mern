import React, { useState } from 'react';
// import '../style/BurgerMenu.';  // Ensure the correct import of CSS file
// import '../NavBar/BurgerMenu.css';  // Ensure the correct import of CSS file
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="relative flex justify-between pt-4 px-3 w-[32rem] mx-auto text-white">
            <div>
                <span className="material-symbols-outlined cursor-pointer  text-4xl" onClick={toggleSidebar}>
                    menu
                </span>
            </div>
            <div>
                <span className="material-symbols-outlined text-4xl"
                onClick={()=>{
                    navigate('/Info')
                }}
                >
                    info
                </span>
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 ">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg">Todo</h2>
                        <span className="material-symbols-outlined cursor-pointer" onClick={toggleSidebar}>
                            close
                        </span>
                    </div>

                    <NavBar toggleSidebar={toggleSidebar} />
                </div>
            )}
        </div>
    );
}

export default Header;
