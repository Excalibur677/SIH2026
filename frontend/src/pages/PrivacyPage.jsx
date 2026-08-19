import PageHeader from '../components/layout/PageHeader.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import MetricCard from '../components/ui/MetricCard.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import EpsilonTimeline from '../components/charts/EpsilonTimeline.jsx';
import UtilityPrivacyChart from '../components/charts/UtilityPrivacyChart.jsx';
import PerClassF1Chart from '../components/charts/PerClassF1Chart.jsx';
import usePrivacyScenario from '../hooks/use-privacy-scenario.js';
import demoData from '../data/demo-data.js';
import { formatDelta, formatPercent, formatRatio } from '../utils/formatters.js';
import { computeBudgetStatus, describeScenario } from '../utils/privacy-utils.js';
import { CLASS_LABELS } from '../data/labels.js';

const BUDGET = 10;

const PrivacyPage = () => {
  const { scenarios, mechanisms, scenario, scenarioId, select, epsilonTimeline } =
    usePrivacyScenario();
  const budget = computeBudgetStatus(scenario?.epsilonCumulative || 0, BUDGET);
  const curve = demoData.bankComparison.privacyUtilityCurve;

  return (
    <div style={{ paddingBottom: 40 }}>
      <PageHeader
        eyebrow="Privacy & Trust"
        title="Clipping, noise, and cumulative epsilon bound the influence of any single traffic record."
        subtitle="Consilience uses a trusted aggregator today. Cryptographic secure aggregation and poisoning robustness are explicit future work items on the Methodology page."
        badges={[
          <StatusBadge key="p1" tone="privacy">
            Differential privacy · illustrated
          </StatusBadge>,
          <StatusBadge key="p2" tone="info">
            Trusted aggregator
          </StatusBadge>,
        ]}
        right={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Scenario</span>
            <select
              value={scenarioId}
              onChange={(e) => select(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 10,
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-strong)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {scenarios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        }
      />

      <div style={{ padding: '4px 28px 18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <MetricCard
            label="Clip norm C"
            value={scenario?.clipNorm}
            valueType="ratio"
            tone="teal"
            icon="✂"
            hint="Per-sample gradients are L2-clipped to this bound."
          />
          <MetricCard
            label="Noise multiplier σ"
            value={scenario?.noiseMultiplier}
            valueType="ratio"
            tone="blue"
            icon="🔊"
            hint="σ · noiseStdBase added to clipped update."
          />
          <MetricCard
            label={`Cumulative ε (${demoData.rounds.roundsTotal} rounds)`}
            value={scenario?.epsilonCumulative}
            valueType="ratio"
            tone={budget.status === 'exceeded' ? 'amber' : 'violet'}
            icon="🛡"
            badge={<StatusBadge tone={budget.status === 'healthy' ? 'privacy' : budget.status === 'warning' ? 'warn' : 'danger'}>{budget.label}</StatusBadge>}
            hint={`δ = ${formatDelta(scenario?.delta)} · budget ε = ${BUDGET}`}
          />
          <MetricCard
            label="Global Macro F1"
            value={scenario?.globalMacroF1}
            valueType="percent"
            tone="pink"
            icon="🎯"
            hint={describeScenario(scenario?.clipNorm, scenario?.noiseMultiplier)}
          />
        </div>
      </div>

      <div style={{ padding: '8px 28px 6px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            {
              key: 'clipping',
              data: mechanisms.clipping,
              tone: 'teal',
              value: `Clip norm = ${scenario?.clipNorm ?? mechanisms.clipping.defaultClipNorm}`,
            },
            {
              key: 'noise',
              data: mechanisms.noise,
              tone: 'blue',
              value: `σ = ${scenario?.noiseMultiplier ?? 1} · ${mechanisms.noise.noiseStdBase}`,
            },
            {
              key: 'aggregation',
              data: mechanisms.aggregation,
              tone: 'violet',
              value: 'Trusted aggregator · secagg = future work',
            },
          ].map((m) => (
            <div
              key={m.key}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 8,
                      background:
                        m.tone === 'teal'
                          ? 'var(--accent-teal-soft)'
                          : m.tone === 'blue'
                          ? 'rgba(37,99,235,0.12)'
                          : 'rgba(139,92,246,0.12)',
                      border: `1px solid ${
                        m.tone === 'teal'
                          ? 'rgba(14,165,160,0.3)'
                          : m.tone === 'blue'
                          ? 'rgba(37,99,235,0.3)'
                          : 'rgba(139,92,246,0.3)'
                      }`,
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 13,
                    }}
                  >
                    {m.key === 'clipping' ? '✂' : m.key === 'noise' ? '🔊' : '↻'}
                  </div>
                  <h3 style={{ fontSize: 15 }}>{m.data.name}</h3>
                </div>
                <StatusBadge tone={m.tone === 'teal' ? 'privacy' : m.tone === 'blue' ? 'info' : 'neutral'}>
                  {m.value}
                </StatusBadge>
              </div>
              <p style={{ fontSize: 13 }}>{m.data.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '18px 28px 6px' }}>
        <SectionLabel
          eyebrow="Budget tracking"
          title="Cumulative epsilon across 12 federated rounds"
          subtitle="Each round consumes a slice of the privacy budget. The amber line is the consortium budget for this scenario."
          right={<StatusBadge tone={budget.status === 'healthy' ? 'online' : budget.status === 'warning' ? 'warn' : 'danger'}>{budget.label}</StatusBadge>}
        />
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 14,
          }}
        >
          <EpsilonTimeline timeline={epsilonTimeline} budget={BUDGET} />
        </div>
      </div>

      <div style={{ padding: '18px 28px 6px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <SectionLabel
              eyebrow="Privacy–Utility"
              title="Utility falls as privacy strengthens"
              subtitle="Select a scenario above to inspect the exact epsilon and F1 pair. Rare classes (Infiltration, Web Attack) degrade fastest."
            />
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 14,
              }}
            >
              <UtilityPrivacyChart curve={curve} />
            </div>
            <div
              style={{
                marginTop: 10,
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 8,
              }}
            >
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => select(s.id)}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    background: scenarioId === s.id ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    border: `1px solid ${scenarioId === s.id ? 'var(--accent-teal)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <span style={{ fontWeight: 700 }}>{s.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                    ε = {formatRatio(s.epsilonCumulative, 2)} · F1 {formatPercent(s.globalMacroF1, 0)}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel
              eyebrow={`Scenario · ${scenario?.name}`}
              title="Per-class F1 under this scenario"
              subtitle={scenario?.description}
            />
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 14,
              }}
            >
              <PerClassF1Chart
                perClass={Object.entries(scenario?.classF1 || {}).map(([classId, f1]) => ({
                  classId,
                  label: CLASS_LABELS[classId] || classId,
                  f1,
                  precision: Math.max(0.4, f1 * 1.02),
                  recall: Math.max(0.4, f1 * 0.98),
                }))}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 28px 0' }}>
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(245,158,11,0.10), rgba(219,39,119,0.08))',
            border: '1px dashed rgba(245,158,11,0.35)',
            borderRadius: 'var(--radius-lg)',
            padding: 16,
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr',
            gap: 18,
          }}
        >
          <div>
            <h3 style={{ fontSize: 15 }}>Limitations we disclose on-stage</h3>
            <ul style={{ margin: '8px 0 0', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Demonstration uses a <strong>trusted aggregator</strong>.
              </li>
              <li style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                <strong>Cryptographic secure aggregation</strong> is future work.
              </li>
              <li style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                <strong>Poisoning robustness</strong> mechanisms are not yet integrated.
              </li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: 15 }}>Budget semantics</h3>
            <p style={{ fontSize: 13, marginTop: 6 }}>
              ε is the RDP-composed upper bound; δ = 10⁻⁵. The consortium today treats ε
              ≤ {BUDGET} as an acceptable policy threshold for pilot roll-out.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 15 }}>Demo-data disclosure</h3>
            <p style={{ fontSize: 13, marginTop: 6 }}>
              These values are clearly labelled demo fixtures for the UI workflow. They are not
              live bank results and should not be cited as research findings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
