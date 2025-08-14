import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from './Modal';
import { FormInput, FormSelect } from './FormComponents';
import { validateForm } from '../utils/helpers';

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
                        type="text"
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

export default AddStudentModal;
