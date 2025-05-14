import React, { useState } from 'react';
import { Box, Button, Divider, styled } from '@mui/material';
import { Task } from '../../types/task';
import { TaskItem } from './TaskItem';
import { mockTasks } from '../../mockData';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '16px 24px',
});

const SectionTitle = styled(Box)({
  color: '#282829',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  marginBottom: '16px',
});

const TaskList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginBottom: '16px',
});

const StyledDivider = styled(Divider)({
  margin: '16px 0',
  backgroundColor: '#E3E8EF',
});

export const TasksAndReminders: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const todayTasks = tasks.filter(task => {
    const today = new Date();
    const taskDate = new Date(task.dueDate);
    return taskDate.toDateString() === today.toDateString();
  });

  const tomorrowTasks = tasks.filter(task => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const taskDate = new Date(task.dueDate);
    return taskDate.toDateString() === tomorrow.toDateString();
  });

  return (
    <Container>
      <SectionTitle>Today</SectionTitle>
      <TaskList>
        {todayTasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />
        ))}
      </TaskList>

      <StyledDivider />

      <SectionTitle>Tomorrow</SectionTitle>
      <TaskList>
        {tomorrowTasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />
        ))}
      </TaskList>
    </Container>
  );
};

export default TasksAndReminders; 