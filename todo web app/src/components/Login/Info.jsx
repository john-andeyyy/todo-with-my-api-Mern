import React from 'react';

export default function Info() {
    return (
        <div className="flex md:justify-center items-center h-screen">
            <div id="container">
                <div className="flex flex-col items-center px-4 my-5 w-[33rem] mx-auto text-center text-white font-semibold">
                    <h1 className="text-7xl font-bold">Developer Information</h1>
                    <p className="text-2xl pt-3">Details about the developer</p>
                </div>

                <div className="flex flex-col px-4 my-5 w-[33rem] mx-auto text-center text-white font-semibold text-2xl space-y-4">
                    <div className="flex justify-between">
                        <h2 className='font-semibold'>Developer:</h2>
                        <span className='font-normal'>John Andrei B. Nicolas</span>
                    </div>
                    <div className="flex justify-between">
                        <h2 className='font-semibold'>Address:</h2>
                        <span className='font-normal'>Bustos, Bulacan</span>
                    </div>
                    <div className="flex justify-between">
                        <h2 className='font-semibold'>Email:</h2>
                        <span className='font-normal'>johnx3216@gmail.com</span>
                    </div>
                </div>

                {/* <div className="flex px-4 my-5 w-[33rem] mx-auto text-center text-white font-semibold text-2xl">
                    <div className="m-auto bg-blue-500 rounded-2xl">
                        <button className='py-4 px-24'
                            onClick={() => { console.log('a'); }}
                        >Contact Developer</button>
                    </div>
                </div> */}

                
            </div>
        </div>
    );
}
