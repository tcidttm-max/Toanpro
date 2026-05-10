/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  Zap,
  FolderOpen
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ProjectsTable() {
  const [projects] = useState([
    { id: '1', name: 'Chung cư Blue Sky', type: 'Dân dụng', status: 'Đang thực hiện', progress: 68, budget: '540 Tỷ', spent: '245 Tỷ', manager: 'Trần Văn A', color: 'blue' },
    { id: '2', name: 'Cầu vượt Tân Bình', type: 'Giao thông', status: 'Đang thực hiện', progress: 42, budget: '1,200 Tỷ', spent: '520 Tỷ', manager: 'Lê Thế B', color: 'blue' },
    { id: '3', name: 'Nhà máy TechPro', type: 'Công nghiệp', status: 'Lên kế hoạch', progress: 5, budget: '850 Tỷ', spent: '12 Tỷ', manager: 'Nguyễn Văn C', color: 'slate' },
    { id: '4', name: 'Khu biệt thự Sunny', type: 'Dân dụng', status: 'Tạm dừng', progress: 85, budget: '320 Tỷ', spent: '310 Tỷ', manager: 'Phạm Minh D', color: 'orange' },
    { id: '5', name: 'Bệnh viện Đa khoa Tỉnh', type: 'Công trình công cộng', status: 'Hoàn thành', progress: 100, budget: '450 Tỷ', spent: '442 Tỷ', manager: 'Vũ Hoàng E', color: 'green' },
  ]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Đang thực hiện': return 'bg-blue-50 text-blue-600';
      case 'Tạm dừng': return 'bg-orange-50 text-orange-600';
      case 'Hoàn thành': return 'bg-green-50 text-green-600';
      case 'Lên kế hoạch': return 'bg-slate-50 text-slate-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
             <span>Danh mục</span>
             <ChevronRight size={12} />
             <span className="text-slate-900">Dự án</span>
          </nav>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Danh mục dự án</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-civil-line text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} /> Lọc kết quả
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <Plus size={18} /> Thêm dự án mới
          </button>
        </div>
      </div>

      <div className="technical-card p-0 overflow-hidden border-none shadow-md shadow-slate-200/50">
        <div className="p-6 border-b border-civil-line flex flex-col sm:flex-row gap-6 justify-between bg-white">
          <div className="max-w-md w-full relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Tìm kiến dự án, hồ sơ..." 
                className="w-full bg-slate-100 border-none pl-12 pr-4 py-3 rounded-xl text-sm outline-none ring-primary/20 focus:ring-2 focus:bg-white transition-all"
              />
          </div>
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
             <span className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg"><CheckCircle2 size={14} /> 5 Đang chạy</span>
             <span className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg"><Clock size={14} /> 2 Chuẩn bị</span>
             <span className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg"><AlertTriangle size={14} /> 1 Chậm trễ</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[11px] font-bold uppercase tracking-widest border-b border-civil-line">
                <th className="px-8 py-4">Tên dự án & Loại hình</th>
                <th className="px-8 py-4 text-center">Trạng thái</th>
                <th className="px-8 py-4">Ban quản lý</th>
                <th className="px-8 py-4 text-right">Chi phí / Ngân sách</th>
                <th className="px-8 py-4">Tiến độ</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-civil-line">
              {projects.map(project => (
                <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
                          <FolderOpen size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-900 mb-1">{project.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{project.type}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border-none uppercase tracking-wide ${getStatusStyle(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${project.manager}`} alt="m" />
                       </div>
                       <p className="text-xs font-bold text-slate-700">{project.manager}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <p className="text-sm font-extrabold text-slate-900 tracking-tight">{project.spent}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">HĐ: {project.budget}</p>
                  </td>
                  <td className="px-8 py-6 min-w-[140px]">
                    <div className="flex items-center gap-3">
                       <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className={`h-full ${project.progress >= 80 ? 'bg-green-500' : project.progress >= 40 ? 'bg-primary' : 'bg-orange-500'}`} 
                          />
                       </div>
                       <span className="text-xs font-extrabold text-slate-900 w-8">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white border hover:border-civil-line rounded-lg text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                        <ExternalLink size={18} />
                      </button>
                      <button className="p-2 hover:bg-white border hover:border-civil-line rounded-lg text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="technical-card !p-8 shadow-md shadow-slate-200/50">
            <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                  <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">Cộng tác dự án</h3>
               </div>
               <button className="text-xs font-extrabold text-primary hover:underline">Tất cả hội thoại</button>
            </div>
            <div className="space-y-6">
               {[
                 { user: 'KS. Hoàng', msg: 'Vật tư Blue Sky đã về đủ đợt 3, đề xuất nhập kho ngay.', time: '10p trước', project: 'Blue Sky' },
                 { user: 'Chỉ huy B', msg: 'Cần kiểm tra lại cốt thép Cầu vượt Tân Bình, có nghi ngờ thiếu hụt.', time: '25p trước', project: 'Cầu Tân Bình' }
               ].map((m, i) => (
                 <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-all">
                    <div className="w-10 h-10 shrink-0 bg-white shadow-sm border border-slate-200 rounded-xl flex items-center justify-center">
                       <MessageSquare size={18} className="text-primary" />
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-bold text-slate-900">{m.user}</p>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-2 py-0.5 rounded-md border border-slate-200">{m.project}</span>
                       </div>
                       <p className="text-xs text-slate-600 leading-relaxed italic mb-2">"{m.msg}"</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{m.time}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
         <div className="technical-card !p-8 bg-slate-900 border-none shadow-xl shadow-slate-900/10 text-white overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary opacity-20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-primary/20 text-primary rounded-xl">
                     <Zap size={24} />
                  </div>
                  <h3 className="font-extrabold text-lg uppercase tracking-widest">AI Điều phối tổng thể</h3>
               </div>
               <p className="text-sm leading-relaxed italic text-slate-400 font-medium mb-8">
                 "Dựa trên dữ liệu thời gian thực, AI đề xuất điều chuyển 1 máy xúc Komatsu từ dự án Blue Sky sang Cầu vượt Tân Bình vào sáng mai. Blue Sky đang ổn định còn Tân Bình đang san lấp khẩn cấp."
               </p>
               <div className="flex gap-4">
                  <button className="flex-1 bg-primary text-white py-3.5 rounded-xl font-extrabold uppercase tracking-widest text-xs shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Chấp nhận điều phối
                  </button>
                  <button className="flex-1 bg-white/10 text-white border border-white/20 py-3.5 rounded-xl font-extrabold uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                    Chi tiết lý do
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
