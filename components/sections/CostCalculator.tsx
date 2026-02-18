'use client';
import { useState } from 'react';
import { Calculator, TrendingDown } from 'lucide-react';
import { models, modelColors } from '@/data/models';
import { costScenarios } from '@/data/scenarios';
import SectionWrapper from '@/components/shared/SectionWrapper';
import JargonTerm from '@/components/shared/JargonTerm';

export default function CostCalculator() {
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [requestsPerDay, setRequestsPerDay] = useState(1000);
  const [useCaching, setUseCaching] = useState(false);
  const [useBatch, setUseBatch] = useState(false);

  const calculateCost = (model: typeof models[0]) => {
    const inputCost = (inputTokens / 1_000_000) * model.inputPrice * requestsPerDay * 30;
    const outputCost = (outputTokens / 1_000_000) * model.outputPrice * requestsPerDay * 30;
    let total = inputCost + outputCost;
    if (useCaching) total *= 0.4;
    if (useBatch) total *= 0.5;
    return total;
  };

  const costs = models.map((m) => ({ model: m, cost: calculateCost(m) }));
  const cheapest = costs.reduce((a, b) => (a.cost < b.cost ? a : b));
  const maxCost = Math.max(...costs.map((c) => c.cost));

  const loadScenario = (s: typeof costScenarios[0]) => {
    setInputTokens(s.inputTokens);
    setOutputTokens(s.outputTokens);
    setRequestsPerDay(s.requestsPerDay);
  };

  return (
    <SectionWrapper id="calculator">
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
        Cost <span style={{ fontStyle: 'italic' }}>Calculator</span>
      </h2>
      <p style={{ fontSize: 17, color: 'var(--text-secondary)', marginBottom: 12, maxWidth: 560 }}>
        Think of this like an electricity bill estimator. Plug in your usage, see what each model would cost.
      </p>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 32, maxWidth: 560 }}>
        Try clicking a preset scenario below, or adjust the sliders manually.
      </p>

      {/* Preset scenarios */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
        {costScenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => loadScenario(s)}
            className="card card-interactive"
            style={{
              padding: '12px 18px',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              border: '1px solid var(--border)',
            }}
          >
            <span>{s.icon}</span> {s.name}
          </button>
        ))}
      </div>

      <div className="two-col-grid">
        {/* Left: Controls */}
        <div>
          {[
            { label: 'Input tokens per request', value: inputTokens, set: setInputTokens, min: 100, max: 50000, step: 100 },
            { label: 'Output tokens per request', value: outputTokens, set: setOutputTokens, min: 50, max: 16000, step: 50 },
            { label: 'Requests per day', value: requestsPerDay, set: setRequestsPerDay, min: 10, max: 100000, step: 10 },
          ].map(({ label, value, set, min, max, step }) => (
            <div key={label} style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</label>
                <span style={{ fontSize: 14, fontFamily: 'var(--font-mono), monospace', color: 'var(--forward-blue)', fontWeight: 600 }}>
                  {value.toLocaleString()}
                </span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} />
            </div>
          ))}

          {/* Toggles */}
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {[
              { label: 'Prompt Caching', checked: useCaching, set: setUseCaching, savings: '60%' },
              { label: 'Batch API', checked: useBatch, set: setUseBatch, savings: '50%' },
            ].map(({ label, checked, set, savings }) => (
              <button
                key={label}
                onClick={() => set(!checked)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: `1.5px solid ${checked ? 'var(--forward-blue)' : 'var(--border)'}`,
                  background: checked ? 'rgba(74,144,217,0.06)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <TrendingDown size={14} style={{ color: checked ? 'var(--forward-blue)' : 'var(--text-tertiary)' }} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: checked ? 'var(--forward-blue)' : 'var(--text-secondary)' }}>{label}</span>
                </div>
                <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>Save {savings}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Results */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Monthly Cost Estimate
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            {costs.map(({ model, cost }) => {
              const colors = modelColors[model.id];
              const isCheapest = cost === cheapest.cost;
              return (
                <div key={model.id} className="card" style={{ padding: '18px 22px', borderColor: isCheapest ? colors.primary + '44' : undefined }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.primary }} />
                      <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{model.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono), monospace', color: 'var(--text-primary)' }}>
                        ${cost < 1 ? cost.toFixed(2) : cost < 100 ? cost.toFixed(1) : Math.round(cost).toLocaleString()}
                      </span>
                      <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>/mo</span>
                      {isCheapest && (
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 100, background: colors.primary + '18', color: colors.primary }}>
                          Cheapest
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                    <div style={{ width: maxCost > 0 ? `${(cost / maxCost) * 100}%` : '0%', height: '100%', borderRadius: 3, background: colors.gradient, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
