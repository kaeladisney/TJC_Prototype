import React from 'react';
import { Box, Typography, LinearProgress, styled } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { PerformanceMetric } from '../../types/performance';

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 16,
  borderRadius: 1000,
  backgroundColor: theme.palette.grey[100],
  '& .MuiLinearProgress-bar': {
    borderRadius: 1000,
  },
}));

const TrendBadge = styled(Box)<{ isPositive: boolean }>(({ theme, isPositive }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 8px',
  borderRadius: 9999,
  backgroundColor: isPositive ? 'rgba(5, 122, 85, 0.1)' : 'rgba(211, 47, 47, 0.1)',
  color: isPositive ? theme.palette.success.main : theme.palette.error.main,
  gap: 4,
  fontSize: 14,
}));

interface Props {
  metric: PerformanceMetric;
}

const formatValue = (value: number, type: PerformanceMetric['type']): string => {
  switch (type) {
    case 'currency':
      return `$${value.toLocaleString()}`;
    case 'percentage':
      return `${value}%`;
    default:
      return value.toLocaleString();
  }
};

export const PerformanceMetricCard: React.FC<Props> = ({ metric }) => {
  const progress = (metric.value / metric.goal) * 100;
  
  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: 2,
        bgcolor: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        flex: 1,
        minWidth: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2" color="text.secondary" noWrap>
        {metric.title}
      </Typography>
      
      <Box sx={{ minWidth: 0 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'baseline', 
          gap: 0.5, 
          mb: 1,
          flexWrap: 'wrap'
        }}>
          <Typography 
            variant="h6" 
            component="span" 
            sx={{ 
              fontWeight: 'bold',
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {formatValue(metric.value, metric.type)}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            of {formatValue(metric.goal, metric.type)}
          </Typography>
        </Box>
        
        <StyledLinearProgress
          variant="determinate"
          value={Math.min(progress, 100)}
          sx={{
            '& .MuiLinearProgress-bar': {
              bgcolor: metric.color || '#024C6F',
            },
          }}
        />
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        flexWrap: 'wrap'
      }}>
        <TrendBadge isPositive={metric.trend.isPositive}>
          {metric.trend.isPositive ? (
            <TrendingUpIcon fontSize="small" />
          ) : (
            <TrendingDownIcon fontSize="small" />
          )}
          {metric.trend.percentage}%
        </TrendBadge>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          compared to {metric.comparisonPeriod}
        </Typography>
      </Box>
    </Box>
  );
}; 