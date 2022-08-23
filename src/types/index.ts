export interface NavbarProps {
	loginHandle: () => void;
}

export interface CommentProps {
	comment: IComment;
	card: ICard;
}

export interface ColumnProps {
	cards: ICard[];
	openPopup: () => void;
	id: number;
	titleUpdate: (id: number, event: { target: HTMLInputElement }) => void;
	titles: string[];
	openCard: (card: ICard) => void;
	closeCard: () => void;
	cardState: ICard | undefined;
}

export interface CardCommentsProps {
	comments?: IComment[];
	id: string;
	card: ICard;
	cards: ICard[];
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
	id: number;
	cards: ICard[];
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
