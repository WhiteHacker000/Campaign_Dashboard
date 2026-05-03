import { Campaign } from '../types/campaign';

interface PerformancePanelProps {
    campaigns: Campaign[];
}

const getCtr = (campaign: Campaign) => campaign.ctr || 0;
const getCpc = (campaign: Campaign) => campaign.clicks > 0 ? campaign.cost / campaign.clicks : 0;

export function PerformancePanel({ campaigns }: PerformancePanelProps) {
    const topByClicks = [...campaigns].sort((a, b) => b.clicks - a.clicks).slice(0, 5);
    const bestCtr = [...campaigns].sort((a, b) => getCtr(b) - getCtr(a))[0];
    const highestCost = [...campaigns].sort((a, b) => b.cost - a.cost)[0];
    const activeCount = campaigns.filter((campaign) => campaign.status === 'Active').length;
    const activePercent = campaigns.length > 0 ? (activeCount / campaigns.length) * 100 : 0;
    const maxClicks = Math.max(...topByClicks.map((campaign) => campaign.clicks), 1);

    return (
        <section className="performance-grid" aria-label="Campaign performance insights">
            <article className="analytics-panel">
                <div className="panel-heading">
                    <span>Performance</span>
                    <h2>Top campaigns by clicks</h2>
                </div>

                <div className="bar-list">
                    {topByClicks.map((campaign) => (
                        <div className="bar-row" key={campaign.id}>
                            <div className="bar-row-header">
                                <strong>{campaign.name}</strong>
                                <span>{campaign.clicks.toLocaleString()}</span>
                            </div>
                            <div className="bar-track">
                                <div
                                    className="bar-fill"
                                    style={{ width: `${Math.max((campaign.clicks / maxClicks) * 100, 6)}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </article>

            <article className="analytics-panel">
                <div className="panel-heading">
                    <span>Insights</span>
                    <h2>Quick decisions</h2>
                </div>

                <div className="insight-list">
                    <div className="insight-item">
                        <span className="insight-label">Best CTR</span>
                        <strong>{bestCtr ? bestCtr.name : 'No campaign'}</strong>
                        <span>{bestCtr ? `${getCtr(bestCtr).toFixed(2)}% conversion attention` : 'Add data to compare'}</span>
                    </div>
                    <div className="insight-item">
                        <span className="insight-label">Highest spend</span>
                        <strong>{highestCost ? highestCost.name : 'No campaign'}</strong>
                        <span>{highestCost ? `$${highestCost.cost.toFixed(2)} total cost, $${getCpc(highestCost).toFixed(2)} CPC` : 'Add cost data'}</span>
                    </div>
                    <div className="status-meter">
                        <div className="status-meter-top">
                            <span>Active campaign mix</span>
                            <strong>{activePercent.toFixed(0)}%</strong>
                        </div>
                        <div className="bar-track">
                            <div className="bar-fill success" style={{ width: `${activePercent}%` }}></div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}
