import React from 'react';
import Router from './router/Router';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./utils/theme"

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
