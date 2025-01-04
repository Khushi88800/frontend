import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helpers/axiosInstance";
import toast from "react-hot-toast";

// Initial state
const initialState = {
    salaryData: [],
    loading: false,
    error: null,
};

// Async thunk for creating salary
export const createSalary = createAsyncThunk(
    "salary/createSalary",
    async (salaryData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/salary/create", salaryData);
            toast.success("Salary created successfully😊");
            console.log("Request Payload:", salaryData);
            return response.data;
        } catch (error) {
            console.error("Error Response:", error.response);
            toast.error("Failed to create salary");
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

// Async thunk for fetching salary data
export const getSalaryData = createAsyncThunk(
    "salary/getSalaryData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/salary/getSalary");
            console.log("Salary data in redux", response.data);
            return response.data; // Assuming response has the data in 'data'
        } catch (error) {
            console.error("Error Response:", error.response);
            toast.error("Failed to fetch salary data");
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

// Slice definition
const salarySlice = createSlice({
    name: "salary",
    initialState,
    reducers: {
        resetSalaryState: (state) => {
            state.salaryData = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Salary
            .addCase(createSalary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSalary.fulfilled, (state, action) => {
                state.salaryData = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(createSalary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Get Salary Data
            .addCase(getSalaryData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSalaryData.fulfilled, (state, action) => {
                state.salaryData = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getSalaryData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export actions
export const { resetSalaryState } = salarySlice.actions;

// Export reducer
export default salarySlice.reducer;
