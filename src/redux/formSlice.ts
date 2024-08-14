import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  uncontrolledFormData: any;
  hookFormData: any;
}

const initialState: FormState = {
  uncontrolledFormData: null,
  hookFormData: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledFormData(state, action: PayloadAction<any>) {
      state.uncontrolledFormData = action.payload;
    },
    setHookFormData(state, action: PayloadAction<any>) {
      state.hookFormData = action.payload;
    },
  },
});

export const { setUncontrolledFormData, setHookFormData } = formSlice.actions;

export default formSlice.reducer;
