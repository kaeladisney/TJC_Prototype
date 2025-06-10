import React from 'react';
import { ReactComponent as NotificationsSvg } from './Notifications.svg';

interface NotificationsIconProps {
  className?: string;
  color?: string;
}

export const NotificationsIcon: React.FC<NotificationsIconProps> = ({ className, color = 'currentColor' }) => {
  return <NotificationsSvg className={className} style={{ color }} />;
};

export default NotificationsIcon; 