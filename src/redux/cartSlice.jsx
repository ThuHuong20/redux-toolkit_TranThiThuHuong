import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "todoList",
    initialState: [],
    reducers: {
        addToTask: (state, action) => {
            console.log(action.payload)
            return [...state, action.payload]
        },
        removeTask: (state, action) => {
            return state.filter((task) => task.id !== action.payload)
        },
        updateTask: (state, action) => {
            return state.map((task) => {
                if (task.id === action.payload.id) {
                    return action.payload;
                } else {
                    return task;
                }
            })
        },
        updateStatusTask: (state, action) => {
            return state.map((task) => {
                if (task.id === action.payload.id) {
                    return action.payload;
                } else {
                    return task;
                }
            })
        }
    }
})
const { actions, reducer } = cartSlice
export const { addToTask, updateTask, removeTask, updateStatusTask } = actions
export default reducer