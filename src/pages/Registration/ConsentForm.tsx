'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from '@/app/i18n/client';
import { FormData } from './RegistrationWrapper';

interface ConsentFormProps {
    lng: string;
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const schema = yup.object({
    internalRules: yup.boolean().oneOf([true], 'You must accept the Internal Club Rules'),
    photo: yup.boolean().oneOf([true], 'You must agree to Photo/Video usage'),
    covid: yup.boolean().oneOf([true], 'You must accept the Covid-19 safety rules'),
    gdpr: yup.boolean().oneOf([true], 'You must consent to GDPR data handling')
});

const ConsentForm: React.FC<ConsentFormProps> = ({ lng, formData, updateFormData, onNext, onPrev }) => {
    const { t } = useTranslation(lng);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            internalRules: formData.consents.internalRules,
            photo: formData.consents.photo,
            covid: formData.consents.covid,
            gdpr: formData.consents.gdpr
        }
    });

    const onSubmit = (data: any) => {
        updateFormData({
            consents: {
                ...formData.consents,
                internalRules: data.internalRules,
                photo: data.photo,
                covid: data.covid,
                gdpr: data.gdpr
            }
        });
        onNext();
    };

    const consentItems = [
        {
            name: 'internalRules',
            label: 'I accept the Internal Club Rules',
            description: 'By checking this box, I acknowledge that I have read and agree to abide by all internal club rules and regulations.'
        },
        {
            name: 'photo',
            label: 'I agree to Photo/Video usage',
            description: 'I consent to the use of photographs and videos taken during club activities for promotional and educational purposes.'
        },
        {
            name: 'covid',
            label: 'I understand and accept the Covid-19 safety rules',
            description: 'I agree to follow all health and safety protocols related to Covid-19 while participating in club activities.'
        },
        {
            name: 'gdpr',
            label: 'I consent to GDPR (Reg. 679/2016) data handling',
            description: 'I understand and consent to the collection, processing, and storage of my personal data in accordance with GDPR regulations.'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Required Consents
                </h2>
                <p className="text-gray-600">
                    Please read and accept all required consents to continue with your registration
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-6">
                    {consentItems.map((item) => (
                        <div key={item.name} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    {...register(item.name as any)}
                                    className="h-5 w-5 text-sailing-blue focus:ring-sailing-blue border-gray-300 rounded mt-1"
                                />
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-900">
                                        {item.label}
                                    </label>
                                    <p className="mt-1 text-sm text-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                            {errors[item.name as keyof typeof errors] && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors[item.name as keyof typeof errors]?.message}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">
                                Important Information
                            </h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <p>
                                    All consents are required to proceed with your membership registration.
                                    You can review our full terms and conditions on our website or contact us for more information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={onPrev}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                        Previous
                    </button>
                    <button
                        type="submit"
                        className="bg-sailing-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Continue to Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConsentForm; 