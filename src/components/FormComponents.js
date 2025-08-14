import React from 'react';
import { AlertCircle } from 'lucide-react';

// Form Input Component
export const FormInput = ({
    label,
    error,
    required = false,
    type = 'text',
    className = '',
    helpText = '',
    ...props
}) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                type={type}
                className={`w-full px-4 py-3 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error
                        ? 'border-red-300 bg-red-50 focus:ring-red-500'
                        : 'border-gray-300 focus:bg-white hover:border-gray-400'
                    } ${className}`}
                {...props}
            />
            {helpText && !error && (
                <p className="text-xs text-gray-500">{helpText}</p>
            )}
            {error && (
                <div className="flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

// Form Select Component
export const FormSelect = ({
    label,
    error,
    required = false,
    children,
    className = '',
    helpText = '',
    ...props
}) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                <select
                    className={`w-full px-4 py-3 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer ${error
                            ? 'border-red-300 bg-red-50 focus:ring-red-500'
                            : 'border-gray-300 bg-white focus:bg-white hover:border-gray-400'
                        } ${className}`}
                    {...props}
                >
                    {children}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {helpText && !error && (
                <p className="text-xs text-gray-500">{helpText}</p>
            )}
            {error && (
                <div className="flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};
