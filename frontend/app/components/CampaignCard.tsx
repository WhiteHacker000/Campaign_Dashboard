/**
 * Campaign Card Component
 * Displays a single campaign in card format
 */

interface Campaign {
    id: number;
    name: string;
    status: string;
    clicks: number;
    cost: number;
    impressions: number;
}

interface CampaignCardProps {
    campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
    return (
        <div className="campaign-card">
            {/* Card Header with Campaign Name and Status */}
            <div className="campaign-card-header">
                <h3 className="campaign-card-title">{campaign.name}</h3>
                <span className={`status-badge ${campaign.status.toLowerCase()}`}>
                    {campaign.status}
                </span>
            </div>

            {/* Campaign Statistics */}
            <div className="campaign-card-stats">
                {/* Clicks */}
                <div className="stat-item">
                    <span className="stat-label">Clicks</span>
                    <span className="stat-value">{campaign.clicks.toLocaleString()}</span>
                </div>

                {/* Cost */}
                <div className="stat-item">
                    <span className="stat-label">Cost</span>
                    <span className="stat-value cost">${campaign.cost.toFixed(2)}</span>
                </div>

                {/* Impressions */}
                <div className="stat-item">
                    <span className="stat-label">Impressions</span>
                    <span className="stat-value">{campaign.impressions.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}
