import React from 'react';
import { 
  Box, 
  IconButton, 
  Typography,
  styled,
  Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logo from '../icons/Logo';
import NotificationsIcon from '../icons/Notifications';
import GetFeedbackIcon from '../icons/GetFeedback';
import ProfileImage from '../icons/ProfileImage';
import AddIcon from '../icons/Add';
import { SearchInput } from '../SearchInput';
import { Patient } from '../../types/patient';
import { useLeftPaneContext } from '../LeftPane/LeftPaneContext';

const HeaderWrapper = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: 76,
  backgroundColor: '#FFFFFF',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  padding: '0 24px',
});

const LogoSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const OrganizationSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F6F6FA',
  borderRadius: '8px',
  padding: '10px',
  gap: '4px',
  marginLeft: '8px',
});

const Divider = styled(Box)({
  width: 1,
  height: 32,
  backgroundColor: '#E5E7EB',
  margin: '0 32px',
});

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

const Header: React.FC = () => {
  const { addPatientToQueue } = useLeftPaneContext();

  const handleAddToQueue = (patient: Patient) => {
    addPatientToQueue?.(patient);
  };

  return (
    <HeaderWrapper>
      <LogoSection>
        <Logo />
        <Typography sx={{ color: '#282829', fontWeight: 500 }}>ALIGN</Typography>
        <Box sx={{ width: 2, height: 24, bgcolor: '#E2E2E6', mx: 1 }} />
        <OrganizationSection>
          <Typography sx={{ color: '#282829' }}>Gotham Clinic</Typography>
          <KeyboardArrowDownIcon sx={{ color: '#282829' }} />
        </OrganizationSection>
      </LogoSection>
      <Box sx={{ 
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        <SearchInput onAddToQueue={handleAddToQueue} />
      </Box>
      <Box sx={{ flex: 1 }} />
      <AddPatientButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AddIcon />
          <Typography>Create Patient</Typography>
        </Box>
      </AddPatientButton>
      <Divider sx={{marginRight: '16px'}} />
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
    </HeaderWrapper>
  );
};

export default Header; 