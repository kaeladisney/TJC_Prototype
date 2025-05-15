import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Button,
  Dialog,
  TextField,
  Menu,
  MenuItem,
  Chip,
  Box,
  styled,
} from '@mui/material';
import { 
  FilterList as FilterIcon, 
  MoreVert as MoreVertIcon,
  ViewColumn as ViewColumnIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Search as SearchIcon,
  ViewWeek as ViewWeekIcon,
  QuestionMark as QuestionMarkIcon,
} from '@mui/icons-material';
import { ActionItem, ActionItemStatus, ActionItemsState } from '../../../types/actionItem';

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
  '& .MuiSvgIcon-root': {
    color: '#364152',
    fontSize: 16,
  },
  '& input': {
    border: 'none',
    outline: 'none',
    flex: 1,
    fontSize: 14,
    color: '#364152',
    '&::placeholder': {
      color: '#697586',
    },
  },
});

const ActionButton = styled(Button)({
  height: 40,
  backgroundColor: '#F2F4F7',
  color: '#004C6F',
  textTransform: 'none',
  padding: '10px 16px',
  borderRadius: 8,
  gap: 8,
  '&:hover': {
    backgroundColor: '#E4E7EC',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
    color: '#364152',
  },
});

const MoreIconButton = styled(IconButton)({
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

// List of all possible action items
const POSSIBLE_ACTION_ITEMS = [
  'Call patient to confirm upcoming appointment',
  'Follow up on payment issues (declined card)',
  'Contact patient about expired membership',
  'Schedule follow-up consultation',
  'Review recent lab results',
  'Update insurance information',
  'Send appointment reminder',
  'Check medication refill status',
  'Coordinate with specialist for referral',
  'Review treatment plan progress',
  'Schedule annual wellness check',
  'Update emergency contact information',
  'Follow up on missed appointment',
  'Verify current medications list',
  'Schedule physical therapy session'
];

// Helper function to get a consistent number from a string
const getNumberFromString = (str: string, max: number, min = 0) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash % (max - min)) + min;
};

// Helper function to get random items consistently based on a seed
const getRandomItems = (items: string[], count: number, seed: string) => {
  const selectedItems: string[] = [];
  const availableIndices = Array.from({ length: items.length }, (_, i) => i);
  
  for (let i = 0; i < count; i++) {
    const randomIndex = getNumberFromString(seed + i, availableIndices.length);
    const selectedIndex = availableIndices[randomIndex];
    selectedItems.push(items[selectedIndex]);
    availableIndices.splice(randomIndex, 1);
  }
  
  return selectedItems;
};

const getStatusColor = (status: ActionItemStatus) => {
  switch (status) {
    case 'complete':
      return { bg: '#E8F5E9', text: '#2E7D32' };
    case 'incomplete':
      return { bg: '#FFEBEE', text: '#C62828' };
    case 'in_progress':
      return { bg: '#FFF3E0', text: '#EF6C00' };
    default:
      return { bg: '#E0E0E0', text: '#424242' };
  }
};

const formatStatus = (status: ActionItemStatus) => {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

interface ActionItemsProps {
  patientId: string;
}

export const ActionItems: React.FC<ActionItemsProps> = ({ patientId }) => {
  const [state, setState] = useState<ActionItemsState>({
    selectedItems: [],
    sortColumn: null,
    sortDirection: 'asc',
    searchQuery: '',
    filters: {},
    visibleColumns: ['name', 'status', 'dueDate', 'dateCreated', 'dateModified', 'lastModifiedBy'],
  });

  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ActionItem | null>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [columnAnchorEl, setColumnAnchorEl] = useState<null | HTMLElement>(null);

  // Generate consistent action items based on patient ID
  const actionItems = useMemo(() => {
    const selectedTasks = getRandomItems(POSSIBLE_ACTION_ITEMS, 4, patientId);
    const today = new Date();
    
    return selectedTasks.map((task, index) => ({
      id: `${patientId}-${index}`,
      name: task,
      status: ['complete', 'incomplete', 'in_progress'][getNumberFromString(patientId + index, 3)] as ActionItemStatus,
      dueDate: new Date(today.getTime() + (getNumberFromString(patientId + index + 'due', 14) * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      dateCreated: new Date(today.getTime() - (getNumberFromString(patientId + index + 'created', 30) * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      dateModified: new Date(today.getTime() - (getNumberFromString(patientId + index + 'modified', 7) * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      lastModifiedBy: ['Trisha Torres', 'John Smith', 'Sarah Johnson'][getNumberFromString(patientId + index + 'user', 3)],
      patientId,
    }));
  }, [patientId]);

  const handleSort = (column: keyof ActionItem) => {
    setState(prev => ({
      ...prev,
      sortColumn: column,
      sortDirection: prev.sortColumn === column && prev.sortDirection === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, searchQuery: event.target.value }));
  };

  const handleCheckbox = (id: string) => {
    setState(prev => ({
      ...prev,
      selectedItems: prev.selectedItems.includes(id)
        ? prev.selectedItems.filter(item => item !== id)
        : [...prev.selectedItems, id],
    }));
  };

  const handleRowClick = (item: ActionItem) => {
    setSelectedItem(item);
    setDetailDialogOpen(true);
  };

  const filteredAndSortedItems = useMemo(() => {
    let items = [...actionItems];

    // Apply search filter
    if (state.searchQuery) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (state.filters.status?.length) {
      items = items.filter(item => state.filters.status?.includes(item.status));
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
  }, [state.searchQuery, state.filters, state.sortColumn, state.sortDirection, actionItems]);

  return (
    <div style={{ padding: '24px' }}>
      <Box sx={{ 
        display: 'flex', 
        gap: '16px', 
        marginBottom: '24px', 
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <SearchInput>
          <SearchIcon />
          <input
            placeholder="Search tasks..."
            value={state.searchQuery}
            onChange={handleSearch}
          />
        </SearchInput>

        <Box sx={{ display: 'flex', gap: '12px' }}>
          <ActionButton
            startIcon={<FilterIcon />}
            onClick={(e) => setFilterAnchorEl(e.currentTarget)}
          >
            Filter
          </ActionButton>
          <ActionButton
            startIcon={<ViewWeekIcon />}
            onClick={(e) => setColumnAnchorEl(e.currentTarget)}
          >
            Manage Columns
          </ActionButton>
          <MoreIconButton>
            <MoreVertIcon />
          </MoreIconButton>
        </Box>
      </Box>

      <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell padding="checkbox" sx={{ width: 68 }}>
                <Checkbox
                  checked={state.selectedItems.length === filteredAndSortedItems.length}
                  indeterminate={state.selectedItems.length > 0 && state.selectedItems.length < filteredAndSortedItems.length}
                  onChange={() => {
                    setState(prev => ({
                      ...prev,
                      selectedItems: prev.selectedItems.length === filteredAndSortedItems.length
                        ? []
                        : filteredAndSortedItems.map(item => item.id),
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedItems.map(item => (
              <TableRow
                key={item.id}
                hover
                onClick={() => handleRowClick(item)}
                style={{ cursor: 'pointer', backgroundColor: '#FFFFFF' }}
              >
                <TableBodyCell padding="checkbox" onClick={e => e.stopPropagation()}>
                  <Checkbox
                    checked={state.selectedItems.includes(item.id)}
                    onChange={() => handleCheckbox(item.id)}
                  />
                </TableBodyCell>
                {state.visibleColumns.map(column => (
                  <TableBodyCell key={column}>
                    {column === 'status' ? (
                      <Chip
                        label={formatStatus(item.status)}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(item.status).bg,
                          color: getStatusColor(item.status).text,
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
                      item[column]
                    )}
                  </TableBodyCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
      >
        <MenuItem>Status</MenuItem>
        <MenuItem>Due Date</MenuItem>
        <MenuItem>Date Created</MenuItem>
        <MenuItem>Date Modified</MenuItem>
      </Menu>

      <Menu
        anchorEl={columnAnchorEl}
        open={Boolean(columnAnchorEl)}
        onClose={() => setColumnAnchorEl(null)}
      >
        {Object.keys(actionItems[0]).map(column => (
          <MenuItem key={column}>
            <Checkbox
              checked={state.visibleColumns.includes(column as keyof ActionItem)}
              onChange={() => {
                setState(prev => ({
                  ...prev,
                  visibleColumns: prev.visibleColumns.includes(column as keyof ActionItem)
                    ? prev.visibleColumns.filter(col => col !== column)
                    : [...prev.visibleColumns, column as keyof ActionItem],
                }));
              }}
            />
            {column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}
          </MenuItem>
        ))}
      </Menu>

      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {/* Detail dialog content will be implemented later */}
      </Dialog>
    </div>
  );
}; 