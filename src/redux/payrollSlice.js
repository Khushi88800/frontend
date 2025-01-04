import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    bankDetails: null,
    loading: false,
    error: null,
};

export const createPayroll = createAsyncThunk(
    "payroll/create",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/payroll/Bank/add", payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const viewPayroll = createAsyncThunk(
    "payroll/view",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/payroll/Bank/view");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatePayroll = createAsyncThunk(
    "payroll/update",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put("/payroll/Bank/update", payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deletePayroll = createAsyncThunk(
    "payroll/delete",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete("/payroll/Bank/delete");
            const response = await res
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const payrollSlice = createSlice({
    name: "payroll",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create Payroll
        builder.addCase(createPayroll.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createPayroll.fulfilled, (state, action) => {
            state.loading = false;
            state.bankDetails = action.payload.data;
            state.error = null;
        });
        builder.addCase(createPayroll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message || "Something went wrong!";
        });

        // View Payroll
        builder.addCase(viewPayroll.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(viewPayroll.fulfilled, (state, action) => {
            state.loading = false;
            state.bankDetails = action.payload.data;
            state.error = null;
        });
        builder.addCase(viewPayroll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message || "Something went wrong!";
        });

        // Update Payroll
        builder.addCase(updatePayroll.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updatePayroll.fulfilled, (state, action) => {
            state.loading = false;
            state.bankDetails = action.payload.data;
            state.error = null;
        });
        builder.addCase(updatePayroll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message || "Something went wrong!";
        });

        // Delete Payroll
        builder.addCase(deletePayroll.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deletePayroll.fulfilled, (state) => {
            state.loading = false;
            state.bankDetails = null;
            state.error = null;
        });
        builder.addCase(deletePayroll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message || "Something went wrong!";
        });
    },
});

export default payrollSlice.reducer;
