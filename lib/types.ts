export interface ModelSpec {
  id: string;
  name: string;
  tagline: string;
  description: string;
  inputPrice: number;
  outputPrice: number;
  contextWindow: string;
  maxOutput: string;
  trainingData: string;
  strengths: string[];
  bestFor: string;
  tier: 'economy' | 'balanced' | 'frontier';
}

export interface BenchmarkRow {
  name: string;
  haiku: number;
  sonnet: number;
  opus: number;
  unit: string;
  description: string;
}

export interface BarBenchmark {
  name: string;
  haiku: number;
  sonnet: number;
  opus: number;
  max: number;
  unit: string;
}

export interface CostScenario {
  id: string;
  name: string;
  icon: string;
  inputTokens: number;
  outputTokens: number;
  requestsPerDay: number;
  description: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  model: string;
  icon: string;
  category: string;
}

export interface DecisionRow {
  scenario: string;
  recommendation: string;
  reason: string;
}

export interface PricingRow {
  feature: string;
  haiku: string;
  sonnet: string;
  opus: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; scores: { haiku: number; sonnet: number; opus: number } }[];
}
