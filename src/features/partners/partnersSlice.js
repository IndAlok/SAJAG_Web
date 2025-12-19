import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as partnersService from '../../services/partnersService';

export const fetchPartners = createAsyncThunk(
  'partners/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await partnersService.getPartners();
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch partners');
    }
  }
);

export const createPartner = createAsyncThunk(
  'partners/create',
  async (partnerData, { rejectWithValue }) => {
    try {
      return await partnersService.createPartner(partnerData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create partner');
    }
  }
);

export const updatePartnerById = createAsyncThunk(
  'partners/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await partnersService.updatePartner(id, data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update partner');
    }
  }
);

export const deletePartnerById = createAsyncThunk(
  'partners/delete',
  async (id, { rejectWithValue }) => {
    try {
      await partnersService.deletePartner(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete partner');
    }
  }
);

const partnersSlice = createSlice({
  name: 'partners',
  initialState: {
    items: [],
    selectedPartner: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedPartner: (state, action) => {
      state.selectedPartner = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPartner.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updatePartnerById.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      })
      .addCase(deletePartnerById.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

export const { setSelectedPartner, clearError } = partnersSlice.actions;

export const selectAllPartners = (state) => state.partners.items;
export const selectPartnersLoading = (state) => state.partners.loading;
export const selectPartnersError = (state) => state.partners.error;
export const selectSelectedPartner = (state) => state.partners.selectedPartner;

export default partnersSlice.reducer;
