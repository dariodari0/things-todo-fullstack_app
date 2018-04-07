import React from 'react';

const ToDoItem = ({name, completed, onDelete, onToggle}) => (
    <li className="task"> 
        <span
        className = {`${completed? 'done' : 'none'}`}
        onClick={onToggle}
        >
        {name}
        </span>
        <span
            onClick ={onDelete}
        >
            X
        </span>
    </li>
)


export default ToDoItem;