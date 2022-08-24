import React, { useRef, useState } from "react";
import { PopupContainer, PopupContent } from "../popup/popup";
import styled from "styled-components";
import {
  useClickOutside,
  useEscape,
  useAppDispatch,
  useAppSelector,
} from "../../hooks";
import { hideAddCardPopup, addCard } from "../../store";

export default function AddCardPopup() {
  const dispatch = useAppDispatch();
  const titles = useAppSelector((state) => state.titles);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("0");

  const changeTitle = (event: { target: HTMLInputElement }) => {
    setTitle(() => event.target.value);
  };

  const changeText = (event: { target: HTMLTextAreaElement }) => {
    setText(() => event.target.value);
  };

  const changeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(() => event.target.value);
  };

  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(addCard({ title, text, status }));
    setTitle("");
    setText("");
    setStatus("0");
    dispatch(hideAddCardPopup());
  };

  useEscape(() => dispatch(hideAddCardPopup()));

  const closePopup = () => {
    dispatch(hideAddCardPopup());
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
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => changeTitle(event)}
          />
          <Text
            placeholder="Text"
            value={text}
            onChange={(event) => changeText(event)}
          />
          <Select name="select" value={status} onChange={changeStatus}>
            {titles.map((title, i) => (
              <option key={i} value={i}>
                {title}
              </option>
            ))}
          </Select>
          <Button onClick={handleClick}>Add</Button>
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
