import React from 'react';
import { ReactComponent as GetFeedbackSvg } from './GetFeedback.svg';

interface GetFeedbackIconProps {
  className?: string;
  color?: string;
}

export const GetFeedbackIcon: React.FC<GetFeedbackIconProps> = ({ className, color = 'currentColor' }) => {
  return <GetFeedbackSvg className={className} style={{ color }} />;
};

export default GetFeedbackIcon; 