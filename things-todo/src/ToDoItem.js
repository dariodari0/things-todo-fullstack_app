import React from 'react';

const ToDoItem = ({name, completed}) => (
    <li
        style={{
            textDecoration: completed? 'line-through': 'none'
        }}
    >
        {name}
    </li>
)


export default ToDoItem;