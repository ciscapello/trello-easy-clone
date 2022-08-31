import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { AddCardPopup, Navbar, Column } from "..";
import { useAppSelector } from "../../hooks";
import { selectAllCards, selectAllTitles } from "../../store/cards/selectors";

export default function Board() {
  const titles = useAppSelector(selectAllTitles);

  // const isShow = useAppSelector((state) => state.popups.addCardPopup);

  const [isShow, setIsShow] = useState(false);

  const hideCard = () => {
    setIsShow(false);
  };

  const showCard = () => {
    setIsShow(true);
  };

  const cards = useAppSelector(selectAllCards);

  return (
    <>
      <Navbar />
      <StyledBoard>
        {titles.map((title, index) => (
          <Column
            showCard={showCard}
            key={uuidv4()}
            id={index}
            cards={cards.filter((card) => card.status === index)}
          />
        ))}
      </StyledBoard>
      {isShow ? <AddCardPopup hideCard={hideCard} /> : null}
    </>
  );
}

const StyledBoard = styled.div`
  padding-top: 60px;
  display: flex;
  justify-content: space-around;
`;
