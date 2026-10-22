export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  dayOfWeek: string;
  status: 'present' | 'absent' | 'holiday' | 'late' | 'weekend';
  punchIn?: string;
  punchOut?: string;
  note?: string;
}

export interface SubjectResult {
  subject: string;
  code: string;
  theoryMarks: number;
  practicalMarks: number;
  totalMarks: number;
  maxMarks: number;
  grade: string;
  gradePoint: number;
}

export interface ExamReport {
  term: string;
  academicYear: string;
  totalMarks: number;
  maxMarks: number;
  percentage: number;
  rank: number;
  totalStudents: number;
  gpa: number;
  attendancePercentage: number;
  teacherRemarks: string;
  subjects: SubjectResult[];
}

export interface FeedItem {
  id: string;
  title: string;
  category: 'Notice' | 'Assignment' | 'Event' | 'Exam';
  date: string;
  summary: string;
  author: string;
  urgent?: boolean;
}

export interface HistoryRecord {
  id: string;
  term: string;
  grade: string;
  attendance: string;
  achievement: string;
  year: string;
}

export interface Student {
  id: string;
  name: string;
  className: string;
  dob: string;
  studentId: string;
  section: string;
  avatarUrl: string;
  isPresent: boolean;
  phone: string;
  email: string;
  bloodGroup: string;
  parentName: string;
  address: string;
  attendanceHistory: Record<string, AttendanceRecord[]>; // keyed by 'June', 'August', etc.
  examReport: ExamReport;
  feeds: FeedItem[];
  history: HistoryRecord[];
}
