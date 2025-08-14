import React, { useState, useMemo } from 'react';

// Import components
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import SearchAndFilters from './components/SearchAndFilters';
import StudentList from './components/StudentList';
import Pagination from './components/Pagination';
import AddStudentModal from './components/AddStudentModal';
import EditStudentModal from './components/EditStudentModal';

// Import hooks
import { useToast } from './hooks/useToast';

// Import data and utilities
import { sampleStudents } from './data/sampleStudents';
import { fuzzySearchStudents } from './utils/helpers';

function App() {
  const [students, setStudents] = useState(sampleStudents);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [cgpaSort, setCgpaSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  const { showToast, ToastComponent } = useToast();

  // Apply search and filters
  const filteredAndSortedStudents = useMemo(() => {
    let result = [...students];

    if (searchQuery) {
      result = fuzzySearchStudents(result, searchQuery);
    }

    if (departmentFilter) {
      result = result.filter(student => student.department === departmentFilter);
    }

    if (yearFilter) {
      result = result.filter(student => student.year.toString() === yearFilter);
    }

    if (cgpaSort === 'high') {
      result.sort((a, b) => b.cgpa - a.cgpa);
    } else if (cgpaSort === 'low') {
      result.sort((a, b) => a.cgpa - b.cgpa);
    }

    return result;
  }, [students, searchQuery, departmentFilter, yearFilter, cgpaSort]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedStudents.length / itemsPerPage);
  const paginatedStudents = filteredAndSortedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, departmentFilter, yearFilter, cgpaSort]);

  const handleSaveStudent = (studentData) => {
    setStudents(prev => [...prev, studentData]);
    setIsAddModalOpen(false);
    showToast(`${studentData.name} has been added successfully!`, 'success');
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };

  const handleUpdateStudent = (updatedStudentData) => {
    setStudents(prev =>
      prev.map(student =>
        student.rollNumber === editingStudent.rollNumber ? updatedStudentData : student
      )
    );
    setEditingStudent(null);
    setIsEditModalOpen(false);
    showToast(`${updatedStudentData.name} has been updated successfully!`, 'success');
  };

  const handleDeleteStudent = (rollNumber) => {
    const studentToDelete = students.find(s => s.rollNumber === rollNumber);
    if (window.confirm(`Are you sure you want to delete ${studentToDelete?.name}? This action cannot be undone.`)) {
      setStudents(prev => prev.filter(student => student.rollNumber !== rollNumber));
      showToast(`${studentToDelete?.name} has been deleted successfully!`, 'success');
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('');
    setYearFilter('');
    setCgpaSort('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <Header 
          studentsCount={students.length}
          setIsAddModalOpen={setIsAddModalOpen}
        />

        {/* Stats Cards */}
        <StatsCards students={students} />

        {/* Search and Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          cgpaSort={cgpaSort}
          setCgpaSort={setCgpaSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          resetFilters={resetFilters}
        />

        {/* Student List */}
        <StudentList
          paginatedStudents={paginatedStudents}
          filteredAndSortedStudents={filteredAndSortedStudents}
          students={students}
          handleEditStudent={handleEditStudent}
          handleDeleteStudent={handleDeleteStudent}
          resetFilters={resetFilters}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Modals */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveStudent}
        students={students}
      />

      <EditStudentModal
        student={editingStudent}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateStudent}
        students={students}
      />

      {/* Toast Notifications */}
      <ToastComponent />
    </div>
  );
}

export default App;
