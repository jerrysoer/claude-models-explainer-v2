'use client';
import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Introduction' },
  { id: 'meet-the-family', label: 'Models' },
  { id: 'benchmarks', label: 'Benchmarks' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'calculator', label: 'Calculator' },
  { id: 'use-cases', label: 'Use Cases' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'decision', label: 'Decision' },
];

export default function SectionNav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
      className="hidden lg:flex"
    >
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          title={label}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              width: active === id ? 12 : 8,
              height: active === id ? 12 : 8,
              borderRadius: '50%',
              background: active === id ? 'var(--forward-blue)' : 'var(--text-tertiary)',
              opacity: active === id ? 1 : 0.4,
              transition: 'all 0.3s',
              display: 'block',
            }}
          />
        </a>
      ))}
    </nav>
  );
}
