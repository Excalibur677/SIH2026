import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants.js';
import ProjectIdentity from '../brand/ProjectIdentity.jsx';

const ICONS = {
  home: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>
  ),
  network: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7.5V14M10.5 15l-4.5 3M13.5 15l4.5 3"/></svg>
  ),
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3Z"/><path d="M9 12l2 2 4-4"/></svg>
  ),
  chart: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>
  ),
  book: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h11a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4Z"/><path d="M4 16a4 4 0 0 1 4-4h11"/></svg>
  ),
};

const Sidebar = () => {
  return (
    <aside
      style={{
        width: 'var(--sidebar-w)',
        flexShrink: 0,
        background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-canvas) 100%)',
        borderRight: '1px solid var(--border-subtle)',
        padding: '22px 16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        overflowY: 'auto',
      }}
    >
      <div style={{ padding: '2px 6px' }}>
        <ProjectIdentity compact={false} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: 0.08,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--text-muted)',
            padding: '0 10px 6px',
          }}
        >
          Navigation
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {ROUTES.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: 13.5,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'var(--bg-elevated)' : 'transparent',
                border: `1px solid ${isActive ? 'var(--border-strong)' : 'transparent'}`,
                textDecoration: 'none',
              })}
            >
              <span
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 22,
                  height: 22,
                  color: route.icon === 'home' || route.icon === 'network' ? 'var(--accent-teal)' : 'var(--accent-violet)',
                }}
              >
                {ICONS[route.icon]}
              </span>
              <span>{route.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          style={{
            padding: 12,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 4,
            }}
          >
            <span style={{ color: 'var(--accent-teal)' }}>◆</span> Consortium
          </div>
          <p style={{ fontSize: 11.5 }}>
            6 banks · 3 regions · Trusted regional-then-global aggregation.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
