import React, { useState } from "react";
import styled from "styled-components";
import { ICard, IComment } from "./board";

let CommentField = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-left: 10px;
    border-bottom: 1px solid gray;
`

let Author = styled.h4`
    margin-top: 0;
    margin-bottom: 0;
`


let Delete = styled.button`
    margin-right: 10px;
    cursor: pointer;
`

let HeadContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

let CommentInput = styled.input`
    height: 40px;
    border: 0px;
    background-color: transparent;
`

interface CommentProps {
    comment: IComment,
    card: ICard,
    deleteComment: (card: ICard, id: string) => void,
    updateComment: (card: ICard, commentId: string, newText: string) => void
}

export default function Comment ({ comment, card, deleteComment, updateComment }: CommentProps) {

    let [textField, setTextField] = useState(comment.text);

    let deleteHandler = (id: string) => {
        deleteComment(card, id);
    }

    let changeHandler = (e: {target: HTMLInputElement}) => {
        setTextField(() => e.target.value);
    }

    let blurHandler = () => {
        updateComment(card, comment.id, textField);
    }

    return <CommentField>
        <HeadContainer>
            <Author>{ comment.author }</Author>
            <Delete onClick={() => deleteHandler(comment.id)} >X</Delete>
        </HeadContainer>
        <CommentInput value={textField} onChange={changeHandler} onBlur={blurHandler} />
    </CommentField>
}