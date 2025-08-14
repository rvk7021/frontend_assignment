import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

// Toast Hook
export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    };

    const ToastComponent = () => (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 text-sm flex items-center gap-2 ${toast.type === 'success'
                        ? 'bg-green-600 text-white'
                        : 'bg-red-500 text-white'
                        }`}
                >
                    {toast.type === 'success' ? (
                        <CheckCircle className="w-4 h-4" />
                    ) : (
                        <AlertCircle className="w-4 h-4" />
                    )}
                    {toast.message}
                </div>
            ))}
        </div>
    );

    return { showToast, ToastComponent };
};
