import { RootState } from "../store";

export const selectAllTitles = (state: RootState) => {
  return state.root.titles;
};

export const selectAllCards = (state: RootState) => {
  return state.root.cards;
};

export const selectUsername = (state: RootState) => {
  return state.root.username;
};

export const selectCardState = (state: RootState) => {
  return state.root.cardState;
};
