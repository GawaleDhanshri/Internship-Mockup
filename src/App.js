import React, { useState } from 'react';
import { Search, Filter, ChevronRight, Clock, CheckCircle, XCircle, AlertCircle, User, Mail, Calendar, Award } from 'lucide-react';
// import './App.css';

const GradeSystemComparison = () => {
  const [activeView, setActiveView] = useState('before');
  const [beforeTab, setBeforeTab] = useState('summary');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Sample data
  const students = [
    { id: 'ST001', name: 'Alice Johnson', email: 'alice.j@school.edu', total: 12, submitted: 10, avgGrade: 85, status: 'Active' },
    { id: 'ST002', name: 'Bob Smith', email: 'bob.s@school.edu', total: 12, submitted: 8, avgGrade: 72, status: 'Active' },
    { id: 'ST003', name: 'Carol Davis', email: 'carol.d@school.edu', total: 12, submitted: 11, avgGrade: 91, status: 'Active' },
    { id: 'ST004', name: 'David Wilson', email: 'david.w@school.edu', total: 12, submitted: 9, avgGrade: 78, status: 'Active' }
  ];

  const assignments = [
    { id: 1, name: 'Essay: Romeo & Juliet', type: 'Essay', dueDate: '2025-10-15', submittedDate: '2025-10-14', status: 'graded', grade: 88 },
    { id: 2, name: 'Math Problem Set 5', type: 'Homework', dueDate: '2025-10-18', submittedDate: '2025-10-18', status: 'graded', grade: 92 },
    { id: 3, name: 'Science Lab Report', type: 'Lab', dueDate: '2025-10-20', submittedDate: '2025-10-19', status: 'pending', grade: null },
    { id: 4, name: 'History Quiz Chapter 7', type: 'Quiz', dueDate: '2025-10-22', submittedDate: '2025-10-22', status: 'pending', grade: null },
    { id: 5, name: 'Programming Assignment 3', type: 'Project', dueDate: '2025-10-25', submittedDate: null, status: 'late', grade: null },
    { id: 6, name: 'Weekly Reading Response', type: 'Essay', dueDate: '2025-10-23', submittedDate: null, status: 'missing', grade: null }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'graded': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'late': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'missing': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      graded: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      late: 'bg-orange-100 text-orange-800',
      missing: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // BEFORE SYSTEM (Existing)
  const BeforeSystem = () => (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Grade Management System</h1>
        <p className="text-sm text-gray-500 mt-1">Existing System with Fragmented Views</p>
      </div>

      <div className="flex border-b bg-white">
        <button
          onClick={() => { setBeforeTab('summary'); setSelectedStudent(null); }}
          className={`px-6 py-3 font-medium ${beforeTab === 'summary' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Summary
        </button>
        <button
          onClick={() => setBeforeTab('pending')}
          className={`px-6 py-3 font-medium ${beforeTab === 'pending' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setBeforeTab('graded')}
          className={`px-6 py-3 font-medium ${beforeTab === 'graded' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Graded
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        {beforeTab === 'summary' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Student Summary</h2>
              <p className="text-sm text-gray-500">Click on a student to view pending assignments</p>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Assignments</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {students.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.total}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.submitted}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-sm font-semibold rounded ${student.avgGrade >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {student.avgGrade}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => { setSelectedStudent(student); setBeforeTab('pending'); }}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        View Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {beforeTab === 'pending' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Pending Assignments</h2>
              {selectedStudent && (
                <p className="text-sm text-gray-500 mt-1">Filtered for: {selectedStudent.name}</p>
              )}
              <p className="text-sm text-red-500 mt-2">⚠️ Filters from Summary tab partially lost</p>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {assignments.filter(a => a.status === 'pending' || a.status === 'late').map(assignment => (
                  <tr key={assignment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{assignment.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{assignment.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{assignment.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${getStatusBadge(assignment.status)}`}>
                        {getStatusIcon(assignment.status)}
                        {assignment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Grade Now</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {beforeTab === 'graded' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Graded Assignments</h2>
              <p className="text-sm text-red-500 mt-2">⚠️ Must manually reapply filters</p>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {assignments.filter(a => a.status === 'graded').map(assignment => (
                  <tr key={assignment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{assignment.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{assignment.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{assignment.submittedDate}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-sm font-semibold rounded bg-green-100 text-green-800">
                        {assignment.grade}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  // AFTER SYSTEM (Proposed)
  const AfterSystem = () => {
    const [drilldownStudent, setDrilldownStudent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredAssignments = assignments.filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    if (drilldownStudent) {
      return (
        <div className="h-full flex flex-col bg-gray-50">
          <div className="bg-white border-b px-6 py-4">
            <button
              onClick={() => setDrilldownStudent(null)}
              className="text-blue-600 hover:text-blue-800 mb-2 flex items-center gap-1"
            >
              ← Back to Students
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Student Drilldown</h1>
            <p className="text-sm text-gray-500 mt-1">Unified view with preserved filters</p>
          </div>

          <div className="bg-white border-b px-6 py-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {drilldownStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{drilldownStudent.name}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" /> {drilldownStudent.id}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" /> {drilldownStudent.email}
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                      {drilldownStudent.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Overall Grade</div>
                <div className="text-3xl font-bold text-gray-900 mt-1">{drilldownStudent.avgGrade}%</div>
                <div className="text-sm text-gray-500 mt-1">{drilldownStudent.submitted}/{drilldownStudent.total} submitted</div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <span className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                Student: {drilldownStudent.name}
              </span>
              <span className="inline-flex items-center px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
                Date Range: Oct 1-26, 2025
              </span>
              <span className="inline-flex items-center px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                All Types
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold">All Assignments</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search assignments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="graded">Graded</option>
                    <option value="pending">Pending</option>
                    <option value="late">Late</option>
                    <option value="missing">Missing</option>
                  </select>
                </div>
              </div>

              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredAssignments.map(assignment => (
                    <tr key={assignment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{assignment.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{assignment.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{assignment.dueDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{assignment.submittedDate || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${getStatusBadge(assignment.status)}`}>
                          {getStatusIcon(assignment.status)}
                          {assignment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {assignment.grade ? (
                          <span className="text-sm font-semibold text-gray-900">{assignment.grade}%</span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {assignment.status === 'graded' ? (
                          <button className="text-blue-600 hover:text-blue-800 text-sm">View Feedback</button>
                        ) : (
                          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                            Grade
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col">
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Grade Management System</h1>
          <p className="text-sm text-gray-500 mt-1">Redesigned System with Unified Drilldown</p>
        </div>

        <div className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Student Overview</h2>
              <p className="text-sm text-gray-500">Click on a student to view complete assignment history</p>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignments</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {students.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.id}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.submitted}/{student.total}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Award className={`w-5 h-5 ${student.avgGrade >= 80 ? 'text-green-600' : 'text-yellow-600'}`} />
                        <span className="text-sm font-semibold text-gray-900">{student.avgGrade}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setDrilldownStudent(student)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2 text-sm"
                      >
                        View Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-3">Grade Management System Analysis</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('before')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeView === 'before'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-blue-700 hover:bg-blue-800'
              }`}
            >
              Before: Existing System
            </button>
            <button
              onClick={() => setActiveView('after')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeView === 'after'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-purple-700 hover:bg-purple-800'
              }`}
            >
              After: Redesigned System
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeView === 'before' ? <BeforeSystem /> : <AfterSystem />}
      </div>

      <div className="bg-gray-800 text-white p-3 text-center text-sm">
        {activeView === 'before' ? (
          <span className="text-red-300">⚠️ Pain Points: Fragmented views • Lost context • Manual filtering • Poor UX</span>
        ) : (
          <span className="text-green-300">✓ Improvements: Unified view • Preserved filters • Single interface • Enhanced accuracy & speed</span>
        )}
      </div>
    </div>
  );
};

export default GradeSystemComparison;