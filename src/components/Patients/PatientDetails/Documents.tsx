import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Chip,
  styled,
  Menu,
  MenuItem,
  Typography,
  Button,
} from '@mui/material';
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Download as DownloadIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  SwapVert as SwapVertIcon,
  Upload as UploadIcon,
  ViewColumn as ViewColumnIcon,
  MoreHoriz as MoreHorizIcon,
} from '@mui/icons-material';

// Styled components from ActionItems
const TableHeaderCell = styled(TableCell)({
  backgroundColor: '#F8FAFC',
  borderBottom: '1px solid #E4E7EC',
  color: '#697586',
  height: '44px',
  padding: '0 24px',
  '& .MuiSvgIcon-root': {
    fontSize: 16,
    color: '#697586',
    marginLeft: 4,
  },
  '& .header-content': {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 14,
    fontWeight: 500,
  },
});

const TableBodyCell = styled(TableCell)({
  backgroundColor: '#FFFFFF',
  borderBottom: '1px solid #E4E7EC',
  padding: '24px',
  height: '72px',
  color: '#202939',
  fontSize: '14px',
});

const SearchInput = styled(Box)({
  minWidth: 300,
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

const ControlButton = styled(Button)({
  height: 40,
  backgroundColor: '#F2F4F7',
  color: '#004C6F',
  textTransform: 'none',
  padding: '8px 16px',
  borderRadius: 8,
  gap: 8,
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: '#E4E7EC',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
    color: '#364152',
  },
});

const IconOnlyButton = styled(IconButton)({
  width: 40,
  height: 40,
  backgroundColor: '#F2F4F7',
  borderRadius: 8,
  '&:hover': {
    backgroundColor: '#E4E7EC',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
    color: '#364152',
  },
});

const ControlsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px',
  gap: 187,
});

const ButtonsContainer = styled(Box)({
  display: 'flex',
  gap: 12,
});

type DocumentStatus = 'complete' | 'incomplete' | 'in_progress';

interface Document {
  id: string;
  name: string;
  status: DocumentStatus;
  category: string;
  type: string;
  dateCreated: string;
  dateModified: string;
  createdBy: string;
  lastModifiedBy: string;
  isFavorite: boolean;
  patientId: string;
}

interface DocumentsState {
  selectedItems: string[];
  sortColumn: keyof Document | null;
  sortDirection: 'asc' | 'desc';
  searchQuery: string;
  filters: {
    status?: DocumentStatus[];
    category?: string[];
    type?: string[];
  };
  visibleColumns: (keyof Document)[];
}

const getStatusColor = (status: DocumentStatus) => {
  switch (status) {
    case 'complete':
      return { bg: '#ECFDF3', text: '#027A48' };
    case 'incomplete':
      return { bg: '#FEF3F2', text: '#B42318' };
    case 'in_progress':
      return { bg: '#FFFAEB', text: '#B54708' };
  }
};

const formatStatus = (status: DocumentStatus) => {
  return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Mock data generation
const DOCUMENT_CATEGORIES = [
  'Billing Contract',
  'Cancellation Form',
  'Medical Records',
  'Insurance Forms',
  'Treatment Plans',
] as const;

type DocumentCategory = typeof DOCUMENT_CATEGORIES[number];

const DOCUMENT_TYPES: Record<DocumentCategory, string[]> = {
  'Billing Contract': ['Terms of Access', 'Payment Agreement', 'Refund Policy'],
  'Cancellation Form': ['Service Cancellation', 'Membership Cancellation'],
  'Medical Records': ['Patient History', 'Treatment Records', 'Lab Results'],
  'Insurance Forms': ['Insurance Verification', 'Claims Forms'],
  'Treatment Plans': ['Care Plan', 'Exercise Program', 'Progress Notes'],
};

const generateMockDocuments = (patientId: string): Document[] => {
  const documents: Document[] = [];
  const statuses: DocumentStatus[] = ['complete', 'incomplete', 'in_progress'];
  const users = ['Dr. Sarah Miller', 'John Smith', 'Emily Parker'];

  // Generate 10 random documents
  for (let i = 0; i < 10; i++) {
    const category = DOCUMENT_CATEGORIES[Math.floor(Math.random() * DOCUMENT_CATEGORIES.length)];
    const type = DOCUMENT_TYPES[category][Math.floor(Math.random() * DOCUMENT_TYPES[category].length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdBy = users[Math.floor(Math.random() * users.length)];
    const lastModifiedBy = users[Math.floor(Math.random() * users.length)];

    // Generate consistent dates based on patient ID and document index
    const today = new Date();
    const createdDate = new Date(today.getTime() - (Math.random() * 90 * 24 * 60 * 60 * 1000));
    const modifiedDate = new Date(createdDate.getTime() + (Math.random() * 30 * 24 * 60 * 60 * 1000));

    documents.push({
      id: `${patientId}-doc-${i}`,
      name: `${type} - ${category}`,
      status,
      category,
      type,
      dateCreated: createdDate.toLocaleDateString(),
      dateModified: modifiedDate.toLocaleDateString(),
      createdBy,
      lastModifiedBy,
      isFavorite: Math.random() > 0.7,
      patientId,
    });
  }

  return documents;
};

interface DocumentsProps {
  patientId: string;
}

export const Documents: React.FC<DocumentsProps> = ({ patientId }) => {
  const [state, setState] = useState<DocumentsState>({
    selectedItems: [],
    sortColumn: null,
    sortDirection: 'asc',
    searchQuery: '',
    filters: {},
    visibleColumns: ['name', 'status', 'category', 'type', 'dateCreated', 'dateModified', 'createdBy', 'lastModifiedBy'],
  });

  const documents = useMemo(() => generateMockDocuments(patientId), [patientId]);

  const handleSort = (column: keyof Document) => {
    setState(prev => ({
      ...prev,
      sortColumn: column,
      sortDirection: prev.sortColumn === column && prev.sortDirection === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleCheckbox = (id: string) => {
    setState(prev => ({
      ...prev,
      selectedItems: prev.selectedItems.includes(id)
        ? prev.selectedItems.filter(item => item !== id)
        : [...prev.selectedItems, id],
    }));
  };

  const handleFavoriteToggle = (document: Document, event: React.MouseEvent) => {
    event.stopPropagation();
    // In a real application, this would update the document in the backend
    console.log('Toggle favorite for document:', document.id);
  };

  const handleDownload = (document: Document, event: React.MouseEvent) => {
    event.stopPropagation();
    // In a real application, this would trigger the document download
    console.log('Download document:', document.id);
  };

  const filteredAndSortedDocuments = useMemo(() => {
    let items = [...documents];

    // Apply status filter
    if (state.filters.status?.length) {
      items = items.filter(item => state.filters.status?.includes(item.status));
    }

    // Apply category filter
    if (state.filters.category?.length) {
      items = items.filter(item => state.filters.category?.includes(item.category));
    }

    // Apply type filter
    if (state.filters.type?.length) {
      items = items.filter(item => state.filters.type?.includes(item.type));
    }

    // Apply sorting
    if (state.sortColumn) {
      items.sort((a, b) => {
        const aValue = a[state.sortColumn!];
        const bValue = b[state.sortColumn!];
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return state.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return items;
  }, [documents, state.filters, state.sortColumn, state.sortDirection]);

  return (
    <Box sx={{ width: '100%' }}>
      <ControlsContainer>
        <SearchInput>
          <SearchIcon />
          <input
            placeholder="Search documents..."
            value={state.searchQuery}
            onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
          />
        </SearchInput>
        <ButtonsContainer>
          <IconOnlyButton>
            <FilterIcon />
          </IconOnlyButton>
          <IconOnlyButton>
            <SwapVertIcon />
          </IconOnlyButton>
          <ControlButton startIcon={<UploadIcon />}>
            Upload
          </ControlButton>
          <ControlButton startIcon={<ViewColumnIcon />}>
            Manage columns
          </ControlButton>
          <IconOnlyButton>
            <MoreHorizIcon />
          </IconOnlyButton>
        </ButtonsContainer>
      </ControlsContainer>
      <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell padding="checkbox" sx={{ width: 68 }}>
                <Checkbox
                  checked={state.selectedItems.length === filteredAndSortedDocuments.length}
                  indeterminate={state.selectedItems.length > 0 && state.selectedItems.length < filteredAndSortedDocuments.length}
                  onChange={() => {
                    setState(prev => ({
                      ...prev,
                      selectedItems: prev.selectedItems.length === filteredAndSortedDocuments.length
                        ? []
                        : filteredAndSortedDocuments.map(item => item.id),
                    }));
                  }}
                />
              </TableHeaderCell>
              {state.visibleColumns.map(column => (
                <TableHeaderCell
                  key={column}
                  sortDirection={state.sortColumn === column ? state.sortDirection : false}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort(column)}
                >
                  <div className="header-content">
                    {column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}
                    {state.sortColumn === column && (
                      state.sortDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                    )}
                  </div>
                </TableHeaderCell>
              ))}
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedDocuments.map(document => (
              <TableRow
                key={document.id}
                hover
                style={{ cursor: 'pointer', backgroundColor: '#FFFFFF' }}
              >
                <TableBodyCell padding="checkbox" onClick={e => e.stopPropagation()}>
                  <Checkbox
                    checked={state.selectedItems.includes(document.id)}
                    onChange={() => handleCheckbox(document.id)}
                  />
                </TableBodyCell>
                {state.visibleColumns.map(column => (
                  <TableBodyCell key={column}>
                    {column === 'status' ? (
                      <Chip
                        label={formatStatus(document.status)}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(document.status).bg,
                          color: getStatusColor(document.status).text,
                          fontWeight: 500,
                          fontSize: '12px',
                          height: '24px',
                          borderRadius: '16px',
                          '& .MuiChip-label': {
                            padding: '4px 8px',
                          }
                        }}
                      />
                    ) : (
                      document[column]
                    )}
                  </TableBodyCell>
                ))}
                <TableBodyCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={(e) => handleDownload(document, e)}
                      sx={{ color: '#697586' }}
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => handleFavoriteToggle(document, e)}
                      sx={{ color: document.isFavorite ? '#F79009' : '#697586' }}
                    >
                      {document.isFavorite ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                  </Box>
                </TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}; 