import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./userSlice";
import employeeSliceReducer from './employeeSlice'
import documentsSliceReducer from "./documentSlice"
import salaryReducer from './salarySlice'
import statSliceReducer from './statSlice'
import leaveSliceReducer from './LeaveApplicationSlice'
import payrollReducer from './payrollSlice'
import calendarReducer from './calenderSlice'
import attendanceSliceReducer from "./attendenceSlice"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        employee: employeeSliceReducer,
        documents: documentsSliceReducer,
        salary: salaryReducer,
        stat: statSliceReducer,
        leave:leaveSliceReducer,
        payroll: payrollReducer,
        calendar:calendarReducer,
        attendance:attendanceSliceReducer,

    },
    devTools: true,
});

export default store;