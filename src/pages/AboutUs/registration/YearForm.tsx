'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from '@/app/i18n/client';
import { FormData } from './RegistrationWrapper';

interface YearFormProps {
    lng: string;
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const schema = yup.object({
    name: yup.string().required('Name is required'),
    dob: yup.string().required('Date of birth is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
    memberTier: yup.string().oneOf(['junior', 'adult', 'supporter', 'senior']).required('Member tier is required'),
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

const YearForm: React.FC<YearFormProps> = ({ lng, formData, updateFormData, onNext, onPrev }) => {
    const { t } = useTranslation(lng);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: formData.memberInfo?.name || '',
            dob: formData.memberInfo?.dob || '',
            email: formData.memberInfo?.email || '',
            phone: formData.memberInfo?.phone || '',
            address: formData.memberInfo?.address || '',
            memberTier: formData.memberTier || undefined,
            paymentMethod: formData.paymentMethod || undefined,
            parentName: formData.parentInfo?.name || '',
            parentEmail: formData.parentInfo?.email || '',
            parentPhone: formData.parentInfo?.phone || '',
            parentConsent: false
        }
    });

    const selectedTier = watch('memberTier');
    const isJunior = selectedTier === 'junior';

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
        onNext();
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Your Membership Details
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Tell us about yourself so we can create your perfect sailing membership
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Member Tier Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Select Member Tier
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: 'junior', label: 'Junior (under 18)', desc: 'For members under 18 years old' },
                            { value: 'adult', label: 'Adult (18-49)', desc: 'For members aged 18-49' },
                            { value: 'senior', label: 'Senior (50+)', desc: 'For members aged 50 and above' },
                            { value: 'supporter', label: 'Supporter', desc: 'Non-sailing supporters' }
                        ].map((tier) => (
                            <label key={tier.value} className="cursor-pointer">
                                <input
                                    type="radio"
                                    {...register('memberTier')}
                                    value={tier.value}
                                    className="sr-only"
                                />
                                <div className={`border-2 rounded-lg p-4 ${selectedTier === tier.value ? 'border-sailing-blue bg-blue-50' : 'border-gray-200'
                                    }`}>
                                    <div className="font-medium text-gray-900">{tier.label}</div>
                                    <div className="text-sm text-gray-600">{tier.desc}</div>
                                </div>
                            </label>
                        ))}
                    </div>
                    {errors.memberTier && (
                        <p className="mt-1 text-sm text-red-600">{errors.memberTier.message}</p>
                    )}
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            {...register('name')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sailing-blue focus:ring-sailing-blue"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            {...register('dob')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sailing-blue focus:ring-sailing-blue"
                        />
                        {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sailing-blue focus:ring-sailing-blue"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            {...register('phone')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sailing-blue focus:ring-sailing-blue"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Address</label>
                    <textarea
                        {...register('address')}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sailing-blue focus:ring-sailing-blue"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                </div>

                {/* Parent Information (only for junior) */}
                {isJunior && (
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Parent/Guardian Information</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Parent/Guardian Name</label>
                                <input
                                    type="text"
                                    {...register('parentName')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sailing-blue focus:ring-sailing-blue"
                                />
                                {errors.parentName && <p className="mt-1 text-sm text-red-600">{errors.parentName.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Parent Email</label>
                                    <input
                                        type="email"
                                        {...register('parentEmail')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sailing-blue focus:ring-sailing-blue"
                                    />
                                    {errors.parentEmail && <p className="mt-1 text-sm text-red-600">{errors.parentEmail.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Parent Phone</label>
                                    <input
                                        type="tel"
                                        {...register('parentPhone')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sailing-blue focus:ring-sailing-blue"
                                    />
                                    {errors.parentPhone && <p className="mt-1 text-sm text-red-600">{errors.parentPhone.message}</p>}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    {...register('parentConsent')}
                                    className="h-4 w-4 text-sailing-blue focus:ring-sailing-blue border-gray-300 rounded"
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
                <div>
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
                                    className="h-4 w-4 text-sailing-blue focus:ring-sailing-blue border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-900">{method.label}</span>
                            </label>
                        ))}
                    </div>
                    {errors.paymentMethod && <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>}
                </div>

                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={onPrev}
                        className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-all duration-200"
                    >
                        ← Previous
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        Continue to Consents
                    </button>
                </div>
            </form>
        </div>
    );
};

export default YearForm; 