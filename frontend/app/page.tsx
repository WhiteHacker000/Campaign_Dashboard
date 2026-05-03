"use client";

/**
 * Campaign Analytics Dashboard - Main Page
 * This component acts as an orchestrator, composed of smaller single-responsibility modules
 */

import { useEffect, useState } from 'react';
import { AuthPage } from './components/AuthPage';
import CampaignTable from './components/CampaignTable';
import CampaignCard from './components/CampaignCard';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardControls } from './components/DashboardControls';
import { useCampaigns } from './hooks/useCampaigns';
import { useTheme } from './hooks/useTheme';
import { AuthUser } from './types/auth';

const STORAGE_KEY = 'campaign-dashboard-user';

export default function Home() {
    const { theme, toggleTheme } = useTheme();
    const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
    const [authChecking, setAuthChecking] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem(STORAGE_KEY);

        if (savedUser) {
            try {
                setCurrentUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }

        setAuthChecking(false);
    }, []);

    const handleAuthSuccess = (user: AuthUser) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        setCurrentUser(user);
    };

    const handleLogout = () => {
        localStorage.removeItem(STORAGE_KEY);
        setCurrentUser(null);
    };

    if (authChecking) {
        return (
            <div className="container">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Checking saved session...</p>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <AuthPage
                onAuthSuccess={handleAuthSuccess}
                theme={theme}
                onThemeToggle={toggleTheme}
            />
        );
    }

    return (
        <Dashboard
            currentUser={currentUser}
            theme={theme}
            onThemeToggle={toggleTheme}
            onLogout={handleLogout}
        />
    );
}

interface DashboardProps {
    currentUser: AuthUser;
    theme: 'light' | 'dark';
    onThemeToggle: () => void;
    onLogout: () => void;
}

function Dashboard({ currentUser, theme, onThemeToggle, onLogout }: DashboardProps) {
    // Isolated hooks taking care of specific domains
    const {
        filteredCampaigns,
        loading,
        error,
        statusFilter,
        handleFilterChange
    } = useCampaigns();

    // Local UI state
    const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

    return (
        <div className="container">
            {/* Header Component */}
            <DashboardHeader />

            <div className="session-bar">
                <div>
                    <span className="session-label">Signed in as</span>
                    <strong>{currentUser.name}</strong>
                    <span>{currentUser.email}</span>
                </div>
                <button type="button" className="logout-btn" onClick={onLogout}>
                    Logout
                </button>
            </div>

            {/* Controls Component */}
            <DashboardControls
                statusFilter={statusFilter}
                onFilterChange={handleFilterChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                theme={theme}
                onThemeToggle={onThemeToggle}
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
