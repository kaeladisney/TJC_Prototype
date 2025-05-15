import React, { useState } from 'react';
import { Box, Typography, styled, Tabs, Tab, Badge } from '@mui/material';

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

const StyledTabs = styled(Tabs)({
  minHeight: '44px',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const StyledTab = styled(Tab)({
  minHeight: '44px',
  padding: '12px',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  color: '#364152',
  borderRadius: '8px',
  '&.Mui-selected': {
    backgroundColor: '#F2F4F7',
    color: '#364152',
  },
  '& .MuiTab-iconWrapper': {
    margin: '0 0 0 8px',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiBadge-root': {
    padding: 0,
  },
  '& .MuiBadge-badge': {
    position: 'relative',
    transform: 'none',
    marginLeft: '4px',
  },
});

const DateGroup = styled(Typography)({
  color: '#697586',
  fontSize: '14px',
  lineHeight: '20px',
  marginBottom: '4px',
});

const ActivityList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '12px 0',
});

const ActivityGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const ActivityItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const ActivityLabel = styled(Typography)({
  color: '#697586',
  fontSize: '14px',
  lineHeight: '20px',
});

const ActivityDescription = styled(Typography)({
  color: '#364152',
  fontSize: '14px',
  lineHeight: '20px',
});

interface Activity {
  type: string;
  description: string;
  date: Date;
}

interface ActivityGroup {
  label: string;
  activities: Activity[];
}

interface ActivitiesCardProps {
  activities: Activity[];
}

const ActivitiesCard: React.FC<ActivitiesCardProps> = ({ activities }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const groupActivitiesByDate = (activities: Activity[]): ActivityGroup[] => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const groups: { [key: string]: Activity[] } = {
      'Tomorrow': [],
      'In 5 days': [],
      'Later': [],
    };

    activities.forEach(activity => {
      const diffDays = Math.floor((activity.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        groups['Tomorrow'].push(activity);
      } else if (diffDays === 5) {
        groups['In 5 days'].push(activity);
      } else {
        groups['Later'].push(activity);
      }
    });

    return Object.entries(groups)
      .filter(([_, activities]) => activities.length > 0)
      .map(([label, activities]) => ({ label, activities }));
  };

  const filteredActivities = activities.filter(activity => {
    const today = new Date();
    const activityDate = activity.date;
    
    switch (selectedTab) {
      case 0: // All
        return true;
      case 1: // Past
        return activityDate < today;
      case 2: // Upcoming
        return activityDate >= today;
      case 3: // Overdue
        return activityDate < today;
      default:
        return true;
    }
  });

  const groupedActivities = groupActivitiesByDate(filteredActivities);
  const upcomingCount = activities.filter(a => a.date >= new Date()).length;
  const overdueCount = activities.filter(a => a.date < new Date()).length;

  return (
    <Card>
      <Title>Activities</Title>
      <StyledTabs value={selectedTab} onChange={handleTabChange}>
        <StyledTab label="All" />
        <StyledTab label="Past" />
        <StyledTab 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              Upcoming
              {upcomingCount > 0 && (
                <Badge 
                  badgeContent={upcomingCount} 
                  color="primary"
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
          }
        />
        <StyledTab 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              Overdue
              {overdueCount > 0 && (
                <Badge 
                  badgeContent={overdueCount} 
                  color="error"
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
          }
        />
      </StyledTabs>

      <ActivityList>
        {groupedActivities.map((group, index) => (
          <ActivityGroup key={index}>
            <DateGroup>{group.label}</DateGroup>
            {group.activities.map((activity, activityIndex) => (
              <ActivityItem key={activityIndex}>
                <ActivityLabel>{activity.type}:</ActivityLabel>
                <ActivityDescription>{activity.description}</ActivityDescription>
              </ActivityItem>
            ))}
          </ActivityGroup>
        ))}
      </ActivityList>
    </Card>
  );
};

export default ActivitiesCard; 