import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
  size?: 'small' | 'normal' | 'large';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  count = 6, 
  size = 'normal' 
}) => {
  const sizeClasses = {
    small: 'w-40 h-56',
    normal: 'w-48 h-64',
    large: 'w-56 h-72'
  };

  return (
    <div className="flex space-x-4 overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className={`${sizeClasses[size]} bg-gray-300 rounded-lg animate-pulse flex-shrink-0`}
        />
      ))}
    </div>
  );
};