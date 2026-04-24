import { useRef, useState } from 'react';

const DROP_ZONE_ID = 'drop-zone';

export default function WordChip({ word, colorClass, answered, isCorrectAnswer, onDrop, onHoverChange }) {
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
    const dz = document.getElementById(DROP_ZONE_ID);
    if (dz) {
      const r = dz.getBoundingClientRect();
      onHoverChange(e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom);
    }
  }

  function handlePointerUp(e) {
    if (!isDragging) return;
    setIsDragging(false);
    onHoverChange(false);

    const elapsed = Date.now() - startTime.current;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;

    if (elapsed < 300 && Math.sqrt(dx * dx + dy * dy) < 15) {
      onDrop(word);
      return;
    }

    const dz = document.getElementById(DROP_ZONE_ID);
    if (dz) {
      const r = dz.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        onDrop(word);
      }
    }
  }

  const cls = [
    'word-chip',
    colorClass,
    isDragging ? 'chip-dragging' : '',
    answered && isCorrectAnswer ? 'chip-reveal-correct' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <div
        ref={elRef}
        className={cls}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {word}
      </div>

      {isDragging && (
        <div className={`drag-ghost word-chip ${colorClass}`} style={{ left: dragPos.x - 60, top: dragPos.y - 26 }}>
          {word}
        </div>
      )}
    </>
  );
}
