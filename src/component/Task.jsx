import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeTask, updateStatusTask } from '../redux/cartSlice'
import toast, { Toaster } from 'react-hot-toast';
import Update from './Update'
export default function Task({ item }) {
    const dispatch = useDispatch()
    const [isCompleted, setIsCompleted] = useState(item.status)

    useEffect(() => {
        setIsCompleted(item.status)
    }, [item.status])
    const DeleteToast = () => {
        toast.success('This is a delete task!', {
            position: 'top-center',
        });
    };
    return (
        <>
            <div className='bodyItem'>
                <div className='item-list'>
                    <div >
                        <input className='check-box' checked={isCompleted} value={isCompleted} onChange={() => {
                            setIsCompleted(!isCompleted)
                            dispatch(updateStatusTask({
                                id: item.id,
                                todoList: item.todoList,
                                status: !isCompleted
                            }))
                        }} type='checkbox' />
                    </div>
                    <div className='todo-item'>
                        <h4 style={isCompleted ? { textDecoration: "line-through" } : {}}>{item.todoList}</h4>
                        <p>{item.time}</p>
                    </div>
                </div>
                <div className='icon'>
                    <span onClick={() => {
                        dispatch(removeTask(item.id));
                        DeleteToast()
                    }
                    }>
                        <i style={{ color: "red" }} class="fa-solid fa-trash-can"></i>
                        <Toaster />
                    </span>
                    <span >
                        <Update item={item} />
                    </span>
                </div>
            </div>
        </>
    )
}
