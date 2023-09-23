import React, { useEffect, useState } from "react";
import "./Home.css"
import Task from "./../../components/Task/Task";

const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: 'submit assignment',
            description: 'Nahi to gali padegi',
            priority: 'high'
        },
        // {
        //     id: 2,
        //     title: 'Go to market',
        //     description: 'Buy Alu and Gobi',
        //     priority: 'Medium'
        // },
        // {
        //     id: 3,
        //     title: 'Build project',
        //     description: 'Build project and post it on LinkedIn',
        //     priority: 'very high'
        // },
        // {
        //     id: 4,
        //     title: 'Good Night',
        //     description: 'Good night bolke so jana hai',
        //     priority: 'very high'
        // }

    ])

    const [id, setId] = useState(0);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')

    const [isEdit, setIsEdit] = useState(false);



    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('pinklist'));

        if (list && list.length > 0) {
            setTaskList(list)
        }

    }, [])
    // const localListFromLocalStorage = () => {
    //     const list = JSON.parse(localStorage.getItem('pinklist'));
    // }


    const saveListToLocalStorage = (tasks) => {
        localStorage.setItem('pinklist', JSON.stringify(tasks))
    }

    const addTaskToList = () => {
        const randomId = Math.floor(Math.random() * 1000);

        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority
        }

        const newTaskList = [...taskList, obj]

        setTaskList(newTaskList)

        setTitle(' ');
        setDescription(' ');
        setPriority(' ');

        saveListToLocalStorage(newTaskList);
    }

    const removeTaskFromList = (id) => {
        let index;
        taskList.forEach((task, i) => {
            if (task.id === id) {
                index = i
            }

        })
        // const index = taskList.indexOf(obj);

        const tempArray = taskList;
        tempArray.splice(index, 1);
        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray);
    }

    const setTaskEditable = (id) => {
        setIsEdit(true);
        setId(id);
        let currentEditTask;
        taskList.forEach((task) => {
            if (task.id === id) {
                currentEditTask = task;
            }
        })
        setTitle(currentEditTask.title);
        setDescription(currentEditTask.description);
        setPriority(currentEditTask.priority);

        console.log(currentEditTask)

    }

    const updateTask = () => {
        let indexToUpdate;
        
        taskList.forEach((task, i) => {
            if(task.id === id){
                indexToUpdate = i;
            }
        })
        const tempArray = taskList;
        tempArray[indexToUpdate] ={
id:id,
title:title,
description:description,
priority:priority

}
setTaskList([...tempArray])

saveListToLocalStorage(tempArray)


setId(0);
setTitle('');
setDescription('');
setPriority('');
setIsEdit(false);
    }
    return (
        <div className="container">
            <h1 className="app-title">PinkList 📃</h1>

            <div className="todo-flex-container">
                <div>
                    <h2 className="text-center">Show List</h2>
                    {
                        taskList.map((taskItem, index) => {
                            const { id, title, description, priority } = taskItem;

                            return <Task id={id}
                                title={title}
                                description={description}
                                priority={priority}
                                key={index}
                                removeTaskFromList={removeTaskFromList}
                                setTaskEditable={setTaskEditable}
                            />
                        })
                    }
                </div>

                <div>

                    <h2 className="text-center">
                        {isEdit ? `Update Task ${id}` : 'Add Task'}
                    </h2>
                    <div className="add-task-form-container">
                        {/* <h3>Shoe me title{title}</h3> */}
                        <form>
                            {/* title: */}
                            <input type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                placeholder="Enter Title"
                                className="task-input"
                            />

                            {/* description: */}
                            <input type="text"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                placeholder="Enter Description"
                                className="task-input"
                            />

                            {/* priority: */}
                            <input type="text"
                                value={priority}
                                onChange={(e) => {
                                    setPriority(e.target.value)
                                }}
                                placeholder="Enter Priority"
                                className="task-input"
                            />

                            <div className="btn-container">
                                {
                                    isEdit ?
                                        <button className="btn-add-task"
                                            type='button'
                                            onClick={updateTask}>
                                            Update
                                        </button>
                                        :
                                        <button className="btn-add-task"
                                            type='button'
                                            onClick={addTaskToList}>
                                            Add
                                        </button>
                                }
                            </div>
                        </form>

                    </div>
                </div>
            </div>


        </div>
    )
}
export default Home 