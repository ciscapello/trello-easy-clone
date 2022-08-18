import React, { useState } from "react";
import styled from "styled-components";
import { ICard, IComment } from "./column";
import { v4 as uuidv4 } from 'uuid';


let Comments = styled.div`
    background-color: white;
`

let Comment = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-left: 10px;
    border-bottom: 1px solid gray;
`

let Author = styled.h4`
    margin-top: 0;
    margin-bottom: 5px;
`

let Container = styled.div`
    display: flex;
    width: 40%;
    flex-direction: column;
    border-left: 1px solid gray;
    padding-left: 10px;
`

let Input = styled.input`
    width: 100%;
    height: 30px;
    font-size: 16px;
    margin-bottom: 10px;
    border-radius: 8px;
    padding-left: 10px;
`

let Button = styled.button`
    width: 20%;
    height: 30px;
    border-radius: 10px;
    align-self: flex-end;
`

let Delete = styled.small`
    margin-right: 10px;
    cursor: pointer;
`

let HeadContainer = styled.div`
    display: flex;
    justify-content: space-between;
`


interface CardCommentsProps {
    comments?: IComment[],
    id: string,
    addComment: (newComment: IComment, id: string) => void,
    card: ICard,
    deleteComment: (card: ICard, newComments: IComment[]) => void
}

export default function CardComments ({ comments, id, addComment, card, deleteComment }: CardCommentsProps) {

    let [commentsField, setCommentsField] = useState('');

    let changeHandler = (e: {target: HTMLInputElement}) => {
        setCommentsField(() => e.target.value);
    }

    let commentsHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
        let newComment = {
            id: uuidv4(),
            author: localStorage.getItem('username'),
            text: commentsField
        };
        addComment(newComment, id);
        setCommentsField('');
    }

    let deleteHandler = (id: string) => {
        let newArr = comments!.filter((comment) => comment.id !== id);
        deleteComment(card, newArr);
    }

    return  <Container>
        <h3>Комментарии</h3>
        <hr/>
        <Input placeholder='Add comment' value={commentsField} onChange={(e) => changeHandler(e)} type='text' />
        <Button disabled={!commentsField.trim()} onClick={(e) => commentsHandler(e)}>Send</Button>
        <hr/>
        { comments ? <Comments>
            { comments.map((comment) => (
                <Comment key={comment.id}>
                    <HeadContainer>
                        <Author>{ comment.author }</Author>
                        <Delete onClick={() => deleteHandler(comment.id)} >X</Delete>
                    </HeadContainer>
                    <p>{comment.text}</p>
                </Comment>
            )) }
            </Comments>
        : 'Тут пока нет комментариев' }
    </Container>

}