import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./cards/cardsSlice";
import titlesSlice from "./titles/titlesSlice";

export const store = configureStore({
	reducer: {
		cards: cardsSlice,
		titles: titlesSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore["dispatch"];
