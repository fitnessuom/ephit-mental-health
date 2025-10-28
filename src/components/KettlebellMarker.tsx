import React, { FC } from 'react';

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
      style={{ width: '64px', height: '64px' }}
    >
      {/* Kettlebell shape */}
      <div className="relative w-full h-full flex flex-col items-center justify-end">
        {/* Handle */}
        <div 
          className={`
            absolute top-0 left-1/2 -translate-x-1/2
            w-6 h-5 rounded-t-lg border-2 transition-colors
            ${visited 
              ? 'bg-primary/20 border-primary' 
              : 'bg-card border-border'
            }
            ${isError ? 'border-destructive' : ''}
          `}
        />
        
        {/* Bell body */}
        <div 
          className={`
            w-14 h-14 rounded-full border-2 transition-colors
            flex items-center justify-center
            ${visited 
              ? 'bg-primary/20 border-primary' 
              : 'bg-card border-border'
            }
            ${isError ? 'border-destructive' : ''}
          `}
        >
          <span className={`text-sm font-bold ${visited ? 'text-primary' : 'text-foreground'}`}>
            {label}
          </span>
        </div>
      </div>
    </button>
  );
};
