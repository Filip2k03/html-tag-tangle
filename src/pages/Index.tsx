import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import DraggableTag from '@/components/DraggableTag';
import DropZone from '@/components/DropZone';
import ScoreBoard from '@/components/ScoreBoard';

const LEVELS = [
  { tags: ['div'], points: 5 },
  { tags: ['div', 'p'], points: 10 },
  { tags: ['div', 'p', 'span'], points: 15 },
  { tags: ['div', 'p', 'span', 'h1'], points: 20 },
  { tags: ['div', 'p', 'span', 'h1', 'h2'], points: 25 },
  { tags: ['div', 'p', 'span', 'h1', 'h2', 'a'], points: 30 },
  { tags: ['div', 'p', 'span', 'h1', 'h2', 'a', 'ul'], points: 35 },
  { tags: ['div', 'p', 'span', 'h1', 'h2', 'a', 'ul', 'li'], points: 40 },
  { tags: ['div', 'p', 'span', 'h1', 'h2', 'a', 'ul', 'li', 'img'], points: 45 },
  { tags: ['div', 'p', 'span', 'h1', 'h2', 'a', 'ul', 'li', 'img', 'form'], points: 50 },
];

const Index = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentPair, setCurrentPair] = useState<{ tag: string; matched: boolean } | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    setAvailableTags([...LEVELS[level - 1].tags].sort(() => Math.random() - 0.5));
  }, [level]);

  const handleDragStart = (e: React.DragEvent, tag: string, isOpening: boolean) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ tag, isOpening }));
  };

  const handleDrop = (e: React.DragEvent, isOpeningZone: boolean) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    
    if (data.isOpening === isOpeningZone) {
      toast.error("Tags must be paired with their opposite!");
      return;
    }

    if (!currentPair) {
      setCurrentPair({ tag: data.tag, matched: false });
    } else if (currentPair.tag === data.tag && !currentPair.matched) {
      setScore(prev => prev + LEVELS[level - 1].points);
      setCurrentPair(null);
      setAvailableTags(prev => prev.filter(t => t !== data.tag));
      toast.success("Perfect match!");

      if (availableTags.length <= 1 && level < LEVELS.length) {
        setLevel(prev => prev + 1);
        toast.success("Level complete! Moving to next level...");
      }
    } else {
      toast.error("Tags don't match!");
      setCurrentPair(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          HTML Tag Puzzle
        </h1>
        
        <ScoreBoard score={score} level={level} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Opening Tags</h2>
            <div className="grid grid-cols-2 gap-4">
              {availableTags.map((tag) => (
                <DraggableTag
                  key={`opening-${tag}`}
                  tag={tag}
                  isOpening={true}
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Closing Tags</h2>
            <div className="grid grid-cols-2 gap-4">
              {availableTags.map((tag) => (
                <DraggableTag
                  key={`closing-${tag}`}
                  tag={tag}
                  isOpening={false}
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-8">
          <DropZone
            onDrop={(e) => handleDrop(e, false)}
            isActive={currentPair && !currentPair.matched}
          >
            {currentPair && currentPair.matched && <DraggableTag
              tag={currentPair.tag}
              isOpening={false}
              onDragStart={() => {}}
              className="cursor-default"
            />}
          </DropZone>

          <DropZone
            onDrop={(e) => handleDrop(e, true)}
            isActive={!currentPair}
          >
            {currentPair && <DraggableTag
              tag={currentPair.tag}
              isOpening={true}
              onDragStart={() => {}}
              className="cursor-default"
            />}
          </DropZone>
        </div>
      </div>
    </div>
  );
};

export default Index;