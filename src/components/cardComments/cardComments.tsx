import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
}

type FieldValues = {
  comment: string;
};

export default function CardComments({
  comments,
  id,
  card,
}: CardCommentsProps) {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, watch } = useForm<FieldValues>();

  let field = watch();

  const commentsHandler: SubmitHandler<FieldValues> = (data) => {
    const newComment = {
      id: uuidv4(),
      author: localStorage.getItem("username"),
      text: data.comment,
    };
    dispatch(addComment({ newComment, id }));
  };

  return (
    <Container>
      <h3>Комментарии</h3>
      <hr />
      <form>
        <Input placeholder="Add comment" {...register("comment")} type="text" />
        <Button
          type="button"
          disabled={!field.comment}
          onClick={handleSubmit(commentsHandler)}
        >
          Send
        </Button>
      </form>
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
