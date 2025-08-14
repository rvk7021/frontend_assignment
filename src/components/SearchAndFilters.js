import React from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchAndFilters = ({
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    yearFilter,
    setYearFilter,
    cgpaSort,
    setCgpaSort,
    showFilters,
    setShowFilters,
    resetFilters
}) => {
    return (
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
    );
};

export default SearchAndFilters;
