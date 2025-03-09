import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardsSlice';
import { searchAPI } from '../../services/getSearchResult';

const rootReducer = combineReducers({
  selectedCards: cardsReducer,
  [searchAPI.reducerPath]: searchAPI.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(searchAPI.middleware),
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof setupStore>;
