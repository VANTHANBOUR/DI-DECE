import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { UserAccount, CAMPUS_LIST, LessonPlan } from '../types';
import { UserAvatar } from './UserAvatar';
import { StaffManagementModal } from './StaffManagementModal';
import { formatDateRange } from '../utils/dateUtils';
import { getTeacherLessonPlans } from '../utils/teacherUtils';
import { 
  Users, 
  Search, 
  School, 
  BookOpen, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  UserPlus, 
  Edit3, 
  Eye, 
  Filter, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Sparkles,
  Download,
  Calendar,
  Layers,
  Printer,
  FileText,
  AlertTriangle,
  FolderOpen,
  X,
  ExternalLink,
  ChevronRight,
  Briefcase
} from 'lucide-react';

interface TeachersDirectoryProps {
  onSelectPlan: (plan: LessonPlan, autoPrint?: boolean) => void;
  onOpenNewTeacher: () => void;
}

export const TeachersDirectory: React.FC<TeachersDirectoryProps> = ({
  onSelectPlan,
  onOpenNewTeacher,
}) => {
  const { 
    allAccounts, 
    lessonPlans, 
    classrooms, 
    currentUser, 
    formatAgeGroup,
    showToast 
  } = useApp();

  const [campusFilter, setCampusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewStyle, setViewStyle] = useState<'cards' | 'works_matrix' | 'table'>('cards');
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [selectedTeacherForPortfolio, setSelectedTeacherForPortfolio] = useState<UserAccount | null>(null);

  // Filtered staff list
  const filteredStaff = useMemo(() => {
    return allAccounts.filter((acc) => {
      // Campus filter
      if (campusFilter !== 'all') {
        const matchPrimary = acc.campusId === campusFilter;
        const matchReg = acc.registeredCampusIds?.includes(campusFilter as any);
        if (!matchPrimary && !matchReg && acc.campusId !== 'ALL') {
          return false;
        }
      }

      // Role filter
      if (roleFilter !== 'all' && acc.role !== roleFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = acc.name.toLowerCase().includes(q);
        const matchKhmer = acc.khmerName?.toLowerCase().includes(q) || false;
        const matchEmail = acc.email.toLowerCase().includes(q);
        const matchTitle = acc.title.toLowerCase().includes(q);
        const matchClass = acc.assignedClassName?.toLowerCase().includes(q) || false;
        const matchRoom = acc.roomNumber?.toLowerCase().includes(q) || false;
        if (!matchName && !matchKhmer && !matchEmail && !matchTitle && !matchClass && !matchRoom) {
          return false;
        }
      }

      return true;
    });
  }, [allAccounts, campusFilter, roleFilter, searchQuery]);

  const teachersOnly = allAccounts.filter(a => a.role === 'teacher');
  const officersOnly = allAccounts.filter(a => a.role === 'academic_officer');
  const adminsOnly = allAccounts.filter(a => a.role === 'admin');

  // Helper to retrieve all lesson plans submitted by a specific staff member
  const getTeacherPlans = (staff: UserAccount): LessonPlan[] => {
    return getTeacherLessonPlans(lessonPlans, staff);
  };

  const getStatusBadge = (status: LessonPlan['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-[10px] font-extrabold">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
            Approved
          </span>
        );
      case 'revision_requested':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[10px] font-extrabold animate-pulse">
            <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
            Revision
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 border border-blue-200 rounded-full text-[10px] font-bold">
            <Clock className="w-2.5 h-2.5 text-blue-600" />
            Submitted
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-800 border border-purple-200 rounded-full text-[10px] font-bold">
            <Clock className="w-2.5 h-2.5 text-purple-600" />
            In Review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-full text-[10px] font-bold">
            Draft
          </span>
        );
    }
  };

  // Export faculty roster
  const exportRosterCsv = () => {
    const headers = ['Full Name', 'Khmer Name', 'Role', 'Title', 'Campus', 'Assigned Class', 'Email', 'Phone', 'Room', 'Submitted Plans Count'];
    const rows = filteredStaff.map(s => {
      const planCount = getTeacherPlans(s).length;
      return [
        `"${s.name}"`,
        `"${s.khmerName || ''}"`,
        `"${s.role}"`,
        `"${s.title}"`,
        `"${s.campusName || s.campusId || 'Central HQ'}"`,
        `"${s.assignedClassName || ''}"`,
        `"${s.email}"`,
        `"${s.phone || ''}"`,
        `"${s.roomNumber || ''}"`,
        `"${planCount}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Dewey_Faculty_Roster_and_Works_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Faculty roster & works summary exported to CSV successfully.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#007A43] font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Central Academic Faculty</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                {allAccounts.length} Total Registered Personnel
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-950 font-bold text-xs">
                {lessonPlans.length} Total Submitted Works
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
              Registered Teachers & Submitted Works Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
              Complete institutional roster of certified early childhood lead teachers, curriculum coordinators, and academic review officers across all 7 Dewey campuses, including all their submitted weekly lesson plans.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={exportRosterCsv}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all shadow-2xs"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export Roster & Works (CSV)</span>
            </button>

            <button
              onClick={onOpenNewTeacher}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#007A43] hover:bg-[#006338] text-white font-extrabold text-xs rounded-2xl shadow-md transition-all active:scale-95"
            >
              <UserPlus className="w-4 h-4 text-amber-300" />
              <span>+ Register New Teacher</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Count Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
          <div 
            onClick={() => setRoleFilter('teacher')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              roleFilter === 'teacher' ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20' : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Lead Teachers</span>
              <GraduationCap className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{teachersOnly.length}</p>
            <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">Early Childhood Lead Educators</p>
          </div>

          <div 
            onClick={() => setRoleFilter('academic_officer')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              roleFilter === 'academic_officer' ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-500/20' : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Review Officers</span>
              <Award className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-blue-900 mt-1">{officersOnly.length}</p>
            <p className="text-[10px] text-blue-700 font-semibold mt-0.5">Curriculum & Standards Quality</p>
          </div>

          <div 
            onClick={() => setRoleFilter('admin')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              roleFilter === 'admin' ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500/20' : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Administration</span>
              <ShieldCheck className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-amber-900 mt-1">{adminsOnly.length}</p>
            <p className="text-[10px] text-amber-700 font-semibold mt-0.5">School Principals & Directors</p>
          </div>

          <div 
            onClick={() => setRoleFilter('all')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              roleFilter === 'all' ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-400/20' : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Total Works Submitted</span>
              <BookOpen className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-purple-900 mt-1">{lessonPlans.length}</p>
            <p className="text-[10px] text-purple-700 font-semibold mt-0.5">All 10 Plans Active</p>
          </div>
        </div>

        {/* Filter Controls Bar & View Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Campus Selector */}
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <select
                value={campusFilter}
                onChange={(e) => setCampusFilter(e.target.value)}
                className="text-xs font-bold py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:outline-emerald-600"
              >
                <option value="all">🏢 All 7 Campuses</option>
                {CAMPUS_LIST.filter(c => c.id !== 'ALL').map(c => (
                  <option key={c.id} value={c.id}>{c.shortName} ({c.brand})</option>
                ))}
              </select>
            </div>

            {/* Role Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[
                { id: 'all', label: `All (${allAccounts.length})` },
                { id: 'teacher', label: `Teachers (${teachersOnly.length})` },
                { id: 'academic_officer', label: `Reviewers (${officersOnly.length})` },
                { id: 'admin', label: `Principals (${adminsOnly.length})` }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setRoleFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    roleFilter === tab.id
                      ? 'bg-white text-[#007A43] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View Style Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewStyle('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewStyle === 'cards'
                    ? 'bg-white text-[#007A43] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Roster Cards</span>
              </button>

              <button
                onClick={() => setViewStyle('works_matrix')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewStyle === 'works_matrix'
                    ? 'bg-white text-purple-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-purple-600" />
                <span>Works Matrix ({lessonPlans.length})</span>
              </button>

              <button
                onClick={() => setViewStyle('table')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewStyle === 'table'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Roster Table</span>
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search teacher, class, email..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* Roster Views */}
      {filteredStaff.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3 shadow-2xs">
          <Users className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No faculty members found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or reset filters to view all registered teachers and staff.
          </p>
          <button
            onClick={() => {
              setCampusFilter('all');
              setRoleFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#007A43] hover:bg-[#006338] text-white text-xs font-bold rounded-xl shadow-xs transition-all"
          >
            Reset Filters & View All 7 Teachers & Staff
          </button>
        </div>
      ) : viewStyle === 'cards' ? (
        /* Cards View with Attached Works Preview */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((staff) => {
            const campus = CAMPUS_LIST.find(c => c.id === staff.campusId);
            const staffPlans = getTeacherPlans(staff);
            const approvedPlansCount = staffPlans.filter(p => p.status === 'approved').length;

            return (
              <div 
                key={staff.id}
                className="bg-white rounded-3xl border border-slate-200/80 hover:border-emerald-300 transition-all p-5 sm:p-6 shadow-2xs hover:shadow-md flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-4">
                  {/* Avatar, Name, and Role Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <UserAvatar 
                        src={staff.avatar} 
                        name={staff.name} 
                        className="w-14 h-14 rounded-2xl ring-2 ring-emerald-500/20 shadow-xs shrink-0" 
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-black text-slate-900 truncate group-hover:text-[#007A43] transition-colors">
                            {staff.name}
                          </h3>
                          {staff.id === currentUser?.id && (
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 shrink-0">
                              You
                            </span>
                          )}
                        </div>
                        {staff.khmerName && (
                          <p className="text-xs text-slate-500 font-['Battambang'] leading-tight mt-0.5">
                            {staff.khmerName}
                          </p>
                        )}
                        <span className="text-[11px] font-bold text-emerald-800 line-clamp-1 mt-0.5">
                          {staff.title}
                        </span>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shrink-0 ${
                      staff.role === 'admin'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : staff.role === 'academic_officer'
                        ? 'bg-blue-100 text-blue-900 border border-blue-300'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {staff.role === 'academic_officer' ? 'Academic Officer' : staff.role}
                    </span>
                  </div>

                  {/* Campus & Classroom Assignment */}
                  <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 text-xs border border-slate-100">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400 font-medium">Campus:</span>
                      <span className="font-bold text-slate-900 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                        {campus?.shortName || staff.campusName || 'Central HQ (All Campuses)'}
                      </span>
                    </div>

                    {staff.role === 'teacher' && staff.assignedClassName && (
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400 font-medium">Class & Level:</span>
                        <span className="font-bold text-slate-900 flex items-center gap-1">
                          <School className="w-3.5 h-3.5 text-amber-600" />
                          {staff.assignedClassName} · {formatAgeGroup(staff.ageGroup || '', staff.campusId)}
                        </span>
                      </div>
                    )}

                    {staff.roomNumber && (
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400 font-medium">Room:</span>
                        <span className="font-semibold text-slate-800 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          {staff.roomNumber}
                        </span>
                      </div>
                    )}

                    {(() => {
                      const officeMate = allAccounts.find(a => a.id !== staff.id && a.campusId === staff.campusId && a.roomNumber === staff.roomNumber);
                      if (!officeMate) return null;
                      return (
                        <div className="flex items-center justify-between text-slate-600 bg-emerald-50/60 p-1.5 rounded-xl border border-emerald-200/60">
                          <span className="text-emerald-800 font-bold text-[11px] flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                            Office Mate:
                          </span>
                          <span className="font-bold text-emerald-950 text-[11px]">
                            {officeMate.name}
                          </span>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Submitted Works Section (Directly on the Teacher Card) */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Submitted Works ({staffPlans.length})</span>
                      </span>
                      {approvedPlansCount > 0 && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full">
                          {approvedPlansCount} Approved
                        </span>
                      )}
                    </div>

                    {staffPlans.length === 0 ? (
                      <div className="p-3 bg-slate-50 rounded-xl text-center text-xs text-slate-400 border border-dashed border-slate-200">
                        {staff.role === 'teacher' ? 'No lesson plans submitted yet.' : 'Central review oversight role.'}
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {staffPlans.slice(0, 2).map(plan => (
                          <div 
                            key={plan.id}
                            className="p-2.5 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200/80 transition-colors flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-[#007A43]">
                                  W{plan.weekNumber}
                                </span>
                                <span className="text-xs font-bold text-slate-900 truncate block">
                                  {plan.themeTitle}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                {plan.className} · {formatDateRange(plan.startDate, plan.endDate, ' - ')}
                              </p>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              {getStatusBadge(plan.status)}
                              <button
                                onClick={() => onSelectPlan(plan)}
                                className="p-1 text-slate-400 hover:text-emerald-700 hover:bg-white rounded-lg transition-colors"
                                title="View Plan Detail"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => onSelectPlan(plan, true)}
                                className="p-1 text-slate-400 hover:text-emerald-700 hover:bg-white rounded-lg transition-colors"
                                title="Print Sheet Preview"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {staffPlans.length > 2 && (
                          <button
                            onClick={() => setSelectedTeacherForPortfolio(staff)}
                            className="w-full text-center py-1 text-[11px] font-bold text-[#007A43] hover:text-[#006338] hover:underline block"
                          >
                            + View {staffPlans.length - 2} more submitted plan(s)...
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedTeacherForPortfolio(staff)}
                    className="px-3 py-1.5 bg-[#007A43] hover:bg-[#006338] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-amber-300" />
                    <span>View Full Portfolio & Works</span>
                  </button>

                  <button
                    onClick={() => setEditingUser(staff)}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                    title="Edit Staff Information"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : viewStyle === 'works_matrix' ? (
        /* Works Matrix View: Grouped by Teacher */
        <div className="space-y-6">
          {filteredStaff.map((staff) => {
            const staffPlans = getTeacherPlans(staff);
            const campus = CAMPUS_LIST.find(c => c.id === staff.campusId);

            return (
              <div 
                key={staff.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-4"
              >
                {/* Teacher Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <UserAvatar 
                      src={staff.avatar} 
                      name={staff.name} 
                      className="w-12 h-12 rounded-2xl ring-2 ring-emerald-500/20 shrink-0" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-slate-900">{staff.name}</h3>
                        {staff.khmerName && (
                          <span className="text-xs text-slate-500 font-['Battambang']">({staff.khmerName})</span>
                        )}
                        <span className={`text-[10px] font-black uppercase px-2 py-0.2 rounded-full ${
                          staff.role === 'admin'
                            ? 'bg-amber-100 text-amber-900'
                            : staff.role === 'academic_officer'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {staff.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {staff.title} · <span className="font-bold text-slate-700">{campus?.shortName || staff.campusName || 'Central HQ'}</span> · {staff.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#007A43] bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                      {staffPlans.length} Total Submissions
                    </span>
                    <button
                      onClick={() => setSelectedTeacherForPortfolio(staff)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                    >
                      Portfolio Profile
                    </button>
                  </div>
                </div>

                {/* Grid of all works submitted by this teacher */}
                {staffPlans.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">No lesson plan submissions recorded for this educator.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {staffPlans.map(plan => (
                      <div 
                        key={plan.id}
                        className="bg-slate-50 hover:bg-emerald-50/40 rounded-2xl border border-slate-200 p-4 transition-all flex flex-col justify-between space-y-3 group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2 py-0.5 bg-emerald-100 text-[#007A43] font-black text-xs rounded-lg">
                              Week {plan.weekNumber}
                            </span>
                            {getStatusBadge(plan.status)}
                          </div>

                          <div>
                            <h4 
                              onClick={() => onSelectPlan(plan)}
                              className="text-sm font-bold text-slate-900 group-hover:text-[#007A43] cursor-pointer transition-colors line-clamp-2"
                            >
                              {plan.themeTitle}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                              {plan.themeDescription || 'Early childhood trilingual learning plan.'}
                            </p>
                          </div>

                          <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2 pt-1">
                            <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                              {plan.className} ({formatAgeGroup(plan.ageGroup, plan.campusId)})
                            </span>
                            <span>·</span>
                            <span>{formatDateRange(plan.startDate, plan.endDate, ' to ')}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-2">
                          <button
                            onClick={() => onSelectPlan(plan, true)}
                            className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                          >
                            <Printer className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Print Preview</span>
                          </button>

                          <button
                            onClick={() => onSelectPlan(plan)}
                            className="flex items-center gap-1 text-xs font-bold text-[#007A43] hover:text-[#006338]"
                          >
                            <span>View Plan</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Roster Table View */
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Faculty Member</th>
                  <th className="py-3.5 px-4">Position & Role</th>
                  <th className="py-3.5 px-4">Campus & Class</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Works Submitted</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStaff.map((staff) => {
                  const campus = CAMPUS_LIST.find(c => c.id === staff.campusId);
                  const staffPlans = getTeacherPlans(staff);

                  return (
                    <tr key={staff.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar src={staff.avatar} name={staff.name} className="w-10 h-10 rounded-xl ring-1 ring-emerald-500/20 shrink-0" />
                          <div>
                            <p className="font-extrabold text-slate-900 text-xs">{staff.name}</p>
                            {staff.khmerName && (
                              <p className="text-[11px] text-slate-500 font-['Battambang']">{staff.khmerName}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-800">{staff.title}</p>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.2 rounded-full inline-block mt-0.5 ${
                          staff.role === 'admin'
                            ? 'bg-amber-100 text-amber-900'
                            : staff.role === 'academic_officer'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {staff.role}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{campus?.shortName || staff.campusName || 'Central HQ'}</p>
                        {staff.assignedClassName && (
                          <p className="text-[11px] text-slate-500">{staff.assignedClassName} · {formatAgeGroup(staff.ageGroup || '', staff.campusId)}</p>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="text-slate-700">{staff.email}</p>
                        <p className="text-[10px] text-slate-400">{staff.phone || staff.roomNumber || ''}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                            {staffPlans.length} Plans
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedTeacherForPortfolio(staff)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors"
                          >
                            Works
                          </button>
                          <button
                            onClick={() => setEditingUser(staff)}
                            className="p-1 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Teacher Portfolio & Works Modal */}
      {selectedTeacherForPortfolio && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <UserAvatar 
                  src={selectedTeacherForPortfolio.avatar} 
                  name={selectedTeacherForPortfolio.name} 
                  className="w-16 h-16 rounded-2xl ring-2 ring-emerald-500/20 shadow-xs shrink-0" 
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900 font-['Outfit']">
                      {selectedTeacherForPortfolio.name}
                    </h2>
                    {selectedTeacherForPortfolio.khmerName && (
                      <span className="text-sm font-['Battambang'] text-slate-600">
                        ({selectedTeacherForPortfolio.khmerName})
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-emerald-800 mt-0.5">
                    {selectedTeacherForPortfolio.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Campus: <span className="font-bold text-slate-800">{selectedTeacherForPortfolio.campusName || selectedTeacherForPortfolio.campusId || 'Central HQ'}</span> · Room: {selectedTeacherForPortfolio.roomNumber || 'Classroom Wing'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedTeacherForPortfolio(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Teacher Bio & Contacts */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Institutional Email:</span>
                <span className="font-bold text-slate-800">{selectedTeacherForPortfolio.email}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Phone Contact:</span>
                <span className="font-bold text-slate-800">{selectedTeacherForPortfolio.phone || '+855 (0) 12 345 000'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Class Allocation:</span>
                <span className="font-bold text-slate-800">{selectedTeacherForPortfolio.assignedClassName || 'Pre-School / Kindergarten'}</span>
              </div>
            </div>

            {/* Submitted Lesson Plans List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#007A43]" />
                  <span>All Lesson Plan Submissions ({getTeacherPlans(selectedTeacherForPortfolio).length})</span>
                </h3>
              </div>

              {getTeacherPlans(selectedTeacherForPortfolio).length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                  <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold text-slate-600">No submitted lesson plans on record for this educator.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {getTeacherPlans(selectedTeacherForPortfolio).map((plan) => (
                    <div 
                      key={plan.id}
                      className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all shadow-2xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-emerald-100 text-[#007A43] font-black text-xs rounded-lg">
                            Week {plan.weekNumber}
                          </span>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-xs font-semibold text-slate-600">
                            {formatDateRange(plan.startDate, plan.endDate, ' to ')}
                          </span>
                          {getStatusBadge(plan.status)}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedTeacherForPortfolio(null);
                              onSelectPlan(plan, true);
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors"
                          >
                            <Printer className="w-3.5 h-3.5 text-emerald-200" />
                            <span>Print Preview</span>
                          </button>

                          <button
                            onClick={() => {
                              setSelectedTeacherForPortfolio(null);
                              onSelectPlan(plan);
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Full Plan</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-base font-black text-slate-900">
                          {plan.themeTitle}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1">
                          {plan.themeDescription}
                        </p>
                      </div>

                      {/* Learning Centers tags */}
                      {plan.learningCenters && plan.learningCenters.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Learning Centers:</span>
                          {plan.learningCenters.map((lc, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                              {lc.centerName}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedTeacherForPortfolio(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Close Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Management Modal for Editing Staff */}
      {editingUser && (
        <StaffManagementModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  );
};
