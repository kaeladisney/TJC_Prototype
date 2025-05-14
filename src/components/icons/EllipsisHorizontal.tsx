import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const EllipsisHorizontal: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <path
        d="M5.625 10C5.625 10.3452 5.34518 10.625 5 10.625C4.65482 10.625 4.375 10.3452 4.375 10C4.375 9.65482 4.65482 9.375 5 9.375C5.34518 9.375 5.625 9.65482 5.625 10Z"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10.625 10C10.625 10.3452 10.3452 10.625 10 10.625C9.65482 10.625 9.375 10.3452 9.375 10C9.375 9.65482 9.65482 9.375 10 9.375C10.3452 9.375 10.625 9.65482 10.625 10Z"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M15.625 10C15.625 10.3452 15.3452 10.625 15 10.625C14.6548 10.625 14.375 10.3452 14.375 10C14.375 9.65482 14.6548 9.375 15 9.375C15.3452 9.375 15.625 9.65482 15.625 10Z"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
};

export default EllipsisHorizontal; 