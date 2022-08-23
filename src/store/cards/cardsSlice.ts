import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard, IComment } from "../../types";
import { v4 as uuidv4 } from "uuid";

interface CardState {
  cards: ICard[];
}

interface IAddComment {
  newComment: IComment;
  id: string;
}

interface IDeleteComment {
  card: ICard;
  id: string;
}

interface IUpdateComment {
  card: ICard;
  commentId: string;
  newText: string;
}

interface IAddCard {
  event: React.SyntheticEvent;
  title: string;
  text: string;
  status: string;
}

let initialState: CardState;

if (localStorage.getItem("cards")) {
  initialState = {
    cards: JSON.parse(localStorage.getItem("cards") || ""),
  };
} else {
  initialState = { cards: [] };
}

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<IAddCard>) => {
      let { text, title, status, event } = action.payload;
      event.preventDefault();
      if (title.trim() && text.trim()) {
        let newCard: ICard = {
          id: uuidv4(),
          title: title,
          text: text,
          author: localStorage.getItem("username"),
          status: Number(status),
          comments: [],
        };
        let newArr = [...state.cards, newCard];
        state.cards = newArr;
        localStorage.setItem("cards", JSON.stringify(newArr));
      }
    },
    updateCard: (state, action: PayloadAction<ICard>) => {
      let newCard = action.payload;
      let newArr = state.cards.map((card) => {
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
      localStorage.setItem("cards", JSON.stringify(newArr));
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      let id = action.payload;
      let newArr = state.cards.filter((card) => card.id !== id);
      localStorage.setItem("cards", JSON.stringify(newArr));
      state.cards = newArr;
    },
    addComment: (state, action: PayloadAction<IAddComment>) => {
      let { id, newComment } = action.payload;
      let newArr = state.cards!.map((card) => {
        if (card.id === id) {
          card.comments.push(newComment);
        }
        return card;
      });
      state.cards = newArr;
      localStorage.setItem("cards", JSON.stringify(newArr));
    },
    deleteComment: (state, action: PayloadAction<IDeleteComment>) => {
      let { card, id } = action.payload;
      let newArr = state.cards.map((elem) => {
        if (elem.id === card.id) {
          let newComments = elem.comments.filter(
            (comment) => comment.id !== id
          );
          elem.comments = newComments;
          return elem;
        }
        return elem;
      });
      localStorage.setItem("cards", JSON.stringify(newArr));
      state.cards = newArr;
    },
    updateComment: (state, action: PayloadAction<IUpdateComment>) => {
      let { card, commentId, newText } = action.payload;
      let newArr = [...state.cards];
      let cardIndex = newArr.findIndex((elem) => elem.id === card.id);
      let commentIndex = card.comments.findIndex(
        (elem) => elem.id === commentId
      );
      newArr[cardIndex].comments[commentIndex].text = newText;
      state.cards = newArr;
      localStorage.setItem("cards", JSON.stringify(newArr));
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
} = cardsSlice.actions;
export default cardsSlice.reducer;
