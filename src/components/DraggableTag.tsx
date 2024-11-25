import React from 'react';
import { cn } from "@/lib/utils";

interface DraggableTagProps {
  tag: string;
  isOpening: boolean;
  onDragStart: (e: React.DragEvent, tag: string, isOpening: boolean) => void;
  className?: string;
}

const DraggableTag: React.FC<DraggableTagProps> = ({
  tag,
  isOpening,
  onDragStart,
  className
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, tag, isOpening)}
      className={cn(
        "cursor-move bg-white p-4 rounded-lg shadow-md text-lg font-mono",
        "border-2 border-game-blue hover:border-game-green transition-colors",
        "active:scale-95 transform transition-transform",
        className
      )}
    >
      {isOpening ? `<${tag}>` : `</${tag}>`}
    </div>
  );
};

export default DraggableTag;