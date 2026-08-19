import { useLocation } from 'react-router-dom';
import TrackBadge from '../brand/TrackBadge.jsx';
import useDemoMode from '../../hooks/use-demo-mode.js';
import { ROUTES } from '../../constants.js';

const TopBar = () => {
  const { pathname } = useLocation();
  const { track } = useDemoMode();
  const current = ROUTES.find((r) => r.path === pathname) || ROUTES[0];

  return (
    <header
      style={{
        height: 'var(--topbar-h)',
        padding: '0 28px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'saturate(160%) blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h1 style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.01 }}>
          {current.label}
        </h1>
        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>
          {current.description}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <TrackBadge track={track} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            borderRadius: 999,
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-2)',
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 999,
              background:
                'conic-gradient(from 210deg, #0EA5A0 0deg, #2563EB 140deg, #8B5CF6 260deg, #0EA5A0 360deg)',
              border: '2px solid var(--bg-surface)',
            }}
            aria-hidden
          />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>Presenter</span>
            <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>
              Demo consortium
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
