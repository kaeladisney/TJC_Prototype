import React, { useState, useEffect, useRef } from 'react';
import { format, subDays } from 'date-fns';

// Event types
type EventType = 'Purchase' | 'Visit' | 'Notes' | 'Form Submission' | 'Payment' | 'Appointment';

interface HistoryEvent {
  id: string;
  timestamp: Date;
  description: string;
  type: EventType;
  context?: string;
  links?: { text: string; url: string }[];
}

interface PatientHistoryProps {
  patientId: string;
}

// Group events by date
const groupEventsByDate = (events: HistoryEvent[]) => {
  const groups: { [key: string]: HistoryEvent[] } = {};
  events.forEach(event => {
    const dateKey = format(event.timestamp, 'yyyy-MM-dd');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
  });
  return groups;
};

const PatientHistory: React.FC<PatientHistoryProps> = ({ patientId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([]);
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const dateMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
      if (dateMenuRef.current && !dateMenuRef.current.contains(event.target as Node)) {
        setShowDateMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle type selection
  const toggleType = (type: EventType) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Generate mock data
  useEffect(() => {
    console.log('PatientHistory: Generating mock data for patient', patientId);
    const generateMockEvents = () => {
      const eventTypes: EventType[] = ['Purchase', 'Visit', 'Notes', 'Form Submission', 'Payment', 'Appointment'];
      const clinics = ['Gotham Clinic', 'Wayne Medical Center', 'Metropolis Health'];
      const doctors = ['Dr. Will Murillo', 'Dr. Jane Foster', 'Dr. Bruce Banner'];
      const mockEvents: HistoryEvent[] = [];

      // Generate 20 random events over the last 30 days
      for (let i = 0; i < 20; i++) {
        const daysAgo = Math.floor(Math.random() * 30);
        const hoursAgo = Math.floor(Math.random() * 24);
        const minutesAgo = Math.floor(Math.random() * 60);
        const timestamp = subDays(new Date(), daysAgo);
        timestamp.setHours(hoursAgo);
        timestamp.setMinutes(minutesAgo);

        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const clinic = clinics[Math.floor(Math.random() * clinics.length)];
        const doctor = doctors[Math.floor(Math.random() * doctors.length)];

        let description = '';
        let context = '';
        let links: { text: string; url: string }[] = [];

        switch (type) {
          case 'Purchase':
            description = `Purchased a ${Math.floor(Math.random() * 12) + 1} Pack at ${clinic}`;
            links = [{ text: clinic, url: '#' }];
            break;
          case 'Visit':
            description = `Visit with ${doctor} at ${clinic}`;
            context = 'Regular checkup';
            links = [{ text: doctor, url: '#' }, { text: clinic, url: '#' }];
            break;
          case 'Notes':
            description = 'Clinical notes updated';
            context = 'Updated patient history and medication list';
            links = [{ text: 'View notes', url: '#' }];
            break;
          case 'Form Submission':
            description = 'Submitted pre-visit questionnaire';
            links = [{ text: 'View form', url: '#' }];
            break;
          case 'Payment':
            description = `Payment processed for ${clinic}`;
            context = '$150.00';
            links = [{ text: 'View receipt', url: '#' }];
            break;
          case 'Appointment':
            description = `Scheduled appointment with ${doctor}`;
            context = 'Next week';
            links = [{ text: doctor, url: '#' }];
            break;
        }

        mockEvents.push({
          id: `event-${i}`,
          timestamp,
          type,
          description,
          context,
          links
        });
      }

      const sortedEvents = mockEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      console.log('PatientHistory: Generated events:', sortedEvents);
      return sortedEvents;
    };

    setEvents(generateMockEvents());
  }, [patientId]);

  // Filter events based on search query and selected types
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.context && event.context.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(event.type);

    return matchesSearch && matchesType;
  });

  // Filter events based on date range
  const getDateRangeFilter = () => {
    const today = new Date();
    switch (dateRange) {
      case 'Last 7 Days':
        return subDays(today, 7);
      case 'Last 30 Days':
        return subDays(today, 30);
      case 'Last 90 Days':
        return subDays(today, 90);
      case 'Last 12 Months':
        return subDays(today, 365);
      case 'All Time':
        return new Date(0);
      default:
        return subDays(today, 30);
    }
  };

  const dateFilteredEvents = filteredEvents.filter(event => 
    event.timestamp >= getDateRangeFilter()
  );

  // Group events by date
  const groupedEvents = groupEventsByDate(dateFilteredEvents);

  // Format date header
  const formatDateHeader = (date: string) => {
    const eventDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (format(eventDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
      return 'Today';
    } else if (format(eventDate, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) {
      return 'Yesterday';
    }
    return format(eventDate, 'EEE, MMM d, yyyy');
  };

  // Render a single event
  const renderEvent = (event: HistoryEvent) => (
    <div key={event.id} className="flex gap-4 py-4">
      <div className="text-sm text-gray-500 w-20">
        {format(event.timestamp, 'h:mm a')}
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-900">
          {event.description.split(/(\[[^\]]+\])/).map((part, index) => {
            const linkMatch = part.match(/\[([^\]]+)\]/);
            if (linkMatch) {
              const linkText = linkMatch[1];
              const link = event.links?.find(l => l.text === linkText);
              return link ? (
                <a key={index} href={link.url} className="text-[#014B6E] hover:underline">
                  {link.text}
                </a>
              ) : linkText;
            }
            return part;
          })}
        </div>
        {event.context && (
          <div className="text-sm text-gray-500 mt-1">{event.context}</div>
        )}
        <div className="text-sm text-gray-500 mt-1 flex items-center">
          <span className="w-2 h-2 rounded-full bg-gray-500 mr-2" />
          {event.type}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* Search and Filters Bar */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-6">
        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Search history..."
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#CDD5DF] focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-3 text-gray-400">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z" stroke="#364152" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={filterMenuRef}>
            <button 
              className="h-10 px-4 bg-[#F2F4F7] rounded-lg flex items-center gap-2 text-[#014B6E]"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 5.83333H17.5M4.16667 10H15.8333M5.83333 14.1667H14.1667" stroke="#364152" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Filter
              {selectedTypes.length > 0 && (
                <span className="ml-1 bg-[#014B6E] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {selectedTypes.length}
                </span>
              )}
            </button>

            {showFilterMenu && (
              <div className="absolute top-12 left-0 bg-white rounded-lg shadow-lg border border-gray-200 w-64 py-2 z-10">
                <div className="px-3 py-2 text-sm text-gray-500 font-medium">Event Type</div>
                {(['Purchase', 'Visit', 'Notes', 'Form Submission', 'Payment', 'Appointment'] as EventType[]).map((type) => (
                  <button
                    key={type}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center ${
                      selectedTypes.includes(type) ? 'text-[#014B6E]' : 'text-gray-700'
                    }`}
                    onClick={() => toggleType(type)}
                  >
                    <span className={`w-4 h-4 border rounded mr-2 flex items-center justify-center ${
                      selectedTypes.includes(type) ? 'border-[#014B6E] bg-[#014B6E]' : 'border-gray-300'
                    }`}>
                      {selectedTypes.includes(type) && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    {type}
                  </button>
                ))}
                {selectedTypes.length > 0 && (
                  <div className="border-t border-gray-200 mt-2 pt-2 px-3">
                    <button
                      className="text-sm text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectedTypes([])}
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="relative" ref={dateMenuRef}>
            <button 
              className="h-10 px-4 bg-[#F2F4F7] rounded-lg flex items-center gap-2 text-[#014B6E]"
              onClick={() => setShowDateMenu(!showDateMenu)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6.66667 5H13.3333M6.66667 8.33333H13.3333M2.5 11.6667H17.5M2.5 15H17.5" stroke="#364152" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {dateRange}
            </button>

            {showDateMenu && (
              <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 w-48 py-2 z-10">
                {[
                  'Last 7 Days',
                  'Last 30 Days',
                  'Last 90 Days',
                  'Last 12 Months',
                  'All Time'
                ].map((range) => (
                  <button
                    key={range}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center ${
                      dateRange === range ? 'text-[#014B6E]' : 'text-gray-700'
                    }`}
                    onClick={() => {
                      setDateRange(range);
                      setShowDateMenu(false);
                    }}
                  >
                    <span className={`w-4 h-4 border rounded-full mr-2 flex items-center justify-center ${
                      dateRange === range ? 'border-[#014B6E] bg-[#014B6E]' : 'border-gray-300'
                    }`}>
                      {dateRange === range && (
                        <span className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </span>
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="w-10 h-10 bg-[#F2F4F7] rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 11.25C10.3452 11.25 10.625 10.9702 10.625 10.625C10.625 10.2798 10.3452 10 10 10C9.65482 10 9.375 10.2798 9.375 10.625C9.375 10.9702 9.65482 11.25 10 11.25Z" fill="#364152" stroke="#364152" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 11.25C15.3452 11.25 15.625 10.9702 15.625 10.625C15.625 10.2798 15.3452 10 15 10C14.6548 10 14.375 10.2798 14.375 10.625C14.375 10.9702 14.6548 11.25 15 11.25Z" fill="#364152" stroke="#364152" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 11.25C5.34518 11.25 5.625 10.9702 5.625 10.625C5.625 10.2798 5.34518 10 5 10C4.65482 10 4.375 10.2798 4.375 10.625C4.375 10.9702 4.65482 11.25 5 11.25Z" fill="#364152" stroke="#364152" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {Object.entries(groupedEvents).length > 0 ? (
          Object.entries(groupedEvents).map(([date, events]) => (
            <div key={date}>
              <div className="text-sm font-medium text-gray-900 mb-4">
                {formatDateHeader(date)}
              </div>
              <div className="divide-y divide-gray-100">
                {events.map(renderEvent)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No events found. {events.length === 0 ? 'No events generated.' : 'All events filtered out.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientHistory; 