import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Card {
  id: string;
  name?: string;
  description?: string;
  authors?: string;
}

const initialState: Card[] = [];

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    cardAdded(state, action: PayloadAction<Card>) {
      state.push(action.payload);
    },
    cardDeleted(state, action: PayloadAction<Card>) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    allCardsDeleted() {
      return initialState;
    },
  },
});

export const { cardAdded, cardDeleted, allCardsDeleted } = cardsSlice.actions;
export default cardsSlice.reducer;
