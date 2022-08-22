import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { AddCardPopup, Navbar, Column } from "..";
import { BoardProps, ICard, IComment } from "../../types";

export default function Board({ loginHandle }: BoardProps) {
	let initialTitles: string[];

	if (localStorage.getItem("titles")) {
		initialTitles = JSON.parse(localStorage.getItem("titles") || "");
	} else {
		initialTitles = ["TODO", "In Progress", "Testing", "Done"];
	}

	let [titles, setTitles] = useState<string[]>(initialTitles);

	const titleUpdate = (id: number, event: { target: HTMLInputElement }) => {
		let newArr = titles.map((title, index) => {
			if (index === id) {
				return (title = event.target.value);
			}
			return title;
		});
		localStorage.setItem("titles", JSON.stringify(newArr));
		setTitles(newArr);
	};

	const [isShow, setIsShow] = useState(false);

	let initialCards;

	if (localStorage.getItem("cards")) {
		initialCards = JSON.parse(localStorage.getItem("cards") || "");
	} else {
		initialCards = [];
	}

	let [cards, setCards] = useState<ICard[]>(initialCards);

	const updateCard = (newCard: ICard) => {
		let newArr = cards.map((card) => {
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
		localStorage.setItem("cards", JSON.stringify(newArr));
		setCards(newArr);
	};

	const deleteCard = (id: string) => {
		let newArr = cards.filter((card) => card.id !== id);
		localStorage.setItem("cards", JSON.stringify(newArr));
		setCards(newArr);
	};

	const deleteComment = (card: ICard, id: string) => {
		let newArr = cards.map((elem) => {
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
		setCards(newArr);
	};

	const addComment = (newComment: IComment, id: string) => {
		let newArr = cards.map((card) => {
			if (card.id === id) {
				card.comments.push(newComment);
			}
			return card;
		});
		localStorage.setItem("cards", JSON.stringify(newArr));
		setCards(newArr);
	};

	const updateComment = (card: ICard, commentId: string, newText: string) => {
		let newArr = [...cards];
		let cardIndex = newArr.findIndex((elem) => elem.id === card.id);
		let commentIndex = card.comments.findIndex(
			(elem) => elem.id === commentId
		);
		newArr[cardIndex].comments[commentIndex].text = newText;
		localStorage.setItem("cards", JSON.stringify(newArr));
		setCards(newArr);
	};

	const clickHandler = (
		event: React.SyntheticEvent,
		title: string,
		text: string,
		status: string
	) => {
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
			let newArr = [...cards, newCard];
			setCards(newArr);
			setIsShow(false);
			localStorage.setItem("cards", JSON.stringify(newArr));
		}
	};

	const openPopup = () => {
		setIsShow(true);
	};

	const closePopup = () => {
		setIsShow(false);
	};

	let [cardState, setCardState] = useState<ICard | undefined>();

	const openCard = (card: ICard) => {
		setCardState(card);
	};

	const closeCard = () => {
		setCardState(undefined);
	};

	return (
		<>
			<Navbar loginHandle={loginHandle} />
			<StyledBoard>
				{initialTitles.map((title, index) => (
					<Column
						cardState={cardState}
						openCard={openCard}
						closeCard={closeCard}
						titles={titles}
						titleUpdate={titleUpdate}
						deleteComment={deleteComment}
						deleteCard={deleteCard}
						addComment={addComment}
						updateCard={updateCard}
						key={uuidv4()}
						id={index}
						cards={cards.filter((card) => card.status === index)}
						openPopup={openPopup}
						updateComment={updateComment}
					/>
				))}
			</StyledBoard>
			{isShow ? (
				<AddCardPopup
					titles={titles}
					clickHandler={clickHandler}
					closePopup={closePopup}
				/>
			) : null}
		</>
	);
}

const StyledBoard = styled.div`
	padding-top: 60px;
	display: flex;
	justify-content: space-around;
`;
