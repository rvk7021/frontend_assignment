import React from 'react';
import { Plus } from 'lucide-react';

const Header = ({ studentsCount, setIsAddModalOpen }) => {
    return (
        <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Student Management</h1>
                    <p className="text-gray-600 text-sm mt-1">{studentsCount} total students</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Add Student
                </button>
            </div>
        </div>
    );
};

export default Header;
