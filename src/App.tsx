/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  CalendarClock, 
  HardHat, 
  ClipboardCheck, 
  DollarSign, 
  AlertTriangle, 
  FileText,
  Menu,
  X,
  Bell,
  Search,
  Settings,
  LayoutGrid,
  FolderOpen,
  User,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Components (to be created)
import Dashboard from './components/Dashboard';
import ProjectsTable from './components/ProjectsTable';
import Planning from './components/Planning';
import Resources from './components/Resources';
import DailyReport from './components/DailyReport';
import CostManagement from './components/CostManagement';
import AIRiskAnalysis from './components/AIRiskAnalysis';
import DocumentCentral from './components/DocumentCentral';
import Utilities from './components/Utilities';
import AIAssistant from './components/AIAssistant';

type View = 'dashboard' | 'projects' | 'planning' | 'resources' | 'reports' | 'costs' | 'risks' | 'docs' | 'utils';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'projects', label: 'Dự án', icon: FolderOpen },
    { id: 'planning', label: 'Tiến độ', icon: CalendarClock },
    { id: 'resources', label: 'Tài nguyên', icon: HardHat },
    { id: 'reports', label: 'Nhật ký', icon: ClipboardCheck },
    { id: 'costs', label: 'Chi phí', icon: DollarSign },
    { id: 'risks', label: 'Rủi ro AI', icon: AlertTriangle },
    { id: 'docs', label: 'Tài liệu', icon: FileText },
    { id: 'utils', label: 'Tiện ích', icon: LayoutGrid },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'projects': return <ProjectsTable />;
      case 'planning': return <Planning />;
      case 'resources': return <Resources />;
      case 'reports': return <DailyReport />;
      case 'costs': return <CostManagement />;
      case 'risks': return <AIRiskAnalysis />;
      case 'docs': return <DocumentCentral />;
      case 'utils': return <Utilities />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-civil-bg overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-civil-line shadow-sm">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <FolderOpen size={24} fill="currentColor" fillOpacity={0.2} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">CivilPro</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Management v5.1</p>
          </div>
        </div>
        
        <div className="flex-1 px-4 overflow-y-auto py-4">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Menu chính</p>
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <button
                id={`nav-desktop-${item.id}`}
                key={item.id}
                onClick={() => setActiveView(item.id as View)}
                className={`nav-item w-full ${
                  activeView === item.id 
                    ? 'nav-item-active shadow-sm shadow-primary/5' 
                    : 'nav-item-inactive'
                }`}
              >
                <item.icon size={20} className={activeView === item.id ? 'text-primary' : ''} />
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-civil-line bg-slate-50/50">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 border-2 border-white shadow-sm overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate uppercase">KS. Nguyễn Văn A</p>
              <p className="text-[10px] text-slate-500 font-medium truncate">Chỉ huy trưởng</p>
            </div>
            <Settings size={18} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full bg-[#F8FAFC]">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex flex-col shrink-0 sticky top-0 z-40">
          {/* Business Unit Nav */}
          <div className="h-10 flex items-center px-8 lg:px-10 border-b border-slate-100 bg-slate-50/50">
            <nav className="flex items-center gap-6">
              {['OFFICE', 'WORK', 'CRM', 'FINANCE', 'HRM', 'ADMIN'].map((unit, i) => (
                <button 
                  key={unit} 
                  className={`text-[10px] font-black tracking-[1.5px] transition-colors flex items-center gap-1 group ${
                    unit === 'WORK' ? 'text-primary' : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {unit}
                  <ChevronDown size={10} className="group-hover:translate-y-0.5 transition-transform" />
                  {i < 5 && <span className="ml-4 h-3 w-[1px] bg-slate-200"></span>}
                </button>
              ))}
            </nav>
            <div className="flex-1"></div>
            <div className="flex items-center gap-6 text-slate-400">
               <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Cloud Synced</span>
               </div>
               <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
                  <button className="p-1 hover:text-primary transition-colors"><Settings size={16} /></button>
                  <button className="p-1 hover:text-primary transition-colors relative">
                    <Bell size={16} />
                    <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
               </div>
            </div>
          </div>

          {/* Main Action Bar */}
          <div className="flex-1 flex items-center justify-between px-8 lg:px-10">
            <div className="flex items-center gap-6">
              <button 
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={20} />
              </button>
              <h2 className="text-sm font-bold text-slate-700">Danh sách dự án</h2>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
                <LayoutGrid size={14} />
                Xem nhanh
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
                <Bell size={14} />
                Tải lại
              </button>
              <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
              <button className="flex items-center gap-2 px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                <FolderOpen size={14} />
                Dự án
              </button>
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 pb-24 lg:pb-10">
          <div className="max-w-[1600px] mx-auto h-full px-2 lg:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-civil-line flex justify-around items-center h-20 px-4 z-50 rounded-t-2xl shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
          {navItems.slice(0, 4).map((item) => (
            <button
              id={`nav-mobile-${item.id}`}
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`flex flex-col items-center gap-1.5 flex-1 py-1 transition-all ${
                activeView === item.id ? 'text-primary scale-110' : 'text-slate-400'
              }`}
            >
              <item.icon size={22} className={activeView === item.id ? 'fill-primary/10' : ''} />
              <span className="text-[10px] font-bold uppercase tracking-tighter truncate w-full text-center">{item.label}</span>
            </button>
          ))}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex flex-col items-center gap-1.5 flex-1 py-1 text-slate-400"
          >
            <Menu size={22} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Thêm</span>
          </button>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[70] p-8 shadow-2xl flex flex-col"
              >
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                      <FolderOpen size={24} fill="currentColor" fillOpacity={0.2} />
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">CivilPro</h1>
                  </div>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                    <X size={24} />
                  </button>
                </div>
                
                <nav className="space-y-2 flex-1 overflow-y-auto">
                  {navItems.map((item) => (
                    <button
                      id={`drawer-nav-${item.id}`}
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id as View);
                        setIsSidebarOpen(false);
                      }}
                      className={`nav-item w-full ${
                        activeView === item.id 
                          ? 'nav-item-active shadow-sm shadow-primary/5' 
                          : 'nav-item-inactive'
                      }`}
                    >
                      <item.icon size={22} className={activeView === item.id ? 'text-primary' : ''} />
                      <span className="font-semibold text-base">{item.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="pt-8 border-t border-civil-line">
                   <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-civil-line">
                      <div className="w-12 h-12 bg-slate-200 rounded-full border-2 border-white shadow-sm overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate uppercase">KS. Nguyễn Văn A</p>
                        <p className="text-xs text-slate-500 font-medium">Chỉ huy trưởng</p>
                      </div>
                   </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
      <AIAssistant />
    </div>
  );
}
