import React, { useState } from "react";
import styled from "styled-components";
import { ICard, IComment } from "./column";
import { v4 as uuidv4 } from 'uuid';
import Comment from './comment';


let Comments = styled.div`
    background-color: white;
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



interface CardCommentsProps {
    comments?: IComment[],
    id: string,
    addComment: (newComment: IComment, id: string) => void,
    card: ICard,
    deleteComment: (card: ICard, id: string) => void,
    cards: ICard[],
    updateComment: (card: ICard, commentId: string, newText: string) => void
}

export default function CardComments ({ 
    comments, id, addComment, card, deleteComment, cards, updateComment }: CardCommentsProps) {

    let [commentsField, setCommentsField] = useState('');

    console.log('rerender');

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

    return  <Container>
        <h3>Комментарии</h3>
        <hr/>
        <Input placeholder='Add comment' value={commentsField} onChange={(e) => changeHandler(e)} type='text' />
        <Button type='button' disabled={!commentsField.trim()} onClick={(e) => commentsHandler(e)}>Send</Button>
        <hr/>
        { comments ? <Comments>
            { comments.map((comment) => (
                <Comment
                    updateComment={updateComment}
                    key={comment.id}
                    comment={comment}
                    card={card}
                    deleteComment={deleteComment}
                />
            )) }
            </Comments>
        : <p>Тут пока нет комментариев</p> }
    </Container>
}