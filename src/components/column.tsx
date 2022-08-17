import React, { useState } from "react";
import styled from "styled-components";

let StyledColumn = styled.div`
    width: 300px;
    display: flex;
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
`

let Title = styled.h4`
    margin-top: 5px;
`

let Author = styled.small`
    align-self: flex-end;
`

let Comments = styled.h5`
    margin-top: 0px;
`

export interface ICard {
    id: string
    title: string,
    text: string,
    author: string | null,
    status: number,
    comments?: IComment[]
}

interface IComment {
    id: string,
    author: string | null,
    text: string
}

interface ColumnProps {
    title: string,
    cards: ICard[],
    openPopup: () => void
}

export default function Column ({title, cards, openPopup}: ColumnProps) {

    let [showCard, setShowCard] = useState(false);

    let openCard = () => {
        
    }


    return <StyledColumn>
        <Input defaultValue={title}/>
        <hr/>
        { cards.map((card) => (
            <Card key={card.id}
                onClick={openCard}
                >
                <Title>{card.title}</Title>
                <Comments>{ card.comments ? `${card.comments.length} comments` : 'Have no comments' }</Comments>
                <p> {card.text} </p>
                <Author> {card.author} </Author>
            </Card>
        )) }
        <Button onClick={openPopup}>Add new card</Button>
        
    </StyledColumn>
}

