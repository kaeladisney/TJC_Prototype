import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, styled } from '@mui/material';
import Header from './components/Header';
import Content from './components/Content';
import LeftPane from './components/LeftPane';
import PasswordScreen from './components/PasswordScreen';
import { LeftPaneProvider } from './components/LeftPane/LeftPaneContext';
import { NavigationProvider } from './context/NavigationContext';
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
  height: 'calc(100vh - 76px)', // Subtract header height
  backgroundColor: '#F6F6FA',
  marginTop: 76, // Height of the header
  overflow: 'hidden', // Prevent body scroll
  '& > *': {
    flex: 'none', // Prevent flex growing/shrinking
  }
});

const MainContent = styled(Box)({
  flex: 1, // Take remaining space
  minWidth: 0, // Prevent overflow
  height: '100%',
  overflow: 'hidden', // Container for content scroll
  display: 'flex',
  flexDirection: 'column',
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user was previously authenticated in this session
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    // Update session storage when authentication state changes
    sessionStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PasswordScreen onPasswordCorrect={() => setIsAuthenticated(true)} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavigationProvider>
        <LeftPaneProvider>
          <Box sx={{ height: '100vh', overflow: 'hidden' }}>
            <Header />
            <AppWrapper>
              <MainContent>
                <Content />
              </MainContent>
              <LeftPane />
            </AppWrapper>
          </Box>
        </LeftPaneProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
};

export default App; 