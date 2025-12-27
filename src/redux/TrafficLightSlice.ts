import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import mockData from "./../data/tlo-list-mock.json";

import { parseDate, updateVisibleItems } from "../functions";
import type { TLOState } from "../types";

const typedMockData = parseDate(mockData);
const selectedObject = typedMockData[0].coords;

const initialState: TLOState = {
  items: typedMockData,
  visibleItems: typedMockData,
  isActive: true,
  isInActive: true,
  isIncrease: false,
  searchByName: "",
  searchByAddress: "",
  selectedObject: selectedObject,
};
const TLOSlice = createSlice({
  name: "tlo",
  initialState,
  reducers: {
    searchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload;
      state.visibleItems = updateVisibleItems(state);
    },
    searchByAddress: (state, action: PayloadAction<string>) => {
      state.searchByAddress = action.payload;
      state.visibleItems = updateVisibleItems(state);
    },
    setActiveFilter: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
      state.visibleItems = updateVisibleItems(state);
    },
    setInactiveFilter: (state, action: PayloadAction<boolean>) => {
      state.isInActive = action.payload;
      state.visibleItems = updateVisibleItems(state);
    },
    setSortTLO: (state, action: PayloadAction<boolean>) => {
      state.isIncrease = action.payload;
      state.visibleItems = updateVisibleItems(state);
    },
    changeLocation: (state, action) => {
      state.selectedObject = action.payload;
    },
  },
});

export const {
  setActiveFilter,
  setInactiveFilter,
  setSortTLO,
  searchByName,
  searchByAddress,
  changeLocation,
} = TLOSlice.actions;
export default TLOSlice.reducer;
