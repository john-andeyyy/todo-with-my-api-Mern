import React from 'react';

function Modal({ children, isVisible, handleClose }) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative bg-white rounded-2xl py-5 px-4 m-5 w-[31rem] mx-auto">
                {/* <h1 >{title}</h1> */}
                <button
                    onClick={handleClose}
                    className="absolute top-0 right-0  px-3 py-2 text-red-500 text-4xl font-bold "
                    aria-label="Close"
                >
                    &times;

                </button>
                <div className='pt-6'>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
