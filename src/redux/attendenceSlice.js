
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Helpers/axiosInstance';

export const clockIn = createAsyncThunk('attendance/clockIn', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/attendence/clock-in');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
export const clockOut = createAsyncThunk(
  'attendance/clockOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/attendence/clock-out');
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchAttendanceHistory = createAsyncThunk(
  'attendance/fetchHistory',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/attendence/get', {
        params: { startDate, endDate },
      });
      console.log("Fetching attendance with params:", { startDate, endDate });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Attendance slice
const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    attendance: null,
    attendanceHistory: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clockIn.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(clockIn.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload.attendance;
        state.successMessage = action.payload.message;
      })
      .addCase(clockIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(clockOut.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(clockOut.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload.attendance; 
        state.successMessage = action.payload.message;
      })
      .addCase(clockOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong with clocking out';
      })
      .addCase(fetchAttendanceHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceHistory.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Fetched attendance data:", action.payload);
        state.attendanceHistory = action.payload; 
      })
      .addCase(fetchAttendanceHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch attendance history';
      });
  },
});

export const { clearMessages } = attendanceSlice.actions;

export default attendanceSlice.reducer;
