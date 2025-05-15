import React, { useState } from 'react';
import { Box, styled, InputAdornment, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const Container = styled(Box)({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  height: '100%',
  backgroundColor: '#FFFFFF',
});

const Controls = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
});

const SearchField = styled(TextField)({
  minWidth: '300px',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F8F9FA',
    '& fieldset': {
      borderColor: '#E4E7EC',
    },
    '&:hover fieldset': {
      borderColor: '#D0D5DD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#004C6F',
    },
  },
});

const ControlButtons = styled(Box)({
  display: 'flex',
  gap: '8px',
});

const ActionButton = styled(IconButton)({
  width: '40px',
  height: '40px',
  backgroundColor: '#F8F9FA',
  border: '1px solid #E4E7EC',
  borderRadius: '8px',
  color: '#364152',
  '&:hover': {
    backgroundColor: '#F2F4F7',
    borderColor: '#D0D5DD',
  },
});

const TableContainer = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  border: '1px solid #E4E7EC',
  borderRadius: '12px',
});

const Table = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
});

const TableHead = styled('thead')({
  backgroundColor: '#F8F9FA',
  position: 'sticky',
  top: 0,
  zIndex: 1,
});

const TableHeaderCell = styled('th')({
  padding: '12px 24px',
  fontSize: '12px',
  fontWeight: 500,
  color: '#697586',
  borderBottom: '1px solid #E4E7EC',
  whiteSpace: 'nowrap',
});

const TableRow = styled('tr')({
  '&:hover': {
    backgroundColor: '#F8F9FA',
  },
});

const TableCell = styled('td')({
  padding: '16px 24px',
  fontSize: '14px',
  color: '#364152',
  borderBottom: '1px solid #E4E7EC',
});

const NameCell = styled(TableCell)({
  maxWidth: '400px',
});

const Title = styled('div')({
  fontSize: '14px',
  fontWeight: 500,
  color: '#364152',
  marginBottom: '4px',
});

const Preview = styled('div')({
  fontSize: '14px',
  color: '#697586',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

const Category = styled('span')({
  padding: '2px 8px',
  borderRadius: '16px',
  fontSize: '12px',
  fontWeight: 500,
});

interface Note {
  id: string;
  title: string;
  preview: string;
  category: string;
  lastModified: string;
  clinic: string;
  favorite: boolean;
}

const getCategoryStyle = (category: string) => {
  const styles: { [key: string]: { color: string; backgroundColor: string } } = {
    'Patient Experience': {
      color: '#344054',
      backgroundColor: '#F2F4F7',
    },
    'Billing & Insurance': {
      color: '#B54708',
      backgroundColor: '#FEF6EE',
    },
    'Communications': {
      color: '#026AA2',
      backgroundColor: '#E0F2FE',
    },
  };
  return styles[category] || styles['Patient Experience'];
};

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Updated Comms Preference',
    preview: 'Patient requested no reminder texts—prefers email only. Confirmed primary email address.',
    category: 'Communications',
    lastModified: '4/17/2024',
    clinic: 'Gotham',
    favorite: false,
  },
  {
    id: '2',
    title: 'Card Expired – Patient Notified',
    preview: 'Membership renewal failed due to expired card—patient notified via email.',
    category: 'Billing & Insurance',
    lastModified: '4/17/2024',
    clinic: 'Gotham',
    favorite: true,
  },
  {
    id: '3',
    title: 'Patient Frustrated',
    preview: 'Patient was frustrated about wait time today. Apologized and offered compensation.',
    category: 'Patient Experience',
    lastModified: '4/17/2024',
    clinic: 'Gotham',
    favorite: false,
  },
];

interface NotesProps {
  patientId: string;
}

export const Notes: React.FC<NotesProps> = ({ patientId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState(mockNotes);

  const toggleFavorite = (noteId: string) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, favorite: !note.favorite } : note
    ));
  };

  return (
    <Container>
      <Controls>
        <SearchField
          placeholder="Search"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#697586' }} />
              </InputAdornment>
            ),
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ControlButtons>
          <ActionButton>
            <FilterListIcon />
          </ActionButton>
          <ActionButton>
            <SortIcon />
          </ActionButton>
          <ActionButton>
            <ViewWeekIcon />
          </ActionButton>
        </ControlButtons>
      </Controls>

      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Last Modified</TableHeaderCell>
              <TableHeaderCell>By Clinic</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </tr>
          </TableHead>
          <tbody>
            {notes.map((note) => (
              <TableRow key={note.id}>
                <NameCell>
                  <Title>{note.title}</Title>
                  <Preview>{note.preview}</Preview>
                </NameCell>
                <TableCell>
                  <Category style={getCategoryStyle(note.category)}>
                    {note.category}
                  </Category>
                </TableCell>
                <TableCell>{note.lastModified}</TableCell>
                <TableCell>{note.clinic}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => toggleFavorite(note.id)}
                    sx={{ color: note.favorite ? '#F79009' : '#697586' }}
                  >
                    {note.favorite ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}; 