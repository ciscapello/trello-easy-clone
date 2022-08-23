import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Comment } from "../../components";
import { useAppDispatch } from "../../hooks";
import { addComment } from "../../store";
import { ICard, IComment } from "../../types";

export interface CardCommentsProps {
  comments?: IComment[];
  id: string;
  card: ICard;
  cards: ICard[];
}

export default function CardComments({
  comments,
  id,
  card,
  cards,
}: CardCommentsProps) {
  const dispatch = useAppDispatch();

  const [commentsField, setCommentsField] = useState("");

  const changeHandler = (event: { target: HTMLInputElement }) => {
    setCommentsField(() => event.target.value);
  };

  const commentsHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    const newComment = {
      id: uuidv4(),
      author: localStorage.getItem("username"),
      text: commentsField,
    };
    dispatch(addComment({ newComment, id }));
    setCommentsField("");
  };

  return (
    <Container>
      <h3>Комментарии</h3>
      <hr />
      <Input
        placeholder="Add comment"
        value={commentsField}
        onChange={(event) => changeHandler(event)}
        type="text"
      />
      <Button
        type="button"
        disabled={!commentsField.trim()}
        onClick={(event) => commentsHandler(event)}
      >
        Send
      </Button>
      <hr />
      {comments ? (
        <Comments>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} card={card} />
          ))}
        </Comments>
      ) : (
        <p>Тут пока нет комментариев</p>
      )}
    </Container>
  );
}

const Comments = styled.div`
  background-color: white;
`;

const Container = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  border-left: 1px solid gray;
  padding-left: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  font-size: 16px;
  margin-bottom: 10px;
  border-radius: 8px;
  padding-left: 10px;
`;

const Button = styled.button`
  width: 20%;
  height: 30px;
  border-radius: 10px;
  align-self: flex-end;
`;
