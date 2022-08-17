import React from 'react';
import Popup from './components/popups/popup';
import Board from './components/board';

function App() {
    if (localStorage.getItem('username')) {
        return <Board />
    }

    return <>
            <Board/>
            <Popup/>
        </>
}

export default App;
