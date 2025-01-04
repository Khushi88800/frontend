import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../Helpers/axiosInstance"
import toast from "react-hot-toast"

const initialState = {
  documents: [],
  loading:false
}

export const getAllDocuments = createAsyncThunk("documents/getDocuments", async () => {
  try {
    const res = axiosInstance.get("/documents/getDocuments")
    toast.promise(res, {
      loading: "loading doccuments",
      success: "documets loaded successfully",
      error: "Failed to load documents"
    })
    const response = await res
    console.log("Documents in Redux:", response);
    return response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message|| "failed to load documents")
    throw error
  }
})
export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (employeeId, { rejectWithValue }) => {
      try {
          const response = await axios.delete(`/api/v1/documents/deleteDocuments/${employeeId}`); 
          return response.data; 
      } catch (error) {
          return rejectWithValue(error.response.data); 
      }
  }
);
export const createNewDocuments = createAsyncThunk(
  "documents/create",
  async (data, { rejectWithValue }) => {
    try {
      const payload = {
        panCard: data?.panCard,
        phone: data?.phone,
        department: data?.department,
        address: data?.address,
        dateOfBirth: data?.dateOfBirth,
        city: data?.city,
        state: data?.state,
        zipCode: data?.zipCode,
      };

      const response = await axiosInstance.post("/documents/create", payload);

      toast.success("documents submiteed successfully");
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong!";
      toast.error("Failed to create documents: " + errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const document = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllDocuments.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAllDocuments.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.documents = [...action.payload];
      }
    })
    .addCase(getAllDocuments.rejected, (state) => {
      state.loading = false;
    });
  }

})

export default document.reducer;