import React from 'react';
import { Box, Typography, styled, Link } from '@mui/material';

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

const Title = styled(Typography)({
  color: '#282829',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '28px',
});

const NotesList = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  margin: 0,
  paddingLeft: '20px',
  width: '100%',
  minWidth: 0
});

const NoteItem = styled('li')({
  color: '#004C6F',
  fontSize: '14px',
  lineHeight: '20px',
  cursor: 'pointer',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&:hover': {
    textDecoration: 'underline',
  },
});

interface FavoriteNotesProps {
  notes?: string[];
  onNoteClick?: (note: string) => void;
}

const FavoriteNotes: React.FC<FavoriteNotesProps> = ({ notes = [], onNoteClick }) => {
  if (!notes || notes.length === 0) {
    return null;
  }

  return (
    <Card>
      <Title>Favorite Notes</Title>
      <NotesList>
        {notes.map((note, index) => (
          <NoteItem
            key={index}
            onClick={() => onNoteClick?.(note)}
          >
            {note}
          </NoteItem>
        ))}
      </NotesList>
    </Card>
  );
};

export default FavoriteNotes; 