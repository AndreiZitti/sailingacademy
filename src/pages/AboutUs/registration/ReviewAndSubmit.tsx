'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { FormData } from './RegistrationWrapper';

interface ReviewAndSubmitProps {
    lng: string;
    formData: FormData;
    onPrev: () => void;
}

const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({ lng, formData, onPrev }) => {
    const { t } = useTranslation(lng);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // Here you would send the data to your backend
            const response = await fetch('/api/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error submitting registration:', error);
            alert('There was an error submitting your registration. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center space-y-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                    <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Registration Submitted Successfully!
                    </h2>
                    <p className="text-gray-600">
                        Thank you for registering with Sailing Academy. We will review your application and contact you soon.
                    </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Next Steps:</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Check your email for a confirmation message</li>
                        <li>• We will contact you within 2-3 business days</li>
                        <li>• Payment instructions will be provided upon approval</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Review Your Registration
                </h2>
                <p className="text-gray-600">
                    Please review all information before submitting your registration
                </p>
            </div>

            <div className="space-y-6">
                {/* Membership Type */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Membership Type</h3>
                    <p className="text-gray-700">
                        {formData.type === 'yearlong' ? 'Year-long Membership' : '1-Month Intro Course (for kids)'}
                    </p>
                    {formData.memberTier && (
                        <p className="text-sm text-gray-600">
                            Tier: {formData.memberTier.charAt(0).toUpperCase() + formData.memberTier.slice(1)}
                        </p>
                    )}
                </div>

                {/* Member Information */}
                {formData.memberInfo && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {formData.type === 'trial' ? 'Child Information' : 'Member Information'}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-medium">Name:</span> {formData.memberInfo.name}
                            </div>
                            <div>
                                <span className="font-medium">Date of Birth:</span> {formData.memberInfo.dob}
                            </div>
                            {formData.memberInfo.email && (
                                <div>
                                    <span className="font-medium">Email:</span> {formData.memberInfo.email}
                                </div>
                            )}
                            {formData.memberInfo.phone && (
                                <div>
                                    <span className="font-medium">Phone:</span> {formData.memberInfo.phone}
                                </div>
                            )}
                        </div>
                        {formData.memberInfo.address && (
                            <div className="mt-2 text-sm">
                                <span className="font-medium">Address:</span> {formData.memberInfo.address}
                            </div>
                        )}
                    </div>
                )}

                {/* Parent Information */}
                {formData.parentInfo && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Parent/Guardian Information</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-medium">Name:</span> {formData.parentInfo.name}
                            </div>
                            <div>
                                <span className="font-medium">Email:</span> {formData.parentInfo.email}
                            </div>
                            <div>
                                <span className="font-medium">Phone:</span> {formData.parentInfo.phone}
                            </div>
                        </div>
                    </div>
                )}

                {/* Trial-specific Information */}
                {formData.type === 'trial' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Course Information</h3>
                        <div className="text-sm space-y-1">
                            <div>
                                <span className="font-medium">Course:</span> {formData.course}
                            </div>
                            <div>
                                <span className="font-medium">Swimming Ability:</span> {formData.canSwim ? 'Confirmed' : 'Not confirmed'}
                            </div>
                            {formData.notes && (
                                <div>
                                    <span className="font-medium">Notes:</span> {formData.notes}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Payment Method */}
                {formData.paymentMethod && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Method</h3>
                        <p className="text-sm text-gray-700">
                            {formData.paymentMethod === 'cash' && 'Cash Payment'}
                            {formData.paymentMethod === 'card' && 'Credit/Debit Card'}
                            {formData.paymentMethod === 'bank_transfer' && 'Bank Transfer'}
                        </p>
                    </div>
                )}

                {/* Consents */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Consents</h3>
                    <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                            <span className="text-green-600 mr-2">✓</span>
                            Internal Club Rules accepted
                        </div>
                        <div className="flex items-center">
                            <span className="text-green-600 mr-2">✓</span>
                            Photo/Video usage agreed
                        </div>
                        <div className="flex items-center">
                            <span className="text-green-600 mr-2">✓</span>
                            Covid-19 safety rules accepted
                        </div>
                        <div className="flex items-center">
                            <span className="text-green-600 mr-2">✓</span>
                            GDPR data handling consented
                        </div>
                        {formData.consents.parentApproval && (
                            <div className="flex items-center">
                                <span className="text-green-600 mr-2">✓</span>
                                Parent approval given
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={onPrev}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    disabled={isSubmitting}
                >
                    Previous
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-sailing-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
            </div>
        </div>
    );
};

export default ReviewAndSubmit; 