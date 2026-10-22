import React, { useState } from 'react';
import { Student } from '../types';
import { ClassIllustrationHeader } from './ArtworkHeaders';
import { ChevronLeft, Bell, Search, GraduationCap, Calendar as CalendarIcon, Check } from 'lucide-react';

interface ClassScreenProps {
  students: Student[];
  selectedStudentId: string;
  onSelectStudent: (student: Student) => void;
  onToggleAttendance: (studentId: string, e: React.MouseEvent) => void;
  onOpenNotifications: () => void;
  onSwitchView?: () => void;
  onTabSelect?: (tab: 'feeds' | 'results' | 'attendance') => void;
  activeTab?: 'feeds' | 'results' | 'attendance';
}

export const ClassScreen: React.FC<ClassScreenProps> = ({
  students,
  selectedStudentId,
  onSelectStudent,
  onToggleAttendance,
  onOpenNotifications,
  onSwitchView,
  onTabSelect,
  activeTab = 'attendance',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'present' | 'absent'>('all');

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.includes(searchQuery) ||
      s.section.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterMode === 'present') return s.isPresent;
    if (filterMode === 'absent') return !s.isPresent;
    return true;
  });

  const presentCount = students.filter((s) => s.isPresent).length;

  return (
    <div className="relative w-full max-w-[390px] mx-auto bg-slate-50 min-h-[720px] rounded-[40px] shadow-2xl border-4 border-slate-200/60 overflow-hidden flex flex-col font-sans">
      {/* Top App Bar Floating over illustration */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 pt-4 pb-2">
        {/* Sky Blue Back Button */}
        <button
          onClick={onSwitchView}
          aria-label="Back"
          className="w-10 h-10 rounded-2xl bg-[#38bdf8] hover:bg-[#0284c7] active:scale-95 text-white flex items-center justify-center shadow-md shadow-sky-500/20 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Center Title */}
        <h1 className="text-lg font-bold text-white tracking-wide drop-shadow-sm">
          Class
        </h1>

        {/* Coral/Orange Bell Button */}
        <button
          onClick={onOpenNotifications}
          aria-label="Notifications"
          className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#fb923c] to-[#f97316] hover:brightness-105 active:scale-95 text-white flex items-center justify-center shadow-md shadow-orange-500/20 transition-all cursor-pointer"
        >
          <Bell className="w-5 h-5 fill-white/20 stroke-[2]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full ring-2 ring-orange-500" />
        </button>
      </div>

      {/* Illustration Header with Cartoon Kids */}
      <ClassIllustrationHeader />

      {/* White Content Card with Top Curved Border */}
      <div className="relative -mt-6 z-20 flex-1 bg-white rounded-t-[32px] px-4 pt-5 pb-6 shadow-[0_-8px_20px_rgba(0,0,0,0.04)] flex flex-col">
        {/* Top 3 Segmented Filter Tabs matching reference: Student Feeds, Results Info, Attendance */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={() => onTabSelect && onTabSelect('feeds')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'feeds'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            Student Feeds
          </button>

          <button
            onClick={() => onTabSelect && onTabSelect('results')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'results'
                ? 'bg-[#2563eb] text-white shadow-xs'
                : 'bg-[#3b82f6] hover:bg-blue-600 text-white'
            }`}
          >
            Results Info
          </button>

          <button
            onClick={() => onTabSelect && onTabSelect('attendance')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'attendance'
                ? 'bg-gradient-to-r from-[#fb923c] to-[#f87171] text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-200'
                : 'bg-gradient-to-r from-[#fb923c] to-[#f87171] opacity-80 hover:opacity-100 text-white'
            }`}
          >
            Attendance
          </button>
        </div>

        {/* Section Heading & Presence Metric */}
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">
            Select Student
          </h2>
          <span className="text-[11px] font-semibold text-slate-500">
            <span className="text-emerald-600 font-bold">{presentCount}</span> / {students.length} Present
          </span>
        </div>

        {/* Search Bar matching screenshot */}
        <div className="relative mb-3.5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search here"
            className="w-full bg-[#f1f5f9] hover:bg-[#e2e8f0]/80 focus:bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl pl-9 pr-8 py-2.5 outline-hidden ring-1 ring-transparent focus:ring-sky-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1"
            >
              ×
            </button>
          )}
        </div>

        {/* Student Cards List */}
        <div className="flex-1 overflow-y-auto pr-0.5 space-y-2.5 max-h-[380px]">
          {filteredStudents.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No students match "{searchQuery}"
            </div>
          ) : (
            filteredStudents.map((student) => {
              const isSelected = student.id === selectedStudentId;

              return (
                <div
                  key={student.id}
                  onClick={() => onSelectStudent(student)}
                  role="button"
                  tabIndex={0}
                  className={`relative group rounded-2xl p-2.5 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] ring-2 ring-sky-400/80 -translate-x-1.5'
                      : 'bg-white hover:bg-slate-50/80 shadow-xs border border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Student Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={student.avatarUrl}
                        alt={student.name}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200/80"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            student.name
                          )}&background=38bdf8&color=fff`;
                        }}
                      />
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center text-white ring-2 ring-white">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Student Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                        {student.name}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3 h-3 text-slate-400" />
                          {student.className}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3 text-slate-400" />
                          Dob : {student.dob}
                        </span>
                      </div>

                      <div className="text-[10px] text-slate-400 mt-0.5 font-medium">
                        ID : {student.studentId} · section : {student.section}
                      </div>
                    </div>

                    {/* Present / Absent Interactive Switch Toggle matching screenshot */}
                    <div
                      className="shrink-0 flex flex-col items-center pl-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleAttendance(student.id, e);
                      }}
                    >
                      <span className={`text-[10px] font-semibold mb-1 transition-colors ${
                        student.isPresent ? 'text-emerald-600' : 'text-slate-400'
                      }`}>
                        {student.isPresent ? 'Present' : 'Absent'}
                      </span>

                      {/* Smooth slider switch */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={student.isPresent}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                          student.isPresent
                            ? 'bg-[#22c55e]'
                            : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            student.isPresent ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
