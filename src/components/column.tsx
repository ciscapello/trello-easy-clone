import React from "react";
import styled from "styled-components";
import CardPopup from "./popups/cardPopup";

let StyledColumn = styled.div`
    width: 300px;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    border-radius: 5px;
    background-color: lightblue;
    padding: 10px;
`

let Input = styled.input`
    margin-top: 20px;
    width: 80%;
    background: transparent;
    border: 0;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    &:focus {
        cursor: text;
    }
`

let Button = styled.button`
    height: 60px;
    width: 120px;
    background-color: lightyellow;
    border-radius: 5px;
    font-weight: 600;
    font-size: 16px;
    &:hover {
        transform: translateX(-2px) translateY(-2px);
    }
`

let Card = styled.div`
    width: 80%;
    margin: 10px 0 10px 0;
    min-height: 50px;
    border: 2px solid black;
    border-radius: 10px;
    background-color: white;
    padding: 5px;
    display: flex;
    flex-direction: column;
    &:hover {
        background: lightgray;
    }
`

let Title = styled.h4`
    margin-top: 5px;
`

let Author = styled.small`
    align-self: flex-end;
`

let Comments = styled.h5`
    margin-top: 0px;
    color: gray;
    align-self: center;
    margin: auto 0;
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

interface ColumnProps {
    deleteCard: (id: string) => void,
    cards: ICard[],
    openPopup: () => void,
    updateCard: (newCard: ICard) => void
    addComment: (newComment: IComment, id: string) => void,
    id: number,
    deleteComment: (card: ICard, id: string) => void,
    titleUpdate: (id: number, e: {target: HTMLInputElement}) => void,
    titles: string[],
    openCard: (card: ICard) => void,
    closeCard: () => void,
    cardState: ICard | undefined,
    updateComment: (card: ICard, commentId: string, newText: string) => void
}

export default function Column ( { cards, openPopup, updateCard, titles, openCard, closeCard, cardState,
    addComment, deleteCard, titleUpdate, id, deleteComment, updateComment}: ColumnProps
    ) {
    
    let changeHandler = (e: {target: HTMLInputElement}) => {
        titleUpdate(id, e);
    }
    

    return <StyledColumn>
        <Input defaultValue={titles[id]} onBlur={(e) => changeHandler(e)} />
        <hr/>
        { cards.map((card, i) => (
            <Card key={card.id}
                onClick={() => {
                    openCard(card);
                }}
            >
                <Title>{card.title}</Title>
                <p> {card.text} </p>
                <Comments>{ card.comments ? `${card.comments.length} comments` : 'Have no comments' }</Comments>
                <Author> {card.author} </Author>
            </Card>
        )) }
        { cardState ? <CardPopup
            updateComment={updateComment}
            deleteComment={deleteComment}
            deleteCard={deleteCard}
            addComment={addComment}
            closeCard={closeCard}
            titles={titles}
            id={id}
            card={cardState}
            cards={cards}
            updateCard={updateCard}
        /> : null }
        <Button onClick={openPopup}>Add new card</Button>
    </StyledColumn>
}

