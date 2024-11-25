import React from 'react';
import { Badge } from "@/components/ui/badge";

interface ScoreBoardProps {
  score: number;
  level: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, level }) => {
  return (
    <div className="flex gap-4 items-center justify-center mb-8">
      <Badge variant="secondary" className="text-lg px-4 py-2">
        Level: {level}
      </Badge>
      <Badge variant="secondary" className="text-lg px-4 py-2">
        Score: {score}
      </Badge>
    </div>
  );
};

export default ScoreBoard;