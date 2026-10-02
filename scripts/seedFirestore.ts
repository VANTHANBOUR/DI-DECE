import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { 
  INITIAL_ACCOUNTS, 
  INITIAL_CLASSROOMS, 
  INITIAL_LESSON_PLANS, 
  INITIAL_SCHOOL_PROFILE, 
  INITIAL_AUDIT_LOGS 
} from '../src/data/mockData';

const DEFAULT_LEVELS = [
  { id: 'lvl_toddlers', name: 'Pre-Nursery', displayName: 'Pre-Nursery', khmerName: 'ថ្នាក់កូនក្មេង' },
  { id: 'lvl_nursery', name: 'Nursery', displayName: 'Nursery', khmerName: 'ថ្នាក់មត្តេយ្យទាប' },
  { id: 'lvl_pre_school', name: 'Pre-School', displayName: 'Pre-School', khmerName: 'ថ្នាក់មត្តេយ្យមធ្យម' },
  { id: 'lvl_kindergarten', name: 'Kindergarten', displayName: 'Kindergarten', khmerName: 'ថ្នាក់មត្តេយ្យខ្ពស់' },
];

function sanitizeForFirestore(data: any): any {
  if (data === null || data === undefined) {
    return data === undefined ? null : data;
  }
  if (Array.isArray(data)) {
    return data.map(item => sanitizeForFirestore(item));
  }
  if (typeof data === 'object' && !(data instanceof Date)) {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        result[key] = sanitizeForFirestore(value);
      }
    }
    return result;
  }
  return data;
}

async function seed() {
  console.log('Connecting to Firestore database:', firebaseConfig.firestoreDatabaseId);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

  // 1. Seed School Profile
  console.log('Seeding School Profile...');
  await setDoc(doc(db, 'settings', 'schoolProfile'), sanitizeForFirestore({
    ...INITIAL_SCHOOL_PROFILE,
    updatedAt: new Date().toISOString(),
    updatedBy: 'System Seed'
  }), { merge: true });

  // 2. Seed Classrooms
  console.log(`Seeding ${INITIAL_CLASSROOMS.length} Classrooms...`);
  for (const c of INITIAL_CLASSROOMS) {
    await setDoc(doc(db, 'classrooms', c.id), sanitizeForFirestore(c), { merge: true });
  }

  // 3. Seed Lesson Plans
  console.log(`Seeding ${INITIAL_LESSON_PLANS.length} Lesson Plans...`);
  for (const p of INITIAL_LESSON_PLANS) {
    await setDoc(doc(db, 'lessonPlans', p.id), sanitizeForFirestore(p), { merge: true });
  }

  // 4. Seed User Accounts
  console.log(`Seeding ${INITIAL_ACCOUNTS.length} User Accounts...`);
  for (const u of INITIAL_ACCOUNTS) {
    await setDoc(doc(db, 'users', u.id), sanitizeForFirestore(u), { merge: true });
  }

  // 5. Seed Levels
  console.log(`Seeding ${DEFAULT_LEVELS.length} Levels...`);
  for (const l of DEFAULT_LEVELS) {
    await setDoc(doc(db, 'levels', l.id), sanitizeForFirestore(l), { merge: true });
  }

  // 6. Seed System Audit Logs
  console.log(`Seeding ${INITIAL_AUDIT_LOGS.length} Audit Logs...`);
  for (const a of INITIAL_AUDIT_LOGS) {
    await setDoc(doc(db, 'auditLogs', a.id), sanitizeForFirestore(a), { merge: true });
  }

  console.log('🎉 ALL DATA SUCCESSFULLY STORED IN FIRESTORE!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
