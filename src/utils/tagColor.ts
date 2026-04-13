type TagColor = { bg: string; text: string; dot: string };

const TAG_PALETTE: Record<string, TagColor> = {
  claude:                 { bg: '#fef9c3', text: '#713f12', dot: '#F5C518' },
  'claude-code':          { bg: '#fef9c3', text: '#713f12', dot: '#F5C518' },
  'prompt-engineering':   { bg: '#fff7ed', text: '#9a3412', dot: '#F97316' },
  opentap:                { bg: '#dcfce7', text: '#14532d', dot: '#16a34a' },
  'test-automation':      { bg: '#dcfce7', text: '#14532d', dot: '#16a34a' },
  csharp:                 { bg: '#fff7ed', text: '#9a3412', dot: '#ea580c' },
  engineering:            { bg: '#fef9c3', text: '#713f12', dot: '#ca8a04' },
  json:                   { bg: '#fff7ed', text: '#9a3412', dot: '#ea580c' },
  benchmark:              { bg: '#fee2e2', text: '#7f1d1d', dot: '#dc2626' },
  productivity:           { bg: '#fee2e2', text: '#7f1d1d', dot: '#dc2626' },
  cost:                   { bg: '#fef9c3', text: '#713f12', dot: '#ca8a04' },
  'token-optimization':   { bg: '#fef9c3', text: '#713f12', dot: '#ca8a04' },
  workflow:               { bg: '#dbeafe', text: '#1e3a5f', dot: '#2563eb' },
  cli:                    { bg: '#dbeafe', text: '#1e3a5f', dot: '#2563eb' },
  tips:                   { bg: '#dbeafe', text: '#1e3a5f', dot: '#2563eb' },
  debugging:              { bg: '#d1fae5', text: '#064e3b', dot: '#059669' },
  'ci-cd':                { bg: '#f3e8ff', text: '#4c1d95', dot: '#9333ea' },
  devops:                 { bg: '#f3e8ff', text: '#4c1d95', dot: '#9333ea' },
  meta:                   { bg: '#f1f5f9', text: '#334155', dot: '#64748b' },
  introduction:           { bg: '#f1f5f9', text: '#334155', dot: '#64748b' },
};

const DARK_TAG_PALETTE: Record<string, TagColor> = {
  claude:                 { bg: 'rgba(245,197,24,0.15)', text: '#FDE68A', dot: '#F5C518' },
  'claude-code':          { bg: 'rgba(245,197,24,0.15)', text: '#FDE68A', dot: '#F5C518' },
  'prompt-engineering':   { bg: 'rgba(249,115,22,0.15)', text: '#fdba74', dot: '#F97316' },
  opentap:                { bg: 'rgba(22,163,74,0.15)',   text: '#86efac', dot: '#22c55e' },
  'test-automation':      { bg: 'rgba(22,163,74,0.15)',   text: '#86efac', dot: '#22c55e' },
  csharp:                 { bg: 'rgba(234,88,12,0.15)',   text: '#fdba74', dot: '#f97316' },
  engineering:            { bg: 'rgba(202,138,4,0.15)',   text: '#fde047', dot: '#eab308' },
  json:                   { bg: 'rgba(234,88,12,0.15)',   text: '#fdba74', dot: '#f97316' },
  benchmark:              { bg: 'rgba(220,38,38,0.15)',   text: '#fca5a5', dot: '#ef4444' },
  productivity:           { bg: 'rgba(220,38,38,0.15)',   text: '#fca5a5', dot: '#ef4444' },
  cost:                   { bg: 'rgba(202,138,4,0.15)',   text: '#fde047', dot: '#eab308' },
  'token-optimization':   { bg: 'rgba(202,138,4,0.15)',   text: '#fde047', dot: '#eab308' },
  workflow:               { bg: 'rgba(37,99,235,0.15)',   text: '#93c5fd', dot: '#3b82f6' },
  cli:                    { bg: 'rgba(37,99,235,0.15)',   text: '#93c5fd', dot: '#3b82f6' },
  tips:                   { bg: 'rgba(37,99,235,0.15)',   text: '#93c5fd', dot: '#3b82f6' },
  debugging:              { bg: 'rgba(5,150,105,0.15)',   text: '#6ee7b7', dot: '#10b981' },
  'ci-cd':                { bg: 'rgba(147,51,234,0.15)',  text: '#d8b4fe', dot: '#a855f7' },
  devops:                 { bg: 'rgba(147,51,234,0.15)',  text: '#d8b4fe', dot: '#a855f7' },
  meta:                   { bg: 'rgba(100,116,139,0.15)', text: '#94a3b8', dot: '#64748b' },
  introduction:           { bg: 'rgba(100,116,139,0.15)', text: '#94a3b8', dot: '#64748b' },
};

const DEFAULT_LIGHT: TagColor = { bg: '#f1f5f9', text: '#334155', dot: '#64748b' };
const DEFAULT_DARK:  TagColor = { bg: 'rgba(100,116,139,0.15)', text: '#94a3b8', dot: '#64748b' };

export function getTagColor(tag: string, dark = false): TagColor {
  const palette = dark ? DARK_TAG_PALETTE : TAG_PALETTE;
  const def    = dark ? DEFAULT_DARK : DEFAULT_LIGHT;
  return palette[tag] ?? def;
}

/** CSS gradient for hero/card placeholder when no cover image exists */
const COVER_GRADIENTS: Record<string, string> = {
  claude:               'linear-gradient(135deg,#78350f 0%,#1c0700 100%)',
  'claude-code':        'linear-gradient(135deg,#78350f 0%,#1c0700 100%)',
  'prompt-engineering': 'linear-gradient(135deg,#7c2d12 0%,#1c0a00 100%)',
  opentap:              'linear-gradient(135deg,#064e3b 0%,#022c22 100%)',
  'test-automation':    'linear-gradient(135deg,#064e3b 0%,#022c22 100%)',
  csharp:               'linear-gradient(135deg,#7c2d12 0%,#1c0a00 100%)',
  engineering:          'linear-gradient(135deg,#78350f 0%,#1c0700 100%)',
  benchmark:            'linear-gradient(135deg,#7f1d1d 0%,#1c0a00 100%)',
  cost:                 'linear-gradient(135deg,#78350f 0%,#1c0700 100%)',
  'token-optimization': 'linear-gradient(135deg,#78350f 0%,#1c0700 100%)',
  workflow:             'linear-gradient(135deg,#1e3a5f 0%,#0c1a2e 100%)',
  debugging:            'linear-gradient(135deg,#14532d 0%,#042714 100%)',
  'ci-cd':              'linear-gradient(135deg,#4c1d95 0%,#1e1b4b 100%)',
};

export function getCoverGradient(firstTag: string): string {
  return COVER_GRADIENTS[firstTag] ?? 'linear-gradient(135deg,#1e1e2e 0%,#0a0a0f 100%)';
}
