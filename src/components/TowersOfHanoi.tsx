import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface TowersProps {
  discCount?: number;
}

export const TowersOfHanoi: React.FC<TowersProps> = ({ discCount = 3 }) => {
  const initialPegs: number[][] = [
    Array.from({ length: discCount }, (_, i) => discCount - 1 - i),
    [],
    []
  ];
  
  const [pegs, setPegs] = useState(initialPegs);
  const [selected, setSelected] = useState<{ peg: number; disc: number } | null>(null);
  const [moves, setMoves] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const handleDiscClick = (pegIndex: number) => {
    const peg = pegs[pegIndex];
    if (!peg.length) return;
    
    setHasStarted(true);
    
    if (selected?.peg === pegIndex && selected?.disc === peg[peg.length - 1]) {
      setSelected(null);
      return;
    }
    
    setSelected({ peg: pegIndex, disc: peg[peg.length - 1] });
  };

  const handlePegClick = (targetIndex: number) => {
    if (!selected) return;
    
    const { peg: fromIndex, disc } = selected;
    if (fromIndex === targetIndex) {
      setSelected(null);
      return;
    }
    
    const targetPeg = pegs[targetIndex];
    
    if (targetPeg.length && targetPeg[targetPeg.length - 1] < disc) {
      setSelected(null);
      return;
    }
    
    const newPegs = pegs.map(arr => [...arr]);
    newPegs[fromIndex].pop();
    newPegs[targetIndex].push(disc);
    setPegs(newPegs);
    setSelected(null);
    setMoves(moves + 1);
  };

  const isComplete = pegs[0].length === 0 && (pegs[1].length === discCount || pegs[2].length === discCount);
  const minMoves = Math.pow(2, discCount) - 1;

  const handleRestart = () => {
    setPegs(initialPegs);
    setMoves(0);
    setSelected(null);
    setHasStarted(false);
  };

  const discColors = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'];

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Tower of Hanoi</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Move all discs to another rod. Only one disc can be moved at a time, and no disc may be placed on top of a smaller disc.
        </p>
        <div className="flex gap-4 items-center text-sm">
          <span>Moves: <span className="font-bold">{moves}</span></span>
          <span className="text-muted-foreground">Minimum: {minMoves}</span>
          <Button size="sm" variant="outline" onClick={handleRestart}>Restart</Button>
        </div>
      </Card>

      <div className="flex-1 flex items-end justify-around gap-8 p-8 bg-card rounded-lg border min-h-[400px]">
        {pegs.map((peg, pegIndex) => (
          <div
            key={pegIndex}
            onClick={() => handlePegClick(pegIndex)}
            className="relative flex flex-col-reverse items-center justify-end w-1/3 cursor-pointer group"
          >
            <div className="absolute bottom-0 w-full h-2 bg-muted rounded-full" />
            <div className="absolute bottom-0 w-1 bg-muted" style={{ height: '280px' }} />
            
            <div className="relative flex flex-col-reverse items-center gap-1 pt-2 pb-4">
              {peg.map((disc, idx) => {
                const isSelected = selected?.disc === disc && selected?.peg === pegIndex;
                const width = 60 + disc * 30;
                
                return (
                  <div
                    key={`${pegIndex}-${disc}-${idx}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDiscClick(pegIndex);
                    }}
                    className={`
                      relative h-8 rounded-full flex items-center justify-between
                      transition-all duration-200 cursor-pointer
                      ${isSelected ? 'ring-4 ring-primary ring-offset-2' : 'hover:brightness-110'}
                    `}
                    style={{
                      width: `${width}px`,
                      backgroundColor: discColors[disc % discColors.length],
                    }}
                  >
                    <div className="w-3 h-3 rounded-full bg-background border-2 border-current ml-1" />
                    <div className="w-3 h-3 rounded-full bg-background border-2 border-current mr-1" />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {isComplete && (
        <Card className="p-4 bg-primary/10 border-primary">
          <p className="text-center font-semibold">
            🎉 Puzzle solved in {moves} moves! {moves === minMoves && '(Optimal!)'}
          </p>
        </Card>
      )}
    </div>
  );
};
