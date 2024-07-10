import React from 'react';
import SingleTodo from './SingleTodo';

export function TodoList({ todos, toggleMark, toggleUpdate }) {
    return (
        <div>
            {todos.length > 0 ? (
                todos.map(todo => (
                    <SingleTodo key={todo.id} todo={todo} toggleMark={toggleMark} toggleUpdate={toggleUpdate} />
                ))
            ) : (
                <div className={`flex px-4 my-5 w-[31rem] mx-auto text-center text-white font-semibold`}>
                    <h1 className='mx-auto'>Nothing to show</h1>
                </div>
            )}
        </div>
    );
}

export default TodoList;
