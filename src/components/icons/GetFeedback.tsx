import React from 'react';
import { ReactComponent as GetFeedbackSvg } from './GetFeedback.svg';

interface GetFeedbackIconProps {
  className?: string;
}

export const GetFeedbackIcon: React.FC<GetFeedbackIconProps> = ({ className }) => {
  return <GetFeedbackSvg className={className} />;
};

export default GetFeedbackIcon; 