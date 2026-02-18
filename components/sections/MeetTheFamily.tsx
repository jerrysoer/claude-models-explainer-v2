'use client';
import ScrollySection from '@/components/shared/ScrollySection';
import JargonTerm from '@/components/shared/JargonTerm';

function ModelDiagram({ activeStep }: { activeStep: number }) {
  const models = [
    { id: 'haiku', name: 'Haiku 4.5', tagline: 'Speed Demon', color: 'var(--haiku-green)', x: 100, y: 80, icon: '⚡' },
    { id: 'sonnet', name: 'Sonnet 4.5', tagline: 'The Sweet Spot', color: 'var(--sonnet-blue)', x: 230, y: 180, icon: '🧠' },
    { id: 'opus', name: 'Opus 4.6', tagline: 'The Heavyweight', color: 'var(--opus-purple)', x: 360, y: 280, icon: '✨' },
  ];

  return (
    <div style={{ width: '100%' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)' }}>
          The Claude Family
        </div>
      </div>

      <svg viewBox="0 0 480 400" style={{ width: '100%', height: 'auto' }}>
        {/* Axis labels */}
        <text x="240" y="390" textAnchor="middle" style={{ fontSize: 11, fill: 'var(--text-tertiary)', fontFamily: 'system-ui' }}>
          Intelligence →
        </text>
        <text x="12" y="200" textAnchor="middle" transform="rotate(-90, 12, 200)" style={{ fontSize: 11, fill: 'var(--text-tertiary)', fontFamily: 'system-ui' }}>
          Cost →
        </text>

        {/* Connection lines between models */}
        <line
          x1={140} y1={100} x2={270} y2={200}
          stroke="var(--border)"
          strokeWidth="1.5"
          strokeDasharray={activeStep >= 1 ? "0" : "6,4"}
          className="scroll-transition"
          opacity={activeStep >= 1 ? 0.6 : 0.2}
        />
        <line
          x1={270} y1={200} x2={400} y2={300}
          stroke="var(--border)"
          strokeWidth="1.5"
          strokeDasharray={activeStep >= 1 ? "0" : "6,4"}
          className="scroll-transition"
          opacity={activeStep >= 1 ? 0.6 : 0.2}
        />

        {/* Model nodes */}
        {models.map((m, i) => {
          const isHighlighted = activeStep === 0 || activeStep === i + 1;
          const isFocused = activeStep === i + 1;
          const nodeSize = isFocused ? 44 : 36;

          return (
            <g key={m.id} className="scroll-transition" opacity={isHighlighted ? 1 : 0.25}>
              {/* Glow ring when focused */}
              {isFocused && (
                <circle
                  cx={m.x + 40} cy={m.y + 20}
                  r={nodeSize + 8}
                  fill="none"
                  stroke={m.color}
                  strokeWidth="2"
                  opacity="0.2"
                  className="scroll-transition"
                />
              )}

              {/* Node circle */}
              <circle
                cx={m.x + 40} cy={m.y + 20}
                r={nodeSize}
                fill={m.color}
                opacity={isFocused ? 0.15 : 0.08}
                className="scroll-transition"
              />
              <circle
                cx={m.x + 40} cy={m.y + 20}
                r={nodeSize}
                fill="none"
                stroke={m.color}
                strokeWidth={isFocused ? 2.5 : 1.5}
                className="scroll-transition"
              />

              {/* Icon */}
              <text
                x={m.x + 40} y={m.y + 26}
                textAnchor="middle"
                style={{ fontSize: isFocused ? 22 : 18 }}
                className="scroll-transition"
              >
                {m.icon}
              </text>

              {/* Label */}
              <text
                x={m.x + 40} y={m.y + 20 + nodeSize + 18}
                textAnchor="middle"
                style={{
                  fontSize: isFocused ? 14 : 12,
                  fontWeight: isFocused ? 700 : 500,
                  fill: 'var(--text-primary)',
                  fontFamily: 'system-ui',
                }}
                className="scroll-transition"
              >
                {m.name}
              </text>

              {/* Tagline (only when focused) */}
              {isFocused && (
                <text
                  x={m.x + 40} y={m.y + 20 + nodeSize + 34}
                  textAnchor="middle"
                  style={{
                    fontSize: 11,
                    fill: m.color,
                    fontWeight: 500,
                    fontFamily: 'system-ui',
                  }}
                >
                  {m.tagline}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Detail card (shown when a model is focused) */}
      {activeStep >= 1 && activeStep <= 3 && (
        <div
          className="scroll-transition"
          style={{
            marginTop: 16,
            padding: '16px 20px',
            borderRadius: 10,
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            fontSize: 13,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
          }}
        >
          {(() => {
            const data = [
              { input: '$0.80', output: '$4.00', context: '200K', maxOut: '8,192' },
              { input: '$3.00', output: '$15.00', context: '200K', maxOut: '16,384' },
              { input: '$15.00', output: '$75.00', context: '200K', maxOut: '32,000' },
            ][activeStep - 1];
            return (
              <>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Input: </span>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 600, color: 'var(--text-primary)' }}>{data.input}/1M</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Output: </span>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 600, color: 'var(--text-primary)' }}>{data.output}/1M</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Context: </span>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 600, color: 'var(--text-primary)' }}>{data.context}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Max output: </span>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 600, color: 'var(--text-primary)' }}>{data.maxOut}</span>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

export default function MeetTheFamily() {
  const steps = [
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            Think of it like choosing a vehicle.
          </p>
          <p>
            Sometimes you need a quick scooter for short trips. Sometimes a reliable sedan for daily driving.
            And sometimes — a heavy-duty truck for the big jobs. Claude&apos;s three models work the same way:
            each is built for a different balance of{' '}
            <JargonTerm term="intelligence" definition="How well the model reasons, follows complex instructions, and produces accurate outputs">
              intelligence
            </JargonTerm>
            , speed, and cost.
          </p>
        </>
      ),
      callout: 'Most teams use 2 or 3 models together — routing simple tasks to the fast one and complex tasks to the smart one.',
    },
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            The scooter: Haiku 4.5
          </p>
          <p>
            Haiku is the speed demon. At $0.80 per million{' '}
            <JargonTerm term="input tokens" definition="The text you send to the model — roughly 4 characters per token">
              input tokens
            </JargonTerm>
            , it&apos;s 19x cheaper than Opus. It won&apos;t write your PhD thesis, but it will
            classify 50,000 support tickets before lunch.
          </p>
          <p style={{ marginTop: 12 }}>
            <strong>Best at:</strong> Classification, routing, real-time responses, high-volume processing.
          </p>
        </>
      ),
      callout: 'This is why chatbots feel instant — they\'re almost certainly running on a model like Haiku.',
    },
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            The sedan: Sonnet 4.5
          </p>
          <p>
            Sonnet is the workhorse. It&apos;s the model most teams default to — smart enough for coding
            assistants, content generation, and data analysis, but not so expensive that your CFO notices.
          </p>
          <p style={{ marginTop: 12 }}>
            <strong>Best at:</strong> Code generation, content writing, data analysis, general-purpose production workloads.
          </p>
        </>
      ),
      callout: 'If you\'re not sure which model to start with, Sonnet is almost always the right answer.',
    },
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            The truck: Opus 4.6
          </p>
          <p>
            Opus is for when the stakes are high and the problem is hard. Legal analysis,
            research synthesis, strategic planning — tasks where being wrong costs more than
            the model. At $15/million input tokens, you pay for the best reasoning available.
          </p>
          <p style={{ marginTop: 12 }}>
            <strong>Best at:</strong> Complex reasoning, research, high-stakes decisions, novel problem solving.
          </p>
        </>
      ),
      callout: 'Opus scores 83.7% on MMLU Pro — graduate-level reasoning across 57 subjects.',
    },
  ];

  return (
    <ScrollySection
      id="meet-the-family"
      title={<>Meet the <span style={{ fontStyle: 'italic' }}>Family</span></>}
      subtitle="Three models, each optimized for a different balance of speed, intelligence, and cost."
      steps={steps}
      visualization={(step) => <ModelDiagram activeStep={step} />}
    />
  );
}
