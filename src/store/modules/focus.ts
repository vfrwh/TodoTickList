import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { defaultValues } from "@/data/focusSettingsData"
import type { focusFormType } from "@/types/focusFormType";

const focusStore = createSlice({
  name: 'focus',
  initialState: {
    defaultValues
  },
  reducers: {
    setDefaultValues(state,action: PayloadAction<Partial<focusFormType>>) {
      state.defaultValues = {
        ...state.defaultValues,
        ...action.payload
      };
    }
  }
})

export const { setDefaultValues } = focusStore.actions;

const focusReducer = focusStore.reducer
export default focusReducer