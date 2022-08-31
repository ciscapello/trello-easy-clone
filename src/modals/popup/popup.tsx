import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks";
import { setUserName } from "../../store";
import { updateUser } from "../../store/cards/cardsSlice";

type FormValues = {
  name: string;
};

export default function Popup() {
  const dispatch = useAppDispatch();
  let [showPopup, setShowPopup] = useState(true);

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const handleClick: SubmitHandler<FormValues> = (data) => {
    dispatch(updateUser(data.name));
    dispatch(setUserName(data.name));
    reset();
    setShowPopup(() => (showPopup = !showPopup));
  };

  return (
    <PopupContainer display={showPopup}>
      <PopupContent>
        <form>
          <H2>Пожалуйста, введите ваше имя</H2>
          <Input {...register("name")} type="text" />
          <Button onClick={handleSubmit(handleClick)}>OK</Button>
        </form>
      </PopupContent>
    </PopupContainer>
  );
}

export const PopupContainer = styled.div<{ display: boolean }>`
  width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: scroll;
  position: fixed;
  top: 0px;
  left: 0px;
  display: ${(props) => (props.display ? "block" : "none")};
`;

export const PopupContent = styled.div`
  margin: 40px auto 40px auto;
  width: 20%;
  height: 30%;
  padding: 10px;
  background-color: #c5c5c5;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #000;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  border: 2px solid white;
  height: 30px;
  &:focus {
    border-color: blue;
  }
`;

const Button = styled.button`
  margin: 15px auto;
  width: 50px;
  height: 30px;
  border-radius: 10px;
`;

const H2 = styled.h2`
  text-align: center;
`;
