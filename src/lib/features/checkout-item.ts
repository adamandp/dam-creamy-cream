import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckoutItem {
  id: string;
  qty: number;
  imageUrl: string;
  name: string;
  price: number;
  discountPrice?: number | null;
}

interface CheckoutState {
  items: CheckoutItem[];
}

const initialState: CheckoutState = {
  items: [],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<CheckoutItem>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);

      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },

    toggleAll: (state, action: PayloadAction<CheckoutItem[]>) => {
      const incoming = action.payload;

      const isAllSelected =
        state.items.length === incoming.length &&
        incoming.every((item) => state.items.some((i) => i.id === item.id));

      if (isAllSelected) {
        state.items = [];
      } else {
        state.items = incoming;
      }
    },
  },
});

export type { CheckoutItem, CheckoutState };
export { checkoutSlice };
