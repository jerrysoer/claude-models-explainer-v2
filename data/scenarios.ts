import { CostScenario, UseCase, PricingRow, DecisionRow, QuizQuestion } from '@/lib/types';

export const costScenarios: CostScenario[] = [
  { id: 'chatbot', name: 'Customer Support Bot', icon: '💬', inputTokens: 500, outputTokens: 200, requestsPerDay: 5000, description: 'High-volume automated customer service' },
  { id: 'coding', name: 'Coding Assistant', icon: '💻', inputTokens: 2000, outputTokens: 1000, requestsPerDay: 500, description: 'IDE-integrated code generation & review' },
  { id: 'analysis', name: 'Research Analysis', icon: '🔬', inputTokens: 10000, outputTokens: 3000, requestsPerDay: 50, description: 'Deep document analysis and synthesis' },
  { id: 'content', name: 'Content Pipeline', icon: '✍️', inputTokens: 1000, outputTokens: 2000, requestsPerDay: 200, description: 'Automated blog/marketing content generation' },
];

export const pricingRows: PricingRow[] = [
  { feature: 'Input (per 1M tokens)', haiku: '$0.80', sonnet: '$3.00', opus: '$15.00' },
  { feature: 'Output (per 1M tokens)', haiku: '$4.00', sonnet: '$15.00', opus: '$75.00' },
  { feature: 'Context Window', haiku: '200K', sonnet: '200K', opus: '200K' },
  { feature: 'Max Output', haiku: '8,192', sonnet: '16,384', opus: '32,000' },
  { feature: 'Speed', haiku: '⚡⚡⚡', sonnet: '⚡⚡', opus: '⚡' },
  { feature: 'Intelligence', haiku: '★★★', sonnet: '★★★★', opus: '★★★★★' },
  { feature: 'Batch API (50% off)', haiku: '✓', sonnet: '✓', opus: '✓' },
];

export const useCases: UseCase[] = [
  { id: '1', title: 'Customer Support', description: 'Automated ticket routing and response generation', model: 'haiku', icon: '🎧', category: 'support' },
  { id: '2', title: 'Content Moderation', description: 'Real-time content classification and filtering', model: 'haiku', icon: '🛡️', category: 'safety' },
  { id: '3', title: 'Data Extraction', description: 'Structured data extraction from unstructured text', model: 'haiku', icon: '📊', category: 'data' },
  { id: '4', title: 'Coding Assistant', description: 'Code completion, debugging, and refactoring', model: 'sonnet', icon: '💻', category: 'engineering' },
  { id: '5', title: 'Content Writing', description: 'Blog posts, marketing copy, social media content', model: 'sonnet', icon: '✍️', category: 'content' },
  { id: '6', title: 'Data Analysis', description: 'Analyzing datasets, generating insights and reports', model: 'sonnet', icon: '📈', category: 'data' },
  { id: '7', title: 'API Integration', description: 'Building and testing API connections', model: 'sonnet', icon: '🔗', category: 'engineering' },
  { id: '8', title: 'Translation', description: 'Multi-language translation with context preservation', model: 'sonnet', icon: '🌍', category: 'content' },
  { id: '9', title: 'Research Synthesis', description: 'Multi-source research analysis and literature review', model: 'opus', icon: '🔬', category: 'research' },
  { id: '10', title: 'Strategic Planning', description: 'Complex business analysis and strategic recommendations', model: 'opus', icon: '🧭', category: 'strategy' },
  { id: '11', title: 'Legal Analysis', description: 'Contract review, compliance checking, legal research', model: 'opus', icon: '⚖️', category: 'professional' },
  { id: '12', title: 'Scientific Writing', description: 'Academic papers, grant proposals, technical documentation', model: 'opus', icon: '📝', category: 'research' },
];

export const decisionMatrix: DecisionRow[] = [
  { scenario: 'High-volume, low-complexity tasks', recommendation: 'haiku', reason: 'Lowest cost, fastest response time' },
  { scenario: 'Real-time user-facing applications', recommendation: 'haiku', reason: 'Sub-second latency for responsive UX' },
  { scenario: 'Classification and routing', recommendation: 'haiku', reason: 'Simple decisions at massive scale' },
  { scenario: 'General-purpose production workloads', recommendation: 'sonnet', reason: 'Best balance of quality and cost' },
  { scenario: 'Code generation and review', recommendation: 'sonnet', reason: 'Strong coding with reasonable pricing' },
  { scenario: 'Content creation at scale', recommendation: 'sonnet', reason: 'High-quality output without premium pricing' },
  { scenario: 'Complex multi-step reasoning', recommendation: 'opus', reason: 'Highest reasoning capability' },
  { scenario: 'Research and analysis', recommendation: 'opus', reason: 'Deepest understanding and synthesis' },
  { scenario: 'High-stakes decision support', recommendation: 'opus', reason: 'Most reliable for critical decisions' },
  { scenario: 'Novel problem solving', recommendation: 'opus', reason: 'Best at handling edge cases and ambiguity' },
];

export const quizQuestions: QuizQuestion[] = [
  { id: 1, question: 'What matters most for your application?', options: [{ label: 'Speed & low cost', scores: { haiku: 3, sonnet: 1, opus: 0 } }, { label: 'Balance of quality & cost', scores: { haiku: 0, sonnet: 3, opus: 1 } }, { label: 'Maximum intelligence', scores: { haiku: 0, sonnet: 1, opus: 3 } }] },
  { id: 2, question: 'How complex are the tasks?', options: [{ label: 'Simple classification/routing', scores: { haiku: 3, sonnet: 1, opus: 0 } }, { label: 'Moderate — coding, content, analysis', scores: { haiku: 0, sonnet: 3, opus: 1 } }, { label: 'Highly complex — research, strategy', scores: { haiku: 0, sonnet: 0, opus: 3 } }] },
  { id: 3, question: 'What is your daily request volume?', options: [{ label: '10,000+ requests/day', scores: { haiku: 3, sonnet: 1, opus: 0 } }, { label: '100–10,000 requests/day', scores: { haiku: 1, sonnet: 3, opus: 0 } }, { label: 'Under 100 requests/day', scores: { haiku: 0, sonnet: 1, opus: 3 } }] },
  { id: 4, question: 'How important is output quality?', options: [{ label: 'Good enough is fine', scores: { haiku: 3, sonnet: 1, opus: 0 } }, { label: 'High quality, but cost matters', scores: { haiku: 0, sonnet: 3, opus: 1 } }, { label: 'Must be the absolute best', scores: { haiku: 0, sonnet: 0, opus: 3 } }] },
  { id: 5, question: 'What is your latency requirement?', options: [{ label: 'Sub-second (real-time)', scores: { haiku: 3, sonnet: 1, opus: 0 } }, { label: 'A few seconds is fine', scores: { haiku: 1, sonnet: 3, opus: 1 } }, { label: 'Minutes are acceptable', scores: { haiku: 0, sonnet: 1, opus: 3 } }] },
];
