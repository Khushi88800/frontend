import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./userSlice";
import employeeSliceReducer from './employeeSlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        employee:employeeSliceReducer
    },
    devTools:true,
});

export default store;