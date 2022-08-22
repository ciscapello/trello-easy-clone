import React, { useState } from "react";
import styled from "styled-components";

export default function Popup() {
	let [name, setName] = useState("");
	let [showPopup, setShowPopup] = useState(true);

	const handleClick = (event: React.SyntheticEvent) => {
		console.log(name);
		localStorage.setItem("username", name);
		setName(() => "");
		setShowPopup(() => (showPopup = !showPopup));
	};

	const changeHandler = (event: { target: HTMLInputElement }) => {
		setName(() => event.target.value);
	};

	return (
		<PopupContainer display={showPopup}>
			<PopupContent>
				<form>
					<H2>Пожалуйста, введите ваше имя</H2>
					<Input
						value={name}
						onChange={(event) => changeHandler(event)}
						type="text"
					/>
					<Button onClick={(event) => handleClick(event)}>OK</Button>
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
