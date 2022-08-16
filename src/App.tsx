import React from 'react';
import Popup from './components/popup';
import Login from './components/login';
import Main from './components/main';

function App() {
  return <>
        <Main/>
        <Popup display={'none'}>
            <Login/>
        </Popup>
    </>
}

export default App;
