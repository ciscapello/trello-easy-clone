import React from "react";
import { Popup, Board } from "./components";
import { createGlobalStyle } from "styled-components";
import { useAppSelector } from "./hooks";

function App() {
  // const [login, setLogin] = useState(Boolean(localStorage.getItem("username")));
  const login = useAppSelector((state) => state.popups.username);

  // const loginHandle = () => {
  //   setLogin(false);
  // };

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
