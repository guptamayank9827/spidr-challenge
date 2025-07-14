// import React from 'react';
import { Container, ThemeProvider } from '@mui/material';
import Form from './Form';
import { brandTheme as theme } from './theme'; // Assuming you have a theme file for MUI
import './App.css';

function App() {
  return (
    <div className="App">

      <ThemeProvider theme={theme}>

        <Container
          maxWidth="sm"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.background.paper,
            padding: 4
          }}
        >

          <Form
            theme={theme}
          />
          
        </Container>
      
      </ThemeProvider>
    </div>
  );
}

export default App;
