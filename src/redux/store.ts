import { configureStore } from "@reduxjs/toolkit";
import TLOReducer from "./TrafficLightSlice";
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: {
    tlo: TLOReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
