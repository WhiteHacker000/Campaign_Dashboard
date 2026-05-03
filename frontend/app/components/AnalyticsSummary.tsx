import { Campaign } from '../types/campaign';

interface AnalyticsSummaryProps {
    campaigns: Campaign[];
}

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

export function AnalyticsSummary({ campaigns }: AnalyticsSummaryProps) {
    const totals = campaigns.reduce(
        (summary, campaign) => {
            summary.clicks += campaign.clicks;
            summary.cost += campaign.cost;
            summary.impressions += campaign.impressions;
            summary.active += campaign.status === 'Active' ? 1 : 0;
            return summary;
        },
        { clicks: 0, cost: 0, impressions: 0, active: 0 }
    );

    const avgCtr = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
    const avgCpc = totals.clicks > 0 ? totals.cost / totals.clicks : 0;

    const kpis = [
        {
            label: 'Total Campaigns',
            value: campaigns.length.toString(),
            detail: `${totals.active} active, ${campaigns.length - totals.active} paused`
        },
        {
            label: 'Total Clicks',
            value: totals.clicks.toLocaleString(),
            detail: `${avgCtr.toFixed(2)}% average CTR`
        },
        {
            label: 'Ad Spend',
            value: formatCurrency(totals.cost),
            detail: `${formatCurrency(avgCpc)} average CPC`
        },
        {
            label: 'Impressions',
            value: totals.impressions.toLocaleString(),
            detail: 'Reach across selected campaigns'
        }
    ];

    return (
        <section className="analytics-summary" aria-label="Campaign analytics summary">
            {kpis.map((kpi) => (
                <article className="kpi-card" key={kpi.label}>
                    <span className="kpi-label">{kpi.label}</span>
                    <strong>{kpi.value}</strong>
                    <span className="kpi-detail">{kpi.detail}</span>
                </article>
            ))}
        </section>
    );
}
