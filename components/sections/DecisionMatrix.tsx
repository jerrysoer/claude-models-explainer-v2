'use client';
import ScrollySection from '@/components/shared/ScrollySection';
import JargonTerm from '@/components/shared/JargonTerm';
import { decisionMatrix } from '@/data/scenarios';
import { modelColors } from '@/data/models';

function DecisionDiagram({ activeStep }: { activeStep: number }) {
  // Step 0: Full decision map overview
  // Step 1: Haiku scenarios (simple tasks)
  // Step 2: Sonnet scenarios (production workloads)
  // Step 3: Opus scenarios (complex reasoning)

  const groups = [
    { model: 'haiku', label: 'Haiku Zone', color: 'var(--haiku-green)', scenarios: decisionMatrix.filter(d => d.recommendation === 'haiku') },
    { model: 'sonnet', label: 'Sonnet Zone', color: 'var(--sonnet-blue)', scenarios: decisionMatrix.filter(d => d.recommendation === 'sonnet') },
    { model: 'opus', label: 'Opus Zone', color: 'var(--opus-purple)', scenarios: decisionMatrix.filter(d => d.recommendation === 'opus') },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: 24 }}>
        {activeStep === 0 ? 'Decision Map' :
         activeStep === 1 ? 'Simple & Fast' :
         activeStep === 2 ? 'Production Ready' :
         'Deep & Complex'}
      </div>

      <div style={{ display: 'grid', gap: 20 }}>
        {groups.map((group, gi) => {
          const isHighlighted = activeStep === 0 || activeStep === gi + 1;
          const isFocused = activeStep === gi + 1;

          return (
            <div
              key={group.model}
              className="scroll-transition"
              style={{
                opacity: isHighlighted ? 1 : 0.15,
                transform: isFocused ? 'scale(1.02)' : 'scale(1)',
                borderRadius: 12,
                border: `1.5px solid ${isFocused ? group.color : 'var(--border)'}`,
                background: isFocused ? `${group.color}08` : 'transparent',
                padding: '16px 20px',
                transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              {/* Group header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: group.color }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: group.color }}>{group.label}</span>
              </div>

              {/* Scenarios */}
              <div style={{ display: 'grid', gap: 6 }}>
                {group.scenarios.map(s => (
                  <div
                    key={s.scenario}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: '8px 12px',
                      borderRadius: 8,
                      background: isFocused ? 'var(--bg-card)' : 'transparent',
                      transition: 'background 0.3s',
                    }}
                  >
                    <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500, flex: 1 }}>
                      {s.scenario}
                    </span>
                    {isFocused && (
                      <span style={{ fontSize: 11, color: 'var(--text-tertiary)', flexShrink: 0, maxWidth: 140, textAlign: 'right' }}>
                        {s.reason}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom line summary */}
      {activeStep === 0 && (
        <div style={{
          marginTop: 20,
          padding: '14px 18px',
          borderRadius: 10,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          fontSize: 13,
          color: 'var(--text-secondary)',
          textAlign: 'center',
          lineHeight: 1.6,
        }}>
          <strong style={{ color: 'var(--text-primary)' }}>Rule of thumb:</strong> Start with Sonnet. Drop to Haiku for speed. Upgrade to Opus for depth.
        </div>
      )}
    </div>
  );
}

export default function DecisionMatrix() {
  const steps = [
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            A simple decision framework.
          </p>
          <p>
            Think of choosing a model like choosing a restaurant. Fast food (Haiku) for quick meals.
            A solid bistro (Sonnet) for most occasions. A Michelin-star restaurant (Opus) when the experience
            really matters. The map on the right shows which model fits each scenario.
          </p>
        </>
      ),
      callout: 'Most teams end up using 2-3 models, routing requests based on complexity — not locking into just one.',
    },
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            Haiku: when speed trumps depth.
          </p>
          <p>
            High-volume classification, real-time responses, simple routing decisions. Haiku handles
            these at a fraction of the cost. A customer support system processing 50,000 tickets per day
            would cost $160/month on Haiku vs. $3,000/month on Opus.
          </p>
        </>
      ),
      callout: 'This is why most chatbots feel instant — they\'re running on economy-tier models like Haiku.',
    },
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            Sonnet: the default choice.
          </p>
          <p>
            If you&apos;re building a coding assistant, generating marketing content, or analyzing data —
            Sonnet is almost always the right starting point. It handles code generation with 93% accuracy
            on HumanEval and provides excellent reasoning at a fraction of Opus&apos;s cost.
          </p>
        </>
      ),
      callout: 'When in doubt, start with Sonnet and only upgrade to Opus if you measurably need better results.',
    },
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            Opus: when accuracy is everything.
          </p>
          <p>
            Legal contract review where a missed clause costs millions. Research synthesis where nuance
            matters. Strategic planning where the recommendation drives real decisions. Opus is for when
            the cost of being wrong exceeds the cost of the model.
          </p>
        </>
      ),
      callout: 'Opus isn\'t expensive — being wrong is expensive. Opus is insurance.',
    },
  ];

  return (
    <ScrollySection
      id="decision"
      title={<>The Decision <span style={{ fontStyle: 'italic' }}>Map</span></>}
      subtitle="Quick reference for choosing the right model by scenario."
      steps={steps}
      visualization={(step) => <DecisionDiagram activeStep={step} />}
    />
  );
}
