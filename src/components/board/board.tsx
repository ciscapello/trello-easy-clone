import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { AddCardPopup, Navbar, Column } from "..";
import { useAppSelector } from "../../hooks/redux";
import { BoardProps, ICard } from "../../types";

export default function Board({ loginHandle }: BoardProps) {
  let initialTitles: string[];

  // let dispatch = useAppDispatch();

  if (localStorage.getItem("titles")) {
    initialTitles = JSON.parse(localStorage.getItem("titles") || "");
  } else {
    initialTitles = ["TODO", "In Progress", "Testing", "Done"];
  }

  let [titles, setTitles] = useState<string[]>(initialTitles);

  const titleUpdate = (id: number, event: { target: HTMLInputElement }) => {
    let newArr = titles.map((title, index) => {
      if (index === id) {
        return (title = event.target.value);
      }
      return title;
    });
    localStorage.setItem("titles", JSON.stringify(newArr));
    setTitles(newArr);
  };

  const [isShow, setIsShow] = useState(false);

  let cards = useAppSelector((state) => state.cards.cards);

  const clickHandler = () => {
    setIsShow(false);
  };

  const openPopup = () => {
    setIsShow(true);
  };

  const closePopup = () => {
    setIsShow(false);
  };

  let [cardState, setCardState] = useState<ICard | undefined>();

  const openCard = (card: ICard) => {
    setCardState(card);
  };

  const closeCard = () => {
    setCardState(undefined);
  };

  return (
    <>
      <Navbar loginHandle={loginHandle} />
      <StyledBoard>
        {initialTitles.map((title, index) => (
          <Column
            cardState={cardState}
            openCard={openCard}
            closeCard={closeCard}
            titles={titles}
            titleUpdate={titleUpdate}
            key={uuidv4()}
            id={index}
            cards={cards.filter((card) => card.status === index)}
            openPopup={openPopup}
          />
        ))}
      </StyledBoard>
      {isShow ? (
        <AddCardPopup
          titles={titles}
          clickHandler={clickHandler}
          closePopup={closePopup}
        />
      ) : null}
    </>
  );
}

const StyledBoard = styled.div`
  padding-top: 60px;
  display: flex;
  justify-content: space-around;
`;
