import React, { useRef, useState } from "react"
import { PopupContainer, PopupContent } from "../popups/popup"
import styled from 'styled-components';
import useEscape from '../../hooks/useEscape';
import { useClickOutside } from "../../hooks/useClickOutside";


let Title = styled.input`
    width: 80%;
    height: 30px;
    font-size: 18px;
    border-radius: 5px;
    padding: 5px;
`

let Text = styled.textarea`
    margin-top: 10px;
    width: 80%;
    height: 150px;
    border-radius: 5px;
    padding: 5px;
`

let Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

let Select = styled.select`
    width: 80%;
    height: 30px;
    border-radius: 5px;
    padding: 5px;
    margin-top: 10px;
`

let Button = styled.button`
    width: 30%;
    height: 30px;
    margin-top: 10px;
    align-self: flex-end;
`

let CloseButton = styled.button`
    width: 20px;
    border-radius: 5px;
    background-color: transparent;
    border: 0;
    &:hover {
        transform: scale(1.4);
    }
    position: absolute;
    right: 604px;
`

interface AddCardPopupProps {
    clickHandler: (e: React.SyntheticEvent, title: string, text: string, status: string) => void,
    initialTitles: string[],
    closePopup: () => void
}

export default function AddCardPopup ({clickHandler, initialTitles, closePopup}: AddCardPopupProps) {

    let [title, setTitle] = useState('');
    let [text, setText] = useState('');
    let [status, setStatus] = useState('0');


    let changeTitle = (e: {target: HTMLInputElement}) => {
        setTitle(() => e.target.value)
    }

    let changeText = (e: {target: HTMLTextAreaElement}) => {
        setText(() => e.target.value)
    }

    let changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(() => e.target.value)
    }

    let handleClick = (e: React.SyntheticEvent) => {
        clickHandler(e, title, text, status);
        setTitle('');
        setText('');
        setStatus('0');
    }

    useEscape(() => closePopup());

    let ref = useRef(null);
    useClickOutside(ref, closePopup);


    return <PopupContainer display>
        <PopupContent ref={ref}>
            <CloseButton onClick={closePopup}>X</CloseButton>
            <h3>Add new card</h3>
            <Form>
                <Title type='text' placeholder='Title' value={title} onChange={(e) => changeTitle(e)} />
                <Text placeholder='Text' value={text} onChange={(e) => changeText(e)} />
                <Select name='select' value={status} onChange={changeStatus}>
                    { initialTitles.map((title, i) => (
                        <option key={i} value={i}>{title}</option>
                    )) }
                </Select>
                <Button onClick={handleClick}>Add</Button>
            </Form>
        </PopupContent>
    </PopupContainer>
}