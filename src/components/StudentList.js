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
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                <p className="text-gray-600 mb-4 text-sm">Try adjusting your search or filters</p>
                <button
                    onClick={resetFilters}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
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
                <p className="text-sm text-gray-600">
                    Showing {filteredAndSortedStudents.length} of {students.length} students
                </p>
            </div>

            {/* Student List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="divide-y divide-gray-200">
                    {paginatedStudents.map((student) => (
                        <div key={student.rollNumber} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 text-sm">{student.name}</h3>
                                            <p className="text-xs text-gray-500 mt-0.5">{student.rollNumber}</p>
                                        </div>
                                        <div className="hidden sm:flex items-center gap-8 text-sm">
                                            <div className="text-center">
                                                <p className="text-gray-500 text-xs">Department</p>
                                                <p className="font-medium text-gray-900">{student.department}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-gray-500 text-xs">Year</p>
                                                <p className="font-medium text-gray-900">{student.year}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-gray-500 text-xs">CGPA</p>
                                                <p className={`font-medium ${student.cgpa >= 9 ? 'text-blue-600' :
                                                    student.cgpa >= 8 ? 'text-blue-500' :
                                                        student.cgpa >= 7 ? 'text-orange-500' : 'text-red-500'
                                                    }`}>
                                                    {student.cgpa}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Mobile view details */}
                                    <div className="sm:hidden mt-2 flex items-center gap-4 text-xs text-gray-600">
                                        <span>{student.department}</span>
                                        <span>Year {student.year}</span>
                                        <span className={`font-medium ${student.cgpa >= 9 ? 'text-blue-600' :
                                            student.cgpa >= 8 ? 'text-blue-500' :
                                                student.cgpa >= 7 ? 'text-orange-500' : 'text-red-500'
                                            }`}>
                                            CGPA: {student.cgpa}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 ml-4">
                                    <button
                                        onClick={() => handleEditStudent(student)}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteStudent(student.rollNumber)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
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
