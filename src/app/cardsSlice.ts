import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Card {
  id: string;
  name?: string;
  description?: string;
  authors?: string;
}

const initialState: Card[] = [];

const cardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    selectedCardAdded(state, action: PayloadAction<Card>) {
      state.push(action.payload);
    },
    selectedCardDeleted(state, action: PayloadAction<Card>) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    allSelectedCardsDeleted() {
      return initialState;
    },
  },
});

export const {
  selectedCardAdded,
  selectedCardDeleted,
  allSelectedCardsDeleted,
} = cardsSlice.actions;

export default cardsSlice.reducer;
