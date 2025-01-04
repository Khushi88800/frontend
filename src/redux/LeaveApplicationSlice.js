import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../Helpers/axiosInstance";
/**
 * createLeave
 * getAllLeaveApplications
 * getLeavebyIdApplication
 * updateLeaveByApplication
 * deleteLeaveByApplication
 */


const initialState = {
  leaves: [],
}
export const createLeaveApplication = createAsyncThunk(
  'leave/createLeaveApplication',
  async (leaveData, { rejectWithValue }) => {
    try {
      const toastId = toast.loading('Creating leave application...');
      const response = await axiosInstance.post('/leave/create', leaveData);
      toast.success('Leave application created successfully', { id: toastId });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';

      toast.error(`Failed to create leave application: ${errorMessage}`);

      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);
export const getAllLeaveApplications = createAsyncThunk(
  'leave/getAllLeaveApplications',
  async () => {
    try {
      const response = await axiosInstance.get('/leave/get-leave');
      // console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
      toast.error(`Failed to get all leave applications: ${errorMessage}`);
      throw error;
    }
  }
);
export const updateLeaveStatus = createAsyncThunk(
  'leave/updateStatus',
  async ({ leaveId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/leave/update-status', {
        leaveId,
        status,
      });
      return response.data; // The updated leave data from the API
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error updating status');
    }
  }
);
const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLeaveApplication.pending, (state) => {
        state.error = null;
      })
      .addCase(createLeaveApplication.fulfilled, (state, action) => {
        state.leaves.push(action.payload);
      })
      .addCase(createLeaveApplication.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(getAllLeaveApplications.fulfilled, (state, action) => {
        state.leaves = action.payload;
      })
      .addCase(getAllLeaveApplications.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch leaves';
      })
      .addCase(updateLeaveStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedLeave = action.payload;
        // Update the specific leave in the state
        const index = state.leaves.findIndex((leave) => leave._id === updatedLeave._id);
        if (index !== -1) {
          state.leaves[index] = updatedLeave;
        }
      })
      .addCase(updateLeaveStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default leaveSlice.reducer;