import React from 'react';
import { CampaignSortKey } from '../hooks/useCampaigns';

interface DashboardControlsProps {
    statusFilter: string;
    onFilterChange: (status: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortBy: CampaignSortKey;
    onSortChange: (sortBy: CampaignSortKey) => void;
    viewMode: 'table' | 'cards';
    onViewModeChange: (mode: 'table' | 'cards') => void;
    theme: 'light' | 'dark';
    onThemeToggle: () => void;
    onRefresh: () => void;
    onExport: () => void;
}

export const DashboardControls: React.FC<DashboardControlsProps> = ({
    statusFilter,
    onFilterChange,
    searchQuery,
    onSearchChange,
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange,
    theme,
    onThemeToggle,
    onRefresh,
    onExport
}) => {
    return (
        <div className="controls">
            <div className="control-filters">
                <div className="filter-group search-group">
                    <label htmlFor="campaign-search">Search</label>
                    <input
                        id="campaign-search"
                        type="search"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Find campaign"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="status-filter">Status</label>
                    <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={(e) => onFilterChange(e.target.value)}
                    >
                        <option value="All">All Campaigns</option>
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="sort-filter">Sort by</label>
                    <select
                        id="sort-filter"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as CampaignSortKey)}
                    >
                        <option value="clicks">Most Clicks</option>
                        <option value="impressions">Most Impressions</option>
                        <option value="ctr">Highest CTR</option>
                        <option value="cost">Highest Cost</option>
                        <option value="name">Campaign Name</option>
                    </select>
                </div>
            </div>

            {/* View Mode Toggle */}
            <div className="view-toggle">
                <button className="view-btn" onClick={onRefresh}>
                    Refresh
                </button>
                <button className="view-btn" onClick={onExport}>
                    Export CSV
                </button>
                <button
                    className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                    onClick={() => onViewModeChange('table')}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                        <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18" />
                    </svg>
                    Table View
                </button>
                <button
                    className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
                    onClick={() => onViewModeChange('cards')}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    Card View
                </button>

                {/* Theme Toggle Button */}
                <button
                    className="theme-toggle"
                    onClick={onThemeToggle}
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
            </div>
        </div>
    );
};
