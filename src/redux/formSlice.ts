import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData } from '../schemas/validationSchema'; // Import your IFormData interface

interface FormState {
  uncontrolledFormData: IFormData | null;
  hookFormData: IFormData | null;
}

const initialState: FormState = {
  uncontrolledFormData: null,
  hookFormData: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledFormData(state, action: PayloadAction<IFormData>) {
      state.uncontrolledFormData = action.payload;
    },
    setHookFormData(state, action: PayloadAction<IFormData>) {
      state.hookFormData = action.payload;
    },
  },
});

export const { setUncontrolledFormData, setHookFormData } = formSlice.actions;

export default formSlice.reducer;
