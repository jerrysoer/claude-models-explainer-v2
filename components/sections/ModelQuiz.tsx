'use client';
import { useState } from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';
import { quizQuestions } from '@/data/scenarios';
import { models, modelColors } from '@/data/models';
import SectionWrapper from '@/components/shared/SectionWrapper';

export default function ModelQuiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({ haiku: 0, sonnet: 0, opus: 0 });
  const [done, setDone] = useState(false);

  const handleAnswer = (optScores: { haiku: number; sonnet: number; opus: number }) => {
    const newScores = { haiku: scores.haiku + optScores.haiku, sonnet: scores.sonnet + optScores.sonnet, opus: scores.opus + optScores.opus };
    setScores(newScores);
    if (current + 1 < quizQuestions.length) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => { setCurrent(0); setScores({ haiku: 0, sonnet: 0, opus: 0 }); setDone(false); };

  const totalScore = scores.haiku + scores.sonnet + scores.opus;
  const winner = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a));
  const winnerModel = models.find((m) => m.id === winner[0])!;
  const winnerColors = modelColors[winner[0]];

  if (done) {
    return (
      <SectionWrapper id="quiz">
        <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
          <CheckCircle size={48} style={{ color: winnerColors.primary, marginBottom: 16 }} />
          <h2 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 8 }}>
            Your match: <span style={{ color: winnerColors.primary, fontStyle: 'italic' }}>{winnerModel.name}</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>{winnerModel.bestFor}</p>

          <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
            {models.map((m) => {
              const pct = totalScore > 0 ? (scores[m.id as keyof typeof scores] / totalScore) * 100 : 0;
              const colors = modelColors[m.id];
              return (
                <div key={m.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>{m.name}</span>
                    <span style={{ fontSize: 14, fontFamily: 'var(--font-mono), monospace', color: colors.primary, fontWeight: 600 }}>{Math.round(pct)}%</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: colors.gradient, transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            <RotateCcw size={16} /> Retake Quiz
          </button>
        </div>
      </SectionWrapper>
    );
  }

  const q = quizQuestions[current];
  const progress = (current / quizQuestions.length) * 100;

  return (
    <SectionWrapper id="quiz">
      <h2 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.01em' }}>
        Find Your <span style={{ fontStyle: 'italic' }}>Model</span>
      </h2>
      <p style={{ fontSize: 17, color: 'var(--text-secondary)', marginBottom: 12, maxWidth: 500 }}>
        Like a sommelier recommending wine — answer 5 questions and we&apos;ll suggest the best model for your palate.
      </p>

      <div style={{ maxWidth: 560, margin: '32px auto 0' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>Question {current + 1} of {quizQuestions.length}</span>
            <span style={{ fontSize: 14, fontFamily: 'var(--font-mono), monospace', color: 'var(--forward-blue)' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', borderRadius: 2, background: 'var(--forward-blue)', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 20, lineHeight: 1.4 }}>{q.question}</h3>

        <div style={{ display: 'grid', gap: 12 }}>
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(opt.scores)} className="card card-interactive" style={{ padding: '16px 20px', textAlign: 'left', cursor: 'pointer', fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
