/**
 * Campaign Card Component
 * Displays a single campaign in card format
 */

import { Campaign } from '../types/campaign';

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

                {/* CTR */}
                <div className="stat-item">
                    <span className="stat-label">CTR</span>
                    <span className="stat-value">{(campaign.ctr || 0).toFixed(2)}%</span>
                </div>

                {/* CPC */}
                <div className="stat-item">
                    <span className="stat-label">CPC</span>
                    <span className="stat-value">${(campaign.clicks > 0 ? campaign.cost / campaign.clicks : 0).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
