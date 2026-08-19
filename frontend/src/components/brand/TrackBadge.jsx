const TrackBadge = ({ track = 'Finance & AI' }) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 11.5,
        fontWeight: 600,
        letterSpacing: 0.02,
        color: 'var(--accent-teal)',
        background: 'var(--accent-teal-soft)',
        border: '1px solid rgba(14,165,160,0.25)',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: 'var(--accent-teal)',
          boxShadow: '0 0 0 3px rgba(14,165,160,0.18)',
        }}
      />
      {track}
    </span>
  );
};

export default TrackBadge;
