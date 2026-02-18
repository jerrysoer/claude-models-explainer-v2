'use client';
import { useState, useEffect } from 'react';
import ThemeToggle from '@/components/shared/ThemeToggle';
import SectionNav from '@/components/shared/SectionNav';
import Hero from '@/components/sections/Hero';
import MeetTheFamily from '@/components/sections/MeetTheFamily';
import Benchmarks from '@/components/sections/Benchmarks';
import PricingTable from '@/components/sections/PricingTable';
import CostCalculator from '@/components/sections/CostCalculator';
import UseCases from '@/components/sections/UseCases';
import ModelQuiz from '@/components/sections/ModelQuiz';
import DecisionMatrix from '@/components/sections/DecisionMatrix';

function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '12px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 18, fontWeight: 400, color: 'var(--text-primary)', fontStyle: 'italic' }}>Claude</span>
        <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 4, background: 'var(--bg-secondary)', color: 'var(--text-tertiary)', fontWeight: 500, letterSpacing: '0.03em' }}>
          MODELS
        </span>
      </div>
      <ThemeToggle />
    </nav>
  );
}

function Divider() {
  return (
    <div className="section-divider">
      <hr />
    </div>
  );
}

function FloatingShare() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(pct > 0.25);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const share = () => {
    const text = `This interactive Claude model comparison is incredible → ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <button
        onClick={share}
        style={{
          padding: '10px 18px',
          background: copied ? '#10b981' : '#1e293b',
          color: 'white',
          border: 'none',
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.2s',
          fontFamily: 'var(--font-sans), system-ui, sans-serif',
        }}
      >
        {copied ? '✓ Copied!' : '📋 Share'}
      </button>
    </div>
  );
}

function CompletionCard() {
  const [copiedLink, setCopiedLink] = useState(false);

  const copyLink = () => {
    const text = `This interactive Claude model comparison is worth your time → ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: '60px auto 0',
        padding: '28px 32px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 8 }}>🎉</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
        You explored all of this!
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 20 }}>
        If this was useful, share it with someone choosing a Claude model.
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={copyLink}
          style={{
            padding: '10px 20px',
            background: '#1e293b',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {copiedLink ? '✓ Link copied!' : 'Copy share link'}
        </button>
        <a
          href="https://scrolly.to"
          target="_blank"
          rel="noopener"
          style={{
            padding: '10px 20px',
            background: 'var(--bg-card)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          See more explainers →
        </a>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        marginTop: 80,
        padding: '40px 24px 32px',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <a
          href="https://scrolly.to"
          target="_blank"
          rel="noopener"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--text-tertiary)',
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          Built with Scrolly
        </a>
      </div>
      <div style={{ marginBottom: 16 }}>
        <a
          href="https://scrolly.to"
          target="_blank"
          rel="noopener"
          style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          Create your own explainer → scrolly.to
        </a>
      </div>
    </footer>
  );
}

export default function ExplainerApp() {
  return (
    <main>
      <TopNav />
      <SectionNav />
      <Hero />
      <Divider />
      <MeetTheFamily />
      <Divider />
      <Benchmarks />
      <Divider />
      <PricingTable />
      <Divider />
      <CostCalculator />
      <Divider />
      <UseCases />
      <Divider />
      <ModelQuiz />
      <Divider />
      <DecisionMatrix />
      <CompletionCard />
      <FloatingShare />
      <Footer />
    </main>
  );
}
