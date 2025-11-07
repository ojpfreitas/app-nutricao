import { createSlice } from "@reduxjs/toolkit";

const patientSlice = createSlice({
  name: "patient",
  initialState: {},
  reducers: {
    setPatient: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setPatient } = patientSlice.actions;
export default patientSlice.reducer;