import React, { useState } from "react";
import { Popup, Board } from "./components";
import { createGlobalStyle } from "styled-components";

function App() {
	let [login, setLogin] = useState(Boolean(localStorage.getItem("username")));

	const loginHandle = () => {
		setLogin(false);
	};

	return (
		<>
			{login ? (
				<Board loginHandle={loginHandle} />
			) : (
				<>
					<Board loginHandle={loginHandle} /> <Popup />
				</>
			)}
			<GlobalStyle />
		</>
	);
}

export default App;

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
    }
`;
