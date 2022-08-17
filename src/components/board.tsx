import React, { useState } from 'react';
import styled from 'styled-components';
import Column, { ICard } from './column';
import { v4 as uuidv4 } from 'uuid';
import AddCardPopup from './popups/addCardPopup';



let StyledBoard = styled.div`
    display: flex;
    justify-content: space-around;
`


export default function Board () {

    let titles = ['TODO', 'In Progress', 'Testing', 'Done'];

    let [isShow, setIsShow] = useState(false);


    let [cards, setCards] = useState(initialCards);

    
    let clickHandler = (e: React.SyntheticEvent, title: string, text: string, status: string) => {
        e.preventDefault();
        if (title.trim() && text.trim()) {
            let newCard: ICard = {
                id: uuidv4(),
                title: title,
                text: text,
                author: localStorage.getItem('username'),
                status: Number(status)
            }
            setCards([...cards, newCard])
            setIsShow(false);
            
        }
    }

    let openPopup = () => {
        setIsShow(true);
    }


    return  <>
        <StyledBoard>
            { titles.map((title, i) => (
                <Column 
                    key={uuidv4()} 
                    title={title} 
                    cards={cards.filter((card) => card.status === i)}
                    openPopup={openPopup} />
            )) }
        </StyledBoard>
        { isShow ? <AddCardPopup titles={titles} clickHandler={clickHandler} /> : null }
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
        status: 2
    },
    {
        id: uuidv4(),
        title: 'Новая',
        text: 'Совершенно новая карточка, еще одна',
        author: localStorage.getItem('username'),
        status: 0
    }
]