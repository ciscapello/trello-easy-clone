import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../../types";

interface InitialState {
  addCardPopup: boolean;
  cardPopup: boolean;
  cardState: ICard | undefined;
  username: string;
}

const initialState: InitialState = {
  addCardPopup: false,
  cardPopup: false,
  cardState: undefined,
  username: "",
};

const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    showAddCardPopup: (state) => {
      state.addCardPopup = true;
    },
    hideAddCardPopup: (state) => {
      state.addCardPopup = false;
    },
    showCardPopup: (state) => {
      state.cardPopup = true;
    },
    hideCardPopup: (state) => {
      state.cardPopup = false;
    },
    setCardState: (state, action: PayloadAction<ICard>) => {
      state.cardState = action.payload;
    },
    resetCardState: (state) => {
      state.cardState = undefined;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const {
  showCardPopup,
  hideCardPopup,
  showAddCardPopup,
  hideAddCardPopup,
  setCardState,
  resetCardState,
  setUserName,
} = titlesSlice.actions;
export default titlesSlice.reducer;
