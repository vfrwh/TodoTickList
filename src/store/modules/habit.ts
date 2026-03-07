import { createSlice } from "@reduxjs/toolkit";
import { defaultValues } from "@/data/habitSettingsData";

const habitSlice = createSlice({
  name: "habit",
  initialState: {
    defaultValues: defaultValues,
  },
  reducers: {
    setDefaultValues: (state, action) => {
      state.defaultValues = action.payload;
    },
  },
});

export const { setDefaultValues } = habitSlice.actions;
export default habitSlice.reducer;
