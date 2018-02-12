import React from 'react';

const ToDoItem = ({name, completed, onDelete}) => (
    <li
        style={{
            textDecoration: completed? 'line-through': 'none'
        }}
    >
        {name}
        <span
            onClick ={onDelete}
        >
            X
        </span>
    </li>
)


export default ToDoItem;