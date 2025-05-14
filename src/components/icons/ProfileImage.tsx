import React from 'react';
import profileImage from './ProfileImage.png';

interface ProfileImageProps {
  className?: string;
  width?: number;
  height?: number;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ className, width = 24, height = 24 }) => {
  return (
    <img 
      src={profileImage} 
      alt="Profile" 
      className={className}
      width={width}
      height={height}
      style={{ borderRadius: '50%' }}
    />
  );
};

export default ProfileImage; 