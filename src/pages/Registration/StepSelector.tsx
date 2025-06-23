'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from '@/app/i18n/client';
import { FormData } from './RegistrationWrapper';

interface StepSelectorProps {
    lng: string;
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    onNext: () => void;
}

// Define validation schemas for both types
const yearLongSchema = yup.object({
    memberTier: yup.string().oneOf(['junior', 'adult', 'supporter', 'senior']).required('Member tier is required'),
    name: yup.string().required('Name is required'),
    dob: yup.string().required('Date of birth is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
    paymentMethod: yup.string().oneOf(['cash', 'card', 'bank_transfer']).required('Payment method is required'),
    parentName: yup.string().when('memberTier', {
        is: 'junior',
        then: (schema) => schema.required('Parent name is required for junior members'),
        otherwise: (schema) => schema.notRequired()
    }),
    parentEmail: yup.string().when('memberTier', {
        is: 'junior',
        then: (schema) => schema.email('Invalid email').required('Parent email is required for junior members'),
        otherwise: (schema) => schema.notRequired()
    }),
    parentPhone: yup.string().when('memberTier', {
        is: 'junior',
        then: (schema) => schema.required('Parent phone is required for junior members'),
        otherwise: (schema) => schema.notRequired()
    }),
    parentConsent: yup.boolean().when('memberTier', {
        is: 'junior',
        then: (schema) => schema.oneOf([true], 'Parent consent is required'),
        otherwise: (schema) => schema.notRequired()
    })
});

const trialSchema = yup.object({
    parentName: yup.string().required('Parent name is required'),
    parentEmail: yup.string().email('Invalid email').required('Parent email is required'),
    parentPhone: yup.string().required('Parent phone is required'),
    childName: yup.string().required('Child name is required'),
    childDob: yup.string().required('Child date of birth is required'),
    course: yup.string().required('Course name is required'),
    canSwim: yup.boolean().oneOf([true], 'Swimming ability confirmation is required'),
    notes: yup.string()
});

const StepSelector: React.FC<StepSelectorProps> = ({ lng, formData, updateFormData, onNext }) => {
    const { t } = useTranslation(lng);
    const [showMembershipTiers, setShowMembershipTiers] = useState(formData.type === 'yearlong');
    const [showPersonalInfo, setShowPersonalInfo] = useState(
        (formData.type === 'yearlong' && formData.memberTier) || formData.type === 'trial'
    );

    const membershipTiers = [
        {
            value: 'junior',
            label: 'Junior (under 18)',
            desc: 'For members under 18 years old',
            details: 'Includes access to youth programs, requires parent approval, and special coaching for young sailors.'
        },
        {
            value: 'adult',
            label: 'Adult (18-49)',
            desc: 'For members aged 18-49',
            details: 'Full access to all club facilities, racing events, and adult training programs.'
        },
        {
            value: 'senior',
            label: 'Senior (50+)',
            desc: 'For members aged 50 and above',
            details: 'Includes all adult benefits plus special senior events and priority booking for courses.'
        },
        {
            value: 'supporter',
            label: 'Supporter',
            desc: 'Non-sailing supporters',
            details: 'Perfect for those who want to support the club without actively sailing. Includes social events and club access.'
        }
    ];

    // Setup form with dynamic schema
    const currentSchema = formData.type === 'yearlong' ? yearLongSchema : trialSchema;
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: yupResolver(currentSchema),
        defaultValues: {
            // Year-long form defaults
            name: formData.memberInfo?.name || '',
            dob: formData.memberInfo?.dob || '',
            email: formData.memberInfo?.email || '',
            phone: formData.memberInfo?.phone || '',
            address: formData.memberInfo?.address || '',
            memberTier: formData.memberTier || '',
            paymentMethod: formData.paymentMethod || '',
            parentName: formData.parentInfo?.name || '',
            parentEmail: formData.parentInfo?.email || '',
            parentPhone: formData.parentInfo?.phone || '',
            parentConsent: false,
            // Trial form defaults
            childName: formData.memberInfo?.name || '',
            childDob: formData.memberInfo?.dob || '',
            course: formData.course || '',
            canSwim: formData.canSwim || false,
            notes: formData.notes || ''
        }
    });

    const selectedTier = watch('memberTier');
    const isJunior = selectedTier === 'junior';

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

        setShowMembershipTiers(type === 'yearlong');
        setShowPersonalInfo(type === 'trial');

        // Reset form when switching types
        reset();
    };

    const handleMemberTierSelection = (tier: string) => {
        updateFormData({
            memberTier: tier as 'junior' | 'adult' | 'supporter' | 'senior'
        });
        setShowPersonalInfo(true);
    };

    // Calculate age from date of birth
    const calculateAge = (dob: string) => {
        if (!dob) return 0;
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const onSubmit = (data: any) => {
        if (formData.type === 'yearlong') {
            const age = calculateAge(data.dob);

            // Validate age against selected tier
            if (data.memberTier === 'junior' && age >= 18) {
                alert('Junior membership is only for those under 18 years old');
                return;
            }
            if (data.memberTier === 'adult' && (age < 18 || age >= 50)) {
                alert('Adult membership is for ages 18-49');
                return;
            }
            if (data.memberTier === 'senior' && age < 50) {
                alert('Senior membership is for ages 50+');
                return;
            }

            updateFormData({
                memberTier: data.memberTier,
                memberInfo: {
                    name: data.name,
                    dob: data.dob,
                    email: data.email,
                    phone: data.phone,
                    address: data.address
                },
                parentInfo: isJunior ? {
                    name: data.parentName,
                    email: data.parentEmail,
                    phone: data.parentPhone
                } : undefined,
                paymentMethod: data.paymentMethod,
                consents: {
                    ...formData.consents,
                    parentApproval: isJunior ? data.parentConsent : undefined
                }
            });
        } else {
            // Trial form submission
            updateFormData({
                parentInfo: {
                    name: data.parentName,
                    email: data.parentEmail,
                    phone: data.parentPhone
                },
                memberInfo: {
                    name: data.childName,
                    dob: data.childDob,
                    email: '',
                    phone: '',
                    address: ''
                },
                course: data.course,
                canSwim: data.canSwim,
                notes: data.notes
            });
        }
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
                                    1-Month Intro Course (for kids)
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

            {/* Membership Tiers Selection - Shows when year-long is selected */}
            {showMembershipTiers && formData.type === 'yearlong' && (
                <div className="transition-all duration-500 ease-in-out">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                            Choose Your Membership Tier
                        </h3>
                        <p className="text-gray-600 text-center mb-6">
                            Select the membership tier that matches your age and sailing goals
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {membershipTiers.map((tier) => (
                                <div
                                    key={tier.value}
                                    className={`cursor-pointer group transition-all duration-300 ${formData.memberTier === tier.value
                                        ? 'transform scale-105'
                                        : 'hover:transform hover:scale-102'
                                        }`}
                                    onClick={() => handleMemberTierSelection(tier.value)}
                                >
                                    <div className={`border-2 rounded-xl p-6 transition-all duration-300 ${formData.memberTier === tier.value
                                        ? 'border-blue-500 bg-white shadow-lg ring-2 ring-blue-200'
                                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                                        }`}>
                                        <div className="flex items-start space-x-4">
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${formData.memberTier === tier.value
                                                ? 'bg-blue-500'
                                                : 'bg-gray-200 group-hover:bg-blue-100'
                                                }`}>
                                                {formData.memberTier === tier.value ? (
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900 mb-1">{tier.label}</h4>
                                                <p className="text-sm text-gray-600 mb-2">{tier.desc}</p>
                                                <p className="text-xs text-gray-500 leading-relaxed">{tier.details}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Personal Information Form - Shows after membership type/tier selection */}
            {showPersonalInfo && (
                <form onSubmit={handleSubmit(onSubmit)} className="transition-all duration-500 ease-in-out">
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                            {formData.type === 'yearlong' ? 'Your Membership Details' : 'Trial Course Information'}
                        </h3>
                        <p className="text-gray-600 text-center mb-6">
                            {formData.type === 'yearlong'
                                ? 'Tell us about yourself so we can create your perfect sailing membership'
                                : 'Please provide parent and child information for the trial membership'
                            }
                        </p>

                        {formData.type === 'yearlong' ? (
                            // Year-long membership form
                            <div className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input
                                            type="text"
                                            {...register('name')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                        <input
                                            type="date"
                                            {...register('dob')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            {...register('email')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            type="tel"
                                            {...register('phone')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Address</label>
                                    <textarea
                                        {...register('address')}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                                </div>

                                {/* Parent Information (only for junior) */}
                                {isJunior && (
                                    <div className="border-t pt-6">
                                        <h4 className="text-lg font-medium text-gray-900 mb-4">Parent/Guardian Information</h4>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Parent/Guardian Name</label>
                                                <input
                                                    type="text"
                                                    {...register('parentName')}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                {errors.parentName && <p className="mt-1 text-sm text-red-600">{errors.parentName.message}</p>}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Parent Email</label>
                                                    <input
                                                        type="email"
                                                        {...register('parentEmail')}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                    {errors.parentEmail && <p className="mt-1 text-sm text-red-600">{errors.parentEmail.message}</p>}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Parent Phone</label>
                                                    <input
                                                        type="tel"
                                                        {...register('parentPhone')}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                    {errors.parentPhone && <p className="mt-1 text-sm text-red-600">{errors.parentPhone.message}</p>}
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    {...register('parentConsent')}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label className="ml-2 block text-sm text-gray-900">
                                                    I, the parent/legal guardian, give my consent for this membership
                                                </label>
                                            </div>
                                            {errors.parentConsent && <p className="mt-1 text-sm text-red-600">{errors.parentConsent.message}</p>}
                                        </div>
                                    </div>
                                )}

                                {/* Payment Method */}
                                <div className="border-t pt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                                    <div className="space-y-2">
                                        {[
                                            { value: 'cash', label: 'Cash Payment' },
                                            { value: 'card', label: 'Credit/Debit Card' },
                                            { value: 'bank_transfer', label: 'Bank Transfer' }
                                        ].map((method) => (
                                            <label key={method.value} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    {...register('paymentMethod')}
                                                    value={method.value}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                />
                                                <span className="ml-2 text-sm text-gray-900">{method.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.paymentMethod && <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>}
                                </div>
                            </div>
                        ) : (
                            // Trial membership form
                            <div className="space-y-6">
                                {/* Parent Information */}
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900 mb-4">Parent/Guardian Information</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Parent/Guardian Name</label>
                                            <input
                                                type="text"
                                                {...register('parentName')}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                            />
                                            {errors.parentName && <p className="mt-1 text-sm text-red-600">{errors.parentName.message}</p>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Parent Email</label>
                                                <input
                                                    type="email"
                                                    {...register('parentEmail')}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                                />
                                                {errors.parentEmail && <p className="mt-1 text-sm text-red-600">{errors.parentEmail.message}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Parent Phone</label>
                                                <input
                                                    type="tel"
                                                    {...register('parentPhone')}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                                />
                                                {errors.parentPhone && <p className="mt-1 text-sm text-red-600">{errors.parentPhone.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Child Information */}
                                <div className="border-t pt-6">
                                    <h4 className="text-lg font-medium text-gray-900 mb-4">Child Information</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Child Name</label>
                                            <input
                                                type="text"
                                                {...register('childName')}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                            />
                                            {errors.childName && <p className="mt-1 text-sm text-red-600">{errors.childName.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Child Date of Birth</label>
                                            <input
                                                type="date"
                                                {...register('childDob')}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                            />
                                            {errors.childDob && <p className="mt-1 text-sm text-red-600">{errors.childDob.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Course Information */}
                                <div className="border-t pt-6">
                                    <h4 className="text-lg font-medium text-gray-900 mb-4">Course Information</h4>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Course Name</label>
                                        <input
                                            type="text"
                                            {...register('course')}
                                            placeholder="e.g., Beginner Sailing Course"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                        />
                                        {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course.message}</p>}
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                {...register('canSwim')}
                                                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                                            />
                                            <label className="ml-2 block text-sm text-gray-900">
                                                My child can swim and is medically fit for sailing activities
                                            </label>
                                        </div>
                                        {errors.canSwim && <p className="mt-1 text-sm text-red-600">{errors.canSwim.message}</p>}
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">Notes for Instructor (Optional)</label>
                                        <textarea
                                            {...register('notes')}
                                            rows={3}
                                            placeholder="Any additional information about your child that might be helpful for the instructor..."
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-center pt-8">
                            <button
                                type="submit"
                                className={`px-8 py-4 font-semibold rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-white ${formData.type === 'yearlong'
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                                    : 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700'
                                    }`}
                            >
                                Continue to Consents
                                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default StepSelector;