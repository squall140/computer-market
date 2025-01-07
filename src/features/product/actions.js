import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {request} from '../../help/request';
import {generateApiUrl, structuralTransformation} from '../../help/utils.js';

const initialState = {
  products: [],
  searchSoftwares: [],
  status: 'idle'
};

//reducers
const reducers = {
  updateSearchSoftwares: (state, action) => {
    state.searchSoftwares = action.payload;
  },
  productReset: (state, action) => {
    for(let key in initialState){
      state[key] = initialState[key];
    }
  },
}

//async actions
export const getProducts = createAsyncThunk(
  'product/fetchProducts',
  async (params) => {
    const response = await request.post(generateApiUrl('getProducts'), params)
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'success';
        let product = structuralTransformation(action.payload.data);
        if (product[0]?.group !== 'DTWS') product.reverse()
        state.products = product
      })
  },
});

//actions
export const { updateSearchSoftwares, productReset } = productSlice.actions;

export default productSlice.reducer;
