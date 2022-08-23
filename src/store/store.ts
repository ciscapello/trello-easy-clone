import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./cards/cardsSlice";
import popupsSlice from "./popups/popupsSlice";
import titlesSlice from "./titles/titlesSlice";

export const store = configureStore({
  reducer: {
    cards: cardsSlice,
    titles: titlesSlice,
    popups: popupsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
