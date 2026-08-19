import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import MetricCard from '../components/ui/MetricCard.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import demoData from '../data/demo-data.js';
import useDemoMode from '../hooks/use-demo-mode.js';
import { formatCompact } from '../utils/formatters.js';
import { regionColor, REGION_LABELS } from '../data/labels.js';

const Home = () => {
  const { tagline, track, dataset, scope } = useDemoMode();
  const banks = demoData.banks.banks;
  const regions = demoData.banks.regions;
  const finalRound = demoData.rounds.rounds[demoData.rounds.rounds.length - 1];
  const _balanced = demoData.privacy.scenarios.find((s) => s.id === 'scenario_balanced');
  const customers = banks.reduce((s, b) => s + b.customerCount, 0);
  const traffic = banks.reduce((s, b) => s + b.dailyTrafficSamples, 0);

  return (
    <div style={{ paddingBottom: 40 }}>
      <PageHeader
        eyebrow="Home · Value proposition"
        title="Consilience helps banks learn from wider cyberattack patterns without pooling raw network traffic."
        subtitle={tagline}
        badges={[track, 'Six simulated banks']}
        primaryAction={
          <Link
            to="/federation"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #0EA5A0, #2563EB)',
              color: '#052223',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: 13.5,
              boxShadow: '0 8px 24px -10px rgba(14,165,160,0.6)',
            }}
          >
            View Federation Flow
            <span>→</span>
          </Link>
        }
        secondaryActions={
          <Link
            to="/privacy"
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid var(--border-strong)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: 13,
            }}
          >
            Privacy & Trust →
          </Link>
        }
      />

      <div style={{ padding: '4px 28px 18px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
          }}
        >
          <MetricCard
            label="Participating banks"
            value={banks.length}
            valueType="integer"
            tone="teal"
            icon="🏦"
            hint={`Across ${regions.length} regions · trusted aggregation tier`}
          />
          <MetricCard
            label="Customers covered"
            value={customers}
            valueType="integer"
            tone="violet"
            icon="👥"
            hint="Raw traffic never leaves each bank's perimeter"
          />
          <MetricCard
            label="Daily traffic samples"
            value={traffic}
            valueType="integer"
            tone="blue"
            icon="📊"
            hint="Labelled into benign + six attack classes"
          />
          <MetricCard
            label="Global Macro F1 (demo)"
            value={finalRound.globalMacroF1}
            valueType="percent"
            tone="pink"
            icon="🎯"
            badge={<StatusBadge tone="privacy">Balanced ε</StatusBadge>}
            hint={`After ${demoData.rounds.roundsTotal} federated rounds · ${dataset}`}
          />
        </div>
      </div>

      <div style={{ padding: '10px 28px 6px' }}>
        <SectionLabel
          eyebrow="How the federation works"
          title="We federate the model, not the data."
          subtitle="Each bank trains locally on its own traffic. Only clipped, noised, encrypted model updates travel outward through regional and global aggregation. The topology below mirrors the live presenter experience."
          right={
            <div style={{ display: 'flex', gap: 8 }}>
              {scope?.classes?.slice(0, 4).map((c) => (
                <StatusBadge key={c} tone={c === 'BENIGN' ? 'online' : 'warn'}>
                  {c.replace('_', ' ')}
                </StatusBadge>
              ))}
              <StatusBadge tone="info">+ {Math.max(0, (scope?.classes?.length || 0) - 4)} more</StatusBadge>
            </div>
          }
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
          }}
        >
          {[
            {
              n: 1,
              title: 'Local training',
              tone: 'blue',
              body: 'Banks run local epochs on private traffic using the latest global seed model. No records ever leave.',
            },
            {
              n: 2,
              title: 'Protected update',
              tone: 'teal',
              body: 'Gradient clipping caps the contribution of any one flow. Calibrated Gaussian noise adds DP.',
            },
            {
              n: 3,
              title: 'Regional aggregation',
              tone: 'violet',
              body: 'A trusted aggregator averages regional updates weighted by each bank\'s local sample count.',
            },
            {
              n: 4,
              title: 'Global aggregation',
              tone: 'pink',
              body: 'Regional checkpoints are fused into a single updated global model, then redistributed to all banks.',
            },
          ].map((card) => (
            <div
              key={card.n}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 2,
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 800,
                    fontSize: 13,
                    color: 'var(--text-inverse)',
                    background:
                      card.tone === 'teal'
                        ? '#0EA5A0'
                        : card.tone === 'blue'
                        ? '#2563EB'
                        : card.tone === 'violet'
                        ? '#8B5CF6'
                        : '#DB2777',
                  }}
                >
                  {card.n}
                </div>
                <h3 style={{ fontSize: 15 }}>{card.title}</h3>
              </div>
              <p style={{ fontSize: 13 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '18px 28px 6px' }}>
        <SectionLabel
          eyebrow="Consortium"
          title="Six simulated banks across three regions"
          subtitle="Every bank keeps its raw traffic, features, and labels inside its own perimeter. Below are their demo-mode footprints."
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
          }}
        >
          {regions.map((region) => (
            <div
              key={region.id}
              style={{
                background: 'var(--bg-surface)',
                border: `1px solid ${regionColor(region.id)}33`,
                borderRadius: 'var(--radius-lg)',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 999,
                    background: `${regionColor(region.id)}22`,
                    border: `1px solid ${regionColor(region.id)}55`,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 14,
                  }}
                >
                  🗺
                </div>
                <div>
                  <h3 style={{ fontSize: 15 }}>{REGION_LABELS[region.id]}</h3>
                  <p style={{ fontSize: 12 }}>{region.banks.length} banks</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {region.banks.map((bankId) => {
                  const bank = banks.find((b) => b.id === bankId);
                  if (!bank) return null;
                  return (
                    <div
                      key={bankId}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 10,
                        borderRadius: 10,
                        background: 'var(--bg-surface-2)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                        <div
                          style={{
                            width: 6,
                            height: 24,
                            borderRadius: 4,
                            background: regionColor(region.id),
                          }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: 'var(--text-primary)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: 170,
                            }}
                          >
                            {bank.name}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                            {bank.location} · {formatCompact(bank.dailyTrafficSamples)} samples/day
                          </div>
                        </div>
                      </div>
                      <StatusBadge tone={bank.status === 'online' ? 'online' : 'neutral'}>
                        {bank.status}
                      </StatusBadge>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '22px 28px 0' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 14,
          }}
        >
          <div
            style={{
              background:
                'linear-gradient(135deg, rgba(14,165,160,0.14), rgba(139,92,246,0.12))',
              border: '1px solid rgba(14,165,160,0.28)',
              borderRadius: 'var(--radius-xl)',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StatusBadge tone="privacy">Presenter journey</StatusBadge>
            </div>
            <h3 style={{ fontSize: 17 }}>
              Open Home → Federation → Privacy → Performance → Methodology
            </h3>
            <p style={{ fontSize: 13.5 }}>
              Person 1 covers the banks, the privacy boundary, protected updates and round
              playback. Person 2 walks through clipping & noise, per-class F1, the
              privacy-utility curve, and scope notes on screen.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <Link
                to="/federation"
                style={primaryLink}
              >
                ▶ Start at Federation
              </Link>
              <Link to="/methodology" style={secondaryLink}>
                Scope & future work
              </Link>
            </div>
          </div>
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <SectionLabel
              eyebrow="In scope"
              title="What we honestly claim"
              right={<StatusBadge tone="info">Scope notes</StatusBadge>}
            />
            <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                `${banks.length} simulated banks on ${dataset} labels.`,
                'Fixed regional-then-global trusted aggregation.',
                'Clipping + Gaussian noise (DP illustrated, not formally proven).',
                'Benign + six attack classes: Brute Force, DoS, Web, Infiltration, Botnet, DDoS.',
              ].map((t) => (
                <li key={t} style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  {t}
                </li>
              ))}
            </ul>
            <div
              style={{
                marginTop: 'auto',
                padding: 10,
                borderRadius: 10,
                background: 'var(--bg-surface-2)',
                border: '1px dashed var(--border-strong)',
                fontSize: 12,
                color: 'var(--text-muted)',
              }}
            >
              Future work: cryptographic secure aggregation, poisoning robustness, formal DP
              proofs, live multi-party deployment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const primaryLink = {
  display: 'inline-flex',
  padding: '9px 14px',
  borderRadius: 10,
  background: 'linear-gradient(135deg, #0EA5A0, #2563EB)',
  color: '#052223',
  fontWeight: 700,
  textDecoration: 'none',
  fontSize: 13,
};

const secondaryLink = {
  display: 'inline-flex',
  padding: '9px 14px',
  borderRadius: 10,
  background: 'var(--bg-surface)',
  color: 'var(--text-primary)',
  fontWeight: 600,
  textDecoration: 'none',
  fontSize: 13,
  border: '1px solid var(--border-strong)',
};

export default Home;
