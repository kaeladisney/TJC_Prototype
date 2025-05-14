import React from 'react';
import { ReactComponent as AlignLogoSvg } from './AlignLogo.svg';

interface LogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ width = 20, height = 26, className }) => {
  return (
    <AlignLogoSvg 
      width={width} 
      height={height} 
      className={className}
    />
  );
};

export default Logo; 