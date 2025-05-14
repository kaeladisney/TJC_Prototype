import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardTile from './DashboardTile';
import { DailyPerformance } from '../Performance/DailyPerformance';

type TimeFilter = 'Daily' | 'Monthly';

export const Home: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('Daily');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (value?: TimeFilter) => {
    if (value) {
      setTimeFilter(value);
    }
    setFilterAnchorEl(null);
  };

  const filterButton = (
    <>
      <Button
        endIcon={<ExpandMoreIcon />}
        onClick={handleFilterClick}
        size="small"
        sx={{
          bgcolor: 'grey.100',
          color: 'text.primary',
          minWidth: 'auto',
          padding: '4px 12px',
          '&:hover': {
            bgcolor: 'grey.200',
          },
        }}
      >
        {timeFilter}
      </Button>
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => handleFilterClose()}
      >
        <MenuItem onClick={() => handleFilterClose('Daily')}>Daily</MenuItem>
        <MenuItem onClick={() => handleFilterClose('Monthly')}>Monthly</MenuItem>
      </Menu>
    </>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Hello, Sarah
      </Typography>
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 3,
        }}
      >
        <DashboardTile title="Appointments Today">
          <Box sx={{ p: 2 }}>
            {/* Appointments content */}
          </Box>
        </DashboardTile>
        
        <DashboardTile title="In-Clinic Doctors">
          <Box sx={{ p: 2 }}>
            {/* Doctors content */}
          </Box>
        </DashboardTile>
        
        <DashboardTile 
          title="Clinic Performance" 
          isLarge
          headerContent={filterButton}
        >
          <DailyPerformance 
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          />
        </DashboardTile>
        
        <DashboardTile 
          title="Tasks and Reminders" 
          isLarge 
          showAddButton
        >
          {/* TasksAndReminders component will be implemented separately */}
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Tasks and Reminders</Typography>
          </Box>
        </DashboardTile>
      </Box>
    </Box>
  );
}; 