import { createSlice } from "@reduxjs/toolkit";
import { defaultValues } from "@/data/listSettingsData";

const listSlice = createSlice({
  name: "list",
  initialState: {
    defaultValues: defaultValues,
  },
  reducers: {
    setDefaultValues: (state, action) => {
      state.defaultValues = action.payload;
    },
  },
});

export const { setDefaultValues } = listSlice.actions;
export default listSlice.reducer;
