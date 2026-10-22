import React, { useState, useEffect } from 'react';
import { INITIAL_STUDENTS } from './data/mockData';
import { Student } from './types';
import { ClassScreen } from './components/ClassScreen';
import { StudentDetailsScreen } from './components/StudentDetailsScreen';
import { ResultModal } from './components/ResultModal';
import { NotificationsModal } from './components/NotificationsModal';
import { InstallButton } from './components/InstallButton';
import {
  seedInitialStudentsIfEmpty,
  subscribeStudents,
  updateStudentPresence,
  updateAllStudentsPresence,
} from './services/studentService';
import {
  Smartphone,
  Layers,
  Sparkles,
  CheckCircle2,
  Users,
  RotateCcw,
  BookOpen,
  Cloud,
} from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('student-sam');
  const [viewMode, setViewMode] = useState<'both' | 'class' | 'student'>('both');
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [activeClassTab, setActiveClassTab] = useState<'feeds' | 'results' | 'attendance'>('attendance');
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(false);

  // Sync with Firebase Firestore
  useEffect(() => {
    seedInitialStudentsIfEmpty().then(() => setIsCloudConnected(true));

    const unsubscribe = subscribeStudents(
      (data) => {
        if (data && data.length > 0) {
          setStudents(data);
          setIsCloudConnected(true);
        }
      },
      () => {
        setIsCloudConnected(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const selectedStudent =
    students.find((s) => s.id === selectedStudentId) || students[0];

  // Toggle present/absent for a student
  const handleToggleAttendance = (studentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = students.find((s) => s.id === studentId);
    const nextState = current ? !current.isPresent : true;

    // Optimistic state
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return { ...s, isPresent: nextState };
        }
        return s;
      })
    );

    // Sync to Firestore
    updateStudentPresence(studentId, nextState);
  };

  const handleSelectStudent = (student: Student) => {
    setSelectedStudentId(student.id);
  };

  // Mark all present shortcut
  const handleMarkAll = (status: boolean) => {
    setStudents((prev) => prev.map((s) => ({ ...s, isPresent: status })));
    updateAllStudentsPresence(students, status);
  };

  // Reset demo data
  const handleReset = () => {
    setStudents(INITIAL_STUDENTS);
    setSelectedStudentId('student-sam');
    updateAllStudentsPresence(INITIAL_STUDENTS, true);
  };

  const presentCount = students.filter((s) => s.isPresent).length;
  const attendanceRate = Math.round((presentCount / students.length) * 100);

  return (
    <div className="min-h-screen bg-[#edf2f7] text-slate-800 flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Background Graphic Accents (Triangles, Circles, and Dots matching the screenshot) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top left dot matrix */}
        <div className="absolute top-12 left-10 opacity-30 grid grid-cols-6 gap-2">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          ))}
        </div>

        {/* Top left hollow blue circle */}
        <div className="absolute top-8 left-64 w-8 h-8 rounded-full border-4 border-sky-400 opacity-60" />

        {/* Top blue triangle */}
        <svg
          className="absolute top-28 left-[38%] w-6 h-6 text-sky-500 opacity-70 rotate-12"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <polygon points="12 3 22 21 2 21" />
        </svg>

        {/* Bottom right orange hollow circle ring */}
        <div className="absolute bottom-16 right-20 w-9 h-9 rounded-full border-4 border-amber-400 opacity-80" />

        {/* Bottom yellow triangle */}
        <svg
          className="absolute bottom-24 left-[34%] w-6 h-6 text-amber-500 opacity-80 -rotate-45"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <polygon points="12 3 22 21 2 21" />
        </svg>

        {/* Bottom right cyan triangle */}
        <svg
          className="absolute bottom-10 right-28 w-6 h-6 text-sky-500 opacity-75 rotate-45"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <polygon points="12 3 22 21 2 21" />
        </svg>

        {/* Bottom right dot matrix */}
        <div className="absolute bottom-24 right-8 opacity-25 grid grid-cols-6 gap-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          ))}
        </div>
      </div>

      {/* Top Application Showcase Navbar */}
      <header className="relative z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo & School context */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 font-bold text-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-sm md:text-base">
                  Ponpes Salamatul Insan
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                  Kelas 12-B
                </span>
                <span
                  title={isCloudConnected ? "Database Firebase Firestore Terhubung & Sinkron Realtime" : "Menghubungkan ke Firebase..."}
                  className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md transition-colors ${
                    isCloudConnected
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  <Cloud className="w-3 h-3" />
                  <span>{isCloudConnected ? 'Firebase Aktif' : 'Menghubungkan...'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Portal Presensi & Rapor Santri Digital
              </p>
            </div>
          </div>

          {/* Quick Metrics & View Mode Switcher */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Presence metric badge */}
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-slate-100/80 rounded-xl text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                {students.length} Total
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {presentCount} Present ({attendanceRate}%)
              </span>
            </div>

            {/* PWA Install Button (Android Chrome) */}
            <InstallButton />

            {/* Quick bulk actions */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => handleMarkAll(true)}
                title="Mark all students present"
                className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
              >
                Mark All Present
              </button>
              <button
                onClick={handleReset}
                title="Reset roster state"
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* View Mode Segmented Controls */}
            <div className="flex items-center p-1 bg-slate-200/70 rounded-xl text-xs font-semibold text-slate-700">
              <button
                onClick={() => setViewMode('both')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'both'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Dual Showcase</span>
              </button>
              <button
                onClick={() => setViewMode('class')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'class'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Class</span>
              </button>
              <button
                onClick={() => setViewMode('student')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'student'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Details</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Screen Showcase Canvas */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12">
        <div
          className={`w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 transition-all duration-300 ${
            viewMode === 'both' ? '' : 'justify-center'
          }`}
        >
          {/* SCREEN 1: CLASS SCREEN (Left Mobile Phone) */}
          {(viewMode === 'both' || viewMode === 'class') && (
            <div className="w-full max-w-[390px] shrink-0 animate-in fade-in duration-300">
              <div className="relative group">
                {/* Subtle device glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-400 to-sky-300 rounded-[44px] blur-md opacity-30 group-hover:opacity-50 transition duration-500" />
                <ClassScreen
                  students={students}
                  selectedStudentId={selectedStudentId}
                  onSelectStudent={(st) => {
                    handleSelectStudent(st);
                    if (viewMode === 'class') {
                      setViewMode('student');
                    }
                  }}
                  onToggleAttendance={handleToggleAttendance}
                  onOpenNotifications={() => setIsNotifOpen(true)}
                  onSwitchView={() => setViewMode(viewMode === 'class' ? 'both' : 'student')}
                  onTabSelect={(tab) => {
                    setActiveClassTab(tab);
                    if (tab === 'results') {
                      setIsResultOpen(true);
                    }
                  }}
                  activeTab={activeClassTab}
                />
              </div>
            </div>
          )}

          {/* SCREEN 2: STUDENT DETAILS SCREEN (Right Mobile Phone) */}
          {(viewMode === 'both' || viewMode === 'student') && (
            <div className="w-full max-w-[390px] shrink-0 animate-in fade-in duration-300">
              <div className="relative group">
                {/* Subtle device glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-400 to-rose-300 rounded-[44px] blur-md opacity-30 group-hover:opacity-50 transition duration-500" />
                <StudentDetailsScreen
                  student={selectedStudent}
                  onBack={() => setViewMode(viewMode === 'student' ? 'both' : 'class')}
                  onOpenNotifications={() => setIsNotifOpen(true)}
                  onSeeResult={() => setIsResultOpen(true)}
                  initialTab={activeClassTab === 'results' ? 'results' : 'attendance'}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Info Strip */}
      <footer className="relative z-20 py-3 px-6 text-center text-xs text-slate-500 border-t border-slate-200/60 bg-white/40 backdrop-blur-xs">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span>
            Sistem Presensi & Rapor Santri Kelas 12 - Ponpes Salamatul Insan
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-700 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Live Interactive Prototype
            </span>
            <span>·</span>
            <span>Active Student: <strong>{selectedStudent.name}</strong></span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <ResultModal
        student={selectedStudent}
        isOpen={isResultOpen}
        onClose={() => setIsResultOpen(false)}
      />

      <NotificationsModal
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      />
    </div>
  );
}
