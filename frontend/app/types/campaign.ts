export interface Campaign {
    id: number;
    name: string;
    status: string;
    clicks: number;
    cost: number;
    impressions: number;
    ctr: number;
}

export interface CampaignInput {
    name: string;
    status: 'Active' | 'Paused';
    clicks: number;
    cost: number;
    impressions: number;
}
