import React from 'react';
import { Box, Checkbox, styled } from '@mui/material';
import { Task } from '../../types/task';

const TaskContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
});

const TaskContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flex: 1,
  color: '#364152',
  fontSize: '14px',
  lineHeight: '20px',
});

const UserMention = styled('span')({
  color: '#024C6F',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const UserAvatar = styled(Box)({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FFFFFF',
  fontSize: '12px',
  fontWeight: 500,
  marginBottom: '0px',
});

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  const renderTaskContent = () => {
    if (!task.assignedUser) {
      return task.description;
    }

    const parts = task.description.split(task.assignedUser.name);
    return (
      <>
        {parts[0]}
        <UserMention>
          <UserAvatar sx={{ bgcolor: '#024C6F' }}>
            {task.assignedUser.initials}
          </UserAvatar>
          {task.assignedUser.name}
        </UserMention>
        {parts[1]}
      </>
    );
  };

  return (
    <TaskContainer>
      <Checkbox
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
        sx={{
          padding: '3px',
          color: '#9AA4B5',
          '&.Mui-checked': {
            color: '#024C6F',
          },
        }}
      />
      <TaskContent>
        {renderTaskContent()}
      </TaskContent>
    </TaskContainer>
  );
}; 