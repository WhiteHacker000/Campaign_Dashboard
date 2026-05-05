"use client";

import { FormEvent, useState } from 'react';
import { CampaignInput } from '../types/campaign';

interface AdminCampaignFormProps {
    onAddCampaign: (campaign: CampaignInput) => Promise<void>;
}

const initialForm: CampaignInput = {
    name: '',
    status: 'Active',
    clicks: 0,
    cost: 0,
    impressions: 0
};

export function AdminCampaignForm({ onAddCampaign }: AdminCampaignFormProps) {
    const [form, setForm] = useState<CampaignInput>(initialForm);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [saving, setSaving] = useState(false);

    const updateField = <Key extends keyof CampaignInput>(key: Key, value: CampaignInput[Key]) => {
        setForm((currentForm) => ({
            ...currentForm,
            [key]: value
        }));
        setError('');
        setSuccess('');
    };

    const handleNumberChange = (key: 'clicks' | 'cost' | 'impressions', value: string) => {
        const parsedValue = key === 'cost' ? Number.parseFloat(value) : Number.parseInt(value, 10);
        updateField(key, Number.isNaN(parsedValue) ? 0 : parsedValue);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (form.name.trim().length < 2) {
            setError('Campaign name must be at least 2 characters.');
            return;
        }

        if (form.clicks < 0 || form.cost < 0 || form.impressions < 0) {
            setError('Campaign metrics cannot be negative.');
            return;
        }

        try {
            setSaving(true);
            await onAddCampaign({
                ...form,
                name: form.name.trim()
            });
            setForm(initialForm);
            setSuccess('Campaign added to the dashboard.');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to add campaign right now.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="admin-panel" aria-label="Add campaign">
            <div className="admin-panel-header">
                <div>
                    <p className="admin-kicker">Admin tools</p>
                    <h2>Add campaign</h2>
                </div>
                <span className="admin-badge">Admin</span>
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
                <label className="form-field admin-name-field">
                    <span>Campaign name</span>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(event) => updateField('name', event.target.value)}
                        placeholder="Launch campaign"
                        minLength={2}
                        required
                    />
                </label>

                <label className="form-field">
                    <span>Status</span>
                    <select
                        value={form.status}
                        onChange={(event) => updateField('status', event.target.value as CampaignInput['status'])}
                    >
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                    </select>
                </label>

                <label className="form-field">
                    <span>Clicks</span>
                    <input
                        type="number"
                        min={0}
                        value={form.clicks}
                        onChange={(event) => handleNumberChange('clicks', event.target.value)}
                        required
                    />
                </label>

                <label className="form-field">
                    <span>Cost</span>
                    <input
                        type="number"
                        min={0}
                        step="0.01"
                        value={form.cost}
                        onChange={(event) => handleNumberChange('cost', event.target.value)}
                        required
                    />
                </label>

                <label className="form-field">
                    <span>Impressions</span>
                    <input
                        type="number"
                        min={0}
                        value={form.impressions}
                        onChange={(event) => handleNumberChange('impressions', event.target.value)}
                        required
                    />
                </label>

                <button type="submit" className="admin-submit" disabled={saving}>
                    {saving ? 'Adding...' : 'Add campaign'}
                </button>
            </form>

            {error && <div className="admin-message error-message">{error}</div>}
            {success && <div className="admin-message success-message">{success}</div>}
        </section>
    );
}
