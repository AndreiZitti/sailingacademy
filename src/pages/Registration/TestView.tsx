'use client';

import React, { useState } from 'react';
import { FormData } from './RegistrationWrapper';
import StepSelector from './StepSelector';
import YearForm from './YearForm';
import TrialForm from './TrialForm';
import ConsentForm from './ConsentForm';
import ReviewAndSubmit from './ReviewAndSubmit';

const TestView: React.FC = () => {
    const [currentComponent, setCurrentComponent] = useState('StepSelector');
    const [formData, setFormData] = useState<FormData>({
        type: 'yearlong',
        memberTier: 'adult',
        memberInfo: {
            name: 'John Doe',
            dob: '1990-05-15',
            email: 'john@example.com',
            phone: '+1234567890',
            address: '123 Main St, City, Country'
        },
        parentInfo: {
            name: 'Parent Doe',
            email: 'parent@example.com',
            phone: '+1234567891'
        },
        course: 'Beginner Sailing Course',
        canSwim: true,
        notes: 'Test notes for instructor',
        paymentMethod: 'card',
        consents: {
            internalRules: true,
            photo: true,
            covid: true,
            gdpr: true,
            parentApproval: true
        },
        isTrial: false,
    });

    const updateFormData = (newData: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const components = [
        { id: 'StepSelector', name: 'Step 1: Membership Type', icon: '🏆' },
        { id: 'YearForm', name: 'Step 2A: Year-long Form', icon: '👤' },
        { id: 'TrialForm', name: 'Step 2B: Trial Form', icon: '⛵' },
        { id: 'ConsentForm', name: 'Step 3: Consent Form', icon: '📋' },
        { id: 'ReviewAndSubmit', name: 'Step 4: Review & Submit', icon: '✅' }
    ];

    const renderComponent = () => {
        const mockProps = {
            lng: 'en',
            formData,
            updateFormData,
            onNext: () => console.log('Next clicked'),
            onPrev: () => console.log('Previous clicked')
        };

        switch (currentComponent) {
            case 'StepSelector':
                return <StepSelector {...mockProps} />;
            case 'YearForm':
                return <YearForm {...mockProps} />;
            case 'TrialForm':
                return <TrialForm {...mockProps} />;
            case 'ConsentForm':
                return <ConsentForm {...mockProps} />;
            case 'ReviewAndSubmit':
                return <ReviewAndSubmit lng="en" formData={formData} onPrev={() => console.log('Previous clicked')} />;
            default:
                return <div>Component not found</div>;
        }
    };

    const presetData = {
        yearlong: {
            type: 'yearlong' as const,
            memberTier: 'adult' as const,
            memberInfo: {
                name: 'John Doe',
                dob: '1990-05-15',
                email: 'john@example.com',
                phone: '+1234567890',
                address: '123 Main St, City, Country'
            },
            paymentMethod: 'card' as const,
            isTrial: false
        },
        junior: {
            type: 'yearlong' as const,
            memberTier: 'junior' as const,
            memberInfo: {
                name: 'Jane Smith',
                dob: '2010-03-20',
                email: 'jane@example.com',
                phone: '+1234567890',
                address: '456 Oak St, City, Country'
            },
            parentInfo: {
                name: 'Parent Smith',
                email: 'parent@example.com',
                phone: '+1234567891'
            },
            paymentMethod: 'bank_transfer' as const,
            isTrial: false
        },
        trial: {
            type: 'trial' as const,
            memberInfo: {
                name: 'Child Name',
                dob: '2015-08-10',
                email: '',
                phone: '',
                address: ''
            },
            parentInfo: {
                name: 'Parent Name',
                email: 'parent@example.com',
                phone: '+1234567892'
            },
            course: 'Beginner Sailing Course',
            canSwim: true,
            notes: 'Child is very excited about sailing!',
            isTrial: true
        }
    };

    const loadPreset = (preset: keyof typeof presetData) => {
        setFormData(prev => ({
            ...prev,
            ...presetData[preset],
            consents: prev.consents // Keep consents as they are
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Registration Components Test View
                    </h1>
                    <p className="text-xl text-gray-600">
                        Test and preview all registration components
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Controls */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Components</h3>

                            {/* Component Navigation */}
                            <div className="space-y-2 mb-6">
                                {components.map((comp) => (
                                    <button
                                        key={comp.id}
                                        onClick={() => setCurrentComponent(comp.id)}
                                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${currentComponent === comp.id
                                                ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <span className="text-lg mr-3">{comp.icon}</span>
                                            <div>
                                                <div className="font-medium text-sm">{comp.name}</div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Data Presets */}
                            <h4 className="text-md font-semibold text-gray-900 mb-3">Test Data Presets</h4>
                            <div className="space-y-2 mb-6">
                                <button
                                    onClick={() => loadPreset('yearlong')}
                                    className="w-full text-left p-2 rounded text-sm bg-green-50 text-green-700 hover:bg-green-100"
                                >
                                    🏆 Adult Year-long
                                </button>
                                <button
                                    onClick={() => loadPreset('junior')}
                                    className="w-full text-left p-2 rounded text-sm bg-blue-50 text-blue-700 hover:bg-blue-100"
                                >
                                    👶 Junior Year-long
                                </button>
                                <button
                                    onClick={() => loadPreset('trial')}
                                    className="w-full text-left p-2 rounded text-sm bg-purple-50 text-purple-700 hover:bg-purple-100"
                                >
                                    ⛵ Trial Membership
                                </button>
                            </div>

                            {/* Current Data Summary */}
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Current Data</h4>
                                <div className="text-xs text-gray-600 space-y-1">
                                    <div><strong>Type:</strong> {formData.type}</div>
                                    <div><strong>Tier:</strong> {formData.memberTier || 'N/A'}</div>
                                    <div><strong>Name:</strong> {formData.memberInfo?.name || 'N/A'}</div>
                                    <div><strong>Trial:</strong> {formData.isTrial ? 'Yes' : 'No'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Component Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4">
                                <h2 className="text-xl font-semibold text-white">
                                    {components.find(c => c.id === currentComponent)?.name}
                                </h2>
                            </div>

                            {/* Component Content */}
                            <div className="p-8">
                                {renderComponent()}
                            </div>
                        </div>

                        {/* Debug Panel */}
                        <div className="mt-6 bg-gray-900 rounded-2xl p-6 text-white">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <span className="mr-2">🐛</span>
                                Debug: Current Form Data
                            </h3>
                            <pre className="text-xs overflow-auto bg-gray-800 p-4 rounded-lg">
                                {JSON.stringify(formData, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestView; 