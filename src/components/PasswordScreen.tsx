import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  styled,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
}));

const PasswordWrapper = styled(Box)({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F6F6FA',
  padding: '16px',
});

interface PasswordScreenProps {
  onPasswordCorrect: () => void;
  correctPassword?: string;
}

const PasswordScreen: React.FC<PasswordScreenProps> = ({ 
  onPasswordCorrect,
  correctPassword = 'TJC25' // Default password
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setError(false);
      onPasswordCorrect();
    } else {
      setError(true);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PasswordWrapper>
      <StyledPaper elevation={3}>
        <Typography variant="h5" align="center" color="primary" gutterBottom>
          Welcome to TJC Healthcare
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary">
          Please enter the password to access the application
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            error={error}
            helperText={error ? 'Incorrect password' : ' '}
            placeholder="Enter password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Enter Application
          </Button>
        </form>
      </StyledPaper>
    </PasswordWrapper>
  );
};

export default PasswordScreen; 