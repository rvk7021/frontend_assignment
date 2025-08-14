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

// Test utility functions
export const normalizeName = (s) => {
    // Convert to lowercase and remove accents
    return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const isFuzzyMatch = (a, b) => {
    // Allow 1 edit distance (insert, delete, or substitute)
    const normalizedA = a.toLowerCase();
    const normalizedB = b.toLowerCase();
    
    if (Math.abs(normalizedA.length - normalizedB.length) > 1) {
        return false;
    }
    
    let i = 0, j = 0;
    let edits = 0;
    
    while (i < normalizedA.length && j < normalizedB.length) {
        if (normalizedA[i] === normalizedB[j]) {
            i++;
            j++;
        } else {
            edits++;
            if (edits > 1) return false;
            
            // Try substitute
            if (normalizedA.length === normalizedB.length) {
                i++;
                j++;
            }
            // Try delete from a
            else if (normalizedA.length > normalizedB.length) {
                i++;
            }
            // Try delete from b (insert to a)
            else {
                j++;
            }
        }
    }
    
    // Account for remaining characters
    edits += (normalizedA.length - i) + (normalizedB.length - j);
    
    return edits <= 1;
};

// Test runner function
export const runTests = () => {
    try {
        console.assert(normalizeName("José") === "jose", "Test 1 failed: normalizeName('José') should equal 'jose'");
        console.assert(normalizeName("JOSE") === "jose", "Test 2 failed: normalizeName('JOSE') should equal 'jose'");
        console.assert(isFuzzyMatch("rvi", "ravi") === true, "Test 3 failed: isFuzzyMatch('rvi', 'ravi') should be true");
        console.assert(isFuzzyMatch("cse2025-01", "CSE2025-001") === true, "Test 4 failed: isFuzzyMatch('cse2025-01', 'CSE2025-001') should be true");
        console.assert(isFuzzyMatch("ana", "arun") === false, "Test 5 failed: isFuzzyMatch('ana', 'arun') should be false");
        
        return true;
    } catch (error) {
        console.error("Test failed:", error.message);
        return false;
    }
};
