import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Menu, MenuItem, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDrag, useDrop } from 'react-dnd';
import EllipsisHorizontal from '../icons/EllipsisHorizontal';
import { useLeftPaneContext } from './LeftPaneContext';
import { StatusBadgeType } from '../../types/patient';

const CardWrapper = styled(Box)<{ isDragging?: boolean; isCollapsed?: boolean }>(({ isDragging, isCollapsed }) => ({
  width: '100%',
  minHeight: isCollapsed ? 40 : 124,
  height: isCollapsed ? 40 : 'auto',
  backgroundColor: '#F8FAFC',
  border: isCollapsed ? 'none' : '1px solid #9AA4B2',
  borderRadius: 12,
  padding: isCollapsed ? '0' : '16px',
  display: 'flex',
  flexDirection: isCollapsed ? 'row' : 'column',
  alignItems: isCollapsed ? 'center' : 'stretch',
  justifyContent: isCollapsed ? 'center' : 'flex-start',
  gap: 16,
  cursor: 'pointer',
  opacity: isDragging ? 0.5 : 1,
  '&:hover': {
    backgroundColor: isCollapsed ? 'transparent' : '#EEF2F6',
  },
  boxSizing: 'border-box'
}));

const TopSection = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  display: isCollapsed ? 'none' : 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
}));

const PatientInfo = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  flex: 1,
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

const DetailsGrid = styled(Box)<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  display: isCollapsed ? 'none' : 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 12,
  marginTop: 'auto',
}));

const DetailItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  minWidth: 0,
});

const DetailLabel = styled(Typography)({
  fontSize: 12,
  fontWeight: 400,
  color: '#697586',
  lineHeight: '16px',
});

const TruncatedText: React.FC<{ text: string }> = ({ text }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsOverflowing(element.scrollWidth > element.clientWidth);
    }
  }, [text]);

  const StyledDetailValue = styled(Typography)({
    fontSize: 14,
    fontWeight: 400,
    color: '#364152',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });

  return isOverflowing ? (
    <Tooltip title={text} placement="top">
      <StyledDetailValue ref={textRef}>{text}</StyledDetailValue>
    </Tooltip>
  ) : (
    <StyledDetailValue ref={textRef}>{text}</StyledDetailValue>
  );
};

interface PatientCardExpandedProps {
  name: string;
  initials: string;
  statuses: Array<{
    label: StatusBadgeType;
    color: string;
    bgColor: string;
  }>;
  details?: {
    dcPreference?: string;
    planType?: string;
    cycleDate?: string;
  };
  isFirst?: boolean;
  isLast?: boolean;
  isCheckedInSection?: boolean;
  index?: number;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onViewProfile?: () => void;
  onRemove?: () => void;
  onClick?: () => void;
}

const getStatusColors = (label: StatusBadgeType): { color: string; bgColor: string } => {
  switch (label) {
    case 'New':
      return { color: '#008D3E', bgColor: '#E2FFE9' };
    case 'Forms':
      return { color: '#026AA2', bgColor: '#E0F2FE' };
    case 'Pay':
      return { color: '#B54708', bgColor: '#FEF6EE' };
    default:
      return { color: '#364152', bgColor: '#EEF2F6' };
  }
};

const PatientCardExpanded: React.FC<PatientCardExpandedProps> = ({ 
  name, 
  initials, 
  statuses,
  details,
  isFirst,
  isLast,
  isCheckedInSection = false,
  index,
  moveCard,
  onMoveUp,
  onMoveDown,
  onViewProfile,
  onRemove,
  onClick
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

  const handleClick = (event: React.MouseEvent) => {
    if (!menuAnchor) {
      onClick?.();
    }
  };

  const displayedStatuses = statuses.slice(0, 2);
  const remainingStatuses = statuses.slice(2);
  const remainingCount = remainingStatuses.length;

  return (
    <CardWrapper 
      ref={ref} 
      isDragging={isDragging} 
      isCollapsed={isCollapsed}
      onClick={handleClick}
    >
      {isCollapsed ? (
        <Tooltip 
          title={name}
          placement="right"
          open={isCollapsed ? undefined : false}
        >
          <Avatar>
            <AvatarText>{initials}</AvatarText>
          </Avatar>
        </Tooltip>
      ) : (
        <>
          <TopSection isCollapsed={isCollapsed}>
            <PatientInfo isCollapsed={isCollapsed}>
              <Avatar>
                <AvatarText>{initials}</AvatarText>
              </Avatar>
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
          </TopSection>
          <DetailsGrid isCollapsed={isCollapsed}>
            <DetailItem>
              <DetailLabel>DC Preference</DetailLabel>
              <TruncatedText text={details?.dcPreference || ''} />
            </DetailItem>
            <DetailItem>
              <DetailLabel>Plan Type</DetailLabel>
              <TruncatedText text={details?.planType || ''} />
            </DetailItem>
            <DetailItem>
              <DetailLabel>Cycle Date</DetailLabel>
              <TruncatedText text={details?.cycleDate || ''} />
            </DetailItem>
          </DetailsGrid>
        </>
      )}
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
        <MenuItem onClick={handleMenuItemClick(onViewProfile)}>View patient details</MenuItem>
        <MenuItem onClick={handleMenuItemClick(onRemove)} sx={{ color: 'error.main' }}>Remove from queue</MenuItem>
      </Menu>
    </CardWrapper>
  );
};

export default PatientCardExpanded; 