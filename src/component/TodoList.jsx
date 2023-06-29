import React, { useState } from 'react'
import Task from './Task'
import AddTask from './AddTask'
import { useSelector } from 'react-redux'

export default function TodoList() {
    const [filterStatus, setFilterStatus] = useState(null)
    const todoLists = useSelector(state => state.todoList)

    function filterData(arrayData) {
        let result = []
        if (filterStatus == null || filterStatus == "All") {
            result = arrayData
        }
        if (filterStatus == "true") {
            result = arrayData.filter(item => item.status == true)
        }
        if (filterStatus == "false") {
            result = arrayData.filter(item => item.status == false)
        }
        return result
    }
    return (
        <>
            <div className='container'>
                <div>
                    <h1 style={{ textShadow: "1px 2px 2px #A44D9D" }}>TODO LIST</h1>
                </div>
                <div className='status'>
                    <AddTask filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
                    <select style={{ borderRadius: "5px" }} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value={null}>All</option>
                        <option value={true}>Complete</option>
                        <option value={false}>Incomplete</option>
                    </select>
                </div>
            </div>
            <div className='taskList'>
                {todoLists?.length > 0 ? (filterData(todoLists).map((item) => <Task item={item} filterStatus={filterStatus} />)) : (<div style={{ fontWeight: "bold", textShadow: "1px 2px 2px #3185D4", fontSize: "30px" }}>No Todos</div>)}
            </div>
        </>
    )
}
