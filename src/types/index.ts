export interface IComment {
  id: string;
  author: string | null;
  text: string;
}

export interface ICard {
  id: string;
  title: string;
  text: string;
  author: string | null;
  status: number;
  comments: IComment[];
}
