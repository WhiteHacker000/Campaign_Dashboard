/**
 * Campaign Table Component
 * Displays campaigns in a table format
 */

interface Campaign {
    id: number;
    name: string;
    status: string;
    clicks: number;
    cost: number;
    impressions: number;
}

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
                        <th>Impressions</th>
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

                            {/* Impressions */}
                            <td>{campaign.impressions.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
