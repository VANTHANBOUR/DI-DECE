import { LessonPlan, UserAccount } from '../types';

/**
 * Normalizes a teacher/staff name for fuzzy matching,
 * removing honorifics ("Teacher", "Madam", "Mr", "Ms", "Mrs", "អ្នកគ្រូ", "លោកគ្រូ", "លោកស្រី"),
 * punctuation, and excessive whitespace.
 */
export function normalizeTeacherName(name?: string | null): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/\b(teacher|madam|mr|mrs|ms|dr|miss|lead|educator|officer|principal)\b/gi, '')
    .replace(/(អ្នកគ្រូ|លោកគ្រូ|លោកស្រី|លោក|ឯកឧត្តម|លោកជំទាវ)/g, '')
    .replace(/[.,\-_/()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks whether a given lesson plan belongs to a specific teacher / user account.
 * Multi-layer matching ensures lesson plans always show up regardless of whether
 * matching by unique ID, Firebase UID, email address, username handle, or normalized full name.
 */
export function isLessonPlanForTeacher(plan: LessonPlan, user?: UserAccount | null): boolean {
  if (!user || !plan) return false;

  // 1. Exact ID Match (system ID or Firebase UID)
  if (plan.teacherId && user.id && plan.teacherId === user.id) {
    return true;
  }
  if (user.firebaseUid && plan.teacherId && (plan.teacherId === user.firebaseUid || plan.teacherId === `fb_${user.firebaseUid}`)) {
    return true;
  }

  // 2. Exact Email Match (case-insensitive)
  const planEmail = (plan.teacherEmail || '').toLowerCase().trim();
  const userEmail = (user.email || '').toLowerCase().trim();
  if (planEmail && userEmail && planEmail === userEmail) {
    return true;
  }

  // 3. Username Handle Match (e.g., "donnah.canonoy" in "donnah.canonoy@deweychildcare.edu.kh")
  if (planEmail && userEmail) {
    const planHandle = planEmail.split('@')[0].trim();
    const userHandle = userEmail.split('@')[0].trim();
    if (planHandle.length >= 3 && userHandle.length >= 3) {
      if (planHandle === userHandle || planHandle.includes(userHandle) || userHandle.includes(planHandle)) {
        return true;
      }
    }
  }

  // 4. Normalized Full Name Match
  const normPlanName = normalizeTeacherName(plan.teacherName);
  const normUserName = normalizeTeacherName(user.name);
  if (normPlanName && normUserName) {
    if (normPlanName === normUserName) return true;
    if (normPlanName.length >= 4 && normUserName.length >= 4) {
      if (normPlanName.includes(normUserName) || normUserName.includes(normPlanName)) {
        return true;
      }
    }
  }

  // 5. Khmer Name Match
  if (user.khmerName && plan.teacherName) {
    const normKhmer = normalizeTeacherName(user.khmerName);
    const normPlan = normalizeTeacherName(plan.teacherName);
    if (normKhmer && normPlan && (normPlan.includes(normKhmer) || normKhmer.includes(normPlan))) {
      return true;
    }
  }

  return false;
}

/**
 * Returns all lesson plans belonging to a given teacher.
 */
export function getTeacherLessonPlans(plans: LessonPlan[], user?: UserAccount | null): LessonPlan[] {
  if (!user) return [];
  return plans.filter(p => isLessonPlanForTeacher(p, user));
}

/**
 * Checks whether a teacher has any lesson plans in the provided plans array.
 */
export function teacherHasLessonPlans(plans: LessonPlan[], user: UserAccount): boolean {
  return plans.some(p => isLessonPlanForTeacher(p, user));
}
