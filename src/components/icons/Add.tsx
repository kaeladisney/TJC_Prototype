import React from 'react';
import { ReactComponent as AddSvg } from './Add.svg';

interface AddIconProps {
  className?: string;
}

export const AddIcon: React.FC<AddIconProps> = ({ className }) => {
  return <AddSvg className={className} />;
};

export default AddIcon; 