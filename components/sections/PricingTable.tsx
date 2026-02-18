'use client';
import ScrollySection from '@/components/shared/ScrollySection';
import JargonTerm from '@/components/shared/JargonTerm';

function PricingDiagram({ activeStep }: { activeStep: number }) {
  const models = [
    { name: 'Haiku 4.5', input: 0.80, output: 4.00, color: 'var(--haiku-green)', speed: 3, intelligence: 3 },
    { name: 'Sonnet 4.5', input: 3.00, output: 15.00, color: 'var(--sonnet-blue)', speed: 2, intelligence: 4 },
    { name: 'Opus 4.6', input: 15.00, output: 75.00, color: 'var(--opus-purple)', speed: 1, intelligence: 5 },
  ];

  // Step 0: Simple price comparison bars
  // Step 1: Input vs Output cost breakdown
  // Step 2: Cost optimization strategies

  if (activeStep <= 0) {
    // Simple relative cost comparison
    const maxOutput = 75;
    return (
      <div style={{ width: '100%' }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: 24 }}>
          Price per 1M tokens
        </div>
        <div style={{ display: 'grid', gap: 24 }}>
          {models.map(m => (
            <div key={m.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: m.color }}>{m.name}</span>
              </div>
              <div style={{ display: 'grid', gap: 6 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Input</span>
                    <span style={{ fontSize: 13, fontFamily: 'var(--font-mono), monospace', fontWeight: 600, color: 'var(--text-primary)' }}>${m.input.toFixed(2)}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                    <div style={{ width: `${(m.input / 15) * 100}%`, height: '100%', borderRadius: 4, background: m.color, opacity: 0.6, transition: 'width 0.8s ease' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Output</span>
                    <span style={{ fontSize: 13, fontFamily: 'var(--font-mono), monospace', fontWeight: 600, color: 'var(--text-primary)' }}>${m.output.toFixed(2)}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                    <div style={{ width: `${(m.output / maxOutput) * 100}%`, height: '100%', borderRadius: 4, background: m.color, transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeStep === 1) {
    // Output costs 5x more than input visual
    return (
      <div style={{ width: '100%' }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: 24 }}>
          The 5x Output Rule
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 32, marginBottom: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 80, height: 60, borderRadius: 8, background: 'var(--sonnet-blue)', opacity: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-mono), monospace', color: 'var(--sonnet-blue)' }}>$3</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Input</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>per 1M tokens</div>
          </div>
          <div style={{ fontSize: 20, color: 'var(--text-tertiary)', marginBottom: 24 }}>→</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 80, height: 120, borderRadius: 8, background: 'var(--backward-orange)', opacity: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-mono), monospace', color: 'var(--backward-orange)' }}>$15</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Output</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>per 1M tokens</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '12px 16px', borderRadius: 8, background: 'var(--bg-secondary)', fontSize: 14, color: 'var(--text-secondary)' }}>
          Output tokens cost <strong style={{ color: 'var(--backward-orange)' }}>5x more</strong> than input tokens — keep responses concise.
        </div>
      </div>
    );
  }

  // Step 2: Cost optimization strategies
  const strategies = [
    { icon: '📦', title: 'Prompt Caching', saving: '90%', desc: 'Cache repeated system prompts' },
    { icon: '⏰', title: 'Batch API', saving: '50%', desc: 'Non-urgent batch processing' },
    { icon: '🔀', title: 'Model Routing', saving: '60-80%', desc: 'Use Haiku for simple tasks' },
    { icon: '✂️', title: 'Concise Output', saving: '2-3x', desc: 'Reduce output token count' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: 24 }}>
        Cost Optimization Playbook
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {strategies.map((s, i) => (
          <div
            key={s.title}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 18px',
              borderRadius: 10,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              opacity: 1,
              transform: 'translateX(0)',
              transition: `opacity 0.4s ${i * 0.1}s, transform 0.4s ${i * 0.1}s`,
            }}
          >
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{s.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{s.desc}</div>
            </div>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'var(--font-mono), monospace',
              color: 'var(--correct-green)',
              padding: '4px 10px',
              borderRadius: 6,
              background: 'rgba(76, 175, 80, 0.1)',
            }}>
              -{s.saving}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PricingTable() {
  const steps = [
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            You pay per word, not per month.
          </p>
          <p>
            Think of it like electricity: you pay for what you use. Claude charges per{' '}
            <JargonTerm term="token" definition="A chunk of text — roughly 4 characters or ¾ of a word. 'Hello world' is 2 tokens.">
              token
            </JargonTerm>
            {' '}— a chunk of text roughly equal to ¾ of a word. Input tokens (what you send) and output
            tokens (what you get back) are priced separately.
          </p>
          <p style={{ marginTop: 12 }}>
            The price spread is dramatic: Opus output costs <strong>18.75x</strong> more than Haiku output.
          </p>
        </>
      ),
      callout: 'A 1,000-word document is roughly 1,300 tokens. A typical API call uses 500-2,000 tokens.',
    },
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            The hidden cost multiplier.
          </p>
          <p>
            Here&apos;s what catches people off guard: output tokens cost <strong>5x more</strong> than input tokens
            across all models. A chatbot that generates long, verbose responses will cost significantly more
            than one with concise, focused answers — even on the same model.
          </p>
          <p style={{ marginTop: 12 }}>
            For Sonnet: 1M input tokens = $3. But 1M output tokens = $15. That&apos;s the same content
            costing 5x more just because the model generated it instead of reading it.
          </p>
        </>
      ),
      callout: 'This is why "be concise" in your system prompt isn\'t just a style preference — it\'s a cost optimization.',
    },
    {
      text: (
        <>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            Four ways to slash your bill.
          </p>
          <p>
            Smart teams don&apos;t just pick a model — they optimize how they use it.
            Prompt caching alone can cut costs by up to 90% for repeated system prompts.
            The Batch API gives an instant 50% discount for non-urgent work. And model routing —
            sending simple tasks to Haiku and complex ones to Opus — can reduce costs by 60-80%.
          </p>
          <p style={{ marginTop: 12 }}>
            Combined, these strategies can reduce a $10,000/month bill to under $2,000.
          </p>
        </>
      ),
      callout: 'The best AI teams don\'t spend the most — they spend the smartest.',
    },
  ];

  return (
    <ScrollySection
      id="pricing"
      title={<>What It <span style={{ fontStyle: 'italic' }}>Costs</span></>}
      subtitle="Pay per token, scale from zero to millions of requests."
      steps={steps}
      visualization={(step) => <PricingDiagram activeStep={step} />}
    />
  );
}
