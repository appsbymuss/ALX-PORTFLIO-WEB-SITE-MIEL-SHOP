import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesAPI } from '../../data/apiMethods';

export const fetchCollections = createAsyncThunk(
  'collections/fetchCollections',
  async () => {
    const response = await CategoriesAPI.getRows();
    sessionStorage.setItem('collections', JSON.stringify(response.data.data));
    return response.data.data;
  }
);

const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default collectionsSlice.reducer;
