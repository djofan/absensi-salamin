import React, { useState } from 'react';
import { Student } from '../types';
import { StudentDetailsHeader } from './ArtworkHeaders';
import { ChevronLeft, Bell, ChevronDown, Check, Clock, X, AlertTriangle, Award, Calendar, BookOpen } from 'lucide-react';

interface StudentDetailsScreenProps {
  student: Student;
  onBack: () => void;
  onOpenNotifications: () => void;
  onSeeResult: () => void;
  initialTab?: 'attendance' | 'feeds' | 'results' | 'history';
}

export const StudentDetailsScreen: React.FC<StudentDetailsScreenProps> = ({
  student,
  onBack,
  onOpenNotifications,
  onSeeResult,
  initialTab = 'attendance',
}) => {
  const [activeTab, setActiveTab] = useState<'feeds' | 'results' | 'attendance' | 'history'>(initialTab);
  const [selectedMonth, setSelectedMonth] = useState<string>('June');
  const [startDate, setStartDate] = useState<string>('01 June');
  const [endDate, setEndDate] = useState<string>('31 June');
  const [selectedDay, setSelectedDay] = useState<number | null>(19); // default highlighted day
  const [showRangePicker, setShowRangePicker] = useState<boolean>(false);

  const months = ['June', 'August', 'September', 'October'];

  // Days of week header from screenshot: Mo, Tu, We, Th, Fr, Sa, Sa
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Sa'];

  // June calendar structure: 1st and 2nd are Sa & Su (red), 3rd is Mo
  // We can represent row 1: [empty, empty, empty, empty, empty, 1, 2]
  // row 2: [3, 4, 5, 6, 7, 8, 9]
  // row 3: [10, 11, 12, 13, 14, 15, 16]
  // row 4: [17, 18, 19, 20, 21, 22, 23]
  // row 5: [24, 25, 26, 27, 28, 29, 30]
  // row 6: [31]
  const calendarRows = [
    { days: [null, null, null, null, null, 1, 2] },
    { days: [3, 4, 5, 6, 7, 8, 9] },
    { days: [10, 11, 12, 13, 14, 15, 16] },
    { days: [17, 18, 19, 20, 21, 22, 23] },
    { days: [24, 25, 26, 27, 28, 29, 30] },
    { days: [31, null, null, null, null, null, null] },
  ];

  const weekendDates = new Set([1, 2, 8, 9, 15, 16, 22, 23, 29, 30]);

  const currentRecords = student.attendanceHistory[selectedMonth] || student.attendanceHistory['June'] || [];
  const selectedRecord = currentRecords.find((r) => r.dayNumber === selectedDay);

  return (
    <div className="relative w-full max-w-[390px] mx-auto bg-slate-50 min-h-[720px] rounded-[40px] shadow-2xl border-4 border-slate-200/60 overflow-hidden flex flex-col font-sans">
      {/* Top App Bar Floating over header */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 pt-4 pb-2">
        {/* Sky Blue Back Button */}
        <button
          onClick={onBack}
          aria-label="Back to Class"
          className="w-10 h-10 rounded-2xl bg-[#38bdf8] hover:bg-[#0284c7] active:scale-95 text-white flex items-center justify-center shadow-md shadow-sky-500/20 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Center Title */}
        <h1 className="text-lg font-bold text-white tracking-wide drop-shadow-sm">
          Student Details
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

      {/* Blue Header with School Corridor photo overlay & student name */}
      <StudentDetailsHeader
        studentName={student.name}
        className={student.className}
        dob={student.dob}
      />

      {/* White Overlapping Sheet */}
      <div className="relative -mt-6 z-20 flex-1 bg-white rounded-t-[32px] px-5 pt-4 pb-6 shadow-[0_-8px_20px_rgba(0,0,0,0.04)] flex flex-col">
        {/* Mini Student Avatar Strip matching screenshot */}
        <div className="flex items-center gap-3.5 pb-3">
          <img
            src={student.avatarUrl}
            alt={student.name}
            className="w-11 h-11 rounded-xl object-cover bg-slate-100 border border-slate-200 shadow-xs"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                student.name
              )}&background=38bdf8&color=fff`;
            }}
          />
          <div>
            <h3 className="text-base font-bold text-slate-800 tracking-tight leading-snug">
              {student.name}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              ID : {student.studentId} · Section {student.section}
            </p>
          </div>
        </div>

        {/* 4 Tabs Row: Student Feeds, Results Info, Attendance (active orange pill), History */}
        <div className="flex items-center justify-between gap-1 py-1 mb-3.5 border-b border-slate-100/80">
          <button
            onClick={() => setActiveTab('feeds')}
            className={`text-xs font-semibold py-1.5 px-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'feeds'
                ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Student Feeds
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`text-xs font-semibold py-1.5 px-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'results'
                ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Results Info
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className={`text-xs font-semibold py-1.5 px-3 rounded-full transition-all cursor-pointer ${
              activeTab === 'attendance'
                ? 'bg-gradient-to-r from-[#fb923c] to-[#f87171] text-white shadow-md shadow-orange-500/20'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Attendance
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`text-xs font-semibold py-1.5 px-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            History
          </button>
        </div>

        {/* TAB 1: ATTENDANCE (Default Screen) */}
        {activeTab === 'attendance' && (
          <div className="flex-1 flex flex-col">
            {/* Month Scroller */}
            <div className="flex items-center justify-between px-1 mb-3">
              {months.map((m) => {
                const isActive = m === selectedMonth;
                return (
                  <button
                    key={m}
                    onClick={() => setSelectedMonth(m)}
                    className={`text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'text-slate-900 text-sm font-extrabold'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>

            {/* Date Range Selector Buttons: "01 June ⌵"  "31 June ⌵" */}
            <div className="flex items-center justify-center gap-2 mb-3.5">
              <button
                onClick={() => setShowRangePicker(!showRangePicker)}
                className="flex items-center gap-1.5 bg-[#38bdf8] hover:bg-[#0284c7] text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-xs cursor-pointer transition-colors"
              >
                <span>{startDate}</span>
                <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              <button
                onClick={() => setShowRangePicker(!showRangePicker)}
                className="flex items-center gap-1.5 bg-[#38bdf8] hover:bg-[#0284c7] text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-xs cursor-pointer transition-colors"
              >
                <span>{endDate}</span>
                <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            {/* Date Range Quick Selector Modal / Popover */}
            {showRangePicker && (
              <div className="p-3 mb-2 bg-sky-50 border border-sky-200 rounded-2xl text-xs space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between font-semibold text-sky-900">
                  <span>Filter Date Range</span>
                  <button
                    onClick={() => setShowRangePicker(false)}
                    className="text-sky-600 hover:text-sky-900 font-bold"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex gap-2">
                  <select
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-white border border-sky-300 rounded-lg px-2 py-1 text-xs"
                  >
                    <option value="01 June">01 June</option>
                    <option value="05 June">05 June</option>
                    <option value="10 June">10 June</option>
                    <option value="15 June">15 June</option>
                  </select>
                  <span className="self-center text-sky-700">to</span>
                  <select
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-white border border-sky-300 rounded-lg px-2 py-1 text-xs"
                  >
                    <option value="15 June">15 June</option>
                    <option value="20 June">20 June</option>
                    <option value="25 June">25 June</option>
                    <option value="31 June">31 June</option>
                  </select>
                </div>
              </div>
            )}

            {/* Calendar Grid */}
            <div className="flex-1">
              {/* Day names row */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-700 mb-2">
                {weekDays.map((d, idx) => (
                  <div key={idx} className="py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Day numbers grid */}
              <div className="space-y-1.5 text-center text-xs font-medium">
                {calendarRows.map((row, rowIdx) => (
                  <div key={rowIdx} className="grid grid-cols-7 gap-1">
                    {row.days.map((dayNum, colIdx) => {
                      if (dayNum === null) {
                        return <div key={colIdx} className="h-7" />;
                      }

                      const isWeekend = weekendDates.has(dayNum);
                      const isSelected = selectedDay === dayNum;
                      const record = currentRecords.find((r) => r.dayNumber === dayNum);

                      return (
                        <button
                          key={colIdx}
                          onClick={() => setSelectedDay(dayNum)}
                          className={`h-7 w-7 mx-auto rounded-full flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white font-bold shadow-md scale-110 ring-2 ring-orange-400'
                              : isWeekend
                              ? 'text-[#ef4444] font-semibold hover:bg-rose-50'
                              : dayNum === 31
                              ? 'text-slate-400 font-semibold'
                              : 'text-slate-700 hover:bg-slate-100 font-semibold'
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Mini date status badge on selection */}
              {selectedDay && selectedRecord && (
                <div className="mt-3 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-800">
                    {selectedDay} {selectedMonth}:
                  </span>
                  <span
                    className={`font-bold capitalize ${
                      selectedRecord.status === 'present'
                        ? 'text-emerald-600'
                        : selectedRecord.status === 'absent'
                        ? 'text-rose-500'
                        : selectedRecord.status === 'late'
                        ? 'text-amber-600'
                        : 'text-slate-500'
                    }`}
                  >
                    {selectedRecord.status}
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    {selectedRecord.note || 'Recorded in school register'}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom CTA Button: "See Result" matching orange-to-coral gradient in screenshot */}
            <div className="pt-3">
              <button
                onClick={onSeeResult}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#fb923c] via-[#f97316] to-[#f87171] hover:brightness-105 active:scale-[0.99] text-white text-sm font-bold tracking-wide shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>See Result</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: STUDENT FEEDS */}
        {activeTab === 'feeds' && (
          <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[380px] pr-1">
            <div className="text-xs font-bold text-slate-800 px-1 mb-1">
              Class 12th Feeds & Homework
            </div>
            {student.feeds.map((f) => (
              <div key={f.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-sky-100 text-sky-700">
                    {f.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{f.date}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-xs leading-snug">{f.title}</h4>
                <p className="text-[11px] text-slate-600 mt-1">{f.summary}</p>
                <div className="mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                  Posted by: {f.author}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: RESULTS INFO */}
        {activeTab === 'results' && (
          <div className="flex-1 overflow-y-auto space-y-3 max-h-[380px] pr-1">
            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase">Board Assessment</span>
                <div className="text-base font-extrabold text-slate-800">
                  {student.examReport.percentage}%
                </div>
              </div>
              <button
                onClick={onSeeResult}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                Open Full Card
              </button>
            </div>

            <div className="space-y-2">
              {student.examReport.subjects.map((sub) => (
                <div key={sub.code} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800">{sub.subject}</div>
                    <div className="text-[10px] text-slate-400">{sub.code}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-700">{sub.totalMarks}/100</span>
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                      {sub.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: HISTORY */}
        {activeTab === 'history' && (
          <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[380px] pr-1">
            <div className="text-xs font-bold text-slate-800 px-1 mb-1">
              Academic & Conduct Records
            </div>
            {student.history.map((h) => (
              <div key={h.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800">{h.term}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{h.year}</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-600">
                  <span>Score: <strong className="text-slate-800">{h.grade}</strong></span>
                  <span>·</span>
                  <span>Attended: <strong className="text-slate-800">{h.attendance}</strong></span>
                </div>
                <p className="text-[10px] text-amber-700 bg-amber-50 rounded-lg p-1.5 mt-2 border border-amber-100">
                  ★ {h.achievement}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
