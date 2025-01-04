import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../Helpers/axiosInstance";


export const fetchEvents = createAsyncThunk("events/fetchEvents", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/events/get");
        console.log(response.data)
        return (response.data);
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Add a new event
export const addEvent = createAsyncThunk(
    "calendar/addEvent",
    async (eventData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/events", eventData);
            toast.success(response.data)
            return response.data;
    
        } catch (error) {
            console.error("Error in addEvent API call:", error);
            return rejectWithValue(error.response?.data || "Failed to add event");
        }
    }
);

// Update an existing event
export const updateEvent = createAsyncThunk("events/updateEvent", async ({ id, eventData }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.patch(`/events/${id}/update`, eventData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Delete an event
export const deleteEvent = createAsyncThunk("events/deleteEvent", async (id, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`/events/${id}/delete`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Events Slice
const eventSlice = createSlice({
    name: "calendar",
    initialState: {
        events: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addEvent.pending, (state) => {
                state.loading = true;
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.events.push(action.payload);
            })
            .addCase(addEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default eventSlice.reducer;