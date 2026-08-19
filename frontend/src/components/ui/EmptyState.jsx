const EmptyState = ({ title, description, action }) => {
  return (
    <div
      style={{
        padding: 28,
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed var(--border-strong)',
        background: 'var(--bg-surface-2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 8,
        minHeight: 140,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          display: 'grid',
          placeItems: 'center',
          marginBottom: 4,
        }}
      >
        <span style={{ color: 'var(--text-muted)', fontSize: 18 }}>◇</span>
      </div>
      <h3 style={{ fontSize: 15, color: 'var(--text-primary)' }}>{title}</h3>
      {description && <p style={{ fontSize: 13, maxWidth: 420 }}>{description}</p>}
      {action && <div style={{ marginTop: 6 }}>{action}</div>}
    </div>
  );
};

export default EmptyState;
