'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(end * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        tick();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="section-responsive"
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--text-tertiary)',
          marginBottom: 20,
        }}
      >
        Interactive Explainer — Updated February 2025
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: 'var(--font-serif), Georgia, serif',
          fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
          fontWeight: 400,
          lineHeight: 1.08,
          color: 'var(--text-primary)',
          marginBottom: 24,
          letterSpacing: '-0.025em',
          maxWidth: 800,
        }}
      >
        Choosing the right{' '}
        <span style={{ fontStyle: 'italic', color: 'var(--forward-blue)' }}>Claude</span>{' '}
        model
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          color: 'var(--text-secondary)',
          maxWidth: 580,
          lineHeight: 1.6,
          marginBottom: 56,
        }}
      >
        Three models. One family. From lightning-fast Haiku to deep-thinking Opus —
        an interactive guide to understanding what each model does best, what it costs,
        and when to use it.
      </p>

      {/* Stats row */}
      <div
        style={{
          display: 'flex',
          gap: 56,
          flexWrap: 'wrap',
          marginBottom: 72,
          paddingTop: 32,
          borderTop: '1px solid var(--border)',
        }}
      >
        {[
          { value: 3, suffix: '', label: 'Model tiers', sublabel: 'economy → balanced → frontier' },
          { value: 200, suffix: 'K', label: 'Context window', sublabel: 'tokens across all models' },
          { value: 50, suffix: '%', label: 'Batch savings', sublabel: 'with the Batch API' },
        ].map((stat, i) => (
          <div key={i}>
            <div
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
              }}
            >
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginTop: 4 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>
              {stat.sublabel}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <a
        href="#meet-the-family"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('meet-the-family')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="bounce-down"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: 'var(--text-tertiary)',
          fontSize: 14,
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        Scroll to explore <ChevronDown size={16} />
      </a>
    </section>
  );
}
