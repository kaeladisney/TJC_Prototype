import React from 'react';
import { Box, Typography, styled, Checkbox, FormControlLabel } from '@mui/material';

const Container = styled(Box)({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  backgroundColor: '#FFFFFF',
});

const Section = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const SectionTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 500,
  color: '#282829',
  marginBottom: '8px',
});

const SubSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const SubSectionTitle = styled(Typography)({
  fontSize: '16px',
  fontWeight: 500,
  color: '#282829',
});

const CheckboxGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const StyledFormControlLabel = styled(FormControlLabel)({
  margin: 0,
  '& .MuiTypography-root': {
    fontSize: '14px',
    color: '#364152',
  },
  '& .MuiCheckbox-root': {
    padding: '0 12px 0 0',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
  },
});

interface SettingsProps {
  patientId: string;
}

export const Settings: React.FC<SettingsProps> = ({ patientId }) => {
  return (
    <Container>
      <Section>
        <SectionTitle>Communication Management</SectionTitle>
        
        <SubSection>
          <SubSectionTitle>General News and Happenings</SubSectionTitle>
          <CheckboxGroup>
            <StyledFormControlLabel
              control={<Checkbox />}
              label="Clinic updates and announcements"
            />
            <StyledFormControlLabel
              control={<Checkbox />}
              label="Community events and workshops"
            />
            <StyledFormControlLabel
              control={<Checkbox />}
              label="Health tips and wellness resources"
            />
            <StyledFormControlLabel
              control={<Checkbox />}
              label="Newsletter subscription"
            />
          </CheckboxGroup>
        </SubSection>

        <SubSection>
          <SubSectionTitle>Promotions and Offers</SubSectionTitle>
          <CheckboxGroup>
            <StyledFormControlLabel
              control={<Checkbox />}
              label="Special discounts and deals"
            />
            <StyledFormControlLabel
              control={<Checkbox />}
              label="Seasonal promotions"
            />
            <StyledFormControlLabel
              control={<Checkbox />}
              label="Referral program updates"
            />
            <StyledFormControlLabel
              control={<Checkbox />}
              label="Membership offers"
            />
          </CheckboxGroup>
        </SubSection>

        <SubSection>
          <SubSectionTitle>Miscellaneous Educational Materials</SubSectionTitle>
          <CheckboxGroup>
            <StyledFormControlLabel
              control={<Checkbox />}
              label="Exercise guides and tutorials"
            />
            <StyledFormControlLabel
              control={<Checkbox />}
              label="Nutrition and lifestyle tips"
            />
            <StyledFormControlLabel
              control={<Checkbox />}
              label="Research updates and findings"
            />
            <StyledFormControlLabel
              control={<Checkbox />}
              label="Wellness articles and blog posts"
            />
          </CheckboxGroup>
        </SubSection>
      </Section>
    </Container>
  );
}; 