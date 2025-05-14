import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDrag, useDrop } from 'react-dnd';
import EllipsisHorizontal from '../icons/EllipsisHorizontal';
import { useLeftPaneContext } from './LeftPaneContext';

const CardWrapper = styled(Box)<{ isDragging?: boolean; isCollapsed?: boolean }>(({ isDragging, isCollapsed }) => ({
  width: '100%',
  height: isCollapsed ? 40 : 72,
  backgroundColor: '#F8FAFC',
  border: isCollapsed ? 'none' : '1px solid #9AA4B2',
  borderRadius: 12,
  padding: isCollapsed ? '0' : '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: isCollapsed ? 'center' : 'space-between',
  cursor: 'pointer',
  opacity: isDragging ? 0.5 : 1,
  '&:hover': {
    backgroundColor: isCollapsed ? 'transparent' : '#EEF2F6',
  }
}));

const PatientInfo = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  ...(isCollapsed && {
    width: 40,
    height: 40,
  })
}));

const Avatar = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: '#024C6F',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

const AvatarText = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: '#FCFCFD',
});

const InfoContainer = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  display: isCollapsed ? 'none' : 'flex',
  flexDirection: 'column',
  gap: 4,
}));

const PatientName = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: '#364152',
  lineHeight: '20px',
});

const BadgesContainer = styled(Box)({
  display: 'flex',
  gap: 4,
});

const StatusBadge = styled(Box)<{ color: string; bgColor: string }>(({ color, bgColor }) => ({
  height: 24,
  padding: '4px 8px',
  borderRadius: 9999,
  backgroundColor: bgColor,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

const BadgeText = styled(Typography)<{ color: string }>(({ color }) => ({
  fontSize: 12,
  fontWeight: 500,
  color: color,
  lineHeight: '16px',
}));

const MenuIcon = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  width: 20,
  height: 20,
  display: isCollapsed ? 'none' : 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  }
}));

interface PatientCardProps {
  name: string;
  initials: string;
  statuses: Array<{
    label: 'New' | 'Special' | 'Forms' | 'Urgent';
    color: string;
    bgColor: string;
  }>;
  isFirst?: boolean;
  isLast?: boolean;
  isCheckedInSection?: boolean;
  index?: number;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onViewProfile?: () => void;
  onRemove?: () => void;
}

const getStatusColors = (label: string): { color: string; bgColor: string } => {
  switch (label) {
    case 'New':
      return { color: '#008D3E', bgColor: '#E2FFE9' };
    case 'Special':
      return { color: '#6941C6', bgColor: '#F4F3FF' };
    case 'Forms':
      return { color: '#026AA2', bgColor: '#E0F2FE' };
    case 'Urgent':
      return { color: '#B15A17', bgColor: '#FFEBDC' };
    default:
      return { color: '#364152', bgColor: '#EEF2F6' };
  }
};

const PatientCard: React.FC<PatientCardProps> = ({ 
  name, 
  initials, 
  statuses,
  isFirst,
  isLast,
  isCheckedInSection = false,
  index,
  moveCard,
  onMoveUp,
  onMoveDown,
  onViewProfile,
  onRemove
}) => {
  const { isCollapsed } = useLeftPaneContext();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'patient-card',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => isCheckedInSection,
  });

  const [, drop] = useDrop({
    accept: 'patient-card',
    hover(item: { index: number }, monitor) {
      if (!ref.current || !isCheckedInSection || typeof index === 'undefined') {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard?.(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchor(null);
  };

  const handleMenuItemClick = (callback?: () => void) => (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (callback) {
      callback();
    }
    setMenuAnchor(null);
  };

  const displayedStatuses = statuses.slice(0, 2);
  const remainingStatuses = statuses.slice(2);
  const remainingCount = remainingStatuses.length;

  return (
    <CardWrapper ref={ref} isDragging={isDragging} isCollapsed={isCollapsed}>
      <PatientInfo isCollapsed={isCollapsed}>
        <Tooltip 
          title={name}
          placement="right"
          open={isCollapsed ? undefined : false}
        >
          <Avatar>
            <AvatarText>{initials}</AvatarText>
          </Avatar>
        </Tooltip>
        <InfoContainer isCollapsed={isCollapsed}>
          <PatientName>{name}</PatientName>
          <BadgesContainer>
            {displayedStatuses.map((status, index) => {
              const colors = getStatusColors(status.label);
              return (
                <StatusBadge 
                  key={index} 
                  color={colors.color} 
                  bgColor={colors.bgColor}
                >
                  <BadgeText color={colors.color}>{status.label}</BadgeText>
                </StatusBadge>
              );
            })}
            {remainingCount > 0 && (
              <Tooltip 
                title={remainingStatuses.map(status => status.label).join(', ')}
                arrow
                placement="top"
                componentsProps={{
                  popper: {
                    sx: {
                      '& .MuiTooltip-tooltip': {
                        backgroundColor: '#364152',
                        fontSize: '12px',
                        padding: '8px 12px',
                        borderRadius: '6px',
                      },
                      '& .MuiTooltip-arrow': {
                        color: '#364152',
                      },
                    },
                  },
                }}
              >
                <StatusBadge 
                  color="#364152" 
                  bgColor="#EEF2F6"
                >
                  <BadgeText color="#364152">+{remainingCount}</BadgeText>
                </StatusBadge>
              </Tooltip>
            )}
          </BadgesContainer>
        </InfoContainer>
      </PatientInfo>
      <MenuIcon isCollapsed={isCollapsed} onClick={handleMenuOpen}>
        <EllipsisHorizontal />
      </MenuIcon>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {isCheckedInSection && !isFirst && (
          <MenuItem onClick={handleMenuItemClick(onMoveUp)}>Move up</MenuItem>
        )}
        {isCheckedInSection && !isLast && (
          <MenuItem onClick={handleMenuItemClick(onMoveDown)}>Move down</MenuItem>
        )}
        <MenuItem onClick={handleMenuItemClick(onViewProfile)}>View patient profile</MenuItem>
        <MenuItem onClick={handleMenuItemClick(onRemove)} sx={{ color: 'error.main' }}>Remove from queue</MenuItem>
      </Menu>
    </CardWrapper>
  );
};

export default PatientCard; 