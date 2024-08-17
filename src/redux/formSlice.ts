import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFormData } from "../schemas/validationSchema";

interface FormState {
  uncontrolledFormData: IFormData | null;
  hookFormData: IFormData | null;
  previousForms: IFormData[];
}

const initialState: FormState = {
  uncontrolledFormData: null,
  hookFormData: null,
  previousForms: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setUncontrolledFormData(state, action: PayloadAction<IFormData>) {
      state.previousForms.push(state.uncontrolledFormData!); // Добавляем старые данные в историю
      state.uncontrolledFormData = action.payload;
    },
    setHookFormData(state, action: PayloadAction<IFormData>) {
      state.previousForms.push(state.hookFormData!); // Добавляем старые данные в историю
      state.hookFormData = action.payload;
    },
  },
});

export const { setUncontrolledFormData, setHookFormData } = formSlice.actions;
export default formSlice.reducer;
