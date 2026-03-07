import { createSlice } from "@reduxjs/toolkit";
import { defaultValues } from "@/data/timelineSettingsData";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    defaultValues: defaultValues,
  },
  reducers: {
    setDefaultValues: (state, action) => {
      state.defaultValues = action.payload;
    },
  },
});

export const { setDefaultValues } = timelineSlice.actions;
export default timelineSlice.reducer;
