import type { Metadata } from 'next';
import { DM_Sans, Newsreader, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jsmacair.github.io/claude-models-explainer-v2'),
  title: 'Choosing the Right Claude Model — Interactive Explainer',
  description: 'An interactive, scroll-driven guide to Claude\'s model family. Compare Haiku, Sonnet, and Opus across benchmarks, pricing, and use cases — with a quiz to find your perfect model.',
  keywords: ['Claude', 'Anthropic', 'AI models', 'Sonnet', 'Opus', 'Haiku', 'LLM comparison', 'AI pricing', 'model selection'],
  authors: [{ name: 'Scrolly' }],
  creator: 'Scrolly',
  openGraph: {
    title: 'Choosing the Right Claude Model — Interactive Explainer',
    description: 'An interactive, scroll-driven guide to Claude\'s model family. Compare benchmarks, pricing, and use cases.',
    type: 'article',
    images: ['https://scrolly.to/og/default-hero.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Choosing the Right Claude Model — Interactive Explainer',
    description: 'An interactive, scroll-driven guide to Claude\'s model family. Compare benchmarks, pricing, and use cases.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}else{document.documentElement.setAttribute('data-theme','light')}}catch(e){document.documentElement.setAttribute('data-theme','light')}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Choosing the Right Claude Model — Interactive Explainer",
                "url": "https://jsmacair.github.io/claude-models-explainer-v2",
                "applicationCategory": "EducationalApplication",
                "description": "An interactive, scroll-driven guide to Claude's model family. Compare Haiku, Sonnet, and Opus across benchmarks, pricing, and use cases — with a quiz to find your perfect model.",
                "operatingSystem": "All",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What are the three Claude models?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Claude has three models: Haiku 4.5 (fast, affordable), Sonnet 4.5 (balanced), and Opus 4.6 (most capable). Each targets different use cases and budgets."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much does Claude cost?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Pricing ranges from $0.80/M input tokens (Haiku) to $15/M (Opus). Output tokens cost 5x more than input. Batch API saves 50% and prompt caching saves up to 90%."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Which Claude model should I use?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Start with Sonnet for most tasks. Use Haiku for high-volume, latency-sensitive work. Use Opus for complex reasoning, research, and high-stakes decisions."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the Claude context window?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "All three Claude models support a 200,000 token context window, roughly equivalent to a 500-page book."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do Claude models compare on benchmarks?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Opus leads on SWE-bench (72.5%), ARC-AGI-2 (21.2%), and MMLU Pro (83.7%). Sonnet scores competitively at lower cost. Haiku excels at speed-critical tasks."
                    }
                  }
                ]
              }
            ])
          }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}>
        {children}
        <img src="https://scrolly.to/pixel?s=oss&e=afe09786-66e1-4d42-84c8-ef93be779ae7&v=1" width="1" height="1" style={{position:'absolute',bottom:0,left:0,opacity:0,pointerEvents:'none'}} alt="" loading="lazy" decoding="async" />
      </body>
    </html>
  );
}
