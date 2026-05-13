import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchId, fetchTicketsId } from '../../components/api/api';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    error: null,
    loading: false,
    visibleCount: 5,
  },
  reducers: {
    increaseVisibleCount(state) {
      state.visibleCount += 5;
    },
    addTickets(state, action) {
      state.tickets.push(...action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { increaseVisibleCount, addTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { dispatch, rejectWithValue }) => {
  try {
    const searchId = await fetchSearchId();

    let stop = false;
    let retryCount = 0;

    while (!stop) {
      try {
        const data = await fetchTicketsId(searchId);

        const ticketsWithId = data.tickets.map((ticket, index) => ({
          ...ticket,
          id: `${Date.now()}_${index}`,
        }));

        dispatch(addTickets(ticketsWithId));

        stop = data.stop;
        retryCount = 0;
      } catch (err) {
        retryCount++;
        if (retryCount >= 5) {
          return rejectWithValue('Ошибка загрузки билетов. Проверьте интернет.');
        }
        await new Promise((res) => setTimeout(res, 1000));
      }
    }
  } catch (error) {
    return rejectWithValue(error.message || 'Ошибка загрузки');
  }
});
