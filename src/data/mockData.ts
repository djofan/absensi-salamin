import { Student, AttendanceRecord, ExamReport, FeedItem, HistoryRecord } from '../types';

export const generateJuneAttendance = (): AttendanceRecord[] => {
  // June starting with June 1 on Saturday, June 2 on Sunday
  const days: AttendanceRecord[] = [];
  const dayNames = ['Sa', 'Sa', 'Mo', 'Tu', 'We', 'Th', 'Fr'];

  for (let i = 1; i <= 30; i++) {
    // 1: Sa, 2: Sa/Su, 3: Mo, 4: Tu, 5: We, 6: Th, 7: Fr, 8: Sa, 9: Su, etc.
    const isWeekend = (i === 1 || i === 2 || i === 8 || i === 9 || i === 15 || i === 16 || i === 22 || i === 23 || i === 29 || i === 30);
    const dayOfWeek = isWeekend ? 'Sa' : ['Mo', 'Tu', 'We', 'Th', 'Fr'][(i - 3) % 7 % 5] || 'Mo';

    let status: 'present' | 'absent' | 'holiday' | 'late' | 'weekend' = isWeekend ? 'weekend' : 'present';
    let punchIn = isWeekend ? undefined : '08:05 AM';
    let punchOut = isWeekend ? undefined : '02:30 PM';
    let note = isWeekend ? 'Weekend Break' : 'Regular Attendance';

    if (i === 12) {
      status = 'late';
      punchIn = '08:42 AM';
      note = 'Late arrival due to morning rain';
    } else if (i === 19) {
      status = 'absent';
      punchIn = undefined;
      punchOut = undefined;
      note = 'Medical Leave - approved';
    } else if (i === 26) {
      status = 'present';
      note = 'Physics Lab special session';
    }

    days.push({
      date: `2026-06-${String(i).padStart(2, '0')}`,
      dayNumber: i,
      dayOfWeek,
      status,
      punchIn,
      punchOut,
      note,
    });
  }

  // Day 31 for calendar rollover display
  days.push({
    date: '2026-06-31',
    dayNumber: 31,
    dayOfWeek: 'Mo',
    status: 'holiday',
    note: 'Term End Preparatory Break',
  });

  return days;
};

const samExamReport: ExamReport = {
  term: 'Mid-Term Senior Secondary Assessment',
  academicYear: '2025 - 2026',
  totalMarks: 478,
  maxMarks: 500,
  percentage: 95.6,
  rank: 1,
  totalStudents: 34,
  gpa: 3.92,
  attendancePercentage: 94.2,
  teacherRemarks: 'Exceptional academic aptitude, consistent discipline in laboratory practicals, and exemplary leadership in class projects.',
  subjects: [
    { subject: 'Mathematics Core', code: 'MTH-1201', theoryMarks: 78, practicalMarks: 20, totalMarks: 98, maxMarks: 100, grade: 'A+', gradePoint: 10 },
    { subject: 'Physics', code: 'PHY-1202', theoryMarks: 66, practicalMarks: 28, totalMarks: 94, maxMarks: 100, grade: 'A+', gradePoint: 10 },
    { subject: 'Chemistry', code: 'CHM-1203', theoryMarks: 64, practicalMarks: 27, totalMarks: 91, maxMarks: 100, grade: 'A', gradePoint: 9 },
    { subject: 'Computer Science', code: 'CSC-1204', theoryMarks: 70, practicalMarks: 29, totalMarks: 99, maxMarks: 100, grade: 'A+', gradePoint: 10 },
    { subject: 'English Core', code: 'ENG-1205', theoryMarks: 76, practicalMarks: 20, totalMarks: 96, maxMarks: 100, grade: 'A+', gradePoint: 10 },
  ],
};

const commonFeeds: FeedItem[] = [
  {
    id: 'feed-1',
    title: 'Physics Practical Lab Examination Notice',
    category: 'Exam',
    date: '24 June 2026',
    summary: 'The final internal evaluation for Class 12-B Physics experiment journals and optics viva is scheduled on Friday at 9:00 AM.',
    author: 'Dr. H. Sharma (Head of Physics)',
    urgent: true,
  },
  {
    id: 'feed-2',
    title: 'Inter-School Mathematics Olympiad Selection',
    category: 'Notice',
    date: '21 June 2026',
    summary: 'Selected representatives from 12th Standard are requested to attend the orientation session in Room 204.',
    author: 'Academic Council',
  },
  {
    id: 'feed-3',
    title: 'Calculus Assignment #04 Submission Portal',
    category: 'Assignment',
    date: '18 June 2026',
    summary: 'Submit questions 12 to 28 from Volume 2 by Monday 5:00 PM via school intranet.',
    author: 'Prof. Miller',
  },
  {
    id: 'feed-4',
    title: 'Annual Sports & Science Exhibition Gala',
    category: 'Event',
    date: '15 June 2026',
    summary: 'Registration open for student science fair exhibits and 100m relay track events.',
    author: 'Student Affairs',
  },
];

const samHistory: HistoryRecord[] = [
  { id: 'h-1', term: 'Grade 11 - Final Board', grade: '96.2% (Grade A+)', attendance: '96.5%', achievement: 'Rank 1 & Gold Medalist in Science Stream', year: '2024-2025' },
  { id: 'h-2', term: 'Grade 10 - Matriculation', grade: '97.8% (Grade A+)', attendance: '98.0%', achievement: 'Principal’s Scholar Award & State Olympiad Finalist', year: '2023-2024' },
  { id: 'h-3', term: 'Grade 09 - Annual Session', grade: '94.0% (Grade A)', attendance: '95.2%', achievement: 'Junior Science Forum Secretary', year: '2022-2023' },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'student-sam',
    name: 'Sam Martin',
    className: 'Class 12th',
    dob: '4 th April 1990',
    studentId: '3324',
    section: 'B',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80',
    isPresent: true,
    phone: '+1 (555) 349-2910',
    email: 'sam.martin@salamatulin-san.sch.id',
    bloodGroup: 'O+',
    parentName: 'Robert & Clara Martin',
    address: '742 Evergreen Terrace, Springfield',
    attendanceHistory: {
      June: generateJuneAttendance(),
      August: generateJuneAttendance(),
      September: generateJuneAttendance(),
      October: generateJuneAttendance(),
    },
    examReport: samExamReport,
    feeds: commonFeeds,
    history: samHistory,
  },
  {
    id: 'student-john',
    name: 'John Smith',
    className: 'Class 12th',
    dob: '4 th April 1990',
    studentId: '3324',
    section: 'B',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    isPresent: true,
    phone: '+1 (555) 782-9012',
    email: 'john.smith@salamatulin-san.sch.id',
    bloodGroup: 'A+',
    parentName: 'Arthur Smith',
    address: '124 Concord Ave, Springfield',
    attendanceHistory: {
      June: generateJuneAttendance(),
      August: generateJuneAttendance(),
      September: generateJuneAttendance(),
      October: generateJuneAttendance(),
    },
    examReport: {
      ...samExamReport,
      percentage: 91.2,
      rank: 4,
      totalMarks: 456,
      gpa: 3.75,
      teacherRemarks: 'Strong analytical skills in physics and programming; continues to excel in team lab sessions.',
    },
    feeds: commonFeeds,
    history: samHistory,
  },
  {
    id: 'student-lara',
    name: 'Lara Anderson',
    className: 'Class 12th',
    dob: '4 th April 1990',
    studentId: '3324',
    section: 'B',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    isPresent: true,
    phone: '+1 (555) 438-1920',
    email: 'lara.anderson@salamatulin-san.sch.id',
    bloodGroup: 'B+',
    parentName: 'Helen Anderson',
    address: '89 Maple Street, Springfield',
    attendanceHistory: {
      June: generateJuneAttendance(),
      August: generateJuneAttendance(),
      September: generateJuneAttendance(),
      October: generateJuneAttendance(),
    },
    examReport: {
      ...samExamReport,
      percentage: 94.8,
      rank: 2,
      totalMarks: 474,
      gpa: 3.88,
      teacherRemarks: 'Brilliant communication skills, active participant in class debates, and top performer in Chemistry.',
    },
    feeds: commonFeeds,
    history: samHistory,
  },
  {
    id: 'student-vallery',
    name: 'Vallery Tina',
    className: 'Class 12th',
    dob: '4 th April 1990',
    studentId: '3324',
    section: 'B',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80',
    isPresent: true,
    phone: '+1 (555) 602-3981',
    email: 'vallery.tina@salamatulin-san.sch.id',
    bloodGroup: 'AB+',
    parentName: 'Mark & Sylvia Tina',
    address: '450 Oak Ridge Road, Springfield',
    attendanceHistory: {
      June: generateJuneAttendance(),
      August: generateJuneAttendance(),
      September: generateJuneAttendance(),
      October: generateJuneAttendance(),
    },
    examReport: {
      ...samExamReport,
      percentage: 92.4,
      rank: 3,
      totalMarks: 462,
      gpa: 3.81,
      teacherRemarks: 'Great attention to details in numerical problems, diligent record submission and consistent attendance.',
    },
    feeds: commonFeeds,
    history: samHistory,
  },
  {
    id: 'student-sam2',
    name: 'Sam Martin',
    className: 'Class 12th',
    dob: '4 th April 1990',
    studentId: '3324',
    section: 'B',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    isPresent: true,
    phone: '+1 (555) 349-2911',
    email: 'sam.martin.jr@salamatulin-san.sch.id',
    bloodGroup: 'O+',
    parentName: 'George Martin',
    address: '742 Elm Street, Springfield',
    attendanceHistory: {
      June: generateJuneAttendance(),
      August: generateJuneAttendance(),
      September: generateJuneAttendance(),
      October: generateJuneAttendance(),
    },
    examReport: samExamReport,
    feeds: commonFeeds,
    history: samHistory,
  },
  {
    id: 'student-chloe',
    name: 'Chloe Bennett',
    className: 'Class 12th',
    dob: '12 th May 1990',
    studentId: '3328',
    section: 'B',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    isPresent: false,
    phone: '+1 (555) 234-8711',
    email: 'chloe.bennett@salamatulin-san.sch.id',
    bloodGroup: 'A-',
    parentName: 'Sarah Bennett',
    address: '15 Whispering Pines, Springfield',
    attendanceHistory: {
      June: generateJuneAttendance(),
      August: generateJuneAttendance(),
      September: generateJuneAttendance(),
      October: generateJuneAttendance(),
    },
    examReport: {
      ...samExamReport,
      percentage: 89.6,
      rank: 6,
      totalMarks: 448,
      gpa: 3.65,
      teacherRemarks: 'Good progress in mathematics; encouraged to participate more during laboratory demonstrations.',
    },
    feeds: commonFeeds,
    history: samHistory,
  },
  {
    id: 'student-marcus',
    name: 'Marcus Chen',
    className: 'Class 12th',
    dob: '28 th November 1990',
    studentId: '3330',
    section: 'B',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&h=256&q=80',
    isPresent: true,
    phone: '+1 (555) 912-4560',
    email: 'marcus.chen@salamatulin-san.sch.id',
    bloodGroup: 'O-',
    parentName: 'Wei Chen',
    address: '302 Birch Lane, Springfield',
    attendanceHistory: {
      June: generateJuneAttendance(),
      August: generateJuneAttendance(),
      September: generateJuneAttendance(),
      October: generateJuneAttendance(),
    },
    examReport: {
      ...samExamReport,
      percentage: 93.0,
      rank: 5,
      totalMarks: 465,
      gpa: 3.82,
      teacherRemarks: 'Highly innovative programmer and team player; won first prize in Regional CodeQuest.',
    },
    feeds: commonFeeds,
    history: samHistory,
  },
];

export const SCHOOL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'School Attendance Portal Updated',
    message: 'Daily attendance logs for Section 12-B have been synced with the central education board.',
    time: '10 mins ago',
    type: 'attendance',
    unread: true,
  },
  {
    id: 'notif-2',
    title: 'Mid-Term Board Exam Results Released',
    message: 'Report cards for 12th Standard are now available to view and download.',
    time: '1 hour ago',
    type: 'exam',
    unread: true,
  },
  {
    id: 'notif-3',
    title: 'Bus Route #14 Schedule Notice',
    message: 'Afternoon departure delayed by 15 mins today due to highway maintenance.',
    time: '3 hours ago',
    type: 'transport',
    unread: false,
  },
  {
    id: 'notif-4',
    title: 'Parent-Teacher Meeting Scheduled',
    message: 'Class 12th parent consultation session this Saturday from 9:30 AM to 1:00 PM.',
    time: 'Yesterday',
    type: 'event',
    unread: false,
  },
];
