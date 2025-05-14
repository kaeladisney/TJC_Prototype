import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Collapse,
  styled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PerformanceMetricCard } from './PerformanceMetricCard';
import { defaultMetrics } from '../../types/performance';

const FilterButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.primary,
  minWidth: 'auto',
  padding: '4px 12px',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

type TimeFilter = 'Daily' | 'Monthly';

interface Props {
  timeFilter: TimeFilter;
  onTimeFilterChange: (filter: TimeFilter) => void;
}

export const DailyPerformance: React.FC<Props> = ({ timeFilter, onTimeFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showMore, setShowMore] = useState(false);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (value?: TimeFilter) => {
    if (value) {
      onTimeFilterChange(value);
    }
    setAnchorEl(null);
  };

  const visibleMetrics = showMore ? defaultMetrics : defaultMetrics.slice(0, 6);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {visibleMetrics.map((metric) => (
          <PerformanceMetricCard key={metric.id} metric={metric} />
        ))}
      </Box>

      {defaultMetrics.length > 6 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 1,
            cursor: 'pointer',
          }}
          onClick={() => setShowMore(!showMore)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              endIcon={
                <ExpandMoreIcon
                  sx={{
                    transform: showMore ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s',
                  }}
                />
              }
            >
              {showMore ? 'Show Less' : 'See More'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}; 