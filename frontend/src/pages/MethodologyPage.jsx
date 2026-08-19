import PageHeader from '../components/layout/PageHeader.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import MetricCard from '../components/ui/MetricCard.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import demoData from '../data/demo-data.js';
import { formatCompact, formatPercent } from '../utils/formatters.js';
import { CLASS_LABELS, classColor, SEVERITY_COLORS } from '../data/labels.js';

const MethodologyPage = () => {
  const attack = demoData.attackClasses;
  const meta = demoData.meta;
  const banks = demoData.banks.banks;
  const classes = attack.attackClasses;
  const scope = meta?.scope;

  return (
    <div style={{ paddingBottom: 40 }}>
      <PageHeader
        eyebrow="Methodology & Scope"
        title="Dataset: CICIDS2017. Six banks. Benign + six attack classes. Network intrusion detection only."
        subtitle="Scope is intentionally narrow. We do not handle fraud, mule-account detection, transaction analytics, or blockchain use cases. Future work is listed explicitly so reviewers can separate shipped from roadmap."
        badges={[
          <StatusBadge key="p1" tone="privacy">
            Scope: network IDS only
          </StatusBadge>,
          <StatusBadge key="p2" tone="info">
            {attack.dataset}
          </StatusBadge>,
        ]}
      />

      <div style={{ padding: '4px 28px 18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <MetricCard
            label="Labelled samples (dataset)"
            value={attack.totalSamples}
            valueType="integer"
            tone="teal"
            icon="📚"
          />
          <MetricCard
            label="Flow-level features"
            value={attack.features}
            valueType="integer"
            tone="blue"
            icon="🧪"
            hint={`${attack.featureCategories.length} engineered categories`}
          />
          <MetricCard
            label="Classes modelled"
            value={classes.length}
            valueType="integer"
            tone="violet"
            icon="🏷"
            badge={<StatusBadge tone="info">Benign + 6 attacks</StatusBadge>}
          />
          <MetricCard
            label="Participating banks (simulated)"
            value={banks.length}
            valueType="integer"
            tone="pink"
            icon="🏦"
            hint={`Across ${demoData.banks.regions.length} regions · sample-count weighted`}
          />
        </div>
      </div>

      <div style={{ padding: '10px 28px 6px' }}>
        <SectionLabel
          eyebrow="Attack classes"
          title="Seven-class label vocabulary"
          subtitle="Labels follow CICIDS2017's convention. The severity column reflects operational impact inside a bank network — not dataset imbalance alone."
          right={<StatusBadge tone="privacy">{attack.dataset}</StatusBadge>}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {classes.map((cls) => {
            const metrics = demoData.metrics.perClass.find((m) => m.classId === cls.id);
            return (
              <div
                key={cls.id}
                style={{
                  background: 'var(--bg-surface)',
                  border: `1px solid ${classColor(cls.id)}33`,
                  borderRadius: 'var(--radius-lg)',
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: classColor(cls.id),
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        background: `${classColor(cls.id)}22`,
                        border: `1px solid ${classColor(cls.id)}55`,
                        display: 'grid',
                        placeItems: 'center',
                        color: classColor(cls.id),
                        fontWeight: 800,
                        fontSize: 11,
                      }}
                    >
                      {cls.id.slice(0, 2)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 15 }}>
                        {CLASS_LABELS[cls.id] || cls.name}
                      </h3>
                      <p style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
                        {formatCompact(cls.samples)} samples ·{' '}
                        {formatPercent(metrics?.f1 ?? 0)} F1 (balanced scenario)
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '3px 9px',
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                      color: SEVERITY_COLORS[cls.severity] || 'var(--text-secondary)',
                      background: `${SEVERITY_COLORS[cls.severity] || 'var(--border-subtle)'}18`,
                      border: `1px solid ${SEVERITY_COLORS[cls.severity] || 'var(--border-subtle)'}33`,
                    }}
                  >
                    {cls.severity}
                  </span>
                </div>
                <p style={{ fontSize: 13 }}>{cls.description}</p>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      letterSpacing: 0.04,
                      textTransform: 'uppercase',
                      marginBottom: 4,
                    }}
                  >
                    Real-world examples
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {cls.examples.map((ex) => (
                      <span
                        key={ex}
                        style={{
                          padding: '4px 9px',
                          borderRadius: 6,
                          fontSize: 11.5,
                          background: 'var(--bg-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '22px 28px 6px' }}>
        <SectionLabel
          eyebrow="Feature engineering"
          title={`${attack.featureCategories.length} families of flow-level features`}
          subtitle="We do not inspect packet payloads. All features are derived from packet headers, timing, sizes, and flags — compatible with encrypted traffic."
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 10,
          }}
        >
          {attack.featureCategories.map((cat, i) => (
            <div
              key={cat}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: 12,
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                fontSize: 13,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'var(--bg-elevated)',
                  color: 'var(--accent-teal)',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '22px 28px 6px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <SectionLabel
              eyebrow="In scope · this demo"
              title="What we ship and will defend tomorrow"
              right={<StatusBadge tone="online">In scope</StatusBadge>}
            />
            <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                scope?.privacyBoundary || 'Local data stays inside each bank.',
                scope?.aggregation || 'Fixed regional → global trusted aggregation.',
                `${banks.length} simulated banks, ${demoData.banks.regions.length} regions.`,
                'Differential privacy illustrated via clipping + Gaussian noise.',
                `${classes.length}-class detection on ${attack.dataset} labels.`,
                'Round playback for presenter explanation (no live ML).',
              ].map((line) => (
                <li key={line} style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              background:
                'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(245,158,11,0.06))',
              border: '1px dashed rgba(239,68,68,0.28)',
              borderRadius: 'var(--radius-lg)',
              padding: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <SectionLabel
              eyebrow="Explicitly out of scope"
              title="What we do NOT claim — please don't ask us"
              right={<StatusBadge tone="danger">Out of scope</StatusBadge>}
            />
            <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Fraud detection, mule-account analytics, transaction scoring.',
                'Blockchain, crypto-assets, or anti-money-laundering use cases.',
                'Live model training endpoint or database of any kind.',
                'Authentication, user accounts, role-based access control.',
                'Cryptographic secure aggregation (shipped as future work).',
                'Poisoning / backdoor robustness mechanisms (roadmap).',
              ].map((line) => (
                <li key={line} style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ padding: '22px 28px 6px' }}>
        <SectionLabel
          eyebrow="Roadmap · Future work"
          title="Items we deliberately label as future work rather than over-claim"
          right={<StatusBadge tone="info">Roadmap</StatusBadge>}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {(scope?.futureWork || []).map((fw, i) => (
            <div
              key={fw}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 14,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: 'var(--accent-teal-soft)',
                  color: 'var(--accent-teal)',
                  border: '1px solid rgba(14,165,160,0.25)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>
                {fw}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '22px 28px 0' }}>
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(14,165,160,0.14), rgba(139,92,246,0.12))',
            border: '1px solid rgba(14,165,160,0.28)',
            borderRadius: 'var(--radius-xl)',
            padding: 20,
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 20,
            alignItems: 'center',
          }}
        >
          <div>
            <h3 style={{ fontSize: 18, marginBottom: 6 }}>
              Consilience helps banks learn from wider cyberattack patterns without pooling raw
              network traffic.
            </h3>
            <p style={{ fontSize: 13.5 }}>
              We federate the model, not the data. Reviewers should judge us on the demo-workflow
              clarity, correct scope claims, and the honest treatment of privacy-utility
              trade-offs — not on flashy single-number metrics.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                padding: 14,
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(14,165,160,0.25)',
                minWidth: 260,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-teal)' }}>
                CLOSING PITCH
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                “We federate the model, not the data.”
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Use it on every screen, in every chart footnote, and at the opening of both
                presenter scripts.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologyPage;
