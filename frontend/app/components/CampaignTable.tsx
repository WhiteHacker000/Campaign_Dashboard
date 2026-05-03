/**
 * Campaign Table Component
 * Displays campaigns in a table format
 */

import { Campaign } from '../types/campaign';

interface CampaignTableProps {
    campaigns: Campaign[];
}

export default function CampaignTable({ campaigns }: CampaignTableProps) {
    return (
        <div className="table-container">
            <table className="campaign-table">
                {/* Table Header */}
                <thead>
                    <tr>
                        <th>Campaign Name</th>
                        <th>Status</th>
                        <th>Clicks</th>
                        <th>Cost</th>
                        <th>CPC</th>
                        <th>Impressions</th>
                        <th>CTR (%)</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {campaigns.map((campaign) => (
                        <tr key={campaign.id}>
                            {/* Campaign Name */}
                            <td>
                                <strong>{campaign.name}</strong>
                            </td>

                            {/* Status Badge */}
                            <td>
                                <span className={`status-badge ${campaign.status.toLowerCase()}`}>
                                    {campaign.status}
                                </span>
                            </td>

                            {/* Clicks */}
                            <td>{campaign.clicks.toLocaleString()}</td>

                            {/* Cost */}
                            <td>${campaign.cost.toFixed(2)}</td>

                            {/* CPC */}
                            <td>${(campaign.clicks > 0 ? campaign.cost / campaign.clicks : 0).toFixed(2)}</td>

                            {/* Impressions */}
                            <td>{campaign.impressions.toLocaleString()}</td>

                            {/* CTR */}
                            <td>{(campaign.ctr || 0).toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
