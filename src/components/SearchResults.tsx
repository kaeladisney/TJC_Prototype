import React from 'react';
import { Box, Typography, Button, styled, Tooltip } from '@mui/material';
import { Patient, StatusBadgeType } from '../types/patient';
import AddIcon from '@mui/icons-material/Add';
import { STATUS_COLORS, StatusColorKey } from '../constants/statusColors';
import { useNavigation } from '../context/NavigationContext';

const ResultsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  width: 730,
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  marginTop: 4,
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  zIndex: 1000,
  overflow: 'hidden',
}));

const ResultItem = styled(Box)(({ theme }) => ({
  padding: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #E5E7EB',
  cursor: 'pointer',
  '&:last-child': {
    borderBottom: 'none',
  },
  '&:hover': {
    backgroundColor: '#F8FAFC',
  },
}));

const PatientInfo = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
});

const Avatar = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: '#024C6F',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  marginTop: 4,
});

const AvatarText = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: '#FCFCFD',
});

const InfoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

const PatientName = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: '#364152',
  lineHeight: '20px',
});

const BadgesContainer = styled(Box)({
  display: 'flex',
  gap: 4,
});

const DetailsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '8px 16px',
});

const DetailItem = styled(Box)({
  display: 'flex',
  gap: 4,
});

const DetailLabel = styled(Typography)({
  fontSize: 12,
  color: '#697586',
  fontWeight: 400,
});

const DetailValue = styled(Typography)({
  fontSize: 12,
  color: '#364152',
  fontWeight: 400,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '120px',
});

const StatusBadge = styled(Box)<{ color: string; bgColor: string }>(({ color, bgColor }) => ({
  height: 24,
  padding: '4px 8px',
  borderRadius: 9999,
  backgroundColor: bgColor,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

const BadgeText = styled(Typography)({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '16px',
});

const AddButton = styled(Button)({
  height: 36,
  padding: '8px 12px',
  borderRadius: 8,
  backgroundColor: '#FFFFFF',
  border: '1px solid #636366',
  color: '#282829',
  textTransform: 'none',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#F6F6FA',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
    marginRight: 4,
  },
});

interface SearchResultsProps {
  results: Patient[];
  onAddToQueue: (patient: Patient) => void;
  onClose: () => void;
}

const getStatusColor = (type: StatusBadgeType): string => {
  const statusColor = STATUS_COLORS[type as StatusColorKey];
  return statusColor?.color || '#364152';
};

const getStatusBgColor = (type: StatusBadgeType): string => {
  const statusColor = STATUS_COLORS[type as StatusColorKey];
  return statusColor?.bgColor || '#EEF2F6';
};

const getStatusLabel = (type: StatusBadgeType): string => {
  return type;
};

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onAddToQueue, onClose }) => {
  const { navigateToPatientDetails } = useNavigation();

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const renderDetailValue = (value: string | undefined, maxLength: number) => {
    const displayText = value || 'Not specified';
    const truncatedText = truncateText(displayText, maxLength);
    const isTextTruncated = displayText.length > maxLength;

    return isTextTruncated ? (
      <Tooltip title={displayText} placement="top">
        <DetailValue>{truncatedText}</DetailValue>
      </Tooltip>
    ) : (
      <DetailValue>{displayText}</DetailValue>
    );
  };

  const handlePatientClick = (patient: Patient, event: React.MouseEvent) => {
    event.stopPropagation();
    navigateToPatientDetails(patient.id);
    onClose();
  };

  return (
    <ResultsContainer>
      {results.map(patient => (
        <ResultItem key={patient.id} onClick={(e) => handlePatientClick(patient, e)}>
          <PatientInfo>
            <Avatar>
              <AvatarText>{patient.initials}</AvatarText>
            </Avatar>
            <InfoContainer>
              <PatientName>{patient.name}</PatientName>
              <BadgesContainer>
                {patient.statusBadges.map((badge, index) => (
                  <StatusBadge
                    key={index}
                    color={getStatusColor(badge.type)}
                    bgColor={getStatusBgColor(badge.type)}
                  >
                    <BadgeText sx={{ color: getStatusColor(badge.type) }}>
                      {getStatusLabel(badge.type)}
                    </BadgeText>
                  </StatusBadge>
                ))}
              </BadgesContainer>
              <DetailsGrid>
                <DetailItem>
                  <DetailLabel>DC Preference:</DetailLabel>
                  {renderDetailValue(patient.details?.dcPreference, 15)}
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Plan Type:</DetailLabel>
                  {renderDetailValue(patient.details?.planType, 15)}
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Visits Left:</DetailLabel>
                  {renderDetailValue(patient.details?.visitsLeft, 15)}
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Home Clinic:</DetailLabel>
                  {renderDetailValue(patient.details?.homeClinic, 15)}
                </DetailItem>
              </DetailsGrid>
            </InfoContainer>
          </PatientInfo>
          <AddButton
            onClick={(e) => {
              e.stopPropagation();
              onAddToQueue(patient);
            }}
            startIcon={<AddIcon />}
          >
            Add to Queue
          </AddButton>
        </ResultItem>
      ))}
    </ResultsContainer>
  );
}; 