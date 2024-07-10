import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies

import { TodoList } from './TodoList';
import { CreateTodo } from './CreateTodo';
import { Mark_as_done } from './TodoMarkAsDone';
import { TodoUpdateForm } from './TodoUpdateForm';

function TodoDashboard() {
    const navigate = useNavigate();

    // State variables for managing UI state and todo data
    const [showCreateTodo, setShowCreateTodo] = useState(false);
    const [showMark, setShowMark] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCompletedOnly, setShowCompletedOnly] = useState(false);

    const [currentTodo, setCurrentTodo] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch todos from the backend using JWT token
    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:3000/todo/View', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('idToken') }` 
                },
                credentials: 'include'
            });

            if (response.status === 401) {
                // console.error('Error: Unauthorized (401). Response:', response);
                // alert("the cookies has ben expired plese login again thank you")

                localStorage.clear();
                // navigate('/LoginPage');
                throw new Error('Unauthorized (401).');

            }

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            const tasksArray = data.todos.map(todo => ({ ...todo, id: todo._id }));
            setTodos(tasksArray);
            setLoading(false); 
        } catch (error) {
            setError(error.message);
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchTodos();
    } ,[todos]);

    useEffect(() => {
        const idToken = localStorage.getItem('idToken');
        if (idToken) {
            const interval = setInterval(() => {
                const currentTime = new Date();
                const storedExpiryTime = new Date(localStorage.getItem('expiryTime'));
                if (currentTime >= storedExpiryTime) {
                    localStorage.clear();
                    clearInterval(interval);
                    alert("Session Expired. Please Login Again");
                    navigate('/LoginPage');
                }
            }, 1000);
            return () => clearInterval(interval);
        } else {
            navigate('/LoginPage');
        }
    }, [navigate]);

    // Toggle functions for managing UI state
    const toggleCreateTodo = () => setShowCreateTodo(!showCreateTodo);

    const toggleMark = (todo) => {
        setCurrentTodo(todo);
        setShowMark(!showMark);
    };

    const toggleUpdate = (todo) => {
        setCurrentTodo(todo);
        setUpdatedTitle(todo.title);
        setUpdatedDescription(todo.description);
        setShowUpdate(!showUpdate);
    };

    // Function to mark a todo as completed
    const markCompleted = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
        setShowMark(false); // Close mark as done modal
    };

    // Function to remove completion status of a todo
    const removeComplete = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
        setShowMark(false); // Close mark as done modal
    };

    // Function to update todo details
    const updateTodo = () => {
        if (updatedTitle.trim() !== '') {
            const updatedTodos = todos.map(todo => {
                if (todo.id === currentTodo.id) {
                    return {
                        ...todo,
                        title: updatedTitle,
                        description: updatedDescription
                    };
                }
                return todo;
            });
            setTodos(updatedTodos);
            setShowUpdate(false); // Close update form modal
        }
    };

    // Filter todos based on search query and completion status
    const filteredTodos = todos.filter(todo => {
        const todoTitleLower = todo.title ? todo.title.toLowerCase() : '';
        const searchQueryLower = searchQuery.toLowerCase();
        const matchesSearchQuery = todoTitleLower.includes(searchQueryLower);
        const matchesCompletedFilter = showCompletedOnly ? todo.completed : true;
        return matchesSearchQuery && matchesCompletedFilter;
    });

    // JSX rendering of the TodoDashboard component
    return (
        <div className="px-2">
            {/* Header */}
            <h1 className="flex text-3xl font-bold p-3 rounded-xl py-4 my-5 w-[31rem] mx-auto text-white">TODAY</h1>

            {/* Search input */}
            <input
                type="search"
                placeholder="Search Todos"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex w-[31rem] py-2 px-4 rounded-lg border border-gray focus:outline-none shadow my-4 text-sm mx-auto"
            />

            {/* Checkbox to show completed todos only */}
            <div className="flex mx-auto w-[31rem] justify-end">
                <label className="flex items-center text-sm">
                    <span className="text-white font-bold px-3">Show Completed Only</span>
                    <input
                        type="checkbox"
                        checked={showCompletedOnly}
                        onChange={() => setShowCompletedOnly(!showCompletedOnly)}
                        className="form-checkbox h-5 w-5"
                    />
                </label>
            </div>

            {/* Button to add new todo */}
            <div className="fixed bottom-0 right-0">
                <button className="bg-blue-500 px-3 py-1 pt-5 text-5xl text-white font-bold rounded-xl" onClick={toggleCreateTodo}>
                    +
                </button>
            </div>

            {/* TodoList component */}
            <TodoList
                todos={filteredTodos}
                toggleMark={toggleMark}
                toggleUpdate={toggleUpdate}
            />

            {/* CreateTodo component */}
            <CreateTodo
                setTodos={setTodos}
                showCreateTodo={showCreateTodo}
                toggleCreateTodo={toggleCreateTodo}
            />

            {/* Mark_as_done component */}
            <Mark_as_done
                currentTodo={currentTodo}
                showMark={showMark}
                markCompleted={markCompleted}
                removeComplete={removeComplete}
                setShowMark={setShowMark}
            />

            {/* TodoUpdateForm component */}
            <TodoUpdateForm
                showUpdate={showUpdate}
                currentTodo={currentTodo}
                updatedTitle={updatedTitle}
                setUpdatedTitle={setUpdatedTitle}
                updatedDescription={updatedDescription}
                setUpdatedDescription={setUpdatedDescription}
                setShowUpdate={setShowUpdate}
                updateTodo={updateTodo}
            />
        </div>
    );
}

export default TodoDashboard;
