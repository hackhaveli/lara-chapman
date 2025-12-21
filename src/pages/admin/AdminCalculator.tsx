import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw, AlertCircle, CheckCircle, Calculator, DollarSign, Home as HomeIcon } from 'lucide-react';
import { getCalculatorSettings, updateCalculatorSettings, resetCalculatorSettings, CalculatorSettings } from '../../lib/api';

const AdminCalculator: React.FC = () => {
    const [settings, setSettings] = useState<CalculatorSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'payment' | 'affordability' | 'display'>('payment');
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const response = await getCalculatorSettings();
            if (response.success && response.data) {
                setSettings(response.data);
            }
        } catch (error) {
            showNotification('error', 'Failed to load calculator settings');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSave = async () => {
        if (!settings) return;

        setSaving(true);
        try {
            const response = await updateCalculatorSettings(settings);
            if (response.success) {
                showNotification('success', 'Calculator settings saved successfully!');
            } else {
                showNotification('error', 'Failed to save settings');
            }
        } catch (error) {
            showNotification('error', 'Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = async () => {
        if (!confirm('Are you sure you want to reset all calculator settings to defaults? This cannot be undone.')) {
            return;
        }

        setSaving(true);
        try {
            const response = await resetCalculatorSettings();
            if (response.success && response.data) {
                setSettings(response.data);
                showNotification('success', 'Calculator settings reset to defaults');
            } else {
                showNotification('error', 'Failed to reset settings');
            }
        } catch (error) {
            showNotification('error', 'Failed to reset settings');
        } finally {
            setSaving(false);
        }
    };

    const updatePaymentCalculator = (field: string, value: any) => {
        if (!settings) return;
        setSettings({
            ...settings,
            paymentCalculator: {
                ...settings.paymentCalculator,
                [field]: value
            }
        });
    };

    const updateAffordabilityCalculator = (field: string, value: any) => {
        if (!settings) return;
        setSettings({
            ...settings,
            affordabilityCalculator: {
                ...settings.affordabilityCalculator,
                [field]: value
            }
        });
    };

    const updateDisplaySettings = (field: string, value: any) => {
        if (!settings) return;
        setSettings({
            ...settings,
            displaySettings: {
                ...settings.displaySettings,
                [field]: value
            }
        });
    };

    const updateLoanTermOptions = (index: number, value: number, calculator: 'payment' | 'affordability') => {
        if (!settings) return;

        const currentOptions = calculator === 'payment'
            ? [...settings.paymentCalculator.loanTermOptions]
            : [...settings.affordabilityCalculator.loanTermOptions];

        currentOptions[index] = value;

        if (calculator === 'payment') {
            updatePaymentCalculator('loanTermOptions', currentOptions);
        } else {
            updateAffordabilityCalculator('loanTermOptions', currentOptions);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E76F51] mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading calculator settings...</p>
                </div>
            </div>
        );
    }

    if (!settings) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                    <p className="text-slate-600">Failed to load calculator settings</p>
                    <button onClick={fetchSettings} className="mt-4 px-6 py-2 bg-[#E76F51] text-white rounded-lg">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        <Calculator className="text-[#E76F51]" size={32} />
                        Calculator Settings
                    </h1>
                    <p className="text-slate-500 mt-1">Customize all calculator parameters and defaults</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleReset}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 disabled:opacity-50"
                    >
                        <RotateCcw size={18} />
                        Reset to Defaults
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-[#E76F51] text-white px-6 py-2 rounded-xl hover:bg-[#E76F51]/90 disabled:opacity-50"
                    >
                        <Save size={18} />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Notification */}
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${notification.type === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                >
                    {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    {notification.message}
                </motion.div>
            )}

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('payment')}
                        className={`pb-4 px-2 border-b-2 font-medium transition-colors flex items-center gap-2 ${activeTab === 'payment'
                                ? 'border-[#E76F51] text-[#E76F51]'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <DollarSign size={18} />
                        Payment Calculator
                    </button>
                    <button
                        onClick={() => setActiveTab('affordability')}
                        className={`pb-4 px-2 border-b-2 font-medium transition-colors flex items-center gap-2 ${activeTab === 'affordability'
                                ? 'border-[#E76F51] text-[#E76F51]'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <HomeIcon size={18} />
                        Affordability Calculator
                    </button>
                    <button
                        onClick={() => setActiveTab('display')}
                        className={`pb-4 px-2 border-b-2 font-medium transition-colors flex items-center gap-2 ${activeTab === 'display'
                                ? 'border-[#E76F51] text-[#E76F51]'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <Calculator size={18} />
                        Display Settings
                    </button>
                </nav>
            </div>

            {/* Payment Calculator Tab */}
            {activeTab === 'payment' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Default Values</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Home Price ($)
                                </label>
                                <input
                                    type="number"
                                    value={settings.paymentCalculator.defaultHomePrice}
                                    onChange={(e) => updatePaymentCalculator('defaultHomePrice', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Down Payment (%)
                                </label>
                                <input
                                    type="number"
                                    value={settings.paymentCalculator.defaultDownPayment}
                                    onChange={(e) => updatePaymentCalculator('defaultDownPayment', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    min="0"
                                    max="100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Interest Rate (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={settings.paymentCalculator.defaultInterestRate}
                                    onChange={(e) => updatePaymentCalculator('defaultInterestRate', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Loan Term (years)
                                </label>
                                <select
                                    value={settings.paymentCalculator.defaultLoanTerm}
                                    onChange={(e) => updatePaymentCalculator('defaultLoanTerm', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                >
                                    {settings.paymentCalculator.loanTermOptions.map(term => (
                                        <option key={term} value={term}>{term} years</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Property Tax (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={settings.paymentCalculator.defaultPropertyTax}
                                    onChange={(e) => updatePaymentCalculator('defaultPropertyTax', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Home Insurance ($/month)
                                </label>
                                <input
                                    type="number"
                                    value={settings.paymentCalculator.defaultHomeInsurance}
                                    onChange={(e) => updatePaymentCalculator('defaultHomeInsurance', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default HOA Fees ($/month)
                                </label>
                                <input
                                    type="number"
                                    value={settings.paymentCalculator.defaultHoaFees}
                                    onChange={(e) => updatePaymentCalculator('defaultHoaFees', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default PMI (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={settings.paymentCalculator.defaultPmi}
                                    onChange={(e) => updatePaymentCalculator('defaultPmi', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Range Limits</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Home Price Min ($)
                                </label>
                                <input
                                    type="number"
                                    value={settings.paymentCalculator.homePriceMin}
                                    onChange={(e) => updatePaymentCalculator('homePriceMin', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Home Price Max ($)
                                </label>
                                <input
                                    type="number"
                                    value={settings.paymentCalculator.homePriceMax}
                                    onChange={(e) => updatePaymentCalculator('homePriceMax', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div></div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Interest Rate Min (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={settings.paymentCalculator.interestRateMin}
                                    onChange={(e) => updatePaymentCalculator('interestRateMin', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Interest Rate Max (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={settings.paymentCalculator.interestRateMax}
                                    onChange={(e) => updatePaymentCalculator('interestRateMax', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Interest Rate Step
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={settings.paymentCalculator.interestRateStep}
                                    onChange={(e) => updatePaymentCalculator('interestRateStep', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    PMI Min (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={settings.paymentCalculator.pmiMin}
                                    onChange={(e) => updatePaymentCalculator('pmiMin', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    PMI Max (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={settings.paymentCalculator.pmiMax}
                                    onChange={(e) => updatePaymentCalculator('pmiMax', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    PMI Step
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={settings.paymentCalculator.pmiStep}
                                    onChange={(e) => updatePaymentCalculator('pmiStep', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Loan Term Options</h3>
                        <p className="text-sm text-slate-600 mb-4">Available loan terms in the dropdown (in years)</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {settings.paymentCalculator.loanTermOptions.map((term, index) => (
                                <div key={index}>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Option {index + 1}
                                    </label>
                                    <input
                                        type="number"
                                        value={term}
                                        onChange={(e) => updateLoanTermOptions(index, Number(e.target.value), 'payment')}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Affordability Calculator Tab */}
            {activeTab === 'affordability' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Default Values</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Annual Income ($)
                                </label>
                                <input
                                    type="number"
                                    value={settings.affordabilityCalculator.defaultAnnualIncome}
                                    onChange={(e) => updateAffordabilityCalculator('defaultAnnualIncome', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Monthly Debt ($)
                                </label>
                                <input
                                    type="number"
                                    value={settings.affordabilityCalculator.defaultMonthlyDebt}
                                    onChange={(e) => updateAffordabilityCalculator('defaultMonthlyDebt', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Down Payment ($)
                                </label>
                                <input
                                    type="number"
                                    value={settings.affordabilityCalculator.defaultDownPayment}
                                    onChange={(e) => updateAffordabilityCalculator('defaultDownPayment', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Interest Rate (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={settings.affordabilityCalculator.defaultInterestRate}
                                    onChange={(e) => updateAffordabilityCalculator('defaultInterestRate', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Loan Term (years)
                                </label>
                                <select
                                    value={settings.affordabilityCalculator.defaultLoanTerm}
                                    onChange={(e) => updateAffordabilityCalculator('defaultLoanTerm', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                >
                                    {settings.affordabilityCalculator.loanTermOptions.map(term => (
                                        <option key={term} value={term}>{term} years</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default DTI Ratio (%)
                                </label>
                                <input
                                    type="number"
                                    value={settings.affordabilityCalculator.defaultDtiRatio}
                                    onChange={(e) => updateAffordabilityCalculator('defaultDtiRatio', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Range Limits</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Interest Rate Min (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={settings.affordabilityCalculator.interestRateMin}
                                    onChange={(e) => updateAffordabilityCalculator('interestRateMin', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Interest Rate Max (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={settings.affordabilityCalculator.interestRateMax}
                                    onChange={(e) => updateAffordabilityCalculator('interestRateMax', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Interest Rate Step
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={settings.affordabilityCalculator.interestRateStep}
                                    onChange={(e) => updateAffordabilityCalculator('interestRateStep', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    DTI Ratio Min (%)
                                </label>
                                <input
                                    type="number"
                                    value={settings.affordabilityCalculator.dtiRatioMin}
                                    onChange={(e) => updateAffordabilityCalculator('dtiRatioMin', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    DTI Ratio Max (%)
                                </label>
                                <input
                                    type="number"
                                    value={settings.affordabilityCalculator.dtiRatioMax}
                                    onChange={(e) => updateAffordabilityCalculator('dtiRatioMax', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    DTI Ratio Step
                                </label>
                                <input
                                    type="number"
                                    value={settings.affordabilityCalculator.dtiRatioStep}
                                    onChange={(e) => updateAffordabilityCalculator('dtiRatioStep', Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Loan Term Options</h3>
                        <p className="text-sm text-slate-600 mb-4">Available loan terms in the dropdown (in years)</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {settings.affordabilityCalculator.loanTermOptions.map((term, index) => (
                                <div key={index}>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Option {index + 1}
                                    </label>
                                    <input
                                        type="number"
                                        value={term}
                                        onChange={(e) => updateLoanTermOptions(index, Number(e.target.value), 'affordability')}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Display Settings Tab */}
            {activeTab === 'display' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Calculator Visibility</h3>
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                                <input
                                    type="checkbox"
                                    checked={settings.displaySettings.showPaymentCalculator}
                                    onChange={(e) => updateDisplaySettings('showPaymentCalculator', e.target.checked)}
                                    className="w-5 h-5 text-[#E76F51] rounded focus:ring-[#E76F51]"
                                />
                                <div>
                                    <div className="font-medium text-slate-800">Show Payment Calculator</div>
                                    <div className="text-sm text-slate-500">Display the mortgage payment calculator tab</div>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                                <input
                                    type="checkbox"
                                    checked={settings.displaySettings.showAffordabilityCalculator}
                                    onChange={(e) => updateDisplaySettings('showAffordabilityCalculator', e.target.checked)}
                                    className="w-5 h-5 text-[#E76F51] rounded focus:ring-[#E76F51]"
                                />
                                <div>
                                    <div className="font-medium text-slate-800">Show Affordability Calculator</div>
                                    <div className="text-sm text-slate-500">Display the home affordability calculator tab</div>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                                <input
                                    type="checkbox"
                                    checked={settings.displaySettings.showRefinanceCalculator}
                                    onChange={(e) => updateDisplaySettings('showRefinanceCalculator', e.target.checked)}
                                    className="w-5 h-5 text-[#E76F51] rounded focus:ring-[#E76F51]"
                                />
                                <div>
                                    <div className="font-medium text-slate-800">Show Refinance Calculator</div>
                                    <div className="text-sm text-slate-500">Display the refinance calculator tab (coming soon)</div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Tab Labels</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Payment Tab Label
                                </label>
                                <input
                                    type="text"
                                    value={settings.displaySettings.paymentTabLabel}
                                    onChange={(e) => updateDisplaySettings('paymentTabLabel', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Payment Calculator"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Affordability Tab Label
                                </label>
                                <input
                                    type="text"
                                    value={settings.displaySettings.affordabilityTabLabel}
                                    onChange={(e) => updateDisplaySettings('affordabilityTabLabel', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Affordability"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Refinance Tab Label
                                </label>
                                <input
                                    type="text"
                                    value={settings.displaySettings.refinanceTabLabel}
                                    onChange={(e) => updateDisplaySettings('refinanceTabLabel', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Refinance"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Save Button at Bottom */}
            <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                <button
                    onClick={handleReset}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 disabled:opacity-50"
                >
                    <RotateCcw size={18} />
                    Reset to Defaults
                </button>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#E76F51] text-white px-8 py-3 rounded-xl hover:bg-[#E76F51]/90 disabled:opacity-50 font-semibold"
                >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>
        </div>
    );
};

export default AdminCalculator;
