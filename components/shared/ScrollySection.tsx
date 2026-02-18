'use client';
import { useState, useRef, useEffect, ReactNode } from 'react';

interface ScrollStep {
  text: ReactNode;
  callout?: string; // "Why it matters" callout
}

interface Props {
  id: string;
  steps: ScrollStep[];
  visualization: (activeStep: number) => ReactNode;
  title?: ReactNode;
  subtitle?: string;
}

export default function ScrollySection({ id, steps, visualization, title, subtitle }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i);
        },
        { threshold: 0.5, rootMargin: '-20% 0px -30% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [steps.length]);

  return (
    <section id={id} ref={containerRef} className="section-responsive" style={{ maxWidth: 1180, margin: '0 auto', paddingTop: 40, paddingBottom: 0 }}>
      {/* Section heading */}
      {title && (
        <div style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 400,
              color: 'var(--text-primary)',
              marginBottom: 8,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 500 }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Scrolly layout — uses responsive CSS class */}
      <div className="scrolly-grid">
        {/* Left: Narrative text cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 120, paddingBottom: '50vh' }}>
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { stepRefs.current[i] = el; }}
              className={`narrative-card ${activeStep === i ? 'active' : 'inactive'}`}
              style={{ minHeight: 180 }}
            >
              <div style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {step.text}
              </div>
              {step.callout && (
                <div className="callout-why" style={{ fontSize: 14, lineHeight: 1.6, marginTop: 16 }}>
                  {step.callout}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Sticky visualization */}
        <div className="scrolly-viz">
          <div
            className="card"
            style={{
              width: '100%',
              padding: 32,
              minHeight: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {visualization(activeStep)}
          </div>
        </div>
      </div>
    </section>
  );
}
