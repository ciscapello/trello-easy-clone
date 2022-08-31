import { RootState } from "../store";

export const selectAllTitles = (state: RootState) => {
  return state.cards.titles;
};

export const selectAllCards = (state: RootState) => {
  return state.cards.cards;
};

export const selectUsername = (state: RootState) => {
  return state.cards.username;
};

export const selectCardState = (state: RootState) => {
  return state.cards.cardState;
};
