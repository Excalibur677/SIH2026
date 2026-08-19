const StatusBadge = ({ tone = 'neutral', children }) => {
  const tones = {
    online: { bg: 'rgba(16,185,129,0.12)', fg: 'var(--accent-green)', border: 'rgba(16,185,129,0.3)' },
    neutral: { bg: 'var(--bg-elevated)', fg: 'var(--text-secondary)', border: 'var(--border-subtle)' },
    info: { bg: 'rgba(37,99,235,0.12)', fg: 'var(--accent-blue)', border: 'rgba(37,99,235,0.3)' },
    warn: { bg: 'rgba(245,158,11,0.12)', fg: 'var(--accent-amber)', border: 'rgba(245,158,11,0.3)' },
    danger: { bg: 'rgba(239,68,68,0.12)', fg: 'var(--accent-red)', border: 'rgba(239,68,68,0.3)' },
    privacy: { bg: 'rgba(14,165,160,0.12)', fg: 'var(--accent-teal)', border: 'rgba(14,165,160,0.3)' },
    critical: { bg: 'rgba(139,44,110,0.16)', fg: '#F0ABCC', border: 'rgba(139,44,110,0.4)' },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 9px',
        borderRadius: 999,
        fontSize: 11.5,
        fontWeight: 600,
        letterSpacing: 0.02,
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.border}`,
      }}
    >
      <span
        aria-hidden
        style={{
          width: 5,
          height: 5,
          borderRadius: 999,
          background: t.fg,
          boxShadow: `0 0 0 3px ${t.bg}`,
        }}
      />
      {children}
    </span>
  );
};

export default StatusBadge;
