import React, { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
    width: 100%;
    border-radius: 5px;
    border: 2px solid white;
    height: 30px;
    &:focus {
        border-color: blue;
    }
`

const Button = styled.button`
    margin: 15px auto;
    width: 50px;
    height: 30px;
    border-radius: 10px;
`

const H2 = styled.h2`
    text-align: center;
`

export default function Login () {
    let [name, setName] = useState('');

    const handleClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(name);
        localStorage.setItem('username', name);
        setName(() => '');
    }

    const changeHandler = (e: { target: HTMLInputElement }) => {
        setName(() => e.target.value)
    }


    return <>
        <form>
            <H2>Пожалуйста, введите ваше имя</H2>
            <Input value={name} onChange={(e) => changeHandler(e)} type='text'/>
            <Button onClick={(e) => handleClick(e)}>OK</Button>
        </form>
    </>
}
