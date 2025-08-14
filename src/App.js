import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, Users, GraduationCap, TrendingUp, Edit2, Trash2, X, ChevronLeft, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';

// Sample data with Indian names
const sampleStudents = [
  { rollNumber: 'CSE2025-001', name: 'Arjun Sharma', department: 'CSE', year: 2, cgpa: 8.5 },
  { rollNumber: 'ECE2024-002', name: 'Priya Patel', department: 'ECE', year: 3, cgpa: 9.2 },
  { rollNumber: 'ME2023-003', name: 'Rahul Gupta', department: 'ME', year: 4, cgpa: 7.8 },
  { rollNumber: 'CE2025-004', name: 'Kavya Reddy', department: 'CE', year: 1, cgpa: 8.9 },
  { rollNumber: 'EE2024-005', name: 'Vikram Singh', department: 'EE', year: 2, cgpa: 9.5 },
  { rollNumber: 'CSE2023-006', name: 'Sneha Agarwal', department: 'CSE', year: 4, cgpa: 6.7 },
  { rollNumber: 'ECE2025-007', name: 'Karan Joshi', department: 'ECE', year: 1, cgpa: 8.1 },
  { rollNumber: 'ME2024-008', name: 'Nisha Kumari', department: 'ME', year: 3, cgpa: 7.5 },
  { rollNumber: 'CSE2025-009', name: 'Rohan Verma', department: 'CSE', year: 2, cgpa: 9.1 },
  { rollNumber: 'EE2024-010', name: 'Ananya Das', department: 'EE', year: 3, cgpa: 8.3 },
  { rollNumber: 'ME2023-011', name: 'Siddharth Rao', department: 'ME', year: 4, cgpa: 7.9 },
  { rollNumber: 'CE2025-012', name: 'Ishita Bansal', department: 'CE', year: 1, cgpa: 8.7 },
  { rollNumber: 'CSE2024-013', name: 'Deepak Kumar', department: 'CSE', year: 3, cgpa: 8.8 },
  { rollNumber: 'ECE2023-014', name: 'Riya Mehta', department: 'ECE', year: 4, cgpa: 9.0 },
  { rollNumber: 'ME2025-015', name: 'Aarav Mishra', department: 'ME', year: 1, cgpa: 8.2 }
];

// Fuzzy search function
const fuzzySearchStudents = (students, query) => {
  if (!query) return students;
  const lowerQuery = query.toLowerCase();
  return students.filter(student =>
    student.name.toLowerCase().includes(lowerQuery) ||
    student.rollNumber.toLowerCase().includes(lowerQuery) ||
    student.department.toLowerCase().includes(lowerQuery)
  );
};

// Form validation
const validateForm = (formData, isEdit = false, students = []) => {
  const errors = {};
  
  if (!formData.rollNumber.trim()) {
    errors.rollNumber = 'Roll number is required';
  } else if (!isEdit && students.some(s => s.rollNumber === formData.rollNumber)) {
    errors.rollNumber = 'Roll number already exists';
  } else if (!/^[A-Z]{2,3}\d{4}-\d{3}$/.test(formData.rollNumber)) {
    errors.rollNumber = 'Roll number format: ABC2024-001';
  }
  
  if (!formData.name.trim()) {
    errors.name = 'Student name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
    errors.name = 'Name can only contain letters and spaces';
  }
  
  if (!formData.department) {
    errors.department = 'Department is required';
  }
  
  if (!formData.year) {
    errors.year = 'Year is required';
  }
  
  if (!formData.cgpa) {
    errors.cgpa = 'CGPA is required';
  } else {
    const cgpa = parseFloat(formData.cgpa);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
      errors.cgpa = 'CGPA must be between 0 and 10';
    }
  }
  
  return errors;
};

// Toast Hook
const useToast = () => {
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

// Modal Component
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
        <div className={`relative w-full ${sizeClasses[size]} rounded-xl bg-white p-6 shadow-2xl border border-gray-200 transform transition-all`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

// Form Input Component
const FormInput = ({ 
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
        className={`w-full px-4 py-3 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error 
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
const FormSelect = ({ 
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
          className={`w-full px-4 py-3 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer ${
            error 
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

// Add Student Modal
const AddStudentModal = ({ isOpen, onClose, onSave, students }) => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    department: 'CSE',
    year: 1,
    cgpa: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, false, students);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSave({
      ...formData,
      name: formData.name.trim(),
      year: parseInt(formData.year),
      cgpa: parseFloat(formData.cgpa)
    });
    
    // Reset form
    setFormData({ rollNumber: '', name: '', department: 'CSE', year: 1, cgpa: '' });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ rollNumber: '', name: '', department: 'CSE', year: 1, cgpa: '' });
      setErrors({});
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Student" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Roll Number"
            required
            value={formData.rollNumber}
            onChange={(e) => handleInputChange('rollNumber', e.target.value.toUpperCase())}
            placeholder="CSE2025-001"
            error={errors.rollNumber}
            helpText="Format: ABC2024-001"
            disabled={isSubmitting}
          />
          
          <FormInput
            label="Student Name"
            required
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter full name"
            error={errors.name}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect
            label="Department"
            required
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            error={errors.department}
            disabled={isSubmitting}
          >
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
            <option value="ME">Mechanical</option>
            <option value="CE">Civil</option>
            <option value="EE">Electrical</option>
          </FormSelect>

          <FormSelect
            label="Academic Year"
            required
            value={formData.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            error={errors.year}
            disabled={isSubmitting}
          >
            <option value={1}>1st Year</option>
            <option value={2}>2nd Year</option>
            <option value={3}>3rd Year</option>
            <option value={4}>4th Year</option>
          </FormSelect>

          <FormInput
            label="CGPA"
            type="number"
            step="0.1"
            min="0"
            max="10"
            required
            value={formData.cgpa}
            onChange={(e) => handleInputChange('cgpa', e.target.value)}
            placeholder="0.0"
            error={errors.cgpa}
            helpText="Scale: 0.0 to 10.0"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Student
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Edit Student Modal
const EditStudentModal = ({ student, isOpen, onClose, onSave, students }) => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    department: 'CSE',
    year: 1,
    cgpa: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  React.useEffect(() => {
    if (student) {
      const newFormData = {
        rollNumber: student.rollNumber,
        name: student.name,
        department: student.department,
        year: student.year,
        cgpa: student.cgpa.toString()
      };
      setFormData(newFormData);
      setHasChanges(false);
      setErrors({});
    }
  }, [student]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, true, students);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSave({
      ...formData,
      name: formData.name.trim(),
      year: parseInt(formData.year),
      cgpa: parseFloat(formData.cgpa)
    });
    
    setErrors({});
    setIsSubmitting(false);
    setHasChanges(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      if (hasChanges) {
        if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
          setErrors({});
          setHasChanges(false);
          onClose();
        }
      } else {
        onClose();
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Student" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Roll Number"
            value={formData.rollNumber}
            disabled
            className="bg-gray-50 text-gray-500 cursor-not-allowed"
            helpText="Roll number cannot be changed"
          />
          
          <FormInput
            label="Student Name"
            required
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter full name"
            error={errors.name}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect
            label="Department"
            required
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            error={errors.department}
            disabled={isSubmitting}
          >
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
            <option value="ME">Mechanical</option>
            <option value="CE">Civil</option>
            <option value="EE">Electrical</option>
          </FormSelect>

          <FormSelect
            label="Academic Year"
            required
            value={formData.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            error={errors.year}
            disabled={isSubmitting}
          >
            <option value={1}>1st Year</option>
            <option value={2}>2nd Year</option>
            <option value={3}>3rd Year</option>
            <option value={4}>4th Year</option>
          </FormSelect>

          <FormInput
            label="CGPA"
            type="number"
            step="0.1"
            min="0"
            max="10"
            required
            value={formData.cgpa}
            onChange={(e) => handleInputChange('cgpa', e.target.value)}
            placeholder="0.0"
            error={errors.cgpa}
            helpText="Scale: 0.0 to 10.0"
            disabled={isSubmitting}
          />
        </div>

        {hasChanges && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-amber-800 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>You have unsaved changes</span>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !hasChanges}
            className="flex-1 px-4 py-3 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Update Student
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

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

  // Statistics
  const avgCgpa = students.reduce((sum, s) => sum + s.cgpa, 0) / students.length;
  const departmentCounts = students.reduce((acc, s) => {
    acc[s.department] = (acc[s.department] || 0) + 1;
    return acc;
  }, {});
  const topDept = Object.entries(departmentCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];

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
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Student Management</h1>
              <p className="text-gray-600 text-sm mt-1">{students.length} total students</p>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-xl font-semibold text-gray-900">{students.length}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average CGPA</p>
                <p className="text-xl font-semibold text-gray-900">{avgCgpa.toFixed(1)}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Top Department</p>
                <p className="text-xl font-semibold text-gray-900">{topDept}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, roll number, or department..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm bg-gray-50 focus:bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                {(searchQuery || departmentFilter || yearFilter || cgpaSort) && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    {[searchQuery, departmentFilter, yearFilter, cgpaSort].filter(Boolean).length} filter{[searchQuery, departmentFilter, yearFilter, cgpaSort].filter(Boolean).length > 1 ? 's' : ''} active
                  </span>
                )}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-md transition-all text-sm font-medium lg:hidden ${showFilters
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
            </div>

            {/* Filter Section */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block transition-all duration-200`}>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filter & Sort Options</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {/* Department Filter */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Department
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm bg-white appearance-none cursor-pointer"
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                      >
                        <option value="">All Departments</option>
                        <option value="CSE">Computer Science</option>
                        <option value="ECE">Electronics</option>
                        <option value="ME">Mechanical</option>
                        <option value="CE">Civil</option>
                        <option value="EE">Electrical</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Year Filter */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Academic Year
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm bg-white appearance-none cursor-pointer"
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                      >
                        <option value="">All Years</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* CGPA Sort */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Sort by CGPA
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm bg-white appearance-none cursor-pointer"
                        value={cgpaSort}
                        onChange={(e) => setCgpaSort(e.target.value)}
                      >
                        <option value="">Default Order</option>
                        <option value="high">Highest First</option>
                        <option value="low">Lowest First</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide opacity-0">
                      Reset
                    </label>
                    <button
                      onClick={resetFilters}
                      disabled={!searchQuery && !departmentFilter && !yearFilter && !cgpaSort}
                      className="w-full px-4 py-2.5 text-sm font-medium rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(searchQuery || departmentFilter || yearFilter || cgpaSort) && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-gray-500">Active filters:</span>
                      {searchQuery && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-blue-50 text-blue-700 border border-blue-200">
                          Search: "{searchQuery}"
                          <button
                            onClick={() => setSearchQuery('')}
                            className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {departmentFilter && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-blue-50 text-blue-700 border border-blue-200">
                          Dept: {departmentFilter}
                          <button
                            onClick={() => setDepartmentFilter('')}
                            className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {yearFilter && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-blue-50 text-blue-700 border border-blue-200">
                          Year: {yearFilter}
                          <button
                            onClick={() => setYearFilter('')}
                            className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {cgpaSort && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-blue-50 text-blue-700 border border-blue-200">
                          Sort: {cgpaSort === 'high' ? 'Highest First' : 'Lowest First'}
                          <button
                            onClick={() => setCgpaSort('')}
                            className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + Math.max(1, currentPage - 2);
                  if (page > totalPages) return null;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-md text-sm ${currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedStudents.length === 0 && (
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
        )}
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