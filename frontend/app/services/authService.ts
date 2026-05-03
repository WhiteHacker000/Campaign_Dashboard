import { AuthResponse } from '../types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface AuthPayload {
    name?: string;
    email: string;
    password: string;
}

async function sendAuthRequest(endpoint: 'login' | 'signup', payload: AuthPayload): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.detail || 'Authentication request failed');
    }

    return data;
}

export const AuthService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        return sendAuthRequest('login', { email, password });
    },

    async signup(name: string, email: string, password: string): Promise<AuthResponse> {
        return sendAuthRequest('signup', { name, email, password });
    }
};
