import React from 'react';
import { ReactComponent as AvatarSvg } from './Avatar.svg';

interface ProfileImageProps {
  className?: string;
  width?: number;
  height?: number;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ className, width = 24, height = 24 }) => {
  return (
    <AvatarSvg 
      className={className}
      width={width}
      height={height}
      style={{ borderRadius: '50%' }}
    />
  );
};

export default ProfileImage; 