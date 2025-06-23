'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/app/i18n/client';
import StepSelector from './StepSelector';
import YearForm from './YearForm';
import TrialForm from './TrialForm';
import ConsentForm from './ConsentForm';
import ReviewAndSubmit from './ReviewAndSubmit';

export interface FormData {
    type: 'yearlong' | 'trial';
    memberTier?: 'junior' | 'adult' | 'supporter' | 'senior';
    memberInfo?: {
        name: string;
        dob: string;
        email: string;
        phone: string;
        address: string;
    };
    parentInfo?: {
        name: string;
        email: string;
        phone: string;
    };
    course?: string;
    canSwim?: boolean;
    notes?: string;
    paymentMethod?: 'cash' | 'card' | 'bank_transfer';
    consents: {
        internalRules: boolean;
        photo: boolean;
        covid: boolean;
        gdpr: boolean;
        parentApproval?: boolean;
    };
    isTrial: boolean;
}

interface RegistrationWrapperProps {
    lng: string;
}

const RegistrationWrapper: React.FC<RegistrationWrapperProps> = ({ lng }) => {
    const { t } = useTranslation(lng);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        type: 'yearlong',
        consents: {
            internalRules: false,
            photo: false,
            covid: false,
            gdpr: false,
        },
        isTrial: false,
    });

    const updateFormData = (newData: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const steps = [
        { number: 1, title: 'Membership Type', icon: '🏆' },
        { number: 2, title: 'Personal Info', icon: '👤' },
        { number: 3, title: 'Consents', icon: '📋' },
        { number: 4, title: 'Review & Submit', icon: '✅' }
    ];

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <StepSelector
                        lng={lng}
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={nextStep}
                    />
                );
            case 2:
                return formData.type === 'yearlong' ? (
                    <YearForm
                        lng={lng}
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                ) : (
                    <TrialForm
                        lng={lng}
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case 3:
                return (
                    <ConsentForm
                        lng={lng}
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case 4:
                return (
                    <ReviewAndSubmit
                        lng={lng}
                        formData={formData}
                        onPrev={prevStep}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 pt-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-6 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Join Our Sailing Academy
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Embark on your sailing journey with us. Choose your membership and get ready for amazing adventures on the water.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex justify-between items-center relative">
                        {/* Progress Line */}
                        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full z-0">
                            <div
                                className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                            ></div>
                        </div>

                        {/* Step Items */}
                        {steps.map((step) => (
                            <div key={step.number} className="relative z-10 flex flex-col items-center">
                                <div
                                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl transition-all duration-300 ${currentStep >= step.number
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-600 text-white shadow-lg scale-110'
                                            : 'bg-white border-gray-300 text-gray-400 shadow-md'
                                        }`}
                                >
                                    {currentStep > step.number ? '✓' : step.icon}
                                </div>
                                <div className="mt-3 text-center">
                                    <div className={`font-medium text-sm ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'}`}>
                                        Step {step.number}
                                    </div>
                                    <div className={`text-xs mt-1 ${currentStep >= step.number ? 'text-gray-700' : 'text-gray-400'}`}>
                                        {step.title}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-8 md:p-12">
                        {renderStep()}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-gray-500 text-sm">
                    Need help? Contact us at{' '}
                    <a href="mailto:info@sailingacademy.com" className="text-blue-600 hover:text-blue-700 font-medium">
                        info@sailingacademy.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RegistrationWrapper; 