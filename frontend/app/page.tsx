"use client";

/**
 * Campaign Analytics Dashboard - Main Page
 * This component fetches campaign data from the backend and displays it
 */

import { useEffect, useState } from 'react';
import CampaignTable from './components/CampaignTable';
import CampaignCard from './components/CampaignCard';

// Define the Campaign type
interface Campaign {
    id: number;
    name: string;
    status: string;
    clicks: number;
    cost: number;
    impressions: number;
}

export default function Home() {
    // State management
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Backend API URL - Change this to your deployed backend URL
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    /**
     * Fetch campaigns from the backend API
     */
    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await fetch(`${API_URL}/campaigns`);

            if (!response.ok) {
                throw new Error('Failed to fetch campaigns');
            }

            const data = await response.json();
            setCampaigns(data);
            setFilteredCampaigns(data);

        } catch (err) {
            setError('Failed to load campaigns. Please make sure the backend is running.');
            console.error('Error fetching campaigns:', err);
        } finally {
            setLoading(false);
        }
    };

    /**
   * Load theme from localStorage on mount
   */
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    /**
     * Load campaigns when component mounts
     */
    useEffect(() => {
        fetchCampaigns();
    }, []);

    /**
     * Filter campaigns when status filter changes
     */
    useEffect(() => {
        if (statusFilter === 'All') {
            setFilteredCampaigns(campaigns);
        } else {
            setFilteredCampaigns(
                campaigns.filter(campaign => campaign.status === statusFilter)
            );
        }
    }, [statusFilter, campaigns]);

    /**
     * Handle status filter change
     */
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(event.target.value);
    };

    /**
     * Toggle between light and dark theme
     */
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="container">
            {/* Page Header */}
            <header className="header">
                <h1>📊 Campaign Analytics Dashboard</h1>
                <p>Monitor and analyze your marketing campaigns</p>
            </header>

            {/* Controls: Filter and View Toggle */}
            <div className="controls">
                {/* Status Filter Dropdown */}
                <div className="filter-group">
                    <label htmlFor="status-filter">Filter by Status:</label>
                    <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={handleFilterChange}
                    >
                        <option value="All">All Campaigns</option>
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                    </select>
                </div>

                {/* View Mode Toggle */}
                <div className="view-toggle">
                    <button
                        className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                        onClick={() => setViewMode('table')}
                    >
                        📋 Table View
                    </button>
                    <button
                        className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
                        onClick={() => setViewMode('cards')}
                    >
                        🃏 Card View
                    </button>

                    {/* Theme Toggle Button */}
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading campaigns...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="error">
                    <strong>⚠️ Error:</strong> {error}
                </div>
            )}

            {/* Campaign Display - Table or Cards */}
            {!loading && !error && (
                <>
                    {filteredCampaigns.length === 0 ? (
                        // Empty State
                        <div className="empty-state">
                            <div className="empty-state-icon">🔍</div>
                            <p>No campaigns found matching your filter.</p>
                        </div>
                    ) : (
                        // Display campaigns based on view mode
                        <>
                            {viewMode === 'table' ? (
                                <CampaignTable campaigns={filteredCampaigns} />
                            ) : (
                                <div className="card-grid">
                                    {filteredCampaigns.map((campaign) => (
                                        <CampaignCard key={campaign.id} campaign={campaign} />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
