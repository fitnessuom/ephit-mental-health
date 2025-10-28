import React, { FC } from 'react';
import kettlebellIcon from '@/assets/kettlebell.png';

interface MarkerProps {
  label: string;
  onClick: () => void;
  visited: boolean;
  isError?: boolean;
}

export const KettlebellMarker: FC<MarkerProps> = ({ label, onClick, visited, isError }) => {
  return (
    <button
      onClick={onClick}
      className={`
        absolute transform -translate-x-1/2 -translate-y-1/2
        flex items-center justify-center
        transition-all duration-200
        ${isError ? 'animate-shake' : ''}
        ${visited ? 'hover:scale-105' : 'hover:scale-110'}
      `}
      style={{ width: '80px', height: '80px' }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Kettlebell outline */}
        <img 
          src={kettlebellIcon} 
          alt="" 
          className={`
            absolute inset-0 w-full h-full object-contain transition-all
            ${visited ? 'brightness-0 saturate-100' : 'opacity-70'}
            ${isError ? 'brightness-0 saturate-100 hue-rotate-[320deg]' : ''}
          `}
          style={{
            filter: visited 
              ? 'brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(1352%) hue-rotate(187deg) brightness(99%) contrast(119%)'
              : isError 
                ? 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)'
                : undefined
          }}
        />
        
        {/* Label */}
        <span className={`relative z-10 text-lg font-bold ${visited ? 'text-primary' : 'text-foreground'}`}>
          {label}
        </span>
      </div>
    </button>
  );
};
