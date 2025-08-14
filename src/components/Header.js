import React, { useState } from 'react';
import { Plus, CheckCircle, Sun, Moon } from 'lucide-react';
import { runTests } from '../utils/helpers';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ studentsCount, setIsAddModalOpen }) => {
    const [testStatus, setTestStatus] = useState('');
    const { isDarkMode, toggleTheme } = useTheme();

    const handleRunTests = () => {
        const testsPassed = runTests();
        if (testsPassed) {
            setTestStatus('All tests passed');
            setTimeout(() => setTestStatus(''), 3000); // Clear message after 3 seconds
        } else {
            setTestStatus('Some tests failed - check console');
            setTimeout(() => setTestStatus(''), 3000);
        }
    };

    return (
        <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Student Management</h1>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{studentsCount} total students</p>
                    {testStatus && (
                        <div className={`flex items-center gap-1 mt-2 text-sm ${testStatus.includes('passed') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                            <CheckCircle className="w-4 h-4" />
                            <span>{testStatus}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                    >
                        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        {isDarkMode ? 'Light' : 'Dark'}
                    </button>
                    <button
                        onClick={handleRunTests}
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                        <CheckCircle className="w-4 h-4" />
                        Tests
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Add Student
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
