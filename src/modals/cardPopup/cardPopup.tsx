import React, { useRef } from "react";
import { PopupContainer, PopupContent } from "../popup/popup";
import styled from "styled-components";
import { useEscape, useAppDispatch, useAppSelector } from "../../hooks";
import { CardComments } from "../../components";
import { ICard } from "../../types";
import { deleteCard, updateCard, resetCardState } from "../../store";
import { SubmitHandler, useForm } from "react-hook-form";

export interface CardPopupProps {
  cardId: string;
}

interface FormValues {
  title: string;
  text: string;
  status: string;
}

export default function CardPopup({ cardId }: CardPopupProps) {
  const dispatch = useAppDispatch();
  useEscape(() => dispatch(resetCardState()));

  const cards = useAppSelector((state) => state.cards.cards);

  const titles = useAppSelector((state) => state.titles);

  const card = cards.find((elem) => elem.id === cardId);

  const clickHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(resetCardState());
  };

  const { register, handleSubmit } = useForm<FormValues>();

  const deleteHandler = (event: React.MouseEvent) => {
    const { id } = card!;
    dispatch(deleteCard(id));
    clickHandler(event);
  };

  const update: SubmitHandler<FormValues> = (data) => {
    const { title, text, status } = data;
    const newCard: ICard = {
      id: card!.id,
      title: title,
      text: text,
      status: Number(status),
      author: card!.author,
      comments: [],
    };
    dispatch(updateCard(newCard));
    dispatch(resetCardState());
  };

  const ref = useRef(null);

  return (
    <PopupContainer display>
      <StyledPopupContent ref={ref}>
        <Container>
          <CloseButton onClick={(event) => clickHandler(event)}>X</CloseButton>
          <small>{card!.author}</small>
          <hr />
          <br />
          <Form>
            <Delete type="button" onClick={(event) => deleteHandler(event)}>
              Delete card
            </Delete>
            <Input defaultValue={card!.title} {...register("title")} />
            <Textarea defaultValue={card!.text} {...register("text")} />
            <Select defaultValue={card!.status} {...register("status")}>
              {titles.map((title, i) => (
                <option key={i} value={i}>
                  {title}
                </option>
              ))}
            </Select>
            <Button type="button" onClick={handleSubmit(update)}>
              Add changes
            </Button>
          </Form>
          <hr />
        </Container>
        <CardComments card={card!} comments={card!.comments} id={card!.id} />
      </StyledPopupContent>
    </PopupContainer>
  );
}

const CloseButton = styled.button`
  width: 20px;
  border-radius: 5px;
  background-color: transparent;
  border: 0;
  &:hover {
    transform: scale(1.4);
  }
  position: absolute;
  right: 400px;
`;

const StyledPopupContent = styled(PopupContent)`
  background-color: lightyellow;
  display: flex;
  justify-content: space-around;
  width: 50%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Input = styled.input`
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Textarea = styled.textarea`
  margin-bottom: 20px;
  width: 80%;
  height: 100px;
  font-size: 16px;
  font-family: "Arial", sans-serif;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    cursor: text;
  }
  border: 0;
  resize: none;
`;

const Select = styled.select`
  width: 80%;
  height: 40px;
  text-align: center;
  font-size: 20px;
  &:hover {
    box-shadow: 3px 3px 3px 2px black;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  width: 40%;
  height: 50px;
  font-weight: 600;
  font-size: 16px;
`;

const Delete = styled.button`
  position: absolute;
  top: 53px;
  border-radius: 5px;
`;
