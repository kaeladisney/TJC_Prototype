import React from 'react';
import { Box, Button, Paper, Typography, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  children: React.ReactNode;
  title: string;
  isLarge?: boolean;
  showAddButton?: boolean;
  onAddClick?: () => void;
  headerContent?: React.ReactNode;
}

const TileWrapper = styled(Box)(({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const TileHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));

const DashboardTile: React.FC<Props> = ({
  children,
  title,
  isLarge = false,
  showAddButton = false,
  onAddClick,
  headerContent,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        gridColumn: isLarge ? 'span 2' : 'span 1',
        boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.16)',
      }}
    >
      <TileHeader>
        <Typography variant="h6" color="text.primary">
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {headerContent}
          {showAddButton && (
            <Button
              startIcon={<AddIcon />}
              onClick={onAddClick}
              size="small"
              sx={{ minWidth: 'auto' }}
            >
              Add
            </Button>
          )}
        </Box>
      </TileHeader>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {children}
      </Box>
    </Paper>
  );
};

export default DashboardTile; 