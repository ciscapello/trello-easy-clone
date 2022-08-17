import React from "react";
import { PopupContainer, PopupContent } from "./popup";
import styled from "styled-components";
import { ICard } from "../column";

interface CardPopupProps {
    cards: ICard[]
}


export default function CardPopup({ cards: CardPopupProps }) {
    return <PopupContainer>
        <PopupContent>
            <h2>{}</h2>

        </PopupContent>
    </PopupContainer>
}