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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                type={type}
                className={`w-full px-4 py-3 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 ${error
                        ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:bg-white dark:focus:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    } ${className}`}
                {...props}
            />
            {helpText && !error && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{helpText}</p>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                <select
                    className={`w-full px-4 py-3 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer dark:bg-gray-700 dark:text-white dark:border-gray-600 ${error
                            ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20 focus:ring-red-500'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        } ${className}`}
                    {...props}
                >
                    {children}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
