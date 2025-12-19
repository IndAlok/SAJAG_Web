import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import * as trainingsService from '../../services/trainingsService';

export const fetchTrainings = createAsyncThunk(
  'trainings/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await trainingsService.getTrainings(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch trainings');
    }
  }
);

export const createTraining = createAsyncThunk(
  'trainings/create',
  async (trainingData, { rejectWithValue }) => {
    try {
      return await trainingsService.createTraining(trainingData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create training');
    }
  }
);

export const updateTrainingById = createAsyncThunk(
  'trainings/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await trainingsService.updateTraining(id, data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update training');
    }
  }
);

export const deleteTrainingById = createAsyncThunk(
  'trainings/delete',
  async (id, { rejectWithValue }) => {
    try {
      await trainingsService.deleteTraining(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete training');
    }
  }
);

export const bulkDeleteTrainings = createAsyncThunk(
  'trainings/bulkDelete',
  async (ids, { rejectWithValue }) => {
    try {
      const result = await trainingsService.bulkDeleteTrainings(ids);
      return { deletedIds: ids, ...result };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Bulk delete failed');
    }
  }
);

export const bulkUpdateStatus = createAsyncThunk(
  'trainings/bulkUpdateStatus',
  async ({ ids, status }, { rejectWithValue }) => {
    try {
      const result = await trainingsService.bulkUpdateStatus(ids, status);
      return { updatedIds: ids, status, ...result };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Bulk status update failed');
    }
  }
);

const trainingsSlice = createSlice({
  name: 'trainings',
  initialState: {
    items: [],
    filters: {
      search: '',
      state: '',
      district: '',
      theme: '',
      partner: '',
      status: '',
      dateRange: { start: null, end: null },
    },
    selectedTraining: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        search: '',
        state: '',
        district: '',
        theme: '',
        partner: '',
        status: '',
        dateRange: { start: null, end: null },
      };
    },
    setSelectedTraining: (state, action) => {
      state.selectedTraining = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || action.payload || [];
        state.pagination.total = action.payload.pagination?.total || state.items.length;
      })
      .addCase(fetchTrainings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTraining.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTraining.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createTraining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTrainingById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTrainingById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      })
      .addCase(updateTrainingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTrainingById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTrainingById.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(t => t.id !== action.payload);
      })
      .addCase(deleteTrainingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bulkDeleteTrainings.fulfilled, (state, action) => {
        state.items = state.items.filter(t => !action.payload.deletedIds.includes(t.id));
      })
      .addCase(bulkUpdateStatus.fulfilled, (state, action) => {
        action.payload.updatedIds.forEach(id => {
          const training = state.items.find(t => t.id === id);
          if (training) {
            training.status = action.payload.status;
          }
        });
      });
  },
});

export const { setFilters, resetFilters, setSelectedTraining, clearError } = trainingsSlice.actions;

export const selectAllTrainings = (state) => state.trainings.items;
export const selectFilters = (state) => state.trainings.filters;
export const selectSelectedTraining = (state) => state.trainings.selectedTraining;
export const selectTrainingsLoading = (state) => state.trainings.loading;
export const selectTrainingsError = (state) => state.trainings.error;
export const selectPagination = (state) => state.trainings.pagination;

const selectAllowedStates = (state) => state.auth.allowedStates;
const selectAllowedPartners = (state) => state.auth.allowedPartners;
const selectUserRole = (state) => state.auth.role;

export const selectFilteredTrainings = createSelector(
  [selectAllTrainings, selectFilters, selectUserRole, selectAllowedStates, selectAllowedPartners],
  (items, filters, role, allowedStates, allowedPartners) => {
    let filtered = items;

    if (role !== 'ndma_admin' && role !== 'Admin') {
      if (allowedStates.length > 0) {
        filtered = filtered.filter(t => allowedStates.includes(t.state));
      }
      if (allowedPartners.length > 0) {
        filtered = filtered.filter(t => allowedPartners.includes(t.partnerId));
      }
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(t =>
        t.title?.toLowerCase().includes(searchLower) ||
        t.id?.toLowerCase().includes(searchLower) ||
        t.district?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.state) {
      filtered = filtered.filter(t => t.state === filters.state);
    }

    if (filters.district) {
      filtered = filtered.filter(t => t.district === filters.district);
    }

    if (filters.theme) {
      filtered = filtered.filter(t => t.theme === filters.theme);
    }

    if (filters.partner) {
      filtered = filtered.filter(t => t.partnerId === filters.partner);
    }

    if (filters.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter(t => {
        const trainingDate = new Date(t.startDate);
        return trainingDate >= new Date(filters.dateRange.start) &&
               trainingDate <= new Date(filters.dateRange.end);
      });
    }

    return filtered;
  }
);

export default trainingsSlice.reducer;
