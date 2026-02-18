'use client';
import { useState, useRef, useEffect } from 'react';

interface Props {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export default function JargonTerm({ term, definition, children }: Props) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close on outside click (mobile)
  useEffect(() => {
    if (!show) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShow(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [show]);

  return (
    <span
      ref={ref}
      className="jargon-term"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(!show)}
      role="button"
      tabIndex={0}
      aria-label={`${term}: ${definition}`}
    >
      {children}
      {show && (
        <div ref={tooltipRef} className="jargon-tooltip">
          {definition}
        </div>
      )}
    </span>
  );
}
