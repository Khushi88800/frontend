import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Helpers/axiosInstance";

export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/company/create", companyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get a single company by ID
export const getCompanyById = createAsyncThunk(
  "company/getCompanyById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a company by ID
export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async ({ id, companyData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${BASE_URL}/${id}`, companyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a company by ID
export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    currentCompany: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCompany.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createCompany.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.companies.push(action.payload.data);
    });
    builder.addCase(createCompany.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    builder.addCase(getCompanyById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getCompanyById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.currentCompany = action.payload.data;
    });
    builder.addCase(getCompanyById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    builder.addCase(updateCompany.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateCompany.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.companies.findIndex(
        (company) => company._id === action.payload.data._id
      );
      if (index !== -1) {
        state.companies[index] = action.payload.data;
      }
    });
    builder.addCase(updateCompany.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    builder.addCase(deleteCompany.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteCompany.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.companies = state.companies.filter(
        (company) => company._id !== action.meta.arg
      );
    });
    builder.addCase(deleteCompany.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default companySlice.reducer;
