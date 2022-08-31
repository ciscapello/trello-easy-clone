import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../../types";
import { v4 as uuidv4 } from "uuid";
import {
  CardState,
  IAddCard,
  IAddComment,
  IDeleteComment,
  IUpdateComment,
  TitleUpdateAction,
} from "./types";

let initialState: CardState = {
  cards: [],
  username: "",
  titles: ["TODO", "In Progress", "Testing", "Done"],
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<IAddCard>) => {
      const { text, title, status } = action.payload;
      if (title.trim() && text.trim()) {
        const newCard: ICard = {
          id: uuidv4(),
          title: title,
          text: text,
          author: localStorage.getItem("username"),
          status: Number(status),
          comments: [],
        };
        const newArr = [...state.cards, newCard];
        state.cards = newArr;
      }
    },
    updateCard: (state, action: PayloadAction<ICard>) => {
      const newCard = action.payload;
      const newArr = state.cards.map((card) => {
        if (card.id === newCard.id) {
          return {
            id: card.id,
            title: newCard.title,
            text: newCard.text,
            author: card.author,
            status: newCard.status,
            comments: card.comments,
          };
        }
        return card;
      });
      state.cards = newArr;
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const newArr = state.cards.filter((card) => card.id !== id);
      state.cards = newArr;
    },
    addComment: (state, action: PayloadAction<IAddComment>) => {
      const { id, newComment } = action.payload;
      const newArr = state.cards!.map((card) => {
        if (card.id === id) {
          card.comments.push(newComment);
        }
        return card;
      });
      state.cards = newArr;
    },
    deleteComment: (state, action: PayloadAction<IDeleteComment>) => {
      const { card, id } = action.payload;
      const newArr = state.cards.map((elem) => {
        if (elem.id === card.id) {
          const newComments = elem.comments.filter(
            (comment) => comment.id !== id
          );
          elem.comments = newComments;
          return elem;
        }
        return elem;
      });
      state.cards = newArr;
    },
    updateComment: (state, action: PayloadAction<IUpdateComment>) => {
      const { card, commentId, newText } = action.payload;
      const newArr = [...state.cards];
      const cardIndex = newArr.findIndex((elem) => elem.id === card.id);
      const commentIndex = card.comments.findIndex(
        (elem) => elem.id === commentId
      );
      newArr[cardIndex].comments[commentIndex].text = newText;
      state.cards = newArr;
    },
    titleUpdate: (state, action: PayloadAction<TitleUpdateAction>) => {
      const { newTitle, id } = action.payload;
      state.titles[id] = newTitle;
    },
  },
});

export const {
  addComment,
  addCard,
  updateCard,
  deleteCard,
  deleteComment,
  updateComment,
  titleUpdate,
} = cardsSlice.actions;
export default cardsSlice.reducer;
