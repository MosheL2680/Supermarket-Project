import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface IProduct {
  desc: string,
  price: number,
  img: string,
  id: number
}

export interface productsState {
  products: IProduct[]
}

const initialState: productsState = {
  products: []
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    increment: (state) => {
    }
  },
});

export const { increment } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;
export default productsSlice.reducer;