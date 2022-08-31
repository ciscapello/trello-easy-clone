import React, { useRef } from "react";
import { PopupContainer, PopupContent } from "../popup/popup";
import styled from "styled-components";
import {
  useClickOutside,
  useEscape,
  useAppDispatch,
  useAppSelector,
} from "../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { selectAllTitles, addCard } from "../../store/root";

type FormValues = {
  title: string;
  text: string;
  status: string;
};

interface AddCardPopupProps {
  hideCard: () => void;
}

export default function AddCardPopup({ hideCard }: AddCardPopupProps) {
  const dispatch = useAppDispatch();
  const titles = useAppSelector(selectAllTitles);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleClick: SubmitHandler<FormValues> = (data) => {
    const { title, text, status } = data;
    dispatch(addCard({ title, text, status }));
    reset();
    hideCard();
  };

  useEscape(() => hideCard());

  const closePopup = () => {
    hideCard();
  };

  const ref = useRef(null);
  useClickOutside(ref, closePopup);

  return (
    <PopupContainer display>
      <PopupContent ref={ref}>
        <CloseButton onClick={closePopup}>X</CloseButton>
        <h3>Add new card</h3>
        <Form>
          <Title
            {...register("title", { required: true })}
            type="text"
            placeholder="Title"
          />
          {errors.title?.type === "required" ? (
            <ErrorMessage>Title is required</ErrorMessage>
          ) : null}
          <Text {...register("text", { required: true })} placeholder="Text" />
          {errors.text?.type === "required" ? (
            <ErrorMessage>Text field id required</ErrorMessage>
          ) : null}
          <Select {...register("status")}>
            {titles.map((title, i) => (
              <option key={i} value={i}>
                {title}
              </option>
            ))}
          </Select>
          <Button onClick={handleSubmit(handleClick)}>Add</Button>
        </Form>
      </PopupContent>
    </PopupContainer>
  );
}

const Title = styled.input`
  width: 80%;
  height: 30px;
  font-size: 18px;
  border-radius: 5px;
  padding: 5px;
`;

const Text = styled.textarea`
  margin-top: 10px;
  width: 80%;
  height: 150px;
  border-radius: 5px;
  padding: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Select = styled.select`
  width: 80%;
  height: 30px;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
`;

const Button = styled.button`
  width: 30%;
  height: 30px;
  margin-top: 10px;
  align-self: flex-end;
`;

const CloseButton = styled.button`
  width: 20px;
  border-radius: 5px;
  background-color: transparent;
  border: 0;
  &:hover {
    transform: scale(1.4);
  }
  position: absolute;
  right: 604px;
`;

const ErrorMessage = styled.small`
  color: red;
`;
