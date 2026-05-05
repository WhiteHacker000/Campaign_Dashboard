import { useState, useEffect } from 'react';
import { Campaign, CampaignInput } from '../types/campaign';
import { CampaignService } from '../services/campaignService';

export type CampaignSortKey = 'name' | 'clicks' | 'cost' | 'impressions' | 'ctr';

export const useCampaigns = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<CampaignSortKey>('clicks');

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
        const normalizedQuery = searchQuery.trim().toLowerCase();

        const nextCampaigns = campaigns
            .filter((campaign) => statusFilter === 'All' || campaign.status === statusFilter)
            .filter((campaign) => campaign.name.toLowerCase().includes(normalizedQuery))
            .sort((campaignA, campaignB) => {
                if (sortBy === 'name') {
                    return campaignA.name.localeCompare(campaignB.name);
                }

                return (campaignB[sortBy] || 0) - (campaignA[sortBy] || 0);
            });

        setFilteredCampaigns(nextCampaigns);
    }, [statusFilter, searchQuery, sortBy, campaigns]);

    const handleFilterChange = (status: string) => {
        setStatusFilter(status);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handleSortChange = (key: CampaignSortKey) => {
        setSortBy(key);
    };

    const addCampaign = async (campaign: CampaignInput, adminUserId: number) => {
        const createdCampaign = await CampaignService.createCampaign(campaign, adminUserId);
        setCampaigns((currentCampaigns) => [createdCampaign, ...currentCampaigns]);
        return createdCampaign;
    };

    return {
        campaigns,
        filteredCampaigns,
        loading,
        error,
        statusFilter,
        searchQuery,
        sortBy,
        handleFilterChange,
        handleSearchChange,
        handleSortChange,
        addCampaign,
        refreshCampaigns: loadCampaigns
    };
};
