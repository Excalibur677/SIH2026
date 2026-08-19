import StatusBadge from './StatusBadge.jsx';
import { formatRatio, formatPercent, formatCompact } from '../../utils/formatters.js';

const toneFromTone = (tone) =>
  ({
    teal: { fg: 'var(--accent-teal)', bg: 'var(--accent-teal-soft)', border: 'rgba(14,165,160,0.25)' },
    blue: { fg: 'var(--accent-blue)', bg: 'rgba(37,99,235,0.12)', border: 'rgba(37,99,235,0.25)' },
    violet: { fg: 'var(--accent-violet)', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)' },
    pink: { fg: 'var(--accent-pink)', bg: 'rgba(219,39,119,0.12)', border: 'rgba(219,39,119,0.25)' },
    amber: { fg: 'var(--accent-amber)', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
    neutral: { fg: 'var(--text-secondary)', bg: 'var(--bg-elevated)', border: 'var(--border-subtle)' },
  }[tone] || {
    fg: 'var(--accent-teal)',
    bg: 'var(--accent-teal-soft)',
    border: 'rgba(14,165,160,0.25)',
  });

const MetricCard = ({
  label,
  value,
  valueType = 'ratio',
  delta,
  tone = 'teal',
  badge,
  hint,
  icon,
}) => {
  const t = toneFromTone(tone);
  const displayValue =
    valueType === 'percent'
      ? formatPercent(value)
      : valueType === 'integer'
      ? formatCompact(value)
      : valueType === 'ratio'
      ? formatRatio(value, 3)
      : String(value ?? '—');

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 16,
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        minHeight: 132,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${t.border} 0%, transparent 60%)`,
          opacity: 0.9,
          pointerEvents: 'none',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {icon && (
            <span
              style={{
                display: 'grid',
                placeItems: 'center',
                width: 28,
                height: 28,
                borderRadius: 8,
                background: t.bg,
                border: `1px solid ${t.border}`,
                color: t.fg,
                fontSize: 14,
              }}
            >
              {icon}
            </span>
          )}
          <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 500 }}>
            {label}
          </span>
        </div>
        {badge && typeof badge === 'string' ? <StatusBadge tone="privacy">{badge}</StatusBadge> : badge}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: -0.02,
            color: 'var(--text-primary)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {displayValue}
        </span>
        {delta != null && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: Number(delta) >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
            }}
          >
            {Number(delta) >= 0 ? '▲' : '▼'} {formatPercent(Math.abs(Number(delta)), 1)}
          </span>
        )}
      </div>
      {hint && (
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 'auto' }}>{hint}</p>
      )}
    </div>
  );
};

export default MetricCard;
