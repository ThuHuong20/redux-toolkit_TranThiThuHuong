import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'
const store = configureStore({
    reducer: {
        todoList: cartSlice
    }
})
export default store;