import { createSlice } from "@reduxjs/toolkit";
import { defaultValues } from "@/data/quadrantsSettingsData";

const quadrantsSlice = createSlice({
  name: "quadrants",
  initialState: {
    defaultValues: defaultValues,
  },
  reducers: {
    setDefaultValues: (state, action) => {
      state.defaultValues = action.payload;
    },
  },
});

export const { setDefaultValues } = quadrantsSlice.actions;
export default quadrantsSlice.reducer;
