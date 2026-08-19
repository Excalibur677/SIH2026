import PageHeader from '../components/layout/PageHeader.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import MetricCard from '../components/ui/MetricCard.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import FederationTopology from '../components/federation/FederationTopology.jsx';
import RoundProgress from '../components/federation/RoundProgress.jsx';
import DataBoundaryLegend from '../components/federation/DataBoundaryLegend.jsx';
import useFederationRound from '../hooks/use-federation-round.js';
import demoData from '../data/demo-data.js';
import { formatCompact, formatPercent } from '../utils/formatters.js';
import { phaseColor } from '../data/labels.js';

const FederationPage = () => {
  const playback = useFederationRound({ autoplay: false });
  const { round } = playback;
  const totalSamples = (round?.bankUpdates || []).reduce((s, u) => s + (u?.samples || 0), 0);
  const avgLocalF1 = (round?.bankUpdates || []).length
    ? (round.bankUpdates.reduce((s, u) => s + Number(u?.localF1 || 0), 0) /
        round.bankUpdates.length)
    : 0;

  return (
    <div style={{ paddingBottom: 40 }}>
      <PageHeader
        eyebrow="Federation Command Center"
        title="Raw traffic stays local. Only protected updates travel through regional and global aggregation."
        subtitle="Controlled playback animates the explanation. The rounds progress through Local Training → Protected Update → Regional Aggregation → Global Aggregation."
        badges={[
          <StatusBadge key="p1" tone="privacy">
            Trusted aggregator
          </StatusBadge>,
          <StatusBadge key="p2" tone="info">
            {demoData.rounds.roundsTotal} rounds
          </StatusBadge>,
        ]}
        primaryAction={
          <button
            onClick={playback.toggle}
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              background: playback.playing
                ? 'var(--accent-amber)'
                : 'linear-gradient(135deg, #0EA5A0, #2563EB)',
              color: playback.playing ? '#201600' : '#052223',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              border: 'none',
            }}
          >
            {playback.playing ? '❚❚ Pause playback' : '▶ Play Round'}
          </button>
        }
      />

      <div style={{ padding: '4px 28px 18px' }}>
        <RoundProgress {...playback} />
      </div>

      <div style={{ padding: '4px 28px 10px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
          }}
        >
          <MetricCard
            label="Current round phase"
            value={round?.phaseLabel || 'Initialization'}
            valueType="text"
            tone="teal"
            icon="🔄"
            badge={
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '3px 8px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  background: `${phaseColor(round?.phase || 'init')}22`,
                  color: phaseColor(round?.phase || 'init'),
                  border: `1px solid ${phaseColor(round?.phase || 'init')}55`,
                }}
              >
                {round?.phase || 'init'}
              </span>
            }
            hint={round?.description || 'Round description'}
          />
          <MetricCard
            label="Participating banks"
            value={(round?.bankUpdates || []).filter((u) => u?.participated).length}
            valueType="integer"
            tone="violet"
            icon="🏦"
            hint={`${demoData.banks.banks.length} banks total · weighted by local sample count`}
          />
          <MetricCard
            label="Aggregated local samples"
            value={totalSamples}
            valueType="integer"
            tone="blue"
            icon="📦"
            hint="Local data never leaves the bank perimeter"
          />
          <MetricCard
            label="Avg bank-level F1 (demo)"
            value={avgLocalF1}
            valueType="percent"
            tone="pink"
            icon="🎯"
            hint={`Global Macro F1 ${formatPercent(round?.globalMacroF1)}`}
          />
        </div>
      </div>

      <div style={{ padding: '12px 28px 6px' }}>
        <SectionLabel
          eyebrow="Topology"
          title="Federation privacy boundary"
          subtitle="The dashed outline on each bank card represents the raw-traffic perimeter that never opens. Inside, banks train locally. Crossing the boundary outward, only a small teal protected update packet moves to regional aggregation, then global, then back."
          right={
            <StatusBadge tone="privacy">
              {round?.phase === 'protected' || round?.phase === 'regional' || round?.phase === 'global'
                ? 'Protected updates in motion'
                : 'Local training inside perimeter'}
            </StatusBadge>
          }
        />
        <FederationTopology round={round} />
      </div>

      <div style={{ padding: '18px 28px 6px' }}>
        <SectionLabel
          eyebrow="Per bank · current round"
          title="Local results are visible only to each bank"
          subtitle="We show demo aggregate values for the presenter to explain. In a real deployment, these metrics stay on-prem and only protected weights move."
        />
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.6fr 0.9fr 1fr 1fr 1fr 1fr',
              padding: '12px 16px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.05,
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface-2)',
            }}
          >
            <div>Bank</div>
            <div>Region</div>
            <div>Local samples</div>
            <div>Local F1</div>
            <div>Global F1</div>
            <div>Status</div>
          </div>
          {(round?.bankUpdates || []).map((u, idx) => {
            const bank = demoData.banks.banks.find((b) => b.id === u.bankId);
            if (!bank) return null;
            return (
              <div
                key={u.bankId}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.6fr 0.9fr 1fr 1fr 1fr 1fr',
                  padding: '14px 16px',
                  alignItems: 'center',
                  borderBottom:
                    idx === (round?.bankUpdates?.length || 0) - 1
                      ? 'none'
                      : '1px solid var(--border-subtle)',
                  fontSize: 13,
                  color: 'var(--text-primary)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: `var(--region-${bank.region})22`,
                      border: `1px solid var(--region-${bank.region})55`,
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 11,
                    }}
                  >
                    🏦
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{bank.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      {bank.location}
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '3px 9px',
                      borderRadius: 999,
                      fontSize: 11,
                      background: `var(--region-${bank.region})22`,
                      color: `var(--region-${bank.region})`,
                      fontWeight: 700,
                    }}
                  >
                    ● {bank.regionName}
                  </span>
                </div>
                <div>{formatCompact(u.samples)}</div>
                <div
                  style={{
                    fontWeight: 600,
                    color: formatPercent(u.localF1) >= formatPercent(0.8)
                      ? 'var(--accent-teal)'
                      : 'var(--text-primary)',
                  }}
                >
                  {formatPercent(u.localF1)}
                </div>
                <div style={{ fontWeight: 600, color: 'var(--accent-violet)' }}>
                  {formatPercent(round?.globalMacroF1)}
                </div>
                <div>
                  <StatusBadge tone={u.participated ? 'online' : 'neutral'}>
                    {u.participated ? 'Participated' : 'Idle'}
                  </StatusBadge>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '20px 28px 0' }}>
        <DataBoundaryLegend />
      </div>
    </div>
  );
};

export default FederationPage;
