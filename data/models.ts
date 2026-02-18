import { ModelSpec } from '@/lib/types';

export const models: ModelSpec[] = [
  {
    id: 'haiku',
    name: 'Haiku 4.5',
    tagline: 'Speed Demon',
    description: 'Ultra-fast, cost-effective model for high-volume tasks requiring near-instant responses.',
    inputPrice: 0.80,
    outputPrice: 4.00,
    contextWindow: '200K tokens',
    maxOutput: '8,192 tokens',
    trainingData: 'Early 2025',
    strengths: ['Fastest response time', 'Lowest cost per token', 'Great for classification', 'High throughput'],
    bestFor: 'High-volume processing, real-time apps, cost-sensitive deployments',
    tier: 'economy',
  },
  {
    id: 'sonnet',
    name: 'Sonnet 4.5',
    tagline: 'The Sweet Spot',
    description: 'Best balance of intelligence, speed, and cost. The workhorse model for most production applications.',
    inputPrice: 3.00,
    outputPrice: 15.00,
    contextWindow: '200K tokens',
    maxOutput: '16,384 tokens',
    trainingData: 'Early 2025',
    strengths: ['Best price-to-performance', 'Strong coding ability', 'Excellent reasoning', 'Production-ready'],
    bestFor: 'Most production use cases, coding assistants, content generation',
    tier: 'balanced',
  },
  {
    id: 'opus',
    name: 'Opus 4.6',
    tagline: 'The Heavyweight',
    description: 'Most intelligent model for complex analysis, research, and tasks requiring deep reasoning.',
    inputPrice: 15.00,
    outputPrice: 75.00,
    contextWindow: '200K tokens',
    maxOutput: '32,000 tokens',
    trainingData: 'Early 2025',
    strengths: ['Highest intelligence', 'Complex reasoning', 'Research-grade analysis', 'Nuanced understanding'],
    bestFor: 'Complex analysis, research, high-stakes decisions, difficult problems',
    tier: 'frontier',
  },
];

export const modelColors: Record<string, { primary: string; gradient: string; bg: string }> = {
  haiku: { primary: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)', bg: 'rgba(16, 185, 129, 0.1)' },
  sonnet: { primary: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)', bg: 'rgba(59, 130, 246, 0.1)' },
  opus: { primary: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', bg: 'rgba(139, 92, 246, 0.1)' },
};
