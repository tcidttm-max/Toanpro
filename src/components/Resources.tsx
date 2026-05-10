/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Users, 
  Truck, 
  Layers, 
  Plus, 
  ChevronDown,
  Activity,
  AlertCircle,
  ChevronRight,
  User,
  Settings,
  ShieldCheck,
  TrendingUp,
  MoreVertical,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Resources() {
  const [activeTab, setActiveTab ] = useState<'HUMAN' | 'EQUIPMENT' | 'MATERIAL'>('HUMAN');

  const resources = {
    HUMAN: [
      { id: '1', name: 'Tổ nề', count: 45, status: 'Active', lead: 'Ngô Văn X', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=X' },
      { id: '2', name: 'Tổ sắt', count: 28, status: 'Active', lead: 'Phạm Văn Y', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Y' },
      { id: '3', name: 'Tổ điện nước', count: 22, status: 'Busy', lead: 'Lê Văn Z', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Z' },
      { id: '4', name: 'Tổ mộc', count: 15, status: 'Active', lead: 'Trần Văn K', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=K' },
    ],
    EQUIPMENT: [
      { id: '1', name: 'Cần trục tháp 1', status: 'Operating', efficiency: '95%', nextMaint: '2026-06-15' },
      { id: '2', name: 'Máy bơm bê tông', status: 'Standby', efficiency: '88%', nextMaint: '2026-05-20' },
      { id: '3', name: 'Máy xúc Komatsu', status: 'Operating', efficiency: '72%', nextMaint: '2026-05-12' },
    ],
    MATERIAL: [
      { id: '1', name: 'Thép D18', stock: '45.0', unit: 'Tấn', status: 'Good', minStock: '5.0 Tấn' },
      { id: '2', name: 'Bê tông R7', stock: '120.0', unit: 'm3', status: 'Warning', minStock: '50.0 m3' },
      { id: '3', name: 'Xi măng PCB40', stock: '2,400', unit: 'Bao', status: 'Good', minStock: '500 Bao' },
    ]
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
             <span>Quản lý</span>
             <ChevronRight size={12} />
             <span className="text-slate-900">Tài nguyên công trường</span>
          </nav>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Quản lý tài nguyên</h2>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
          <Plus size={18} /> Thêm tài nguyên
        </button>
      </div>

      {/* Resource Tabs */}
      <div className="flex gap-2 p-1 bg-white border border-slate-100 rounded-2xl shadow-sm w-fit">
        {[
          { id: 'HUMAN', label: 'Nhân lực', icon: Users },
          { id: 'EQUIPMENT', label: 'Máy móc', icon: Truck },
          { id: 'MATERIAL', label: 'Vật liệu', icon: Layers },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-xl ${
              activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="technical-card !p-0 overflow-hidden border-none shadow-xl shadow-slate-200/50 bg-white">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                    <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">Danh sách tài nguyên</h3>
                 </div>
                 <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Tìm kiếm nhanh..." className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all w-48" />
                 </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                      <th className="px-8 py-4">Thông tin chi tiết</th>
                      <th className="px-8 py-4 text-center">Trạng thái</th>
                      <th className="px-8 py-4 text-right">Thông số kỹ thuật</th>
                      <th className="px-8 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <AnimatePresence mode="wait">
                      {activeTab === 'HUMAN' && resources.HUMAN.map((r, i) => (
                        <motion.tr 
                          key={r.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="hover:bg-slate-50/50 transition-colors group"
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <img src={r.img} alt={r.name} className="w-10 h-10 rounded-xl bg-slate-100 shadow-sm transition-transform group-hover:scale-110" />
                              <div>
                                <p className="text-sm font-bold text-slate-900 mb-0.5">{r.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tổ trưởng: {r.lead}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-center">
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider ${
                              r.status === 'Active' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <p className="text-sm font-black text-slate-900 mb-0.5">{r.count}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Công nhân</p>
                          </td>
                          <td className="px-8 py-5 text-right whitespace-nowrap">
                            <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white rounded-xl transition-all border shadow-sm">
                               <Settings size={16} className="text-slate-400 hover:text-slate-900" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}

                      {activeTab === 'EQUIPMENT' && resources.EQUIPMENT.map((r, i) => (
                        <motion.tr 
                          key={r.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="hover:bg-slate-50/50 transition-colors group"
                        >
                          <td className="px-8 py-5">
                            <div>
                              <p className="text-sm font-bold text-slate-900 mb-0.5">{r.name}</p>
                              <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                 <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Bảo trì: {r.nextMaint}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-center">
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider ${
                              r.status === 'Operating' ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <p className="text-sm font-black text-slate-900 mb-0.5">{r.efficiency}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Hiệu suất</p>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white rounded-xl transition-all border shadow-sm">
                               <Settings size={16} className="text-slate-400 hover:text-slate-900" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}

                      {activeTab === 'MATERIAL' && resources.MATERIAL.map((r, i) => (
                        <motion.tr 
                          key={r.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="hover:bg-slate-50/50 transition-colors group"
                        >
                          <td className="px-8 py-5">
                            <div>
                              <p className="text-sm font-bold text-slate-900 mb-0.5">{r.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ngưỡng an toàn: {r.minStock}</p>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-center">
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider ${
                              r.status === 'Good' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50 animate-pulse'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <p className="text-sm font-black text-slate-900 mb-0.5">{r.stock}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{r.unit}</p>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white rounded-xl transition-all border shadow-sm">
                               <Settings size={16} className="text-slate-400 hover:text-slate-900" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
           </div>
        </div>

        <div className="space-y-8">
          <div className="technical-card !p-8 shadow-md shadow-slate-200/50 bg-white">
            <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-sm mb-8 flex items-center gap-3">
              <Activity size={20} className="text-primary" />
              Tổng quát tài nguyên
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl text-center group hover:bg-primary hover:text-white transition-all">
                <p className="text-[10px] font-bold text-slate-400 group-hover:text-white/70 uppercase tracking-widest mb-2 transition-colors">Đang sử dụng</p>
                <p className="text-2xl font-black tracking-tight">84.2%</p>
              </div>
              <div className="p-5 bg-red-50 border border-red-100 rounded-2xl text-center group hover:bg-red-500 hover:text-white transition-all">
                <p className="text-[10px] font-bold text-red-400 group-hover:text-white/70 uppercase tracking-widest mb-2 transition-colors">Thất thoát</p>
                <p className="text-2xl font-black tracking-tight text-red-600 group-hover:text-white transition-colors">2.4%</p>
              </div>
            </div>
            <div className="mt-6">
               <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  <span>Hệ số lấp đầy tổng thể</span>
                  <span className="text-slate-900">Ổn định</span>
               </div>
               <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[84%]"></div>
               </div>
            </div>
          </div>

          <div className="technical-card !p-8 bg-slate-900 text-white border-none shadow-2xl shadow-slate-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <ShieldCheck size={120} />
            </div>
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
                 <AlertCircle size={20} />
              </div>
              <h3 className="font-extrabold text-sm uppercase tracking-widest">Cảnh báo thiếu hụt</h3>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="p-4 bg-white/5 border-l-4 border-l-primary rounded-r-xl group hover:bg-white/10 transition-colors">
                 <p className="text-sm font-bold mb-1">Bê tông móng Block A</p>
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest italic">Hết trong: 48 giờ tới</p>
                    <ArrowUpRight size={14} className="text-white/20 group-hover:text-primary transition-colors" />
                 </div>
              </div>
              <div className="p-4 bg-white/5 border-l-4 border-l-yellow-500 rounded-r-xl group hover:bg-white/10 transition-colors">
                 <p className="text-sm font-bold mb-1">Cáp điện 3 pha - 500m</p>
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest italic">Trạng thái: Đang vận chuyển</p>
                    <Truck size={14} className="text-white/20 group-hover:text-yellow-500 transition-colors" />
                 </div>
              </div>
            </div>
            <button className="w-full mt-8 py-4 bg-primary text-white text-[11px] font-black uppercase tracking-[2px] rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 relative z-10 transition-all active:scale-95">
              <Plus size={14} /> Đặt hàng vật tư ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
