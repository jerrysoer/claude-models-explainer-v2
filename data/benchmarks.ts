import { BenchmarkRow, BarBenchmark } from '@/lib/types';

export const benchmarkTable: BenchmarkRow[] = [
  { name: 'MMLU Pro', haiku: 65.2, sonnet: 78.8, opus: 83.7, unit: '%', description: 'Graduate-level reasoning across 57 subjects' },
  { name: 'GPQA Diamond', haiku: 41.5, sonnet: 65.0, opus: 74.9, unit: '%', description: 'PhD-level science questions' },
  { name: 'HumanEval', haiku: 82.6, sonnet: 93.0, opus: 95.3, unit: '%', description: 'Python code generation accuracy' },
  { name: 'MATH', haiku: 69.4, sonnet: 80.4, opus: 86.8, unit: '%', description: 'Competition-level mathematics' },
  { name: 'MGSM', haiku: 83.2, sonnet: 91.6, opus: 95.1, unit: '%', description: 'Multilingual grade school math' },
  { name: 'DROP', haiku: 78.5, sonnet: 87.2, opus: 90.1, unit: 'F1', description: 'Reading comprehension requiring computation' },
  { name: 'BIG-Bench Hard', haiku: 72.1, sonnet: 84.3, opus: 89.6, unit: '%', description: 'Challenging diverse reasoning tasks' },
  { name: 'ARC-Challenge', haiku: 82.3, sonnet: 91.7, opus: 96.4, unit: '%', description: 'Science reasoning questions' },
  { name: 'HellaSwag', haiku: 85.4, sonnet: 89.2, opus: 95.0, unit: '%', description: 'Commonsense reasoning about activities' },
  { name: 'WinoGrande', haiku: 74.8, sonnet: 83.5, opus: 88.2, unit: '%', description: 'Commonsense coreference resolution' },
];

export const barBenchmarks: BarBenchmark[] = [
  { name: 'SWE-bench Verified', haiku: 25.0, sonnet: 55.0, opus: 72.5, max: 100, unit: '%' },
  { name: 'OSWorld', haiku: 12.0, sonnet: 28.5, opus: 38.2, max: 50, unit: '%' },
  { name: 'ARC-AGI-2', haiku: 4.0, sonnet: 14.0, opus: 21.2, max: 30, unit: '%' },
  { name: 'Finance Agent', haiku: 48.0, sonnet: 72.0, opus: 85.0, max: 100, unit: '%' },
];
