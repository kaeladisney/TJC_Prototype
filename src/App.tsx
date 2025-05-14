import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, styled } from '@mui/material';
import Header from './components/Header';
import Content from './components/Content';
import LeftPane from './components/LeftPane';
import { LeftPaneProvider } from './components/LeftPane/LeftPaneContext';
import './styles/fonts.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004C6F',
    },
    secondary: {
      main: '#00BEE3',
    },
    background: {
      default: '#F6F6FA',
    },
  },
  typography: {
    fontFamily: '"Gotham", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: 'Gotham',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Gotham',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Gotham',
      fontWeight: 500,
    },
    h4: {
      fontFamily: 'Gotham',
      fontWeight: 500,
    },
    h5: {
      fontFamily: 'Gotham',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Gotham',
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: 'Gotham',
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: 'Gotham',
      fontWeight: 400,
    },
    body1: {
      fontFamily: 'Gotham',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Gotham',
      fontWeight: 400,
    },
    button: {
      fontFamily: 'Gotham',
      fontWeight: 500,
    },
  },
});

const AppWrapper = styled(Box)({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#F6F6FA',
  paddingTop: 76, // Height of the header
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LeftPaneProvider>
        <Box sx={{ minHeight: '100vh' }}>
          <Header />
          <AppWrapper>
            <LeftPane />
            <Content />
          </AppWrapper>
        </Box>
      </LeftPaneProvider>
    </ThemeProvider>
  );
};

export default App; 