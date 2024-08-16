import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number;
}

interface CartState {
  [id: number]: Product;
}

const initialState: CartState = {};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      if (state[product.id]) {
        state[product.id].quantity! += 1;
      } else {
        state[product.id] = { ...product, quantity: 1 };
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state[productId]) {
        if (state[productId].quantity! > 1) {
          state[productId].quantity! -= 1;
        } else {
          delete state[productId];
        }
      }
    }
  }
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
