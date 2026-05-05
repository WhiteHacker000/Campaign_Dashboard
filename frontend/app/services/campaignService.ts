import { Campaign, CampaignInput } from '../types/campaign';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const CampaignService = {
    /**
     * Fetch all campaigns from the backend API
     */
    async fetchCampaigns(): Promise<Campaign[]> {
        const response = await fetch(`${API_URL}/campaigns`, {
            cache: 'no-store', // Prevent Next.js or browser caching
            headers: {
                'Cache-Control': 'no-cache'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch campaigns');
        }

        return response.json();
    },

    /**
     * Add a campaign through the admin-only backend endpoint
     */
    async createCampaign(campaign: CampaignInput, adminUserId: number): Promise<Campaign> {
        const response = await fetch(`${API_URL}/campaigns`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({
                ...campaign,
                admin_user_id: adminUserId
            })
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(data?.detail || 'Failed to add campaign');
        }

        return data;
    }
};
