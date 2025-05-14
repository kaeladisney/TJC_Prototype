export interface LinkedUser {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
}

export interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  assignedUser?: LinkedUser;
} 