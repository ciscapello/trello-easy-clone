import React, { useState } from 'react';
import styled from 'styled-components';
import Column from './column';
import { v4 as uuidv4 } from 'uuid';
import AddCardPopup from './popups/addCardPopup';

let StyledBoard = styled.div`
    display: flex;
    justify-content: space-around;
`

export interface ICard {
    id: string
    title: string,
    text: string,
    author: string | null,
    status: number,
    comments: IComment[]
}

export interface IComment {
    id: string,
    author: string | null,
    text: string
}

export default function Board () {

    let initialTitles: string[];

    if (localStorage.getItem('titles')) {
        initialTitles = JSON.parse(localStorage.getItem('titles') || '');
    } else {
        initialTitles = ['TODO', 'In Progress', 'Testing', 'Done'];
    }

    let [titles, setTitles] = useState<string[]>(initialTitles);

    let titleUpdate = (id: number, e: {target: HTMLInputElement}) => {
        let newArr = titles.map((title, i) => {
            if (i === id) {
                return title = e.target.value;
            }
            return title;
        })
        localStorage.setItem('titles', JSON.stringify(newArr));
        setTitles(newArr);
    }

    let [isShow, setIsShow] = useState(false);

    let initialCards;

    if (localStorage.getItem('cards')) {
        initialCards = JSON.parse(localStorage.getItem('cards') || '');
    } else {
        initialCards = [];
    }
    
    let [cards, setCards] = useState<ICard[]>(initialCards);

    let updateCard = (newCard: ICard) => {
        let newArr = cards.map((card) => {
            if (card.id === newCard.id) {
                return {
                    id: card.id,
                    title: newCard.title,
                    text: newCard.text,
                    author: card.author,
                    status: newCard.status,
                    comments: card.comments
                }
            }
            return card
        });
        localStorage.setItem('cards', JSON.stringify(newArr));
        setCards(newArr);
    }

    let deleteCard = (id: string) => {
        let newArr = cards.filter((card) => card.id !== id);
        localStorage.setItem('cards', JSON.stringify(newArr));
        setCards(newArr);
    }

    let deleteComment = (card: ICard, id: string) => {
        let newArr = cards.map((elem) => {
            if (elem.id === card.id) {
                let newComments = elem.comments.filter((com) => com.id !== id)
                elem.comments = newComments;
                return elem;
            }
            return elem;
        });
        localStorage.setItem('cards', JSON.stringify(newArr));
        setCards(newArr);
    }

    let addComment = (newComment: IComment, id: string) => {
        let newArr = cards.map((card) => {
            if (card.id === id) {
                card.comments.push(newComment);
            }
            return card;
        });
        localStorage.setItem('cards', JSON.stringify(newArr));
        setCards(newArr);
    }

    let updateComment = (card: ICard, commentId: string, newText: string) => {
        let newArr = [...cards];
        let ind = newArr.findIndex((elem) => elem.id === card.id);
        let i = card.comments.findIndex((elem) => elem.id === commentId);
        newArr[ind].comments[i].text = newText;
        localStorage.setItem('cards', JSON.stringify(newArr));
        setCards(newArr);
    }
    
    let clickHandler = (e: React.SyntheticEvent, title: string, text: string, status: string) => {
        e.preventDefault();
        if (title.trim() && text.trim()) {
            let newCard: ICard = {
                id: uuidv4(),
                title: title,
                text: text,
                author: localStorage.getItem('username'),
                status: Number(status),
                comments: []
            }
        let newArr = [...cards, newCard];
        setCards(newArr);
        setIsShow(false);
        localStorage.setItem('cards', JSON.stringify(newArr));
        }
    }

    let openPopup = () => {
        setIsShow(true);
    }

    let closePopup = () => {
        setIsShow(false);
    }

    let [cardState, setCardState] = useState<ICard | undefined>()

    let openCard = (card: ICard) => {
        setCardState(card);
    }

    let closeCard = () => {
        setCardState(undefined);
    }

    return  <>
        <StyledBoard>
            { initialTitles.map((title, i) => (
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
                    id={i}
                    cards={cards.filter((card) => card.status === i)}
                    openPopup={openPopup}
                    updateComment={updateComment} />
            )) }
        </StyledBoard>
        { isShow ? <AddCardPopup 
            titles={titles}
            clickHandler={clickHandler}
            closePopup={closePopup}
        /> : null }
    </>
}