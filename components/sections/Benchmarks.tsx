'use client';
import ScrollySection from '@/components/shared/ScrollySection';
import JargonTerm from '@/components/shared/JargonTerm';
import { barBenchmarks } from '@/data/benchmarks';

function BenchmarkDiagram({ activeStep }: { activeStep: number }) {
  // Step 0: overview with all benchmarks dimmed
  // Step 1: coding benchmarks highlighted (SWE-bench)
  // Step 2: reasoning benchmarks (ARC-AGI-2)
  // Step 3: real-world agent benchmarks (OSWorld, Finance)

  const categories = [
    { indices: [0], label: 'Coding', step: 1 },
    { indices: [2], label: 'Reasoning', step: 2 },
    { indices: [1, 3], label: 'Real-world Agents', step: 3 },
  ];

  const getHighlight = (benchIdx: number) => {
    if (activeStep === 0) return true; // all visible
    return categories.some(c => c.step === activeStep && c.indices.includes(benchIdx));
  };

  const barHeight = 24;
  const barGap = 10;
  const groupGap = 36;
  const labelWidth = 120;
  const chartWidth = 300;
  const models = [
    { key: 'haiku' as const, color: 'var(--haiku-green)', label: 'Haiku' },
    { key: 'sonnet' as const, color: 'var(--sonnet-blue)', label: 'Sonnet' },
    { key: 'opus' as const, color: 'var(--opus-purple)', label: 'Opus' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)' }}>
          {activeStep === 0 ? 'All Benchmarks' :
           activeStep === 1 ? 'Coding Performance' :
           activeStep === 2 ? 'Abstract Reasoning' :
           'Real-World Agents'}
        </div>
      </div>

      <svg viewBox={`0 0 480 ${barBenchmarks.length * (3 * barHeight + 3 * barGap + groupGap) + 20}`} style={{ width: '100%', height: 'auto' }}>
        {barBenchmarks.map((bench, bi) => {
          const highlighted = getHighlight(bi);
          const yBase = bi * (3 * barHeight + 3 * barGap + groupGap) + 10;

          return (
            <g key={bench.name} className="scroll-transition" opacity={highlighted ? 1 : 0.15}>
              {/* Benchmark name */}
              <text
                x={0} y={yBase + 8}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  fill: 'var(--text-primary)',
                  fontFamily: 'system-ui',
                }}
              >
                {bench.name}
              </text>

              {/* Bars */}
              {models.map((m, mi) => {
                const y = yBase + 16 + mi * (barHeight + barGap);
                const width = (bench[m.key] / bench.max) * chartWidth;

                return (
                  <g key={m.key}>
                    {/* Label */}
                    <text
                      x={labelWidth - 8} y={y + barHeight / 2 + 4}
                      textAnchor="end"
                      style={{ fontSize: 11, fill: m.color, fontWeight: 500, fontFamily: 'system-ui' }}
                    >
                      {m.label}
                    </text>

                    {/* Background bar */}
                    <rect
                      x={labelWidth} y={y}
                      width={chartWidth} height={barHeight}
                      rx={4}
                      fill="var(--bg-secondary)"
                    />

                    {/* Value bar */}
                    <rect
                      x={labelWidth} y={y}
                      width={highlighted ? width : 0}
                      height={barHeight}
                      rx={4}
                      fill={m.color}
                      opacity={0.8}
                      className="scroll-transition"
                      style={{ transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)' }}
                    />

                    {/* Value label */}
                    <text
                      x={labelWidth + width + 8} y={y + barHeight / 2 + 4}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        fill: 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono), monospace',
                        opacity: highlighted ? 1 : 0,
                      }}
                      className="scroll-transition"
                    >
                      {bench[m.key]}%
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 16 }}>
        {models.map(m => (
          <div key={m.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: m.color }} />
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Benchmarks() {
  const steps = [
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            Numbers tell the story.
          </p>
          <p>
            Imagine three students taking the same exam. One finishes first but gets a B+.
            Another takes a bit longer for an A. The third aces everything but needs the most time.
            That&apos;s essentially what&apos;s happening with{' '}
            <JargonTerm term="benchmarks" definition="Standardized tests that measure AI model performance across different skills">
              benchmarks
            </JargonTerm>
            — standardized tests for AI models.
          </p>
        </>
      ),
      callout: 'Higher scores mean the model gets more answers right — but scoring 5% higher often costs 5x more.',
    },
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            Can it actually code?
          </p>
          <p>
            <JargonTerm term="SWE-bench" definition="A benchmark that tests if AI can fix real bugs in real open-source Python repositories">
              SWE-bench Verified
            </JargonTerm>
            {' '}tests whether a model can fix real bugs in production code. Opus solves 72.5% of issues —
            nearly 3x more than Haiku. This is why Opus powers tools like Claude Code for complex
            multi-file refactors.
          </p>
        </>
      ),
      callout: 'This is why your AI coding assistant sometimes "just works" and sometimes needs hand-holding — model capability matters enormously.',
    },
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            Can it think abstractly?
          </p>
          <p>
            <JargonTerm term="ARC-AGI-2" definition="Tests novel pattern recognition — problems the model has never seen before, requiring genuine reasoning">
              ARC-AGI-2
            </JargonTerm>
            {' '}is the hardest benchmark here — it tests whether a model can solve problems it has
            literally never seen before. Scores are low across the board, but Opus leads at 21.2%.
            This is the frontier of AI reasoning.
          </p>
        </>
      ),
      callout: 'ARC-AGI-2 is designed to resist memorization — models can\'t just recall answers they\'ve seen in training data.',
    },
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            Can it do a real job?
          </p>
          <p>
            OSWorld and Finance Agent test whether a model can complete real tasks — using a computer
            GUI, managing spreadsheets, executing financial analysis workflows. These are the benchmarks
            that matter most for production: not &quot;can it answer a trivia question?&quot; but
            &quot;can it do useful work?&quot;
          </p>
        </>
      ),
      callout: 'Agent benchmarks are the new frontier — they test the models on tasks that would actually save you time and money.',
    },
  ];

  return (
    <ScrollySection
      id="benchmarks"
      title={<>The Intelligence <span style={{ fontStyle: 'italic' }}>Spectrum</span></>}
      subtitle="How each model performs across industry-standard evaluations."
      steps={steps}
      visualization={(step) => <BenchmarkDiagram activeStep={step} />}
    />
  );
}
