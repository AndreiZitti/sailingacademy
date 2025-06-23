'use client';

import React from 'react';
import { useTranslation } from '@/app/i18n/client';
import { FormData } from './RegistrationWrapper';

interface StepSelectorProps {
    lng: string;
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    onNext: () => void;
}

const StepSelector: React.FC<StepSelectorProps> = ({ lng, formData, updateFormData, onNext }) => {
    const { t } = useTranslation(lng);

    const handleSelection = (type: 'yearlong' | 'trial') => {
        updateFormData({
            type,
            isTrial: type === 'trial',
            // Reset fields when switching types
            memberTier: undefined,
            memberInfo: undefined,
            parentInfo: undefined,
            course: undefined,
            canSwim: undefined,
            notes: undefined,
            paymentMethod: undefined
        });
    };

    const handleNext = () => {
        onNext();
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Choose Your Adventure
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Select the membership option that best fits your sailing aspirations
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Year-long Membership Card */}
                <div
                    className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${formData.type === 'yearlong'
                        ? 'ring-4 ring-blue-500 shadow-2xl'
                        : 'hover:shadow-xl'
                        }`}
                    onClick={() => handleSelection('yearlong')}
                >
                    <div className={`p-8 h-full border-2 rounded-2xl transition-all duration-300 ${formData.type === 'yearlong'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}>
                        <div className="flex items-start space-x-4">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${formData.type === 'yearlong'
                                ? 'bg-blue-500'
                                : 'bg-gray-200 group-hover:bg-blue-100'
                                } transition-colors duration-300`}>
                                <input
                                    type="radio"
                                    name="membershipType"
                                    value="yearlong"
                                    checked={formData.type === 'yearlong'}
                                    onChange={() => handleSelection('yearlong')}
                                    className="sr-only"
                                />
                                {formData.type === 'yearlong' ? (
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                    </svg>
                                )}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Year-long Membership
                                </h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Full membership with access to all club facilities and activities.
                                    Choose from four membership tiers based on your age and involvement.
                                </p>

                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                        <span>Junior (under 18) - requires parent approval</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                        <span>Adult (18+)</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                        <span>Senior (50+)</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                        <span>Supporter (non-sailing supporters)</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-sm font-medium text-blue-600">Full access • Year-long</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trial Membership Card */}
                <div
                    className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${formData.type === 'trial'
                        ? 'ring-4 ring-cyan-500 shadow-2xl'
                        : 'hover:shadow-xl'
                        }`}
                    onClick={() => handleSelection('trial')}
                >
                    <div className={`p-8 h-full border-2 rounded-2xl transition-all duration-300 ${formData.type === 'trial'
                        ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-teal-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}>
                        <div className="flex items-start space-x-4">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${formData.type === 'trial'
                                ? 'bg-cyan-500'
                                : 'bg-gray-200 group-hover:bg-cyan-100'
                                } transition-colors duration-300`}>
                                <input
                                    type="radio"
                                    name="membershipType"
                                    value="trial"
                                    checked={formData.type === 'trial'}
                                    onChange={() => handleSelection('trial')}
                                    className="sr-only"
                                />
                                {formData.type === 'trial' ? (
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-gray-400 group-hover:text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                )}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    1-Month Trial Membership
                                </h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Perfect for newcomers to sailing. One-time trial period to experience
                                    our courses and facilities before committing to full membership.
                                </p>

                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                                        <span>1-month duration only</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                                        <span>For newcomers to sailing</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                                        <span>Not renewable</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                                        <span>Swimming ability required</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-sm font-medium text-cyan-600">Trial access • 1 month</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center pt-6">
                <button
                    onClick={handleNext}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    Continue to Next Step
                    <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default StepSelector;