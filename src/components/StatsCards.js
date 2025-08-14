import React from 'react';
import { Users, TrendingUp, GraduationCap } from 'lucide-react';

const StatsCards = ({ students }) => {
    // Statistics
    const avgCgpa = students.reduce((sum, s) => sum + s.cgpa, 0) / students.length;
    const departmentCounts = students.reduce((acc, s) => {
        acc[s.department] = (acc[s.department] || 0) + 1;
        return acc;
    }, {});
    const topDept = Object.entries(departmentCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{students.length}</p>
                    </div>
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Average CGPA</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{avgCgpa.toFixed(1)}</p>
                    </div>
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Top Department</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{topDept}</p>
                    </div>
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;
