import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  InputBase, 
  IconButton, 
  Typography,
  styled,
  alpha,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logo from '../icons/Logo';
import NotificationsIcon from '../icons/Notifications';
import GetFeedbackIcon from '../icons/GetFeedback';
import ProfileImage from '../icons/ProfileImage';
import AddIcon from '../icons/Add';
import { margin } from '@mui/system';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  height: 76,
  justifyContent: 'center'
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 100,
  backgroundColor: alpha('#F6F6FA', 1),
  width: 730,
  height: 44,
  display: 'flex',
  alignItems: 'center',
  padding: '0 6px'
}));

const SearchField = styled(InputBase)(({ theme }) => ({
  width: 170,
  height: 30,
  '& .MuiInputBase-input': {
    color: '#777779',
    padding: '4px 8px',
    fontSize: '14px',
    '&::placeholder': {
      color: '#777779',
      opacity: 1,
    },
  },
}));

const Divider = styled('div')({
  width: 2,
  height: 20,
  backgroundColor: '#E2E2E6',
  margin: '0 0'
});

const SearchButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#004C6F',
  width: 32,
  height: 32,
  marginLeft: 'auto',
  '&:hover': {
    backgroundColor: '#003B56',
  },
  '& .MuiSvgIcon-root': {
    color: '#FFFFFF',
    fontSize: 22
  }
}));

const AddPatientButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  border: '1px solid #636366',
  borderRadius: 8,
  height: 38,
  padding: '8px 12px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#F6F6FA',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
    color: '#282829',
    marginRight: 12
  },
  '& .MuiTypography-root': {
    color: '#282829',
    fontSize: 14,
    fontWeight: 400

  }
}));

const VerticalDivider = styled('div')({
  width: 1,
  height: 33,
  backgroundColor: '#D9D9D9',
  margin: '0 8px'
});

const IconButtonContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  '& .MuiIconButton-root': {
    width: 44,
    height: 44,
    '& .MuiSvgIcon-root': {
      fontSize: 24,
      color: '#282829'
    }
  }
});

const UserAvatar = styled('div')({
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: '#00BEE3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: '#282829',
    bottom: 4,
    left: '50%',
    transform: 'translateX(-50%)'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 2,
    height: 8,
    backgroundColor: '#282829',
    bottom: 1,
    left: '50%',
    transform: 'translateX(-50%)'
  }
});

const Header: React.FC = () => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between', height: '100%' }}>
        {/* Logo and Organization Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Logo width={20} height={26} />
          <Typography sx={{ color: '#282829', mx: 0.5 }}>ALIGN</Typography>
          <Box sx={{ width: 2, height: 24, bgcolor: '#E2E2E6', mx: 1 }} />
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            bgcolor: '#F6F6FA', 
            borderRadius: 2,
            p: '10px',
            gap: 1
          }}>
            <Typography sx={{ color: '#282829' }}>Gotham Clinic</Typography>
            <KeyboardArrowDownIcon sx={{ color: '#282829' }} />
          </Box>
        </Box>

        {/* Search Bar */}
        <Search>
          <SearchField placeholder="First Name" />
          <Divider />
          <SearchField placeholder="Last Name" />
          <Divider />
          <SearchField placeholder="Date of Birth" />
          <Divider />
          <SearchField placeholder="Phone Number" />
          <SearchButton>
            <SearchIcon />
          </SearchButton>
        </Search>

        {/* User Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AddPatientButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AddIcon />
              <Typography>Create Patient</Typography>
            </Box>
          </AddPatientButton>
          <VerticalDivider />
          <IconButtonContainer>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <GetFeedbackIcon />
            </IconButton>
            <IconButton>
              <ProfileImage />
            </IconButton>
          </IconButtonContainer>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header; 