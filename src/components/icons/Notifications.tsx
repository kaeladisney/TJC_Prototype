import React from 'react';
import { ReactComponent as NotificationsSvg } from './Notifications.svg';

interface NotificationsIconProps {
  className?: string;
}

export const NotificationsIcon: React.FC<NotificationsIconProps> = ({ className }) => {
  return <NotificationsSvg className={className} />;
};

export default NotificationsIcon; 