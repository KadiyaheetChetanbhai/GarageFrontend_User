import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    pincode: null,
    date: "",
    service: "",
    rating: null,
    priceRange: null,
  },
  isFilterOpen: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFiltersOpen: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setFilters, toggleFiltersOpen, resetFilters } =
  globalSlice.actions;

export default globalSlice.reducer;
