/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  FileText, 
  Search, 
  Upload, 
  Folder, 
  MoreVertical, 
  FileCode,
  FileBox,
  ExternalLink,
  ChevronRight,
  Filter,
  Download,
  Share2,
  Clock,
  LayoutGrid,
  List,
  Plus,
  Cloud,
  Database
} from 'lucide-react';
import { motion } from 'motion/react';

export default function DocumentCentral() {
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  const [documents] = useState([
    { id: '1', name: 'Ban_ve_thi_cong_Block_A_T1.dwg', type: 'dwg', size: '12.4 MB', date: '2026-05-01', version: 'v2.1', category: 'Bản vẽ CAD' },
    { id: '2', name: 'Giay_phep_xay_dung_bo_sung.pdf', type: 'pdf', size: '2.1 MB', date: '2026-04-20', version: 'v1.0', category: 'Pháp lý' },
    { id: '3', name: 'Thuyet_minh_bien_phap_thi_cong.docx', type: 'docx', size: '4.5 MB', date: '2026-05-05', version: 'v1.5', category: 'Kỹ thuật' },
    { id: '4', name: 'Mo_hinh_BIM_S04_Concrete.ifc', type: 'ifc', size: '124.8 MB', date: '2026-05-09', version: 'v4.0', category: 'BIM Models' },
    { id: '5', name: 'Du_toan_chi_tiet_goi_thau_2.xlsx', type: 'xlsx', size: '8.2 MB', date: '2026-05-02', version: 'v3.2', category: 'Hợp đồng' },
  ]);

  const categories = ['Tất cả', 'Bản vẽ CAD', 'Pháp lý', 'Hợp đồng', 'BIM Models', 'Kỹ thuật'];

  const getIcon = (type: string) => {
    switch (type) {
      case 'dwg': return <FileCode size={20} className="text-blue-500" />;
      case 'ifc': return <FileBox size={20} className="text-orange-500" />;
      case 'pdf': return <FileText size={20} className="text-red-500" />;
      default: return <FileText size={20} className="text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
             <span>Kho lưu trữ</span>
             <ChevronRight size={12} />
             <span className="text-slate-900">Quản lý hồ sơ</span>
          </nav>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Kho tài liệu dự án</h2>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <Plus size={16} /> Thư mục
           </button>
           <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
           <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-600 text-[10px] uppercase font-black tracking-widest rounded-xl border border-emerald-100 hover:bg-emerald-100 transition-all shadow-sm">
              <Cloud size={16} /> Drive
           </button>
           <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 text-[10px] uppercase font-black tracking-widest rounded-xl border border-blue-100 hover:bg-blue-100 transition-all shadow-sm">
              <Cloud size={16} /> Dropbox
           </button>
           <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
              <Upload size={16} /> Tải hồ sơ
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
           <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map((cat, i) => (
                  <button 
                    key={i} 
                    className={`whitespace-nowrap px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl border transition-all ${
                      i === 0 ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900 shadow-sm'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="hidden sm:flex items-center gap-1 bg-white p-1 border border-slate-200 rounded-xl shadow-sm">
                 <button 
                  onClick={() => setViewType('list')}
                  className={`p-1.5 rounded-lg transition-all ${viewType === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                    <List size={16} />
                 </button>
                 <button 
                  onClick={() => setViewType('grid')}
                  className={`p-1.5 rounded-lg transition-all ${viewType === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                    <LayoutGrid size={16} />
                 </button>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                 <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                  type="text" 
                  placeholder="Tìm kiếm theo tên hồ sơ, định dạng, kỹ sư phụ trách..." 
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm" 
                 />
              </div>
              <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm">
                 <Filter size={20} />
              </button>
           </div>

           <div className="technical-card !p-0 overflow-hidden border-none shadow-xl shadow-slate-200/50 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                      <th className="px-8 py-4">Tên tài liệu</th>
                      <th className="px-8 py-4">Bản hiệu lực</th>
                      <th className="px-8 py-4">Phân loại</th>
                      <th className="px-8 py-4">Ngày cập nhật</th>
                      <th className="px-8 py-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {documents.map(doc => (
                      <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4 min-w-[300px]">
                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                               {getIcon(doc.type)}
                            </div>
                            <div className="min-w-0">
                               <p className="text-sm font-bold text-slate-900 truncate tracking-tight mb-1">{doc.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.size} • {doc.type.toUpperCase()}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-lg uppercase border border-slate-200">{doc.version}</span>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{doc.category}</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Clock size={12} />
                            <p className="text-xs font-bold font-mono">{doc.date}</p>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                             <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                                <Download size={16} />
                             </button>
                             <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                                <Share2 size={16} />
                             </button>
                             <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                                <MoreVertical size={16} />
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        </div>

        <div className="w-full lg:w-80 space-y-8">
           <div className="technical-card !p-8 shadow-md shadow-slate-200/50 bg-white">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                 <Folder size={18} className="text-primary" />
                 Truy cập nhanh
              </h3>
              <div className="space-y-4">
                 <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl group cursor-pointer hover:border-primary/30 transition-all">
                    <p className="text-sm font-bold text-slate-900 mb-1">Mô hình BIM Online</p>
                    <p className="text-[11px] text-slate-400 font-medium mb-4 leading-relaxed">Phân tích khối lượng và xung đột 3D trực tuyến.</p>
                    <button className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                      Khám phá ngay <ExternalLink size={12} />
                    </button>
                 </div>
                 <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl group cursor-pointer hover:border-primary/30 transition-all">
                    <p className="text-sm font-bold text-slate-900 mb-1">Dữ liệu GIS Map</p>
                    <p className="text-[11px] text-slate-400 font-medium mb-4 leading-relaxed">Tích hợp tọa độ GNSS và cao độ hiện trường.</p>
                    <button className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                      Truy cập bản đồ <ExternalLink size={12} />
                    </button>
                 </div>
              </div>
           </div>

           <div className="technical-card !p-8 bg-slate-900 text-white border-none shadow-2xl shadow-slate-900/20 overflow-hidden relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px]"></div>
              <h3 className="font-extrabold text-sm uppercase tracking-[3px] mb-6 relative z-10">Hybrid Sync</h3>
              <p className="text-[13px] text-slate-400 leading-relaxed mb-8 font-medium italic relative z-10">
                Toàn bộ dữ liệu hồ sơ được đồng bộ Local-Cloud đồng thời. Luôn sẵn sàng hoạt động trong mọi điều kiện sóng tại công trình.
              </p>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl relative z-10">
                 <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                 <span className="text-[10px] font-black text-white/50 uppercase tracking-[2px]">Status: Encrypted & Synced</span>
              </div>
           </div>

           <div className="technical-card !p-8 shadow-md shadow-slate-200/50 bg-white">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-widest mb-6">Dung lượng kho</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest mb-1">
                    <span className="text-slate-400">Đã dùng: 14.2 GB</span>
                    <span className="text-slate-900">71%</span>
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900" style={{ width: '71%' }}></div>
                 </div>
                 <p className="text-[9px] text-slate-400 font-medium">Toàn bộ dung lượng được cấp phát: 20 GB</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
