'use client';
import { useState } from 'react';
import { useCases } from '@/data/scenarios';
import { modelColors } from '@/data/models';
import SectionWrapper from '@/components/shared/SectionWrapper';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'haiku', label: 'Haiku' },
  { key: 'sonnet', label: 'Sonnet' },
  { key: 'opus', label: 'Opus' },
];

export default function UseCases() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? useCases : useCases.filter((u) => u.model === active);

  return (
    <SectionWrapper id="use-cases">
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
        Where Each Model <span style={{ fontStyle: 'italic' }}>Shines</span>
      </h2>
      <p style={{ fontSize: 17, color: 'var(--text-secondary)', marginBottom: 12, maxWidth: 520 }}>
        Like picking the right tool from a toolbox — each model excels at different jobs.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text-tertiary)', marginBottom: 28 }}>
        Filter by model to see what each one does best.
      </p>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {filters.map((f) => {
          const isActive = active === f.key;
          const color = f.key === 'all' ? 'var(--forward-blue)' : modelColors[f.key]?.primary;
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              style={{
                padding: '12px 20px',
                borderRadius: 100,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                background: isActive ? (color + '18') : 'var(--bg-secondary)',
                color: isActive ? color : 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Use case grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {filtered.map((uc) => {
          const colors = modelColors[uc.model];
          return (
            <div key={uc.id} className="card card-interactive" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>{uc.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: colors.bg, color: colors.primary, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {uc.model}
                </span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{uc.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{uc.description}</p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
