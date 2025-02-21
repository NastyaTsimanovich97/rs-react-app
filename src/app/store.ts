import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardsSlice';
import { searchAPI } from '../services/getSearchResult';

export const store = configureStore({
  reducer: {
    selectedCards: cardsReducer,
    [searchAPI.reducerPath]: searchAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
