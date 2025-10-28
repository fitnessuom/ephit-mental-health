import { FC } from 'react';
import { Dumbbell } from 'lucide-react';

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
        flex flex-col items-center justify-center
        w-16 h-16 rounded-full transition-all duration-200
        ${visited 
          ? 'bg-primary/20 border-2 border-primary' 
          : 'bg-card border-2 border-border hover:border-primary hover:scale-110'
        }
        ${isError ? 'animate-shake border-destructive' : ''}
      `}
    >
      <Dumbbell className={`w-6 h-6 ${visited ? 'text-primary' : 'text-muted-foreground'}`} />
      <span className={`text-xs font-semibold ${visited ? 'text-primary' : 'text-foreground'}`}>
        {label}
      </span>
    </button>
  );
};
