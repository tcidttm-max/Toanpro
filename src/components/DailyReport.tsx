/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  CloudSun, 
  Users, 
  MapPin, 
  Plus, 
  Image as ImageIcon, 
  Mic, 
  Save,
  CheckCircle,
  FileText,
  ChevronRight,
  Send,
  MoreVertical,
  Calendar,
  AlertTriangle,
  History,
  FileDown,
  Camera,
  Cloud,
  FileUp,
  BrainCircuit
} from 'lucide-react';
import { motion } from 'motion/react';

export default function DailyReport() {
  const [report, setReport] = useState({
    weather: 'Sunny',
    temperature: '32°C',
    workers: 124,
    activities: [
      'Đổ bê tông sàn tầng 5 block A',
      'Lắp dựng cốt thép cột vách tầng 6',
      'Thi công hệ thống điện nước tầng 3'
    ],
    issues: [
      'Máy bơm bê tông gặp sự cố nhỏ lúc 10h sáng, đã khắc phục.',
      'Thiếu 2 công nhân tổ sắt nghỉ ốm.'
    ]
  });

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
             <span>Nhật ký</span>
             <ChevronRight size={12} />
             <span className="text-slate-900">Báo cáo hàng ngày</span>
          </nav>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Nhật ký thi công</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <Save size={18} /> Lưu nháp
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <Send size={18} /> Gửi báo cáo
          </button>
        </div>
      </div>

      {/* Input Sources Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
         {[
           { label: 'Tải file', icon: FileUp, color: 'bg-indigo-50 text-indigo-600', sub: 'Máy tính' },
           { label: 'Google Drive', icon: Cloud, color: 'bg-emerald-50 text-emerald-600', sub: 'Trực tuyến' },
           { label: 'Dropbox', icon: Cloud, color: 'bg-blue-50 text-blue-600', sub: 'Trực tuyến' },
           { label: 'Máy ảnh', icon: Camera, color: 'bg-rose-50 text-rose-600', sub: 'Tại chỗ' },
           { label: 'Giọng nói', icon: Mic, color: 'bg-orange-50 text-orange-600', sub: 'AI Voice' },
         ].map((source, i) => (
           <button key={i} className="technical-card !p-4 flex flex-col items-center gap-2 group hover:shadow-xl hover:shadow-slate-200/50 transition-all border-none bg-white">
              <div className={`p-3 rounded-2xl ${source.color} group-hover:scale-110 transition-transform`}>
                 <source.icon size={28} />
              </div>
              <div className="text-center">
                 <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{source.label}</p>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{source.sub}</p>
              </div>
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Thời tiết', value: `${report.weather}, ${report.temperature}`, icon: CloudSun, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Quân số', value: `${report.workers} Công nhân`, icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'Vị trí', value: 'Block A & B', icon: MapPin, color: 'text-slate-600', bg: 'bg-slate-100' },
            ].map((stat, i) => (
              <div key={i} className="technical-card !p-6 border-none shadow-md shadow-slate-200/50 bg-white group hover:translate-y-[-4px] transition-all">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 shadow-sm`}>
                  <stat.icon size={24} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-sm font-black text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Activities List */}
          <div className="technical-card !p-8 border-none shadow-xl shadow-slate-200/50 bg-white relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 relative z-10 transition-all">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <FileText size={20} />
                 </div>
                 <div>
                    <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-sm">Nội dung thi công</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Các đầu việc triển khai trong ngày</p>
                 </div>
              </div>
              <button className="p-3 bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all shadow-sm active:scale-95">
                 <Mic size={20} />
              </button>
            </div>
            
            <div className="space-y-4 relative z-10">
              {report.activities.map((act, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 items-start p-4 bg-slate-50/50 border border-slate-100 rounded-2xl group hover:bg-white hover:border-primary/20 hover:shadow-lg hover:shadow-slate-200/50 transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black text-slate-400 group-hover:text-primary group-hover:border-primary/30 transition-all">
                    {i+1}
                  </div>
                  <p className="text-sm font-bold text-slate-700 flex-1 leading-relaxed mt-1.5">{act}</p>
                  <button className="p-2 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                     <Plus size={16} className="rotate-45" />
                  </button>
                </motion.div>
              ))}
              <button className="w-full py-5 border-2 border-dashed border-slate-100 text-[11px] uppercase font-black tracking-[2px] text-slate-400 hover:text-primary hover:border-primary/20 hover:bg-primary/5 rounded-2xl transition-all flex items-center justify-center gap-3">
                <Plus size={18} /> Thêm công việc mới
              </button>
            </div>
          </div>

          {/* Issues List */}
          <div className="technical-card !p-8 border-none border-l-4 border-l-red-500 shadow-xl shadow-red-200/20 bg-white relative overflow-hidden">
             <div className="flex items-center gap-3 mb-6">
                <AlertTriangle size={24} className="text-red-500" />
                <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-sm text-red-600">Sự cố & Rủi ro</h3>
             </div>
             <div className="space-y-4">
                {report.issues.map((issue, i) => (
                  <div key={i} className="text-sm p-5 bg-red-50/50 border border-red-100 rounded-2xl text-slate-700 italic flex gap-4">
                     <span className="text-red-300 text-3xl font-serif leading-none">“</span>
                     <p className="mt-2 font-medium">{issue}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           {/* Media Card */}
           <div className="technical-card !p-8 shadow-xl shadow-slate-200/50 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-sm">Hình ảnh hiện trường</h3>
                <button className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all shadow-sm">
                  <Plus size={18} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                 {[1,2,3].map(i => (
                    <div key={i} className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 relative group overflow-hidden shadow-sm">
                       <ImageIcon size={32} className="group-hover:scale-110 group-hover:text-primary transition-all duration-500" />
                       <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center flex-col gap-2">
                          <button className="p-2 bg-white text-primary rounded-lg shadow-xl active:scale-90 transition-all">
                             <ChevronRight size={16} />
                          </button>
                          <span className="text-[10px] text-white font-black uppercase tracking-widest">Xem ảnh</span>
                       </div>
                    </div>
                 ))}
                 <button className="aspect-square border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all group shadow-sm">
                    <div className="p-2 bg-slate-50 group-hover:bg-primary/10 rounded-xl transition-all">
                       <Plus size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Tải lên</span>
                 </button>
              </div>
           </div>

           {/* AI Construction Intelligence (Image 07 Theme) */}
           <div className="technical-card !p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-none shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="w-20 h-20 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/50 transition-all duration-500 shadow-xl">
                    <BrainCircuit size={40} className="text-primary animate-pulse" />
                 </div>
                 <h3 className="font-extrabold text-sm uppercase tracking-[3px] mb-2 text-primary">Tích hợp công nghệ AI</h3>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Trợ lý ảo thông minh 24/7</p>
                 
                 <div className="space-y-3 w-full mb-8">
                    {[
                      { label: 'Voice AI, tạo ghi chú bằng giọng nói', icon: Mic },
                      { label: 'AI nhận diện dữ liệu hình ảnh', icon: ImageIcon },
                      { label: 'AI tạo phiếu thu/chi, vật tư', icon: FileText }
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all text-left">
                        <feat.icon size={16} className="text-primary-light" />
                        <span className="text-[11px] font-medium text-slate-300">{feat.label}</span>
                      </div>
                    ))}
                 </div>

                 <button className="w-full py-4 bg-primary text-white font-black uppercase tracking-[2px] text-xs rounded-2xl shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
                    Kích hoạt AI Assistant
                 </button>
              </div>
           </div>

           {/* Related Reports */}
           <div className="technical-card !p-8 shadow-xl shadow-slate-200/50 bg-white">
              <div className="flex items-center gap-3 mb-8">
                 <History size={18} className="text-primary" />
                 <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-sm">Lịch sử báo cáo</h3>
              </div>
              <div className="space-y-6">
                 {[
                   { name: 'Nghiệm thu sàn tầng 4', time: '14:30', date: 'Hôm qua', type: 'PDF' },
                   { name: 'Danh sách nhân nhân tổ nề', time: '09:00', date: '08/05/2026', type: 'XLS' }
                 ].map((doc, i) => (
                   <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className={`w-12 h-12 ${doc.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'} rounded-2xl flex items-center justify-center font-black text-xs shadow-sm group-hover:scale-110 transition-all`}>
                         {doc.type}
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-sm font-bold text-slate-900 truncate group-hover:text-primary transition-colors mb-0.5">{doc.name}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <Calendar size={10} /> {doc.date}
                           <span className="opacity-30">•</span>
                           {doc.time}
                         </p>
                      </div>
                      <button className="p-2 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-slate-900 transition-all">
                         <FileDown size={18} />
                      </button>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-10 py-4 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[2px] rounded-2xl hover:bg-slate-100 hover:text-slate-600 transition-all">
                 Xem tất cả báo cáo
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
