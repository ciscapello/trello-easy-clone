import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setUserName } from "../../store";
import { selectUsername } from "../../store/cards/selectors";

export default function Navbar() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setUserName(""));
  };

  let username = useAppSelector(selectUsername);

  return (
    <Nav>
      <Author>{username}</Author>
      <form>
        <Button onClick={handleClick}>Log Out</Button>
      </form>
    </Nav>
  );
}

const Author = styled.h2`
  color: white;
  margin-right: 30px;
`;

const Nav = styled.nav`
  position: fixed;
  height: 50px;
  width: 100%;
  display: flex;
  background-color: #6495ed;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.button`
  font-size: 20px;
  background-color: #9932cc;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  height: 40px;
  color: white;
  margin-right: 30px;
  &:hover {
    background-color: #00bfff;
  }
`;
