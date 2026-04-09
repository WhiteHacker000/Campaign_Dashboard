"use client";

/**
 * Campaign Analytics Dashboard - Main Page
 * This component acts as an orchestrator, composed of smaller single-responsibility modules
 */

import { useState } from 'react';
import CampaignTable from './components/CampaignTable';
import CampaignCard from './components/CampaignCard';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardControls } from './components/DashboardControls';
import { useCampaigns } from './hooks/useCampaigns';
import { useTheme } from './hooks/useTheme';

export default function Home() {
    // Isolated hooks taking care of specific domains
    const {
        filteredCampaigns,
        loading,
        error,
        statusFilter,
        handleFilterChange
    } = useCampaigns();

    const { theme, toggleTheme } = useTheme();

    // Local UI state
    const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

    return (
        <div className="container">
            {/* Header Component */}
            <DashboardHeader />

            {/* Controls Component */}
            <DashboardControls
                statusFilter={statusFilter}
                onFilterChange={handleFilterChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                theme={theme}
                onThemeToggle={toggleTheme}
            />

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

            {/* Content Rendering */}
            {!loading && !error && (
                <>
                    {filteredCampaigns.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🔍</div>
                            <p>No campaigns found matching your filter.</p>
                        </div>
                    ) : (
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
