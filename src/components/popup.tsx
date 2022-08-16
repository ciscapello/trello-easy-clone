import React from "react";
import styled from "styled-components";

export const PopupContainer = styled.div<{display: string}>`
    width:100%;
    min-height:100%;
    background-color: rgba(0,0,0,0.5);
    overflow:hidden;
    position:fixed;
    top:0px;
    display: ${}? ;
`

export const PopupContent = styled.div`
    margin: 40px auto 40px auto;
    width: 20%;
    height: 30%;
    padding:10px;
    background-color: #c5c5c5;
    border-radius:5px;
    box-shadow: 0px 0px 10px #000;
`

interface PopupProps {
    children: React.ReactNode,
    display: string
}

export default function Popup (props: PopupProps) {
    return <PopupContainer display={props.display}>
        <PopupContent>
            { props.children }
        </PopupContent>
    </PopupContainer>
}