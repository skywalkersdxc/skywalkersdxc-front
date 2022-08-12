import React from 'react';
import Router from './router/Router';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./utils/theme"
import './index.css';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
