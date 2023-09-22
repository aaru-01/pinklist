import React from "react";
import "./Task.css"

export const Task = ({id, title, description, priority, removeTaskFromList}) => {
return (
    <div className="task-container" key={id}>
        <h1 className="task-title">{title}</h1>
<p className="task-description">{description}</p>
<span className="task-priority">✔{priority}</span>
<span className="task-delete-icon" 
onClick={()=>{
    removeTaskFromList(id);
}}


>🗑</span>
    </div>
)
}
export default Task