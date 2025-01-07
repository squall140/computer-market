import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

// initial state
const initialState = {
  preferences: {
    region: '',
    countryName: '',
    countryCode: undefined, //for antd select show placeholder
    currency: '',
    language: '',
    languageCode: ''
  },
  error: ''
};

// reducers
const reducers = {
  updatePreferences: (state, action) => {
    state.preferences = {...state.preferences, ...action.payload};
    window.sessionStorage.setItem('lang', state.preferences.languageCode);
  },
  updateError: (state, action) => {
    state.error = action.payload;
  },
  appReset: (state, action) => {
    for(let key in initialState){
      state[key] = initialState[key];
    }
  }
}

// create slice 
export const wrappersSlice = createSlice({
  name: 'wrappers',
  initialState,
  reducers,
});

//actions
export const { updatePreferences, updateError, appReset } = wrappersSlice.actions;

export default wrappersSlice.reducer;
