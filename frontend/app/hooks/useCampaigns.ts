import { useState, useEffect } from 'react';
import { Campaign } from '../types/campaign';
import { CampaignService } from '../services/campaignService';

export const useCampaigns = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const loadCampaigns = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await CampaignService.fetchCampaigns();
            setCampaigns(data);
            setFilteredCampaigns(data);
        } catch (err) {
            setError('Failed to load campaigns. Please make sure the backend is running.');
            console.error('Error fetching campaigns:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCampaigns();
    }, []);

    useEffect(() => {
        if (statusFilter === 'All') {
            setFilteredCampaigns(campaigns);
        } else {
            setFilteredCampaigns(
                campaigns.filter(campaign => campaign.status === statusFilter)
            );
        }
    }, [statusFilter, campaigns]);

    const handleFilterChange = (status: string) => {
        setStatusFilter(status);
    };

    return {
        campaigns,
        filteredCampaigns,
        loading,
        error,
        statusFilter,
        handleFilterChange,
        refreshCampaigns: loadCampaigns
    };
};
