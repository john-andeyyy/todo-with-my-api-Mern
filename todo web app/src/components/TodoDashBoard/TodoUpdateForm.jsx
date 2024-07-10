import React, { useState, useEffect } from 'react';
import Modal from './Modal';

export function TodoUpdateForm({
    showUpdate, setShowUpdate, currentTodo,
    updateTodo, setTodos, todos
}) {
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [alert, setAlert] = useState('');
    const [count, setCount] = useState(40);

    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    useEffect(() => {
        if (currentTodo) {
            setUpdatedTitle(currentTodo.title);
            setUpdatedDescription(currentTodo.description);
            setCount(40 - currentTodo.title.length);
        }
    }, [currentTodo]);

    const handleUpdateClick = (id) => {
        if (updatedTitle.length > 0) {
            const updatedTodo = {
                // ...currentTodo,
                title: updatedTitle,
                description: updatedDescription
            };

            const localId = localStorage.getItem('localId');
            // const dburl = import.meta.env.VITE_FIREBASE_DB_URL;
            // const todoRef = `${dburl}/tasks/${localId}/TaskList/${id}.json`;
            const myApi = `http://localhost:3000/todo/update/${id}`

            
            fetch(myApi, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('idToken') }`
                },
                credentials: 'include',
                body: JSON.stringify(updatedTodo)

            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to update todo');
                    }
                    // ! for static web app only
                    // updateTodo(updatedTodo);
                    setIsEditVisible(false);
                    setAlert('');
                    setShowUpdate(false);
                })
                .catch(error => {
                    console.error('Error updating todo:', error);
                });
        } else {
            setAlert('Please enter a title!');
        }

    }


    const Task_Delete = (id) => {


        const localId = localStorage.getItem('localId');
        // const dburl = import.meta.env.VITE_FIREBASE_DB_URL;
        // const todoRef = `${dburl}/tasks/${localId}/TaskList/${id}.json`;

        const TODOApi = `http://localhost:3000/todo/Delete/${id}`;

        fetch(TODOApi, {
            method: 'DELETE',

            
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('idToken')}`
            },
            credentials: 'include' 
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update todo');
                }
                // ! for static web app only
                // updateTodo(updatedTodo);
                setIsEditVisible(false);
                setAlert('');
                setShowUpdate(false);
            })
            .catch(error => {
                console.error('Error updating todo:', error);
            });

    };

    return (
        <Modal isVisible={showUpdate} handleClose={() => {
            setShowUpdate(false);
            setIsEditVisible(false);
        }}>
            {currentTodo && (
                <div>
                    <div className={isEditVisible ? 'hidden' : ''}>
                        <div className="flex justify-between py-2">
                            <div className="flex-1">
                                <h2 className="font-bold text-lg break-all">
                                    <p>Title:</p> <span className='pl-4 capitalize font-normal text-xl'>{currentTodo.title}</span>
                                </h2>
                            </div>
                            <div className="flex-shrink-0">
                                <p className='text-gray-400'>{currentTodo.time}</p>
                            </div>
                        </div>

                        <p className='pb-2 font-bold text-lg'>Description: <br />
                            <span className='text-black pl-4 break-words capitalize font-normal text-xl'>
                                {currentTodo.description ? currentTodo.description : 'Nothing to show'}
                            </span>
                        </p>
                    </div>

                    <div id="edit" className={isEditVisible ? '' : 'hidden'}>
                        <h1 className='text-red-500 font-semibold py-2 text-xl text-center'>{alert}</h1>
                        <div id="Title" className='py-2'>
                            <p className='text-gray-400'>Title :</p>
                            <input
                                type="text"
                                maxLength="40"
                                value={updatedTitle}
                                onChange={(e) => {
                                    setUpdatedTitle(e.target.value);
                                    setCount(40 - e.target.value.length);
                                }}
                                className="w-full py-3 px-3 rounded-lg border border-gray focus:outline-none shadow text-lg"
                            />
                            <p className='text-gray-400 pt-2'>{count} / 40</p>
                        </div>

                        <p className='text-gray-400'>Description :</p>
                        <textarea
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                            className="w-full py-3 px-3 rounded-lg border border-gray focus:outline-none shadow text-lg resize-none"
                        />

                        <div className="text-center bg-blue-500 text-white rounded-2xl font-bold mt-8">
                            <button className='w-full py-3' onClick={() => handleUpdateClick(currentTodo.id)}>
                                Update
                            </button>
                        </div>

                        <button className='p-5 px-5 font-semibold text-xl text-red-500' onClick={() => setIsEditVisible(false)}>
                            Discard
                        </button>
                    </div>

                    <div className={isEditVisible ? 'hidden' : ''}>
                        <div className="text-center bg-blue-500 text-white rounded-2xl font-bold mt-8">
                            <button className='w-full py-3' onClick={() => setIsEditVisible(true)}>
                                Edit
                            </button>
                        </div>

                        <div className={`flex py-5 ${isEditVisible ? 'hidden' : ''}`}>
                            <button className='p-3 px-5 text-white rounded-xl font-semibold m-auto bg-red-500 w-full' onClick={() => {
                                // setTodos(todos.filter(todo => todo.id !== currentTodo.id));
                                Task_Delete(currentTodo.id)
                                setShowUpdate(false);
                            }}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
}
