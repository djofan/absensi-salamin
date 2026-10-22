import React from 'react';
import { SCHOOL_NOTIFICATIONS } from '../data/mockData';
import { Bell, CheckCircle2, Clock, X, AlertCircle, FileText, Bus } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-xs">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Class 12-B Notifications</h3>
              <p className="text-[11px] text-slate-500">St. Mary Senior Secondary</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-white/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 max-h-80 overflow-y-auto space-y-2.5">
          {SCHOOL_NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-2xl border transition-all ${
                n.unread
                  ? 'bg-orange-50/40 border-orange-200/70 shadow-xs'
                  : 'bg-slate-50/70 border-slate-100 text-slate-600'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 shrink-0">
                  {n.type === 'attendance' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {n.type === 'exam' && <FileText className="w-4 h-4 text-orange-500" />}
                  {n.type === 'transport' && <Bus className="w-4 h-4 text-blue-500" />}
                  {n.type === 'event' && <AlertCircle className="w-4 h-4 text-amber-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-semibold text-slate-800 truncate">{n.title}</h4>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {n.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">2 unread alerts</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
