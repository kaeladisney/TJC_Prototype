import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  styled,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { format, subDays, isToday, isYesterday } from 'date-fns';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
  backgroundColor: '#FFFFFF',
});

const ContentWrapper = styled(Box)({
  width: '100%',
  maxWidth: '1382px',
  margin: '0 auto',
  padding: '0 32px',
});

const SearchInput = styled(Box)({
  width: 300,
  height: 44,
  backgroundColor: '#FFFFFF',
  border: '1px solid #CDD5DF',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '0 12px',
  boxShadow: 'inset 1px 2px 2px rgba(0, 0, 0, 0.08)',
  '& .MuiSvgIcon-root': {
    color: '#364152',
    fontSize: 16,
  },
  '& input': {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: 14,
    color: '#364152',
    '&::placeholder': {
      color: '#697586',
    },
  },
});

const Controls = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 92,
  padding: '24px',
});

const FilterControls = styled(Box)({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
});

const FilterButton = styled(Button)({
  height: '40px',
  backgroundColor: '#F2F4F7',
  color: '#004C6F',
  textTransform: 'none',
  padding: '10px 16px',
  borderRadius: '8px',
  gap: '8px',
  '&:hover': {
    backgroundColor: '#E4E7EC',
  },
  '& .MuiSvgIcon-root': {
    color: '#364152',
    fontSize: 20,
  },
});

const DateGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  '&:not(:last-child)': {
    marginBottom: '32px',
  },
});

const DateLabel = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  color: '#697586',
  marginBottom: '8px',
});

const HistoryEntry = styled(Box)({
  display: 'flex',
  gap: '16px',
  padding: '16px 0',
  borderBottom: '1px solid #E4E7EC',
  '&:last-child': {
    borderBottom: 'none',
    paddingBottom: 0,
  },
  '&:first-of-type': {
    paddingTop: 0,
  },
});

const TimeStamp = styled(Typography)({
  fontSize: '14px',
  color: '#697586',
  minWidth: '70px',
});

const EventContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const EventSummary = styled(Typography)({
  fontSize: '14px',
  color: '#364152',
  '& .link': {
    color: '#004C6F',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const EventType = styled(Typography)({
  fontSize: '14px',
  color: '#697586',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '&::before': {
    content: '""',
    width: '4px',
    height: '4px',
    backgroundColor: '#697586',
    borderRadius: '50%',
  },
});

interface HistoryEvent {
  id: string;
  timestamp: Date;
  description: string;
  type: string;
  context?: string;
}

interface PatientHistoryProps {
  patientId: string;
}

// Helper function to format the date label
const formatDateLabel = (date: Date): string => {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'EEE, MMM d, yyyy');
};

// Helper function to generate random history events
const generateHistoryEvents = (patientId: string): HistoryEvent[] => {
  const events: HistoryEvent[] = [];
  const types = ['Purchase', 'Visit', 'Notes', 'Form Submission', 'Payment', 'Appointment'];
  const clinics = ['Gotham Clinic', 'Metropolis Wellness', 'Central City Health'];
  const doctors = ['Dr. Sarah Miller', 'Dr. John Wayne', 'Dr. Emily Parker'];

  // Generate 20 random events over the last 30 days
  for (let i = 0; i < 20; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 12);
    const minutesAgo = Math.floor(Math.random() * 60);
    const timestamp = subDays(new Date(), daysAgo);
    timestamp.setHours(9 + hoursAgo, minutesAgo);

    const type = types[Math.floor(Math.random() * types.length)];
    const clinic = clinics[Math.floor(Math.random() * clinics.length)];
    const doctor = doctors[Math.floor(Math.random() * doctors.length)];

    let description = '';
    let context = '';

    switch (type) {
      case 'Purchase':
        description = `Purchased a 6 Pack at <span class="link">${clinic}</span>`;
        break;
      case 'Visit':
        description = `Visit with <span class="link">${doctor}</span> at <span class="link">${clinic}</span>`;
        context = 'Regular adjustment visit';
        break;
      case 'Notes':
        description = `Clinical notes updated by <span class="link">${doctor}</span>`;
        context = 'Updated treatment plan and progress notes';
        break;
      case 'Form Submission':
        description = 'Completed intake form';
        break;
      case 'Payment':
        description = `Processed payment for visit at <span class="link">${clinic}</span>`;
        context = 'Amount: $75.00';
        break;
      case 'Appointment':
        description = `Scheduled appointment with <span class="link">${doctor}</span>`;
        context = `Next visit at ${clinic}`;
        break;
    }

    events.push({
      id: `${patientId}-${i}`,
      timestamp,
      description,
      type,
      context,
    });
  }

  // Sort events by timestamp (most recent first)
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const PatientHistory: React.FC<PatientHistoryProps> = ({ patientId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState('last30Days');

  // Generate events based on patient ID
  const allEvents = useMemo(() => generateHistoryEvents(patientId), [patientId]);

  // Filter events based on search query and selected filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const matchesSearch = searchQuery === '' ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.context && event.context.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilters = selectedFilters.length === 0 ||
        selectedFilters.includes(event.type);

      return matchesSearch && matchesFilters;
    });
  }, [allEvents, searchQuery, selectedFilters]);

  // Group events by date
  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: HistoryEvent[] } = {};
    
    filteredEvents.forEach(event => {
      const dateKey = format(event.timestamp, 'yyyy-MM-dd');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(event);
    });

    return groups;
  }, [filteredEvents]);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterToggle = (type: string) => {
    setSelectedFilters(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <Container>
      <ContentWrapper>
        <Controls>
          <SearchInput>
            <SearchIcon />
            <input
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInput>

          <FilterControls>
            <FilterButton
              startIcon={<FilterIcon />}
              onClick={handleFilterClick}
            >
              Filter
            </FilterButton>

            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {['Purchase', 'Visit', 'Notes', 'Form Submission', 'Payment', 'Appointment'].map((type) => (
                <MenuItem
                  key={type}
                  onClick={() => handleFilterToggle(type)}
                  sx={{
                    backgroundColor: selectedFilters.includes(type) ? '#F2F4F7' : 'transparent',
                  }}
                >
                  {type}
                </MenuItem>
              ))}
            </Menu>

            <FilterButton
              startIcon={<CalendarIcon />}
            >
              Last 30 Days
            </FilterButton>
          </FilterControls>
        </Controls>

        <Box sx={{ flex: 1, overflowY: 'auto', padding: '0 32px' }}>
          {Object.entries(groupedEvents).map(([dateKey, events]) => (
            <DateGroup key={dateKey}>
              <DateLabel>
                {formatDateLabel(new Date(dateKey))}
              </DateLabel>
              {events.map((event) => (
                <HistoryEntry key={event.id}>
                  <TimeStamp>
                    {format(event.timestamp, 'h:mm a')}
                  </TimeStamp>
                  <EventContent>
                    <EventSummary dangerouslySetInnerHTML={{ __html: event.description }} />
                    {event.context && (
                      <Typography sx={{ fontSize: '14px', color: '#697586' }}>
                        {event.context}
                      </Typography>
                    )}
                    <EventType>{event.type}</EventType>
                  </EventContent>
                </HistoryEntry>
              ))}
            </DateGroup>
          ))}
        </Box>
      </ContentWrapper>
    </Container>
  );
}; 