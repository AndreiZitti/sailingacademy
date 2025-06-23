'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from '@/app/i18n/client';
import { FormData } from './RegistrationWrapper';

interface TrialFormProps {
    lng: string;
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const schema = yup.object({
    parentName: yup.string().required('Parent name is required'),
    parentEmail: yup.string().email('Invalid email').required('Parent email is required'),
    parentPhone: yup.string().required('Parent phone is required'),
    childName: yup.string().required('Child name is required'),
    childDob: yup.string().required('Child date of birth is required'),
    course: yup.string().required('Course name is required'),
    canSwim: yup.boolean().oneOf([true], 'Swimming ability confirmation is required'),
    notes: yup.string()
});

const TrialForm: React.FC<TrialFormProps> = ({ lng, formData, updateFormData, onNext, onPrev }) => {
    const { t } = useTranslation(lng);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            parentName: formData.parentInfo?.name || '',
            parentEmail: formData.parentInfo?.email || '',
            parentPhone: formData.parentInfo?.phone || '',
            childName: formData.memberInfo?.name || '',
            childDob: formData.memberInfo?.dob || '',
            course: formData.course || '',
            canSwim: formData.canSwim || false,
            notes: formData.notes || ''
        }
    });

    const onSubmit = (data: any) => {
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
        onNext();
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Trial Membership Information
                </h2>
                <p className="text-gray-600">
                    Please provide parent and child information for the trial membership
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Parent Information */}
                <div>
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
                    </div>
                </div>

                {/* Child Information */}
                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Child Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Child Name</label>
                            <input
                                type="text"
                                {...register('childName')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sailing-blue focus:ring-sailing-blue"
                            />
                            {errors.childName && <p className="mt-1 text-sm text-red-600">{errors.childName.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Child Date of Birth</label>
                            <input
                                type="date"
                                {...register('childDob')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sailing-blue focus:ring-sailing-blue"
                            />
                            {errors.childDob && <p className="mt-1 text-sm text-red-600">{errors.childDob.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Course Information */}
                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Course Information</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Name</label>
                        <input
                            type="text"
                            {...register('course')}
                            placeholder="e.g., Beginner Sailing Course"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sailing-blue focus:ring-sailing-blue"
                        />
                        {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course.message}</p>}
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                {...register('canSwim')}
                                className="h-4 w-4 text-sailing-blue focus:ring-sailing-blue border-gray-300 rounded"
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sailing-blue focus:ring-sailing-blue"
                        />
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
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TrialForm; 