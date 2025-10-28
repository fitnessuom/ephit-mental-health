import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const gymWords = [
  'pushup', 'squat', 'treadmill', 'dumbbell', 'barbell', 'kettlebell',
  'plank', 'yoga', 'cycling', 'boxercise', 'nutrition', 'hydration'
];

export const VerbalRecall: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'present' | 'recall' | 'complete'>('idle');
  const [displayIndex, setDisplayIndex] = useState(0);
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [errorWord, setErrorWord] = useState<string | null>(null);

  useEffect(() => {
    if (phase === 'present') {
      if (displayIndex < gymWords.length) {
        const timer = setTimeout(() => setDisplayIndex(displayIndex + 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setPhase('recall');
        setShuffled([...gymWords].sort(() => Math.random() - 0.5));
      }
    }
  }, [phase, displayIndex]);

  const handleWordClick = (word: string) => {
    if (phase !== 'recall') return;
    if (selected.includes(word)) return;

    const nextIndex = selected.length;
    
    if (word === gymWords[nextIndex]) {
      setSelected([...selected, word]);
      setErrorWord(null);
      
      if (nextIndex + 1 === gymWords.length) {
        setCorrectCount(gymWords.length);
        setPhase('complete');
      }
    } else {
      setErrorWord(word);
      setTimeout(() => setErrorWord(null), 500);
      
      const correctSoFar = selected.length;
      setCorrectCount(correctSoFar);
      setPhase('complete');
    }
  };

  const handleStart = () => {
    setPhase('present');
    setDisplayIndex(0);
    setSelected([]);
    setCorrectCount(0);
    setErrorWord(null);
  };

  const handleRestart = () => {
    setPhase('idle');
    setDisplayIndex(0);
    setSelected([]);
    setCorrectCount(0);
    setErrorWord(null);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Verbal List Recall</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Remember the order of {gymWords.length} gym-related words as they appear, then recall them in sequence.
        </p>
        
        {phase === 'idle' && (
          <Button onClick={handleStart}>Start Test</Button>
        )}
        
        {phase === 'present' && (
          <p className="text-sm text-muted-foreground">
            Watch carefully... {displayIndex}/{gymWords.length}
          </p>
        )}
        
        {phase === 'recall' && (
          <p className="text-sm text-muted-foreground">
            Click the words in the order they were shown ({selected.length}/{gymWords.length})
          </p>
        )}
      </Card>

      {phase === 'present' && displayIndex < gymWords.length && (
        <div className="flex-1 flex items-center justify-center bg-card rounded-lg border min-h-[400px]">
          <div className="text-center animate-in fade-in duration-300">
            <p className="text-5xl font-bold text-primary">{gymWords[displayIndex]}</p>
          </div>
        </div>
      )}

      {phase === 'recall' && (
        <div className="flex-1 bg-card rounded-lg border p-8 min-h-[400px]">
          <div className="flex flex-wrap gap-3 justify-center">
            {shuffled.map((word) => {
              const isSelected = selected.includes(word);
              const isError = errorWord === word;
              
              return (
                <Button
                  key={word}
                  onClick={() => handleWordClick(word)}
                  disabled={isSelected}
                  variant={isSelected ? 'secondary' : 'outline'}
                  className={`
                    text-lg px-6 py-3 h-auto
                    ${isError ? 'animate-shake border-destructive' : ''}
                    ${isSelected ? 'opacity-50' : 'hover:scale-105'}
                  `}
                >
                  {word}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {phase === 'complete' && (
        <Card className="flex-1 p-8 min-h-[400px] flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Test Complete!</h3>
            <p className="text-lg mb-4">
              You correctly recalled <span className="text-primary font-bold">{correctCount}</span> out of {gymWords.length} words in order.
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {gymWords.map((word, idx) => (
                <Badge
                  key={word}
                  variant={selected[idx] === word ? 'default' : 'secondary'}
                >
                  {idx + 1}. {word}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button onClick={handleRestart}>Try Again</Button>
        </Card>
      )}
    </div>
  );
};
