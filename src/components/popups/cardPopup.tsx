import React, { useRef, useState } from "react";
import { PopupContainer, PopupContent } from "./popup";
import styled from "styled-components";
import { ICard, IComment } from "../column";
import useEscape from "../../hooks/useEscape";
import CardComments from "../cardComments";

let CloseButton = styled.button`
    width: 20px;
    border-radius: 5px;
    background-color: transparent;
    border: 0;
    &:hover {
        transform: scale(1.4);
    }
    position: absolute;
    right: 400px;
`

let StyledPopupContent = styled(PopupContent)`
    background-color: lightyellow;
    display: flex;
    justify-content: space-around;
    width: 50%;
`

let Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`

let Input = styled.input`
    margin-top: 30px;
    margin-bottom: 20px;
    background-color: transparent;
    width: 90%;
    height: 30px;
    text-align: center;
    cursor: pointer;
    font-size: 22px;
    font-weight: 600;
    border: 0;
    &:focus {
        cursor: text;
    }
`

let Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

let Textarea = styled.textarea`
    margin-bottom: 20px;
    width: 80%;
    height: 100px;
    font-size: 16px;
    font-family: 'Arial', sans-serif;
    background-color: transparent;
    cursor: pointer;
    &:focus {
        cursor: text;
    }
    border: 0;
    resize: none;
`

let Select = styled.select`
    width: 80%;
    height: 40px;
    text-align: center;
    font-size: 20px;
    &:hover {
        box-shadow: 3px 3px 3px 2px black;
    }
`

let Button = styled.button`
    margin-top: 20px;
    width: 40%;
    height: 50px;
    font-weight: 600;
    font-size: 16px;
`

let Delete = styled.button`
    position: absolute;
    top: 53px;
    border-radius: 5px;
`

interface CardPopupProps {
    card: ICard,
    titles: String[],
    closeCard: () => void,
    updateCard: (newCard: ICard) => void,
    addComment: (newComment: IComment, id: string) => void,
    deleteCard: (id: string) => void,
    deleteComment: (card: ICard, newComments: IComment[]) => void
}

export default function CardPopup(
    { card, titles, closeCard, updateCard, addComment, deleteCard, deleteComment }: CardPopupProps
    ) {
    
    useEscape(() => closeCard());

    let clickHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeCard();
    }

    let [title, setTitle] = useState(card.title);
    let [text, setText] = useState(card.text);
    let [status, setStatus] = useState(card.status);

    let changeTitle = (e: {target: HTMLInputElement}) => {
        setTitle(() => e.target.value)
    }

    let changeText = (e: {target: HTMLTextAreaElement}) => {
        setText(() => e.target.value)
    }

    let changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(() => Number(e.target.value))
    }

    let deleteHandler = (e: React.MouseEvent) => {
        deleteCard(card.id);
        clickHandler(e);
    }
    

    let update = () => {
        let newCard: ICard = {
            id: card.id,
            title: title,
            text: text,
            status: status,
            author: card.author,
            comments: []
        }
        updateCard(newCard);
    }


    let ref = useRef(null);
    // useClickOutside(ref, closeCard);
    
    return <PopupContainer display>
        <StyledPopupContent ref={ref}>
            <Container>
                <CloseButton onClick={(e) => clickHandler(e)}>X</CloseButton>
                <small>{card.author}</small>
                <hr/>
                <br/>
                <Form>
                    <Delete type='button' onClick={(e) => deleteHandler(e)}>Delete card</Delete>
                    <Input value={title} onChange={(e) => changeTitle(e)}  />
                    <Textarea value={text} onChange={(e) => changeText(e)}/>
                    <Select value={status} onChange={(e) => changeStatus(e)} >
                        { titles.map((title, i) => (
                            <option key={i} value={i}>{title}</option>
                        )) }
                    </Select>
                    
                    <Button type='button' onClick={update}>Add changes</Button>
                </Form>
                <hr/>
            </Container>           
            <CardComments
                    deleteComment={deleteComment}
                    card={card}
                    comments={card.comments}
                    id={card.id}
                    addComment={addComment}
            /> 
        </StyledPopupContent>
    </PopupContainer>
}