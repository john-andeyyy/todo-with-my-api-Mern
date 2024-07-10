import React from 'react';

export function SingleTodo({ todo, toggleMark, toggleUpdate }) {
    return (
        <div
            key={todo.id}
            className={`flex gap-4 px-4 rounded-xl my-5 w-[31rem] mx-auto bg-white shadow-md shadow-gray-300 self-start hover:bg-gray-100 text-center`}
        >
            <button
                id="icon"
                onClick={() => toggleMark(todo)}
                className='px-3 py-5'
            >
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleMark(todo)}
                    className='form-checkbox h-5 w-5'
                />

            </button>

            <button
                id="text"
                onClick={() => toggleUpdate(todo)}
                className="flex flex-col flex-1 cursor-pointer py-5"
            >
                <h4 className="font-bold pb-1 px-1 capitalize break-all text-justify">{todo.title}</h4>
                <p className="text-xs text-gray-400 break-words">{todo.time}</p>
            </button>
        </div>
    );
}

export default SingleTodo;
