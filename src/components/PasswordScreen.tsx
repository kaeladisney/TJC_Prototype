import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  styled
} from '@mui/material';
import LoginImage from '../images/LoginImage.png';
import LoginBgdFull from '../images/LoginBgdFull.png';

const RootWrapper = styled(Box)({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  position: 'relative',
  background: `url(${LoginBgdFull}) no-repeat center center`,
  backgroundSize: 'cover',
});

const LeftPane = styled(Box)(({ theme }) => ({
  flex: '0 0 40%',
  maxWidth: '40vw',
  minWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0 7vw',
  position: 'relative',
  zIndex: 1,
}));

const RightPane = styled(Box)(({ theme }) => ({
  flex: '0 0 60%',
  maxWidth: '60vw',
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1,
}));

const LoginForm = styled(Paper)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const LoginButton = styled(Button)(({ theme }) => ({
  background: '#014B6E',
  color: '#fff',
  fontWeight: 600,
  fontSize: 18,
  borderRadius: 6,
  padding: '12px 0',
  marginTop: theme.spacing(2),
  '&:disabled': {
    background: '#b0bec5',
    color: '#fff',
  },
}));

const ImageBox = styled(Box)({
  width: '90%',
  height: '85%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginRight: 50,
  marginBottom: 50,
});

interface PasswordScreenProps {
  onPasswordCorrect: () => void;
}

const PasswordScreen: React.FC<PasswordScreenProps> = ({
  onPasswordCorrect,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'TJC25') {
      setError(false);
      onPasswordCorrect();
    } else {
      setError(true);
    }
  };

  const isLoginDisabled = !username || !password;

  return (
    <RootWrapper>
      <LeftPane>
        <Box mb={5}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#363A3D', mb: 1 }}>
            The Joint Chiropractic Front Office
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 700, color: '#363A3D', mb: 3, fontSize: 48 }}>
            Welcome
          </Typography>
        </Box>
        <LoginForm>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              margin="normal"
              autoComplete="username"
            />
            <TextField
              fullWidth
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              margin="normal"
              autoComplete="current-password"
              error={error}
              helperText={error ? 'Incorrect username or password' : ' '}
            />
            <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
              <Link href="#" variant="body2" underline="hover" sx={{ fontWeight: 500 }}>
                Forgot password?
              </Link>
            </Box>
            <LoginButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoginDisabled}
            >
              Log in
            </LoginButton>
          </form>
        </LoginForm>
      </LeftPane>
      <RightPane>
        <ImageBox>
          <img src={LoginImage} alt="Login visual" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </ImageBox>
      </RightPane>
    </RootWrapper>
  );
};

export default PasswordScreen; 