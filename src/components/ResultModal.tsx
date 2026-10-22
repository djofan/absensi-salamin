import React from 'react';
import { Student } from '../types';
import { Award, CheckCircle, Download, Printer, X, TrendingUp, Calendar, BookOpen } from 'lucide-react';

interface ResultModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({ student, isOpen, onClose }) => {
  if (!isOpen) return null;

  const report = student.examReport;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30 shadow-inner">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-orange-100">
                St. Mary Senior Secondary School
              </span>
              <h2 className="text-xl font-extrabold tracking-tight">Academic Report Card</h2>
              <p className="text-xs text-orange-100/90">{report.term} · {report.academicYear}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Report Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Student Profile Info Strip */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=ea580c&color=fff`;
                }}
              />
              <div>
                <h3 className="text-sm font-bold text-slate-800">{student.name}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span>{student.className} - {student.section}</span>
                  <span>·</span>
                  <span>ID: {student.studentId}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Class Rank</span>
              <div className="text-lg font-black text-orange-600">
                #{report.rank} <span className="text-xs font-normal text-slate-400">/ {report.totalStudents}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics KPI */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-orange-50/60 rounded-2xl border border-orange-100 text-center">
              <span className="text-[10px] font-semibold text-orange-600 uppercase tracking-wide">Overall Score</span>
              <div className="text-xl font-bold text-slate-900 mt-0.5">{report.percentage}%</div>
              <span className="text-[10px] text-slate-500">{report.totalMarks} / {report.maxMarks}</span>
            </div>
            <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100 text-center">
              <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide">Cumulative GPA</span>
              <div className="text-xl font-bold text-slate-900 mt-0.5">{report.gpa}</div>
              <span className="text-[10px] text-slate-500">Grade Point 10.0 scale</span>
            </div>
            <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-center">
              <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide">Attendance</span>
              <div className="text-xl font-bold text-slate-900 mt-0.5">{report.attendancePercentage}%</div>
              <span className="text-[10px] text-emerald-600 font-medium">Eligible for Boards</span>
            </div>
          </div>

          {/* Subject Breakdown Table */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-orange-500" />
                Subject Performance
              </h4>
              <span className="text-[11px] text-slate-500">Scale: 100 Marks</span>
            </div>

            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 text-[11px] font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-2 text-center">Theory</th>
                    <th className="py-2.5 px-2 text-center">Practical</th>
                    <th className="py-2.5 px-2 text-center">Total</th>
                    <th className="py-2.5 px-3 text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {report.subjects.map((sub) => (
                    <tr key={sub.code} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-800">{sub.subject}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{sub.code}</div>
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-600">{sub.theoryMarks}</td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-600">{sub.practicalMarks}</td>
                      <td className="py-2.5 px-2 text-center font-bold text-slate-900 font-mono">{sub.totalMarks}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-block px-2 py-0.5 rounded-md font-bold text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {sub.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Teacher remarks */}
          <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Class Teacher's Assessment</span>
            <p className="text-xs text-amber-900/90 mt-1 italic leading-relaxed">
              "{report.teacherRemarks}"
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert(`Downloaded Official Grade Report PDF for ${student.name}`);
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl hover:brightness-105 transition-all shadow-md shadow-orange-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              Download Official PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
