import React from 'react';
import { Box, Typography, styled, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Card = styled(Box)({
  backgroundColor: '#FFFFFF',
  borderRadius: '24px',
  border: '1px solid #9AA4B2',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  minWidth: 0,
  width: '100%',
  overflow: 'hidden'
});

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '16px',
});

const Title = styled(Typography)({
  color: '#282829',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '28px',
});

const EditButton = styled(Button)({
  color: '#004C6F',
  textTransform: 'none',
  padding: '4px 8px',
  gap: '8px',
  '&:hover': {
    backgroundColor: '#F8F9FA',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
  },
});

const Grid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '24px',
  minWidth: 0,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr'
  }
}));

const InfoField = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: 0,
  overflow: 'hidden'
});

const Label = styled(Typography)({
  color: '#697586',
  fontSize: '14px',
  lineHeight: '16px',
});

const Value = styled(Typography)({
  color: '#364152',
  fontSize: '14px',
  lineHeight: '16px',
  fontWeight: 500,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

interface PlanInformationCardProps {
  plan: {
    productType: string;
    planStatus: string;
    cycleDate: string;
    keytag: string;
    arbMonthlyAmount: string;
    remainingPaymentVisits: number;
    vtbc: number;
    keytagId: string;
    careCardExpirationDate: string;
    referredBy: string;
    payment: string;
  };
  onEdit?: () => void;
}

const PlanInformationCard: React.FC<PlanInformationCardProps> = ({ plan, onEdit }) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <Card>
      <Header>
        <Title>Plan Information</Title>
        <EditButton startIcon={<EditIcon />} onClick={handleEdit}>
          Edit
        </EditButton>
      </Header>

      <Grid>
        <InfoField>
          <Label>Product Type</Label>
          <Value>{plan.productType}</Value>
        </InfoField>

        <InfoField>
          <Label>Plan Status</Label>
          <Value>{plan.planStatus}</Value>
        </InfoField>

        <InfoField>
          <Label>Cycle Date</Label>
          <Value>{plan.cycleDate}</Value>
        </InfoField>

        <InfoField>
          <Label>Keytag</Label>
          <Value>{plan.keytag}</Value>
        </InfoField>

        <InfoField>
          <Label>Keytag ID</Label>
          <Value>{plan.keytagId}</Value>
        </InfoField>

        <InfoField>
          <Label>ARB Monthly Amount</Label>
          <Value>{plan.arbMonthlyAmount}</Value>
        </InfoField>

        <InfoField>
          <Label>Remaining Payment Visits</Label>
          <Value>{plan.remainingPaymentVisits}</Value>
        </InfoField>

        <InfoField>
          <Label>VTBC</Label>
          <Value>{plan.vtbc}</Value>
        </InfoField>

        <InfoField style={{ gridColumn: 'span 2' }}>
          <Label>Care Card Expiration Date</Label>
          <Value>{plan.careCardExpirationDate}</Value>
        </InfoField>

        <InfoField>
          <Label>Referred By</Label>
          <Value>{plan.referredBy}</Value>
        </InfoField>

        <InfoField>
          <Label>Payment</Label>
          <Value>{plan.payment}</Value>
        </InfoField>
      </Grid>
    </Card>
  );
};

export default PlanInformationCard; 