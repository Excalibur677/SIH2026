import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import MetricCard from '../components/ui/MetricCard.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import demoData from '../data/demo-data.js';
import useDemoMode from '../hooks/use-demo-mode.js';
import { REGION_LABELS } from '../data/labels.js';

const Home = () => {
  const { tagline, track, dataset } = useDemoMode();
  const { banks, regions } = demoData.banks;
  const finalRound = demoData.rounds.rounds.at(-1);
  const dailySamples = banks.reduce((total, bank) => total + bank.dailyTrafficSamples, 0);

  return (
    <div className="page-content home-page">
      <PageHeader
        eyebrow="Private intelligence network"
        title="Learn from shared attack patterns, without sharing raw traffic."
        subtitle={tagline}
        badges={[track]}
        primaryAction={<Link to="/federation" className="button button-primary">Explore federation <span aria-hidden="true">→</span></Link>}
      />

      <section className="home-stats stagger-children" aria-label="Consortium summary">
        <MetricCard label="Participating banks" value={banks.length} valueType="integer" tone="teal" hint={`${regions.length} regional aggregation groups`} />
        <MetricCard label="Protected samples / day" value={dailySamples} valueType="integer" tone="blue" hint="Raw traffic remains inside every bank" />
        <MetricCard label="Global Macro F1" value={finalRound.globalMacroF1} valueType="percent" tone="violet" badge={<StatusBadge tone="privacy">Balanced privacy</StatusBadge>} hint={`After ${demoData.rounds.roundsTotal} federated rounds`} />
      </section>

      <section className="home-principles content-section" aria-labelledby="principles-title">
        <div className="section-intro">
          <span className="page-eyebrow">The essential flow</span>
          <h2 id="principles-title">Data stays put. Intelligence improves.</h2>
          <p>Three simple stages make the privacy boundary easy to understand.</p>
        </div>
        <div className="principle-list stagger-children">
          <article className="principle-card">
            <span className="principle-index">01</span>
            <h3>Train locally</h3>
            <p>Each bank learns from its own network traffic within its perimeter.</p>
          </article>
          <article className="principle-card">
            <span className="principle-index">02</span>
            <h3>Protect the update</h3>
            <p>Clipping and calibrated noise limit what any update can reveal.</p>
          </article>
          <article className="principle-card">
            <span className="principle-index">03</span>
            <h3>Aggregate insight</h3>
            <p>Regional signals become a stronger shared model for every bank.</p>
          </article>
        </div>
      </section>

      <section className="consortium-summary content-section" aria-labelledby="consortium-title">
        <div className="section-intro">
          <span className="page-eyebrow">Consortium</span>
          <h2 id="consortium-title">One network, three regions.</h2>
          <p>{dataset} data is represented through six simulated banks.</p>
        </div>
        <div className="region-summary">
          {regions.map((region) => (
            <div className="region-row" key={region.id}>
              <span className="region-marker" style={{ background: `var(--region-${region.id})` }} />
              <span>{REGION_LABELS[region.id]}</span>
              <span className="region-count">{region.banks.length} banks</span>
            </div>
          ))}
          <Link to="/methodology" className="text-link">View scope and methodology <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
