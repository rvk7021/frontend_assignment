// Fuzzy search function
export const fuzzySearchStudents = (students, query) => {
    if (!query) return students;
    const lowerQuery = query.toLowerCase();
    return students.filter(student =>
        student.name.toLowerCase().includes(lowerQuery) ||
        student.rollNumber.toLowerCase().includes(lowerQuery) ||
        student.department.toLowerCase().includes(lowerQuery)
    );
};

// Form validation
export const validateForm = (formData, isEdit = false, students = []) => {
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
