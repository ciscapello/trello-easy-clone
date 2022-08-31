import React from "react";
import { Popup, Board } from "./components";
import { createGlobalStyle } from "styled-components";
import { useAppSelector } from "./hooks";
import { selectUsername } from "./store/root";

function App() {
  const login = useAppSelector(selectUsername);

  return (
    <>
      {login ? (
        <Board />
      ) : (
        <>
          <Board /> <Popup />
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
