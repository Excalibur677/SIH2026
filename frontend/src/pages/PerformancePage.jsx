import PageHeader from '../components/layout/PageHeader.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import MetricCard from '../components/ui/MetricCard.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import PerClassF1Chart from '../components/charts/PerClassF1Chart.jsx';
import PrecisionRecallChart from '../components/charts/PrecisionRecallChart.jsx';
import BankComparisonChart from '../components/charts/BankComparisonChart.jsx';
import UtilityPrivacyChart from '../components/charts/UtilityPrivacyChart.jsx';
import demoData from '../data/demo-data.js';
import { formatCompact, formatPercent, formatRatio } from '../utils/formatters.js';
import { CLASS_LABELS, classColor, SEVERITY_COLORS } from '../data/labels.js';

const PerformancePage = () => {
  const metrics = demoData.metrics;
  const overall = metrics.overall;
  const perClass = metrics.perClass;
  const banks = demoData.bankComparison.banks;
  const curve = demoData.bankComparison.privacyUtilityCurve;
  const attackClasses = demoData.attackClasses.attackClasses;

  return (
    <div style={{ paddingBottom: 40 }}>
      <PageHeader
        eyebrow="Detection Performance"
        title="Assessment quality is reported per class and per bank — not as a misleading single-number '99% accuracy' hero."
        subtitle="Benign-heavy network data makes raw accuracy hard to interpret. We therefore emphasise macro-F1, per-class precision/recall, and bank-level comparison across the balanced-privacy scenario."
        badges={[
          <StatusBadge key="p1" tone="privacy">
            Balanced ε scenario
          </StatusBadge>,
          <StatusBadge key="p2" tone="info">
            {demoData.attackClasses.dataset}
          </StatusBadge>,
        ]}
      />

      <div style={{ padding: '4px 28px 18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
          <MetricCard
            label="Global Accuracy"
            value={overall.globalAccuracy}
            valueType="percent"
            tone="teal"
            icon="🎯"
            hint="Benign-heavy baseline — interpret with care."
          />
          <MetricCard
            label="Global Macro F1"
            value={overall.globalMacroF1}
            valueType="percent"
            tone="violet"
            icon="📈"
            hint="Averaged equally across all 7 classes."
          />
          <MetricCard
            label="Macro Precision"
            value={overall.globalMacroPrecision}
            valueType="percent"
            tone="blue"
            icon="⊡"
          />
          <MetricCard
            label="Macro Recall"
            value={overall.globalMacroRecall}
            valueType="percent"
            tone="pink"
            icon="⊞"
          />
          <MetricCard
            label="Attack-weighted F1"
            value={overall.attackWeightedF1}
            valueType="percent"
            tone="amber"
            icon="⚠"
            badge={<StatusBadge tone="warn">Attack-only</StatusBadge>}
            hint="Excludes benign class — the real IDS signal."
          />
        </div>
      </div>

      <div style={{ padding: '10px 28px 6px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 14 }}>
          <div>
            <SectionLabel
              eyebrow="Per class · F1"
              title="Per-class F1 score (balanced privacy scenario)"
              subtitle="Rare classes (Web Attack, Infiltration) are the toughest to recover under noise. Compare their bubble size on the Precision–Recall chart."
            />
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 14,
              }}
            >
              <PerClassF1Chart perClass={perClass} height={300} />
            </div>
          </div>
          <div>
            <SectionLabel
              eyebrow="Precision vs Recall"
              title="Each class trades precision and recall differently"
              subtitle="Bubble size is proportional to class support. Top-right = best. Bottom-left = hard rare class."
            />
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 14,
              }}
            >
              <PrecisionRecallChart perClass={perClass} height={300} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 28px 6px' }}>
        <SectionLabel
          eyebrow="Class details"
          title="Per-class metrics table"
          subtitle="Every numeric view repeats the demo-data disclosure. These values illustrate workflow — they are not production bank results."
          right={<StatusBadge tone="privacy">Demo values</StatusBadge>}
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
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 0.8fr',
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
            <div>Class</div>
            <div>Samples</div>
            <div>Precision</div>
            <div>Recall</div>
            <div>F1</div>
            <div>Severity</div>
            <div>Share</div>
          </div>
          {perClass.map((row, idx) => {
            const cls = attackClasses.find((c) => c.id === row.classId);
            return (
              <div
                key={row.classId}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 0.8fr',
                  padding: '14px 16px',
                  alignItems: 'center',
                  fontSize: 13,
                  color: 'var(--text-primary)',
                  fontVariantNumeric: 'tabular-nums',
                  borderBottom:
                    idx === perClass.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 3,
                      background: classColor(row.classId),
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>
                      {CLASS_LABELS[row.classId] || row.classId}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      {cls?.description?.slice(0, 64) || ''}
                      {cls?.description && cls.description.length > 64 ? '…' : ''}
                    </div>
                  </div>
                </div>
                <div>{formatCompact(row.samples)}</div>
                <div style={{ fontWeight: 600 }}>{formatPercent(row.precision)}</div>
                <div style={{ fontWeight: 600 }}>{formatPercent(row.recall)}</div>
                <div style={{ fontWeight: 700, color: 'var(--accent-teal)' }}>
                  {formatPercent(row.f1)}
                </div>
                <div>
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: '3px 9px',
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                      color: SEVERITY_COLORS[cls?.severity || 'Info'],
                      background: `${SEVERITY_COLORS[cls?.severity || 'Info']}18`,
                      border: `1px solid ${SEVERITY_COLORS[cls?.severity || 'Info']}33`,
                    }}
                  >
                    {cls?.severity || 'Info'}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      height: 6,
                      background: 'var(--bg-elevated)',
                      borderRadius: 999,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(100, Number(row.samplesPercent || 0))}%`,
                        height: '100%',
                        background: classColor(row.classId),
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>
                    {formatRatio(row.samplesPercent, 1)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '20px 28px 6px' }}>
        <SectionLabel
          eyebrow="Per bank · comparison"
          title="Banks contribute different volumes and receive different local quality"
          subtitle="Harborline Financial (western region, largest daily volume) sets the strongest local F1. Suncrest Savings and Meridian Trust benefit from cross-bank knowledge despite smaller footprints."
        />
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 14,
          }}
        >
          <BankComparisonChart banks={banks} height={280} />
        </div>
      </div>

      <div style={{ padding: '18px 28px 6px' }}>
        <SectionLabel
          eyebrow="Utility–Privacy"
          title="Privacy–utility trade-off across all four scenarios"
          subtitle="The presenter uses this chart to explain why the consortium defaults to Balanced Privacy: strong enough ε to be meaningful, still preserves rare-class signal."
        />
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 14,
          }}
        >
          <UtilityPrivacyChart curve={curve} height={300} />
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;
