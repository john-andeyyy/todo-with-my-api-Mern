import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Landingpage() {


    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('idToken');
        if (token) {
            // setIsUserLoggedIn(true);
            navigate('/TodoDashboard');
        } else {
            navigate('/')

        }
    }, [navigate]);






    return (
        <div className='  flex md:justify-center items-center h-screen'>

            <div id="container">

                <div className="flex flex-col items-center px-4 my-5 w-[33rem] mx-auto text-center text-white font-semibold">
                    <h1 className="text-7xl font-bold">Task Flow</h1>
                    <p className="text-2xl pt-3">Get your day organized</p>
                </div>

                <div className={`flex px-4 my-5 w-[33rem] mx-auto text-center text-white font-semibold text-2xl`}>
                    <div className="m-auto bg-blue-500 rounded-2xl">
                        <button className='py-4 px-24'
                        onClick={()=>{navigate('/LoginPage')}}
                        >Get Started</button>
                    </div>
                </div>

            </div>

        </div>

    );
}
