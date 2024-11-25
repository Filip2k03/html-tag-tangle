import React from 'react';
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onDrop: (e: React.DragEvent) => void;
  isActive: boolean;
  children?: React.ReactNode;
}

const DropZone: React.FC<DropZoneProps> = ({ onDrop, isActive, children }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={handleDragOver}
      className={cn(
        "w-40 h-20 border-2 border-dashed rounded-lg flex items-center justify-center",
        isActive ? "border-game-green bg-green-50" : "border-gray-300",
        "transition-colors duration-200"
      )}
    >
      {children || <span className="text-gray-400">Drop here</span>}
    </div>
  );
};

export default DropZone;