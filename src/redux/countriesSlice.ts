import { createSlice } from '@reduxjs/toolkit';
import { validCountries } from '../data/countries';
import { RootState } from './store';

const initialState = {
  countries: validCountries,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const selectCountries = (state: RootState) => state.countries.countries;

export default countriesSlice.reducer;
