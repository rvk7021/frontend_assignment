import React from 'react';
import { Edit2, Trash2, Users } from 'lucide-react';

const StudentList = ({
    paginatedStudents,
    filteredAndSortedStudents,
    students,
    handleEditStudent,
    handleDeleteStudent,
    resetFilters
}) => {
    if (filteredAndSortedStudents.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No students found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">Try adjusting your search or filters</p>
                <button
                    onClick={resetFilters}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
                >
                    Clear all filters
                </button>
            </div>
        );
    }

    return (
        <>
            {/* Results Info */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {filteredAndSortedStudents.length} of {students.length} students
                </p>
            </div>

            {/* Student List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedStudents.map((student) => (
                        <div key={student.rollNumber} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-400">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-6">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-1">{student.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{student.rollNumber}</p>
                                        </div>
                                        <div className="hidden sm:flex items-center gap-8 text-sm">
                                            <div className="text-center min-w-[80px]">
                                                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">Department</p>
                                                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{student.department}</p>
                                            </div>
                                            <div className="text-center min-w-[60px]">
                                                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">Year</p>
                                                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{student.year}</p>
                                            </div>
                                            <div className="text-center min-w-[60px]">
                                                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">CGPA</p>
                                                <p className={`font-bold text-base ${student.cgpa >= 9 ? 'text-emerald-600 dark:text-emerald-400' :
                                                    student.cgpa >= 8 ? 'text-blue-600 dark:text-blue-400' :
                                                        student.cgpa >= 7 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
                                                    }`}>
                                                    {student.cgpa}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Mobile view details */}
                                    <div className="sm:hidden mt-3 flex items-center gap-4 text-sm">
                                        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-200 font-medium">{student.department}</span>
                                        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-200 font-medium">Year {student.year}</span>
                                        <span className={`px-3 py-1 rounded-full font-semibold ${student.cgpa >= 9 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' :
                                            student.cgpa >= 8 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                                student.cgpa >= 7 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                            }`}>
                                            CGPA: {student.cgpa}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-6">
                                    <button
                                        onClick={() => handleEditStudent(student)}
                                        className="p-2.5 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 hover:scale-105"
                                        title="Edit Student"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteStudent(student.rollNumber)}
                                        className="p-2.5 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:scale-105"
                                        title="Delete Student"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default StudentList;
