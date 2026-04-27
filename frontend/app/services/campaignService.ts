import { Campaign } from '../types/campaign';

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
    }
};
