import React, { useState } from 'react';
import styled from 'styled-components';
import Column, { ICard, IComment } from './column';
import { v4 as uuidv4 } from 'uuid';
import AddCardPopup from './popups/addCardPopup';



let StyledBoard = styled.div`
    display: flex;
    justify-content: space-around;
`


export default function Board () {

    let initialTitles = ['TODO', 'In Progress', 'Testing', 'Done'];

    let [isShow, setIsShow] = useState(false);

    let [cards, setCards] = useState(initialCards);

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
        setCards(newArr);
    }

    let deleteCard = (id: string) => {
        let newArr = cards.filter((card) => card.id !== id);
        setCards(newArr);
    }

    let deleteComment = (card: ICard, newComments: IComment[]) => {
        let newArr = cards.map((elem) => {
            if (elem.id === card.id) {
                return { ...elem, comments: newComments};
            }
            return elem;
        })
        setCards(newArr);
    }

    let addComment = (newComment: IComment, id: string) => {
        let newArr = cards.map((card) => {
            if (card.id === id) {
                card.comments.push(newComment);
                console.log(card.comments);
            }
            return card
        });
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
            setCards([...cards, newCard])
            setIsShow(false);
        }
    }

    let openPopup = () => {
        setIsShow(true);
    }

    let closePopup = () => {
        setIsShow(false);
    }


    return  <>
        <StyledBoard>
            { initialTitles.map((title, i) => (
                <Column 
                    deleteComment={deleteComment}
                    deleteCard={deleteCard}
                    initialTitles={initialTitles}
                    addComment={addComment}
                    updateCard={updateCard}
                    key={uuidv4()} 
                    title={title}
                    id={i}
                    cards={cards.filter((card) => card.status === i)}
                    openPopup={openPopup} />
            )) }
        </StyledBoard>
        { isShow ? <AddCardPopup 
            initialTitles={initialTitles}
            clickHandler={clickHandler}
            closePopup={closePopup}
        /> : null }
    </>
}


let initialCards = [
    {
        id: uuidv4(),
        title: 'Новая карточка',
        text: 'Создать карточку',
        author: localStorage.getItem('username'),
        status: 3,
        comments: [
            {
                id: uuidv4(),
                author: localStorage.getItem('username'),
                text: 'Неплохая карточка'
            },
            {
                id: uuidv4(),
                author: 'John Doe',
                text: 'Да, вполне'
            },
        ]
    },
    {
        id: uuidv4(),
        title: 'И еще одна карточка',
        text: 'Создать принципиально новую карточку',
        author: localStorage.getItem('username'),
        status: 2,
        comments: []
    },
    {
        id: uuidv4(),
        title: 'Новая',
        text: 'Совершенно новая карточка, еще одна',
        author: localStorage.getItem('username'),
        status: 0,
        comments: []
    }
]