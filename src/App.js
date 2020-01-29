import React from 'react';
import WelcomeMessage from './welcomeMessage';
import './App.css';
import styled,{css} from 'styled-components';
import AppLayout from './AppLayout';
import AppBar from './AppBar';


function App() {
  return (
      <AppLayout>
        <AppBar />
        <WelcomeMessage />
      </AppLayout>
  );
}

export default App;
