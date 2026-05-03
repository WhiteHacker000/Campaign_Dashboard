"use client";

import { FormEvent, useState } from 'react';
import { AuthService } from '../services/authService';
import { AuthUser } from '../types/auth';

interface AuthPageProps {
    onAuthSuccess: (user: AuthUser) => void;
    theme: 'light' | 'dark';
    onThemeToggle: () => void;
}

export function AuthPage({ onAuthSuccess, theme, onThemeToggle }: AuthPageProps) {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('demo@campaign.com');
    const [password, setPassword] = useState('demo123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const isSignup = mode === 'signup';

    const handleModeChange = (nextMode: 'login' | 'signup') => {
        setMode(nextMode);
        setError('');
        if (nextMode === 'login') {
            setEmail('demo@campaign.com');
            setPassword('demo123');
        } else {
            setName('');
            setEmail('');
            setPassword('');
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = isSignup
                ? await AuthService.signup(name, email, password)
                : await AuthService.login(email, password);

            onAuthSuccess(response.user);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to authenticate right now');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-shell">
            <section className="auth-intro" aria-label="Campaign dashboard introduction">
                <div className="auth-brand">Campaign Analytics</div>
                <h1>Sign in to manage campaign performance</h1>
                <p>
                    User accounts are saved and checked through the FastAPI database layer,
                    the same backend that serves the campaign table.
                </p>
                <div className="auth-db-panel">
                    <span className="db-dot"></span>
                    <div>
                        <strong>SQLite data source</strong>
                        <span>Fetching users from /auth and campaigns from /campaigns</span>
                    </div>
                </div>
            </section>

            <section className="auth-panel" aria-label={isSignup ? 'Create account' : 'Login'}>
                <div className="auth-panel-header">
                    <div>
                        <p className="auth-kicker">Database login</p>
                        <h2>{isSignup ? 'Create account' : 'Welcome back'}</h2>
                    </div>
                    <button type="button" className="theme-toggle" onClick={onThemeToggle}>
                        {theme === 'dark' ? 'Light' : 'Dark'}
                    </button>
                </div>

                <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
                    <button
                        type="button"
                        className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                        onClick={() => handleModeChange('login')}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
                        onClick={() => handleModeChange('signup')}
                    >
                        Sign up
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {isSignup && (
                        <label className="form-field">
                            <span>Name</span>
                            <input
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Campaign manager"
                                minLength={2}
                                required
                            />
                        </label>
                    )}

                    <label className="form-field">
                        <span>Email</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="demo@campaign.com"
                            required
                        />
                    </label>

                    <label className="form-field">
                        <span>Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Minimum 6 characters"
                            minLength={6}
                            required
                        />
                    </label>

                    {error && <div className="auth-error">{error}</div>}

                    <button type="submit" className="auth-submit" disabled={loading}>
                        {loading ? 'Checking database...' : isSignup ? 'Create account' : 'Login'}
                    </button>
                </form>

                <p className="auth-demo-note">Demo login: demo@campaign.com / demo123</p>
            </section>
        </main>
    );
}
