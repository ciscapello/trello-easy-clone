import { ICard, IComment } from "../../types";

export interface ICardState {
  cards: ICard[];
  username: string;
  titles: string[];
  cardState: ICard | undefined;
}

export interface IAddComment {
  newComment: IComment;
  id: string;
}

export interface IDeleteComment {
  card: ICard;
  id: string;
}

export interface IUpdateComment {
  card: ICard;
  commentId: string;
  newText: string;
}

export interface IAddCard {
  title: string;
  text: string;
  status: string;
}

export interface TitleUpdateAction {
  id: number;
  newTitle: string;
}
