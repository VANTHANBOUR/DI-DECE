import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LessonPlan, CAMPUS_LIST } from '../types';
import { UserProfileModal } from './UserProfileModal';
import { UserAvatar } from './UserAvatar';
import { formatDateRange } from '../utils/dateUtils';
import { isPlanFromCampus } from '../utils/campusUtils';
import { 
  BookOpen, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Eye, 
  Edit3, 
  Send, 
  Sparkles, 
  Calendar, 
  Layers, 
  Download,
  AlertCircle,
  HelpCircle,
  School,
  Table,
  Camera,
  User,
  Printer,
  Users,
  Search,
  Filter,
  Globe,
  Building2,
  Trash2
} from 'lucide-react';

interface TeacherDashboardProps {
  activeTab: string;
  onOpenNewPlan: () => void;
  onSelectPlan: (plan: LessonPlan, autoPrint?: boolean) => void;
  onEditPlan: (plan: LessonPlan) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  activeTab,
  onOpenNewPlan,
  onSelectPlan,
  onEditPlan,
}) => {
  const { 
    currentUser, 
    userLessonPlans, 
    myTotalLessonPlans, 
    allTeacherLessonPlans, 
    submitLessonPlan, 
    deleteLessonPlan,
    classrooms, 
    showToast, 
    formatAgeGroup, 
    selectedCampusId,
    allAccounts 
  } = useApp();

  const activeCampus = selectedCampusId ? CAMPUS_LIST.find(c => c.id === selectedCampusId) : null;
  const [viewMode, setViewMode] = useState<'my_plans' | 'all_teachers'>('my_plans');
  const [myScopeFilter, setMyScopeFilter] = useState<'all_campuses' | 'current_campus'>('all_campuses');
  const [archiveCampusFilter, setArchiveCampusFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [weekFilter, setWeekFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const pageSize = 12;
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<LessonPlan | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  if (!currentUser) return null;

  const myClass = classrooms.find(c => c.id === currentUser.assignedClassId) || classrooms[0];

  // Base list for "My Plans"
  const myPlansSource = myScopeFilter === 'all_campuses' ? myTotalLessonPlans : userLessonPlans;

  const approvedCount = myPlansSource.filter(p => p.status === 'approved').length;
  const submittedCount = myPlansSource.filter(p => p.status === 'submitted' || p.status === 'under_review').length;
  const revisionCount = myPlansSource.filter(p => p.status === 'revision_requested').length;
  const draftCount = myPlansSource.filter(p => p.status === 'draft').length;

  // Filtered plans according to active tab
  const displayedPlans = React.useMemo(() => {
    let list = viewMode === 'my_plans' ? myPlansSource : allTeacherLessonPlans;

    // Campus filter for archive
    if (viewMode === 'all_teachers' && archiveCampusFilter !== 'all') {
      list = list.filter(p => isPlanFromCampus(p, archiveCampusFilter, classrooms, allAccounts));
    }

    // Week filter
    if (weekFilter !== 'all') {
      list = list.filter(p => p.weekNumber === parseInt(weekFilter, 10));
    }

    // Status filter
    if (statusFilter !== 'all') {
      list = list.filter(p => p.status === statusFilter);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.themeTitle.toLowerCase().includes(q) ||
        p.className.toLowerCase().includes(q) ||
        p.teacherName.toLowerCase().includes(q) ||
        (p.themeDescription && p.themeDescription.toLowerCase().includes(q))
      );
    }

    return list;
  }, [viewMode, myPlansSource, allTeacherLessonPlans, archiveCampusFilter, weekFilter, statusFilter, searchQuery, classrooms, allAccounts]);

  const totalPages = Math.ceil(displayedPlans.length / pageSize) || 1;
  const paginatedDisplayedPlans = displayedPlans.slice((page - 1) * pageSize, page * pageSize);

  const getStatusBadge = (status: LessonPlan['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-[11px] font-extrabold">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Approved
          </span>
        );
      case 'revision_requested':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[11px] font-extrabold animate-pulse">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Action Needed · Revision
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-100 text-blue-800 border border-blue-200 rounded-full text-[11px] font-bold">
            <Clock className="w-3 h-3 text-blue-600" />
            Under Review
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-purple-100 text-purple-800 border border-purple-200 rounded-full text-[11px] font-bold">
            <Clock className="w-3 h-3 text-purple-600" />
            In Review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-full text-[11px] font-bold">
            Draft · Not Submitted
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Teacher Profile & Classroom Banner */}
      <div className="bg-gradient-to-r from-[#006838] via-[#007A43] to-emerald-800 rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        {/* Subtle decorative background ring */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-24 bottom-0 translate-y-16 w-48 h-48 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div 
              className="relative group cursor-pointer shrink-0" 
              onClick={() => setIsProfileModalOpen(true)}
              title="Click to update profile picture & details"
            >
              <UserAvatar
                src={currentUser.avatar}
                name={currentUser.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ring-4 ring-white/30 shadow-md transition-transform group-hover:scale-105 shrink-0"
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 bg-amber-400 text-amber-950 rounded-lg shadow-xs hover:bg-amber-300">
                <Camera className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/90 text-amber-950">
                  Educator Portal
                </span>
                <span className="text-xs text-emerald-100 font-medium">
                  {currentUser.joinedYear ? `Faculty Member since ${currentUser.joinedYear}` : 'Early Childhood Faculty'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {currentUser.name} {currentUser.khmerName && <span className="text-emerald-200 font-['Battambang'] font-normal text-lg">({currentUser.khmerName})</span>}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium flex items-center gap-2">
                <School className="w-4 h-4 text-amber-300" />
                <span>
                  {currentUser.assignedClassName || myClass.name} · {formatAgeGroup(currentUser.ageGroup || myClass.ageGroup, currentUser.campusId || myClass.campusId)} · {currentUser.roomNumber || myClass.room}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-2xl border border-white/25 backdrop-blur-xs transition-all active:scale-95"
            >
              <User className="w-4 h-4 text-amber-300" />
              <span>Update Profile & Photo</span>
            </button>
            <button
              onClick={onOpenNewPlan}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Create / Upload Lesson Plan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Revision Alert Notice (If Principal asked for changes) */}
      {revisionCount > 0 && (
        <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-white rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-950">
                Action Required: {revisionCount} Lesson Plan(s) Need Revision
              </p>
              <p className="text-[11px] text-amber-800">
                Academic Review Officer Mr. Piseth Vanthan has requested minor curriculum or safety updates. Review the feedback and resubmit.
              </p>
            </div>
          </div>
          <button
            onClick={() => setStatusFilter('revision_requested')}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shrink-0"
          >
            View Revisions
          </button>
        </div>
      )}

      {/* Stats Cards */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div 
            onClick={() => {
              setViewMode('my_plans');
              setStatusFilter('all');
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              viewMode === 'my_plans' && statusFilter === 'all' 
                ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500/20' 
                : 'bg-white border-slate-200/80 hover:border-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">My Submissions</span>
              <div className="p-2 bg-emerald-100/60 text-[#007A43] rounded-xl">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{myTotalLessonPlans.length}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Across All Campuses</p>
          </div>

          <div 
            onClick={() => {
              setViewMode('my_plans');
              setStatusFilter('approved');
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              viewMode === 'my_plans' && statusFilter === 'approved' 
                ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500/20' 
                : 'bg-white border-slate-200/80 hover:border-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">My Approved Plans</span>
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-2">{approvedCount}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Ready for classroom teaching</p>
          </div>

          <div 
            onClick={() => {
              setViewMode('my_plans');
              setStatusFilter('submitted');
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              viewMode === 'my_plans' && statusFilter === 'submitted' 
                ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20' 
                : 'bg-white border-slate-200/80 hover:border-blue-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Pending Review</span>
              <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-blue-700 mt-2">{submittedCount}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Under Academic Review</p>
          </div>

          <div 
            onClick={() => {
              setViewMode('all_teachers');
              setStatusFilter('all');
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              viewMode === 'all_teachers' 
                ? 'bg-purple-50/80 border-purple-300 ring-2 ring-purple-500/20' 
                : 'bg-white border-slate-200/80 hover:border-purple-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">All Teachers' Archive</span>
              <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-purple-700 mt-2">{allTeacherLessonPlans.length}</p>
            <p className="text-[10px] text-purple-600 mt-0.5 font-bold">All 10 Plans Accessible</p>
          </div>
        </div>
      )}

      {/* Lesson Plan Submissions List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        
        {/* Navigation Tabs: My Submissions vs All Teachers' Submissions */}
        <div className="bg-slate-50 border-b border-slate-200/80 p-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setViewMode('my_plans');
                setStatusFilter('all');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                viewMode === 'my_plans'
                  ? 'bg-[#007A43] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>My Submissions ({myTotalLessonPlans.length})</span>
            </button>

            <button
              onClick={() => {
                setViewMode('all_teachers');
                setStatusFilter('all');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                viewMode === 'all_teachers'
                  ? 'bg-[#007A43] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-500" />
              <span>All Previous Teacher Submissions ({allTeacherLessonPlans.length})</span>
            </button>
          </div>

          {/* Quick Scope Filter for "My Plans" */}
          {viewMode === 'my_plans' && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-bold text-[11px] uppercase">Campus View:</span>
              <button
                onClick={() => setMyScopeFilter('all_campuses')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  myScopeFilter === 'all_campuses'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Campuses ({myTotalLessonPlans.length})
              </button>
              {activeCampus && activeCampus.id !== 'ALL' && (
                <button
                  onClick={() => setMyScopeFilter('current_campus')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    myScopeFilter === 'current_campus'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {activeCampus.shortName} ({userLessonPlans.length})
                </button>
              )}
            </div>
          )}

          {/* Campus Selector for "All Teachers Archive" */}
          {viewMode === 'all_teachers' && (
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <select
                value={archiveCampusFilter}
                onChange={(e) => setArchiveCampusFilter(e.target.value)}
                className="text-xs font-bold py-1.5 px-3 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-emerald-600"
              >
                <option value="all">All 7 Campuses (All 10 Plans)</option>
                {CAMPUS_LIST.filter(c => c.id !== 'ALL').map(c => (
                  <option key={c.id} value={c.id}>{c.shortName} - {c.brand}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Section Header with Filter Tabs & Search */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>
                {viewMode === 'my_plans' 
                  ? 'My Uploaded Lesson Plans & Submissions' 
                  : 'Institutional Teacher Submissions & Curriculum Archive'}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#007A43] border border-emerald-300 font-extrabold">
                {displayedPlans.length} Available
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {viewMode === 'my_plans'
                ? 'Your active lesson plans, feedback history from academic reviewers, and teaching schedules.'
                : 'Browse, learn from, and reference all previous early childhood lesson plans submitted by teachers across all Dewey campuses.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topic or teacher..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-emerald-600 w-44 sm:w-52"
              />
            </div>

            {/* Week Filter Selector */}
            <div className="flex items-center gap-1">
              <select
                value={weekFilter}
                onChange={(e) => {
                  setWeekFilter(e.target.value);
                  setPage(1);
                }}
                className="text-xs font-bold py-1.5 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-emerald-600"
              >
                <option value="all">All Weeks (1-16)</option>
                {Array.from({ length: 16 }, (_, i) => i + 1).map(w => (
                  <option key={w} value={w.toString()}>Week {w} {w === 12 ? '★ Active' : ''}</option>
                ))}
              </select>
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {['all', 'approved', 'submitted', 'revision_requested', 'draft'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setStatusFilter(tab);
                    setPage(1);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                    statusFilter === tab
                      ? 'bg-[#007A43] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* List Content */}
        {displayedPlans.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-50 text-[#007A43] rounded-2xl flex items-center justify-center mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-slate-800">No lesson plans found in this filter.</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {viewMode === 'my_plans'
                ? 'Create a new early childhood lesson plan for your classroom or switch to All Campuses.'
                : 'Try adjusting your search terms, week, or campus filter to view plans.'}
            </p>
            {viewMode === 'my_plans' ? (
              <button
                onClick={onOpenNewPlan}
                className="mt-2 px-4 py-2 bg-[#007A43] hover:bg-[#006338] text-white text-xs font-bold rounded-xl transition-colors"
              >
                + Create First Plan
              </button>
            ) : (
              <button
                onClick={() => {
                  setArchiveCampusFilter('all');
                  setWeekFilter('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                  setPage(1);
                }}
                className="mt-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
              >
                Reset Filters & Show All {allTeacherLessonPlans.length} Plans
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {paginatedDisplayedPlans.map((plan) => {
              const isOwner = plan.teacherId === currentUser.id || 
                              (plan.teacherEmail && plan.teacherEmail.toLowerCase() === (currentUser.email || '').toLowerCase());
              const planCampus = CAMPUS_LIST.find(c => c.id === plan.campusId);

              return (
                <div
                  key={plan.id}
                  className="p-4 sm:p-6 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-[#007A43] border border-emerald-200 rounded-lg text-xs font-bold">
                        Week {plan.weekNumber}
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs font-semibold text-slate-600">
                        {formatDateRange(plan.startDate, plan.endDate, ' to ')}
                      </span>
                      {getStatusBadge(plan.status)}

                      {/* Campus Badge */}
                      {planCampus && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {planCampus.shortName}
                        </span>
                      )}
                    </div>

                    {/* Teacher attribution banner if in archive or peer plan */}
                    {(viewMode === 'all_teachers' || !isOwner) && (
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium pt-0.5">
                        <UserAvatar src={plan.teacherAvatar} name={plan.teacherName} className="w-5 h-5 rounded-md" />
                        <span className="font-bold text-slate-800">{plan.teacherName}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500">{plan.className} ({formatAgeGroup(plan.ageGroup, plan.campusId)})</span>
                      </div>
                    )}

                    <div>
                      <h3 
                        onClick={() => onSelectPlan(plan)}
                        className="text-base font-bold text-slate-900 hover:text-[#007A43] cursor-pointer transition-colors"
                      >
                        {plan.themeTitle}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                        {plan.themeDescription || 'Structured trilingual early childhood weekly plan.'}
                      </p>
                    </div>

                    {/* Badges row */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {plan.className} ({formatAgeGroup(plan.ageGroup, plan.campusId)})
                      </span>
                      {plan.attachments && plan.attachments.length > 0 && (
                        <span className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          <FileText className="w-3 h-3 text-emerald-700" />
                          {plan.attachments.length} file(s) attached
                        </span>
                      )}
                      {plan.feedbackHistory && plan.feedbackHistory.length > 0 && (
                        <span className="text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold">
                          💬 {plan.feedbackHistory.length} Feedback note(s)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={() => onSelectPlan(plan, true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
                      title="Print Sheet Preview"
                    >
                      <Printer className="w-3.5 h-3.5 text-emerald-200" />
                      <span>Print Preview</span>
                    </button>

                    <button
                      onClick={() => onSelectPlan(plan)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Plan</span>
                    </button>

                    {isOwner && (
                      <button
                        onClick={() => onEditPlan(plan)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors shadow-2xs"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                        <span>Edit</span>
                      </button>
                    )}

                    {isOwner && (
                      <button
                        onClick={() => setPlanToDelete(plan)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 rounded-xl transition-all"
                        title="Delete lesson plan from database"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    {isOwner && plan.status === 'draft' && (
                      <button
                        onClick={() => submitLessonPlan(plan.id)}
                        className="flex items-center gap-1 px-3.5 py-1.5 bg-[#007A43] hover:bg-[#006338] text-white text-xs font-bold rounded-xl shadow-2xs transition-all active:scale-95"
                      >
                        <Send className="w-3.5 h-3.5 text-amber-300" />
                        <span>Submit</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Bar */}
        {displayedPlans.length > pageSize && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p className="text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-800">{(page - 1) * pageSize + 1}</span> to <span className="font-bold text-slate-800">{Math.min(page * pageSize, displayedPlans.length)}</span> of <span className="font-bold text-[#007A43]">{displayedPlans.length}</span> lesson plans
            </p>
            <div className="flex items-center gap-1">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(pNum => pNum === 1 || pNum === totalPages || Math.abs(pNum - page) <= 1)
                .map((pNum, idx, arr) => (
                  <React.Fragment key={pNum}>
                    {idx > 0 && arr[idx - 1] !== pNum - 1 && <span className="px-1 text-slate-400">...</span>}
                    <button
                      onClick={() => setPage(pNum)}
                      className={`w-8 h-8 rounded-lg font-bold transition-all ${
                        page === pNum
                          ? 'bg-[#007A43] text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {pNum}
                    </button>
                  </React.Fragment>
                ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Staff Profile Quick Actions & Classroom Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#007A43] flex items-center justify-center shrink-0 border border-emerald-200/80">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Personalized Educator Account Profile
            </h3>
            <p className="text-xs text-slate-500">
              Keep your profile portrait, contact number, and Khmer name updated for official printed lesson plans.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#007A43] hover:bg-[#006838] text-white text-xs font-bold rounded-2xl shadow-2xs transition-all active:scale-95 shrink-0"
        >
          <Camera className="w-4 h-4 text-amber-300" />
          <span>Update Photo & Profile Details</span>
        </button>
      </div>

      {/* User Profile Settings Modal */}
      {isProfileModalOpen && (
        <UserProfileModal onClose={() => setIsProfileModalOpen(false)} />
      )}

      {/* Teacher Plan Deletion Confirmation Modal */}
      {planToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-rose-100 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 bg-rose-100 rounded-xl">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Delete Lesson Plan</h3>
                <p className="text-xs text-slate-500">Irreversible Cloud Database Action</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-slate-900">"{planToDelete.themeTitle}"</strong> (Week {planToDelete.weekNumber} · {planToDelete.className}) from the database?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setPlanToDelete(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={async () => {
                  if (planToDelete) {
                    setIsDeleting(true);
                    try {
                      await deleteLessonPlan(planToDelete.id);
                    } finally {
                      setIsDeleting(false);
                      setPlanToDelete(null);
                    }
                  }
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Deleting from database...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Plan From Database</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
