import { configureStore } from '@reduxjs/toolkit';
import sortReducer from './slices/sortSlice';
import filtersReducer from './slices/filtersSlice';
import ticketsReducer from './slices/ticketsSlice';

const store = configureStore({
  reducer: {
    sort: sortReducer,
    filters: filtersReducer,
    tickets: ticketsReducer,
  },
  devTools: true,
});

export default store;
