import StatusBadge from '../ui/StatusBadge.jsx';

const PageHeader = ({
  eyebrow,
  title,
  subtitle,
  primaryAction,
  secondaryActions,
  badges,
  right,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 20,
        padding: '24px 28px 10px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 760 }}>
        {eyebrow && (
          <div
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: 0.08,
              textTransform: 'uppercase',
              color: 'var(--accent-teal)',
            }}
          >
            {eyebrow}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: 26, letterSpacing: -0.02 }}>{title}</h1>
          {badges?.map((b, i) =>
            typeof b === 'string' ? (
              <StatusBadge key={i} tone="privacy">
                {b}
              </StatusBadge>
            ) : (
              <span key={i}>{b}</span>
            )
          )}
        </div>
        {subtitle && <p style={{ fontSize: 14 }}>{subtitle}</p>}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
        }}
      >
        {secondaryActions}
        {primaryAction}
        {right}
      </div>
    </div>
  );
};

export default PageHeader;
