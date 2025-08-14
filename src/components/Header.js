import React, { useState } from 'react';
import { Plus, CheckCircle } from 'lucide-react';
import { runTests } from '../utils/helpers';

const Header = ({ studentsCount, setIsAddModalOpen }) => {
    const [testStatus, setTestStatus] = useState('');

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
                    <h1 className="text-2xl font-semibold text-gray-900">Student Management</h1>
                    <p className="text-gray-600 text-sm mt-1">{studentsCount} total students</p>
                    {testStatus && (
                        <div className={`flex items-center gap-1 mt-2 text-sm ${testStatus.includes('passed') ? 'text-green-600' : 'text-red-600'
                            }`}>
                            <CheckCircle className="w-4 h-4" />
                            <span>{testStatus}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3">
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
