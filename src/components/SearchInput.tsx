import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { Patient } from '../types/patient';
import { SearchResults } from './SearchResults';
import { mockPatients } from '../mockData';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderRadius: 8,
  backgroundColor: '#FFFFFF',
  border: '1px solid rgb(154, 164, 178)',
  width: '300px',
  height: '44px',
  transition: theme.transitions.create(['width', 'border-color', 'border-width'], {
    duration: theme.transitions.duration.standard,
  }),
  '&.focused': {
    width: '728px',
    borderColor: 'rgb(2, 76, 111)',
    borderWidth: '3px',
  },
}));

const SearchIconWrapper = styled('div')({
  padding: '0 8px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    fontSize: 16,
    color: 'rgb(105, 117, 134)',
  },
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'rgb(54, 65, 82)',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '8px 0',
    fontSize: 14,
    width: '100%',
    '&::placeholder': {
      color: 'rgb(154, 164, 178)',
      opacity: 1,
    },
  },
}));

interface SearchInputProps {
  onAddToQueue?: (patient: Patient) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onAddToQueue }) => {
  const [focused, setFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      const filteredResults = mockPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTermLower) ||
        (patient.phone && patient.phone.replace(/\D/g, '').includes(searchTerm.replace(/\D/g, '')))
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToQueue = (patient: Patient) => {
    onAddToQueue?.(patient);
    setSearchTerm('');
    setSearchResults([]);
    setFocused(false);
  };

  const handleClose = () => {
    setSearchTerm('');
    setSearchResults([]);
    setFocused(false);
  };

  return (
    <Box ref={searchRef} sx={{ position: 'relative' }}>
      <Search className={focused ? 'focused' : ''}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search patients..."
          inputProps={{ 'aria-label': 'search patients' }}
          onFocus={handleFocus}
          value={searchTerm}
          onChange={handleChange}
        />
      </Search>
      {focused && searchResults.length > 0 && (
        <SearchResults
          results={searchResults}
          onAddToQueue={handleAddToQueue}
          onClose={handleClose}
        />
      )}
    </Box>
  );
};

// Export both default and named export
export default SearchInput; 