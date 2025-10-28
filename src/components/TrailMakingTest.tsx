import React, { useEffect, useRef, useState } from 'react';
import { KettlebellMarker } from './KettlebellMarker';
import { Button } from './ui/button';
import { Card } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface TrailMakingTestProps {
  mode: 'A' | 'B';
}

interface Position {
  label: string;
  x: number;
  y: number;
}

export const TrailMakingTest: React.FC<TrailMakingTestProps> = ({ mode }) => {
  const sequence = mode === 'A'
    ? Array.from({ length: 25 }, (_, i) => (i + 1).toString())
    : Array.from({ length: 12 }, (_, i) => [
        (i + 1).toString(),
        String.fromCharCode(65 + i)
      ]).flat();

  const [positions, setPositions] = useState<Position[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errorLabel, setErrorLabel] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (el) setContainerSize({ width: el.clientWidth, height: el.clientHeight });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    generatePositions();
  }, [mode, containerSize.width, containerSize.height]);

  const generatePositions = () => {
    const { width, height } = containerSize;
    if (!width || !height) return;

    const newPositions: Position[] = [];
    const markerSize = 64; // px (w-16 h-16)
    const padding = markerSize / 2 + 8; // keep fully visible
    let minDistance = markerSize + 8; // prevent overlap with a small gap
    
    for (const label of sequence) {
      let attempts = 0;
      let placed = false;
      let x = 0, y = 0;
      
      while (!placed && attempts < 1000) {
        x = Math.random() * (width - padding * 2) + padding;
        y = Math.random() * (height - padding * 2) + padding;
        
        placed = newPositions.every(pos => {
          const dx = pos.x - x;
          const dy = pos.y - y;
          return Math.hypot(dx, dy) > minDistance;
        });
        
        if (!placed && attempts > 0 && attempts % 200 === 0) {
          // Gradually relax the distance to guarantee placement
          minDistance = Math.max(markerSize * 0.75, minDistance - 6);
        }
        attempts++;
      }
      
      newPositions.push({ label, x, y });
    }
    
    setPositions(newPositions);
  };

  const handleStart = () => {
    setStartTime(null);
    setEndTime(null);
    setCurrentIndex(0);
    setErrorLabel(null);
    generatePositions();
  };

  const handleClick = (label: string) => {
    if (!isStarted || endTime !== null) return;
    
    if (currentIndex === 0 && !startTime) {
      setStartTime(Date.now());
    }
    
    if (label === sequence[currentIndex]) {
      const next = currentIndex + 1;
      if (next === sequence.length) {
        setEndTime(Date.now());
      }
      setCurrentIndex(next);
      setErrorLabel(null);
    } else {
      setErrorLabel(label);
      setTimeout(() => setErrorLabel(null), 500);
    }
  };

  const totalTime = startTime && endTime ? ((endTime - startTime) / 1000).toFixed(2) : null;

  const handleRetry = () => {
    setEndTime(null);
    handleStart();
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          Trail Making Test - Part {mode}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {mode === 'A' 
            ? 'Connect the numbers in order from 1 to 25 as quickly as possible.'
            : 'Alternate between numbers and letters: 1-A-2-B-3-C and so on.'}
        </p>
        <div className="flex gap-4 items-center">
          {!endTime && (
            <p className="text-sm text-muted-foreground">
              Next: <span className="font-bold text-primary text-lg">{sequence[currentIndex]}</span>
            </p>
          )}
          <Button onClick={handleStart} variant="outline" size="sm">
            {currentIndex > 0 ? 'Restart' : 'Reset'}
          </Button>
        </div>
      </Card>

      <div ref={containerRef} className="relative flex-1 min-h-[500px] bg-card rounded-lg border">
        {positions.map(({ label, x, y }) => (
          <div key={label} className="absolute" style={{ left: x, top: y }}>
            <KettlebellMarker
              label={label}
              onClick={() => handleClick(label)}
              visited={sequence.indexOf(label) < currentIndex}
              isError={errorLabel === label}
            />
          </div>
        ))}
      </div>

      <Dialog open={!!totalTime} onOpenChange={handleRetry}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Complete!</DialogTitle>
            <DialogDescription>
              You completed TMT-{mode} in <span className="font-bold text-primary">{totalTime}</span> seconds.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button onClick={handleRetry}>Retry</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
