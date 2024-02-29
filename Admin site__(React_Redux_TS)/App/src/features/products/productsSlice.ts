import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addProduct, delProducts, fetchProducts, updateProduct } from './productsAPI';
import { toast } from 'react-toastify';

export interface IProduct {
  desc: string,
  price: number,
  img?: string,
  id?: number,
  ctg?: number
}

export interface FormDataState {
  desc: string;
  price: string;
  ctg: string;
  img: File | null;
}

export interface productsState {
  products: IProduct[]
}

const initialState: productsState = {
  products: []
};

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts();
    return response.data;
  }
);
export const addProductsAsync = createAsyncThunk(
  'products/addProducts',
  async (prd: FormData) => {
    const response = await addProduct(prd);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async ( data: any) => {
    console.log(`id: ${data.id}, data: ${data.data.desc}`)
    let prd = {desc:data.data.desc, price:data.data.price}
    const response = await updateProduct(data.id, prd);
    return response.data;
  }
);
export const delProductsAsync = createAsyncThunk(
  'products/delProducts',
  async (id: any) => {
    const response = await delProducts(id);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    increment: (state) => {
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(addProductsAsync.fulfilled, (state, action) => {
        toast.info('Added successfuly')
        fetchProductsAsync()
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        toast.info('Updated successfuly')
        fetchProductsAsync()
      })
      .addCase(delProductsAsync.fulfilled, (state, action) => {
        toast.info('Deleted successfuly')
        fetchProductsAsync()
      });
  },

});

export const { increment } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;
export default productsSlice.reducer;