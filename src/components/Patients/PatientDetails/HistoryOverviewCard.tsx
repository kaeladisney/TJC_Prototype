import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const Card = styled(Box)({
  backgroundColor: '#FFFFFF',
  borderRadius: '24px',
  border: '1px solid #9AA4B2',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const Title = styled(Typography)({
  color: '#282829',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '28px',
});

const MembershipDate = styled(Typography)({
  color: '#444445',
  fontSize: '14px',
  lineHeight: '17px',
});

const MetricsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '8px',
});

const MetricRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  height: '34px',
});

const MetricLabel = styled(Typography)({
  color: '#282829',
  fontSize: '14px',
  fontWeight: 500,
  width: '92px',
  flexShrink: 0,
});

const ValuesContainer = styled(Box)({
  display: 'flex',
  flex: 1,
  gap: '12px',
});

const ValueColumn = styled(Box)({
  display: 'flex',
  flex: 1,
  paddingLeft: '32px',
});

const Value = styled(Typography)({
  color: '#444445',
  fontSize: '14px',
  lineHeight: '17px',
});

interface HistoryOverviewCardProps {
  memberSince: string;
  metrics: {
    totalVisits: {
      ytd: number;
      thisMonth: number;
    };
    totalPurchases: {
      ytd: number;
      thisMonth: number;
    };
  };
}

const HistoryOverviewCard: React.FC<HistoryOverviewCardProps> = ({
  memberSince,
  metrics,
}) => {
  return (
    <Card>
      <Title>History Overview</Title>
      <MembershipDate>Member since {memberSince}</MembershipDate>
      
      <Box sx={{ display: 'flex', gap: '12px' }}>
        <Box sx={{ flex: 1, paddingLeft: '92px' }}>
          <Value>YTD</Value>
        </Box>
        <Box sx={{ flex: 1, paddingLeft: '32px' }}>
          <Value>This Month</Value>
        </Box>
      </Box>

      <MetricsContainer>
        <MetricRow>
          <MetricLabel>Total Visits</MetricLabel>
          <ValuesContainer>
            <ValueColumn>
              <Value>{metrics.totalVisits.ytd}</Value>
            </ValueColumn>
            <ValueColumn>
              <Value>{metrics.totalVisits.thisMonth}</Value>
            </ValueColumn>
          </ValuesContainer>
        </MetricRow>

        <MetricRow>
          <MetricLabel>Total Purchases</MetricLabel>
          <ValuesContainer>
            <ValueColumn>
              <Value>{metrics.totalPurchases.ytd}</Value>
            </ValueColumn>
            <ValueColumn>
              <Value>{metrics.totalPurchases.thisMonth}</Value>
            </ValueColumn>
          </ValuesContainer>
        </MetricRow>
      </MetricsContainer>
    </Card>
  );
};

export default HistoryOverviewCard; 