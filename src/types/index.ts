export interface NavbarProps {
	loginHandle: () => void;
}

export interface CommentProps {
	comment: IComment;
	card: ICard;
	deleteComment: (card: ICard, id: string) => void;
	updateComment: (card: ICard, commentId: string, newText: string) => void;
}

export interface ColumnProps {
	deleteCard: (id: string) => void;
	cards: ICard[];
	openPopup: () => void;
	updateCard: (newCard: ICard) => void;
	addComment: (newComment: IComment, id: string) => void;
	id: number;
	deleteComment: (card: ICard, id: string) => void;
	titleUpdate: (id: number, event: { target: HTMLInputElement }) => void;
	titles: string[];
	openCard: (card: ICard) => void;
	closeCard: () => void;
	cardState: ICard | undefined;
	updateComment: (card: ICard, commentId: string, newText: string) => void;
}

export interface CardCommentsProps {
	comments?: IComment[];
	id: string;
	addComment: (newComment: IComment, id: string) => void;
	card: ICard;
	deleteComment: (card: ICard, id: string) => void;
	cards: ICard[];
	updateComment: (card: ICard, commentId: string, newText: string) => void;
}

export interface IComment {
	id: string;
	author: string | null;
	text: string;
}

export interface BoardProps {
	loginHandle: () => void;
}

export interface CardPopupProps {
	card: ICard;
	titles: String[];
	closeCard: () => void;
	updateCard: (newCard: ICard) => void;
	addComment: (newComment: IComment, id: string) => void;
	deleteCard: (id: string) => void;
	deleteComment: (card: ICard, id: string) => void;
	id: number;
	cards: ICard[];
	updateComment: (card: ICard, commentId: string, newText: string) => void;
}

export interface AddCardPopupProps {
	clickHandler: (
		event: React.SyntheticEvent,
		title: string,
		text: string,
		status: string
	) => void;
	titles: string[];
	closePopup: () => void;
}

export interface ICard {
	id: string;
	title: string;
	text: string;
	author: string | null;
	status: number;
	comments: IComment[];
}
