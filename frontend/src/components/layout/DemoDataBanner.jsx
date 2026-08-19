import useDemoMode from '../../hooks/use-demo-mode.js';

const DemoDataBanner = () => {
  const { label, tagline } = useDemoMode();
  return (
    <div
      style={{
        minHeight: 'var(--banner-h)',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        background:
          'linear-gradient(90deg, rgba(14,165,160,0.14), rgba(139,92,246,0.12))',
        borderBottom: '1px solid rgba(14,165,160,0.18)',
        color: 'var(--text-secondary)',
        fontSize: 12.5,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            display: 'grid',
            placeItems: 'center',
            width: 18,
            height: 18,
            borderRadius: 999,
            background: 'rgba(14,165,160,0.2)',
            color: 'var(--accent-teal)',
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          i
        </span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{tagline}</span>
        <span style={{ color: 'var(--text-muted)' }}>·</span>
        <span>{label}</span>
      </div>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
          padding: '3px 8px',
          borderRadius: 999,
          background: 'rgba(14,165,160,0.12)',
          border: '1px solid rgba(14,165,160,0.25)',
          color: 'var(--accent-teal)',
          fontWeight: 700,
          letterSpacing: 0.04,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: 'var(--accent-teal)',
          }}
        />
        DEMO MODE
      </span>
    </div>
  );
};

export default DemoDataBanner;
