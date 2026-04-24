import { useRef, useState } from 'react';

const DROP_ZONE_ID = 'sentence-drop-zone';

export default function WordChip({ word, answered, isAnswer, isPlaced, onDrop }) {
  const elRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const startTime = useRef(0);
  const startPos = useRef({ x: 0, y: 0 });

  function handlePointerDown(e) {
    if (answered) return;
    e.preventDefault();
    elRef.current.setPointerCapture(e.pointerId);
    startTime.current = Date.now();
    startPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    setDragPos({ x: e.clientX, y: e.clientY });
  }

  function handlePointerMove(e) {
    if (!isDragging) return;
    setDragPos({ x: e.clientX, y: e.clientY });

    const dropZone = document.getElementById(DROP_ZONE_ID);
    if (dropZone) {
      const rect = dropZone.getBoundingClientRect();
      const over =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;
      dropZone.classList.toggle('drop-zone-hover', over);
    }
  }

  function handlePointerUp(e) {
    if (!isDragging) return;
    setIsDragging(false);

    const dropZone = document.getElementById(DROP_ZONE_ID);
    if (dropZone) dropZone.classList.remove('drop-zone-hover');

    const elapsed = Date.now() - startTime.current;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (elapsed < 300 && dist < 15) {
      onDrop(word);
      return;
    }

    if (dropZone) {
      const rect = dropZone.getBoundingClientRect();
      const dropped =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (dropped) onDrop(word);
    }
  }

  const chipClass = [
    'word-chip',
    isDragging ? 'chip-dragging' : '',
    isPlaced && !answered ? 'chip-placed' : '',
    answered && isAnswer ? 'chip-answer' : '',
    answered && isPlaced && !isAnswer ? 'chip-wrong' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div
        ref={elRef}
        className={chipClass}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {word}
      </div>

      {isDragging && (
        <div
          className="drag-ghost"
          style={{
            left: dragPos.x - 60,
            top: dragPos.y - 24,
          }}
        >
          {word}
        </div>
      )}
    </>
  );
}
