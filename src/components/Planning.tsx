/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Filter, 
  MoreVertical,
  ChevronRight,
  Circle,
  LayoutGrid,
  Box,
  TrendingUp,
  Target,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BIMModule from './BIMModule';

export default function Planning() {
  const [viewMode, setViewMode] = useState<'list' | 'bim'>('list');
  const [tasks] = useState([
    { id: '1', name: 'Đào móng block A', status: 'DONE', priority: 'CRITICAL', progress: 100, startDate: '2026-04-01', endDate: '2026-04-15' },
    { id: '2', name: 'Đổ bê tông hầm block A', status: 'IN_PROGRESS', priority: 'HIGH', progress: 65, startDate: '2026-04-16', endDate: '2026-05-20' },
    { id: '3', name: 'Lắp dựng cốt thép sàn tầng 1', status: 'IN_PROGRESS', priority: 'HIGH', progress: 30, startDate: '2026-05-10', endDate: '2026-05-15' },
    { id: '4', name: 'Xây tường bao tầng trệt', status: 'TODO', priority: 'MEDIUM', progress: 0, startDate: '2026-05-20', endDate: '2026-06-05' },
    { id: '5', name: 'Lắp đặt hệ thống ME tầng 1', status: 'TODO', priority: 'LOW', progress: 0, startDate: '2026-06-01', endDate: '2026-06-15' },
  ]);

  const getPriorityStyle = (p: string) => {
    switch (p) {
      case 'CRITICAL': return 'text-red-600 bg-red-50';
      case 'HIGH': return 'text-orange-600 bg-orange-50';
      case 'MEDIUM': return 'text-blue-600 bg-blue-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
             <span>Quản lý</span>
             <ChevronRight size={12} />
             <span className="text-slate-900">Tiến độ & BIM</span>
          </nav>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Kế hoạch & Tiến độ</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-civil-line p-1 rounded-xl flex shadow-sm">
             <button 
               onClick={() => setViewMode('list')}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${viewMode === 'list' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-400 hover:text-slate-600'}`}
             >
                <LayoutGrid size={16} /> Danh sách
             </button>
             <button 
               onClick={() => setViewMode('bim')}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${viewMode === 'bim' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-400 hover:text-slate-600'}`}
             >
                <Box size={16} /> Mô hình BIM
             </button>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <Plus size={18} /> Hạng mục mới
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
               <div className="technical-card !p-0 overflow-hidden border-none shadow-md shadow-slate-200/50">
                  <div className="p-6 border-b border-civil-line flex justify-between items-center bg-white">
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                        <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">Danh sách hạng mục</h3>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="relative">
                           <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input type="text" placeholder="Tìm hạng mục..." className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" />
                        </div>
                        <button className="p-2 border border-civil-line rounded-xl hover:bg-slate-50">
                           <Filter size={16} className="text-slate-400" />
                        </button>
                     </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-civil-line">
                          <th className="px-8 py-4">Tên công việc</th>
                          <th className="px-8 py-4 text-center">Độ ưu tiên</th>
                          <th className="px-8 py-4">Tiến độ thi công</th>
                          <th className="px-8 py-4"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-civil-line">
                        {tasks.map(task => (
                          <tr key={task.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-6">
                              <div className="flex items-start gap-4">
                                <div className={`mt-1 p-1.5 rounded-lg ${task.status === 'DONE' ? 'bg-green-50 text-green-500' : task.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-500' : 'bg-slate-100 text-slate-300'}`}>
                                   <CheckCircle2 size={16} />
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-900 mb-1">{task.name}</p>
                                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                      <Calendar size={12} />
                                      <span>{task.startDate}</span>
                                      <ChevronRight size={10} />
                                      <span>{task.endDate}</span>
                                   </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide border-none ${getPriorityStyle(task.priority)}`}>
                                {task.priority}
                              </span>
                            </td>
                            <td className="px-8 py-6 min-w-[180px]">
                              <div className="flex items-center gap-4">
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${task.progress}%` }}
                                    transition={{ duration: 1, delay: 0.1 }}
                                    className={`h-full ${task.status === 'DONE' ? 'bg-green-500' : 'bg-primary'}`} 
                                  />
                                </div>
                                <span className="text-xs font-extrabold text-slate-900 w-8">{task.progress}%</span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <button className="p-2 hover:bg-white border rounded-xl text-slate-400 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                                <MoreVertical size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               </div>
            </div>

            <div className="space-y-8">
              <div className="technical-card !p-8 shadow-md shadow-slate-200/50 bg-white">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="font-extrabold text-slate-800 uppercase tracking-widest text-sm">Tóm tắt tiến độ</h3>
                   <TrendingUp size={20} className="text-primary" />
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dự án hiện tại</span>
                      <span className="text-lg font-black text-slate-900">45.8%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-primary rounded-full shadow-lg shadow-primary/20" style={{ width: '45.8%' }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-civil-line">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bắt đầu</p>
                      <p className="text-sm font-extrabold text-slate-900 uppercase">01/01/2026</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Kết thúc dự kiến</p>
                      <p className="text-sm font-extrabold text-slate-900 uppercase">31/12/2026</p>
                    </div>
                  </div>
                  <div className="p-5 bg-red-50 border border-red-100 rounded-2xl relative overflow-hidden group hover:bg-red-100/50 transition-colors">
                    <div className="absolute top-0 right-0 p-2 text-red-100 group-hover:text-red-200 transition-colors">
                       <AlertCircle size={40} />
                    </div>
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-[2px] mb-2">Cảnh báo AI Civil Assistant</p>
                    <p className="text-xs text-red-800 font-bold leading-relaxed relative z-10">
                      Hạng mục "Hầm block A" hiện đang trễ 5 ngày so với lịch trình phê duyệt. Hệ quả: Ảnh hưởng 12% tiến độ hoàn thiện tầng 1.
                    </p>
                  </div>
                </div>
              </div>

              <div className="technical-card !p-8 shadow-md shadow-slate-200/50 bg-white">
                 <div className="flex justify-between items-center mb-8">
                    <h3 className="font-extrabold text-slate-800 uppercase tracking-widest text-sm">Ban chỉ huy hiện trường</h3>
                    <button className="text-primary p-2 hover:bg-primary/5 rounded-xl">
                       <ArrowUpRight size={18} />
                    </button>
                 </div>
                 <div className="space-y-6">
                   {[
                     { name: 'Trần Văn B', role: 'Kỹ sư hiện trường', tasks: 3, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=B' },
                     { name: 'Lê Thị C', role: 'Kỹ sư MEP', tasks: 2, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=C' },
                     { name: 'Tổ trưởng D', role: 'Tổ nề', tasks: 4, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=D' },
                   ].map((p, i) => (
                     <div key={i} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden group-hover:scale-110 transition-transform">
                             <img src={p.img} alt={p.name} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{p.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{p.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl">
                           <Clock size={12} className="text-slate-400" />
                           <span className="text-[10px] font-black text-slate-600">{p.tasks} C.V</span>
                        </div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="bim"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full"
          >
            <BIMModule />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Search(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function FolderOpen(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 11-4 4-4-4" />
      <path d="M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H9l-2-2H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
      <path d="M12 12v5" />
    </svg>
  );
}
