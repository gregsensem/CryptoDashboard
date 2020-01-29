import React from 'react';
import WelcomeMessage from './welcomeMessage';
import './App.css';
import styled,{css} from 'styled-components';
import AppLayout from './AppLayout';


function App() {
  return (
      <AppLayout>
        <WelcomeMessage />
      </AppLayout>
  );
}

export default App;
