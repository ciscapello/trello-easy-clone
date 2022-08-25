import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks/redux";
import { deleteComment, updateComment } from "../../store";
import { ICard, IComment } from "../../types";

export interface CommentProps {
  comment: IComment;
  card: ICard;
}

export default function Comment({ comment, card }: CommentProps) {
  const dispatch = useAppDispatch();

  const { register, watch } = useForm({
    defaultValues: {
      comment: comment.text,
    },
  });

  const deleteHandler = (id: string) => {
    dispatch(deleteComment({ card, id }));
  };

  const blurHandler = () => {
    const commentId = comment.id;
    const newText = watch().comment;
    dispatch(updateComment({ card, commentId, newText }));
  };

  return (
    <CommentField>
      <HeadContainer>
        <Author>{comment.author}</Author>
        <Delete onClick={() => deleteHandler(comment.id)}>X</Delete>
      </HeadContainer>
      <CommentInput {...register("comment")} onBlur={blurHandler} />
    </CommentField>
  );
}

const CommentField = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 10px;
  border-bottom: 1px solid gray;
`;

const Author = styled.h4`
  margin-top: 0;
  margin-bottom: 0;
`;

const Delete = styled.button`
  margin-right: 10px;
  cursor: pointer;
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentInput = styled.input`
  height: 40px;
  border: 0px;
  background-color: transparent;
`;
