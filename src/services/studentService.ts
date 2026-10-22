import {
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Student } from '../types';
import { INITIAL_STUDENTS } from '../data/mockData';

const STUDENTS_COLLECTION = 'students';

// Initialize and seed if empty
export async function seedInitialStudentsIfEmpty() {
  try {
    const snap = await getDocs(collection(db, STUDENTS_COLLECTION));
    if (snap.empty) {
      for (const student of INITIAL_STUDENTS) {
        await setDoc(doc(db, STUDENTS_COLLECTION, student.id), {
          ...student,
          updatedAt: new Date().toISOString(),
        });
      }
    }
  } catch (error) {
    console.warn('Could not seed students:', error);
  }
}

// Subscribe to realtime student updates
export function subscribeStudents(
  onData: (students: Student[]) => void,
  onError?: (error: Error) => void
) {
  const colRef = collection(db, STUDENTS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        onData(INITIAL_STUDENTS);
        return;
      }
      const list: Student[] = [];
      snapshot.forEach((docSnap) => {
        list.push(docSnap.data() as Student);
      });
      // Sort to keep consistent order matching initial list
      list.sort((a, b) => {
        const idxA = INITIAL_STUDENTS.findIndex((s) => s.id === a.id);
        const idxB = INITIAL_STUDENTS.findIndex((s) => s.id === b.id);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        return a.name.localeCompare(b.name);
      });
      onData(list);
    },
    (err) => {
      try {
        handleFirestoreError(err, OperationType.LIST, STUDENTS_COLLECTION);
      } catch (e) {
        onError?.(e as Error);
      }
      // Fallback to local data if there's any connectivity or rule error
      onData(INITIAL_STUDENTS);
    }
  );
}

// Update presence status in Firestore
export async function updateStudentPresence(studentId: string, isPresent: boolean) {
  const docRef = doc(db, STUDENTS_COLLECTION, studentId);
  try {
    await updateDoc(docRef, {
      isPresent,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    try {
      handleFirestoreError(err, OperationType.UPDATE, `${STUDENTS_COLLECTION}/${studentId}`);
    } catch {
      // local optimistic update already handled
    }
  }
}

// Bulk update all students
export async function updateAllStudentsPresence(students: Student[], isPresent: boolean) {
  for (const s of students) {
    try {
      await updateDoc(doc(db, STUDENTS_COLLECTION, s.id), {
        isPresent,
        updatedAt: new Date().toISOString(),
      });
    } catch {
      // continue
    }
  }
}
