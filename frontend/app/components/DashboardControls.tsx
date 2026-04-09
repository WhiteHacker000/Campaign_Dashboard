import React from 'react';

interface DashboardControlsProps {
    statusFilter: string;
    onFilterChange: (status: string) => void;
    viewMode: 'table' | 'cards';
    onViewModeChange: (mode: 'table' | 'cards') => void;
    theme: 'light' | 'dark';
    onThemeToggle: () => void;
}

export const DashboardControls: React.FC<DashboardControlsProps> = ({
    statusFilter,
    onFilterChange,
    viewMode,
    onViewModeChange,
    theme,
    onThemeToggle
}) => {
    return (
        <div className="controls">
            {/* Status Filter Dropdown */}
            <div className="filter-group">
                <label htmlFor="status-filter">Filter by Status:</label>
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

            {/* View Mode Toggle */}
            <div className="view-toggle">
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
