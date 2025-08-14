# Student Data Manager 📚

A clean and intuitive React-based student management system that helps you organize student records with ease. Built with modern React practices and a beautiful dark/light theme toggle.

## ✨ What it does

This app lets you manage student records without any backend complexity - everything runs in your browser! Perfect for small institutions, tutoring centers, or anyone who needs to keep track of student information.

### Key Features

- **Smart Student Management**: Add, edit, and delete student records with comprehensive validation
- **Intelligent Search**: Find students by name or roll number with fuzzy search (typo-tolerant!)
- **Flexible Sorting & Filtering**: Sort by CGPA or name, filter by department and academic year
- **Beautiful UI**: Clean interface with dark/light mode toggle for comfortable viewing
- **Built-in Tests**: Quality assurance with automated testing functions
- **Responsive Design**: Works great on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend_assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser** and visit [http://localhost:3000](http://localhost:3000)

That's it! The app will load with some sample student data to get you started.

## 🎯 How to Use

### Adding Students
- Click the "Add Student" button in the header
- Fill out all required fields (Roll Number, Name, Department, Year, CGPA)
- The system validates everything automatically - no duplicate roll numbers allowed!

### Managing Records
- **Edit**: Click the edit icon next to any student to modify their information
- **Delete**: Click the trash icon to remove a student (with confirmation prompt)
- **Search**: Type in the search box to find students by name or roll number
- **Filter**: Use the dropdown filters to narrow down by department or academic year
- **Sort**: Order students by CGPA (high to low or vice versa) or alphabetically by name

### Cool Features to Try
- Try searching with typos - the fuzzy search will still find your students!
- Switch between light and dark themes using the toggle in the header
- Click the "Tests" button to run built-in quality checks
- All your filter selections work together seamlessly

## 🛠 Built With

- **React 19** - The latest version for modern component development
- **Tailwind CSS** - For beautiful, responsive styling
- **Lucide React** - Clean, consistent icons
- **Custom Hooks** - For state management and reusable logic

## 📱 Technical Highlights

- **No External Dependencies**: Search functionality built from scratch (no libraries!)
- **Persistent Theme**: Your light/dark mode preference is remembered
- **Form Validation**: Comprehensive validation with helpful error messages
- **Responsive Design**: Looks great on any device size
- **Accessibility**: Proper keyboard navigation and screen reader support

## 🧪 Quality Assurance

The app includes built-in tests that verify:
- Text normalization (handling accents and case)
- Fuzzy search algorithm accuracy
- Core functionality reliability

Just click the "Tests" button in the header to run them!

## 📄 License

This project is part of a coding assignment and is available for educational purposes.

## 🤝 Contributing

Found a bug or have a suggestion? Feel free to open an issue or submit a pull request!

---

**Note**: This app stores data in browser memory, so refreshing the page will reset to sample data. Perfect for demonstration and testing purposes!
