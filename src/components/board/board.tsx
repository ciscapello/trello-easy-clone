import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { AddCardPopup, Navbar, Column } from "..";
import { useAppSelector } from "../../hooks";

export interface BoardProps {
  loginHandle: () => void;
}

export default function Board({ loginHandle }: BoardProps) {
  const titles = useAppSelector((state) => state.titles);

  const isShow = useAppSelector((state) => state.popups.addCardPopup);

  const cards = useAppSelector((state) => state.cards.cards);

  return (
    <>
      <Navbar loginHandle={loginHandle} />
      <StyledBoard>
        {titles.map((title, index) => (
          <Column
            key={uuidv4()}
            id={index}
            cards={cards.filter((card) => card.status === index)}
          />
        ))}
      </StyledBoard>
      {isShow ? <AddCardPopup /> : null}
    </>
  );
}

const StyledBoard = styled.div`
  padding-top: 60px;
  display: flex;
  justify-content: space-around;
`;
