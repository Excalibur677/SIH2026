const SectionLabel = ({ title, subtitle, right, eyebrow }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 14,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {eyebrow && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.08,
              textTransform: 'uppercase',
              color: 'var(--accent-teal)',
            }}
          >
            {eyebrow}
          </span>
        )}
        <h2 style={{ fontSize: 19, letterSpacing: -0.01 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 13.5, maxWidth: 640 }}>{subtitle}</p>}
      </div>
      {right && <div>{right}</div>}
    </div>
  );
};

export default SectionLabel;
