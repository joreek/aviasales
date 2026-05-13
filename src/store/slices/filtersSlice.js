import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    all: true,
    noTransfers: true,
    oneTransfer: true,
    twoTransfers: true,
    threeTransfers: true,
  },
  reducers: {
    //Меняю все галочки
    setAllFilters(state, action) {
      state.all = action.payload;
      state.noTransfers = action.payload;
      state.oneTransfer = action.payload;
      state.twoTransfers = action.payload;
      state.threeTransfers = action.payload;
    },
    //Перключаю одну галочку на противоположное
    toggleFilter(state, action) {
      const filterActive = action.payload;
      state[filterActive] = !state[filterActive];
      //Если все отдельные фильтры активны, то ставим галочку на все
      if (state.noTransfers && state.oneTransfer && state.twoTransfers && state.threeTransfers) {
        state.all = true;
      } else {
        state.all = false;
      }
    },
  },
});

export const { setAllFilters, toggleFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
