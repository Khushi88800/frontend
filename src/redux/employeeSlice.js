import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    employeesData: [],
};

// Async thunk for creating a new employee
export const createEmployee = createAsyncThunk(
    "employees/createEmployee",
    async (employeeData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/employees", employeeData);
            toast.success("Employee created successfully", response?.success)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to create employee");
        }
    }
);

// Async thunk for updating an existing employee by ID
export const updateEmployeeById = createAsyncThunk(
    "employees/updateEmployeeById",
    async ({ employeeData, id }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/employees/${id}`, employeeData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update employee");
        }
    }
);

export const fetchEmployees = createAsyncThunk(
    "employees/fetchEmployees",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/employees");
            toast.success("Employees Data fetched successfully",response.data)
            console.log("API Response:", response.data);
            return response.data; // Expecting an array of employee objects
        } catch (error) {
            console.error("Error fetching employees:", error);
            console.error("Error response:", error.response);
            return rejectWithValue(error.response?.data?.message || "Failed to fetch employees");
        }
    }
);


const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create employee cases
            .addCase(createEmployee.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.employees.push(action.payload);
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Update employee cases
            .addCase(updateEmployeeById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateEmployeeById.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.employees.findIndex(emp => emp._id === action.payload._id);
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
            })
            .addCase(updateEmployeeById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Fetch employees cases
            .addCase(fetchEmployees.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.employeesData = action.payload; // Update to employeesData
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { } = employeeSlice.actions;
export default employeeSlice.reducer;
