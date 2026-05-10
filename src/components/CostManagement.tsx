/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart as PieIcon, 
  Download, 
  Filter,
  CreditCard,
  BarChart3,
  ChevronRight,
  TrendingUp,
  Receipt,
  Wallet,
  Calendar,
  MoreVertical,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'motion/react';

export default function CostManagement() {
  const data = [
    { name: 'Tháng 1', budget: 4000, spent: 2400 },
    { name: 'Tháng 2', budget: 3000, spent: 2800 },
    { name: 'Tháng 3', budget: 2000, spent: 3200 },
    { name: 'Tháng 4', budget: 2780, spent: 3908 },
    { name: 'Tháng 5', budget: 1890, spent: 2200 },
    { name: 'Tháng 6', budget: 2390, spent: 2500 },
    { name: 'Tháng 7', budget: 3490, spent: 3100 },
  ];

  const expenses = [
    { id: 1, name: 'Thép Pomina D18 - Đợt 3', amount: 450000000, status: 'PAID', date: '2026-05-08', category: 'Vật tư', icon: Wallet },
    { id: 2, name: 'Lương tổ nề tháng 4', amount: 124000000, status: 'PENDING', date: '2026-05-10', category: 'Nhân công', icon: DollarSign },
    { id: 3, name: 'Vận chuyển phế thải sàn tầng 3', amount: 12500000, status: 'PAID', date: '2026-05-05', category: 'Dịch vụ', icon: Receipt },
    { id: 4, name: 'Bê tông R7 block A tầng 5', amount: 312000000, status: 'PAID', date: '2026-05-01', category: 'Vật tư', icon: Wallet },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
             <span>Quản trị</span>
             <ChevronRight size={12} />
             <span className="text-slate-900">Chi phí dự án</span>
          </nav>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Quản lý chi phí</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} /> Báo cáo tài chính
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <Plus size={18} /> Ghi nhận chi phí
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Tổng ngân sách', value: '12.4', unit: 'Tỷ', change: '0%', status: 'Static', icon: PieIcon, color: 'text-slate-600', bg: 'bg-slate-100' },
          { label: 'Đã giải ngân', value: '5.2', unit: 'Tỷ', change: '42%', status: 'Normal', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Phát sinh dự phòng', value: '450', unit: 'Tr', change: '+12%', status: 'Warning', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Dự báo còn lại', value: '7.2', unit: 'Tỷ', change: '-5%', status: 'Safe', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((item, i) => (
          <div key={i} className="technical-card !p-6 border-none shadow-md shadow-slate-200/50 bg-white group hover:translate-y-[-4px] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 rounded-xl ${item.bg} ${item.color}`}>
                <item.icon size={22} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide bg-slate-50 text-slate-400`}>
                {item.status}
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
            <div className="flex items-baseline gap-1">
               <p className={`text-2xl font-black tracking-tight text-slate-900 group-hover:text-primary transition-colors`}>{item.value}</p>
               <p className="text-xs font-bold text-slate-400 uppercase">{item.unit}</p>
            </div>
            <div className={`flex items-center gap-1 mt-2 text-[10px] font-bold ${item.change.startsWith('+') ? 'text-red-500' : item.change === '0%' ? 'text-slate-400' : 'text-green-500'}`}>
               {item.change.startsWith('+') ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
               <span>{item.change} {item.change.startsWith('+') ? 'so với tháng trước' : 'tiết kiệm'}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 technical-card !p-8 border-none shadow-xl shadow-slate-200/50 bg-white flex flex-col h-[500px]">
           <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <BarChart3 size={20} />
                 </div>
                 <div>
                    <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-sm">Biểu đồ dòng tiền</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Dữ liệu so sánh hoạch định vs thực tế</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Kế hoạch</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Thực chi</span>
                 </div>
              </div>
           </div>
           
           <div className="flex-1 w-full -ml-8">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    fontSize={10} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontWeight: 600}}
                    dy={10}
                  />
                  <YAxis 
                    fontSize={10} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontWeight: 600}} 
                    dx={-10}
                    tickFormatter={(value) => `${value}M`}
                  />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontFamily: 'Inter', fontSize: '11px', padding: '12px'}}
                    itemStyle={{fontWeight: 700}}
                  />
                  <Area type="monotone" dataKey="budget" stroke="#1e293b" strokeWidth={3} fill="transparent" strokeDasharray="6 6" />
                  <Area type="monotone" dataKey="spent" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSpent)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="technical-card !p-8 border-none shadow-xl shadow-slate-200/50 bg-white flex flex-col">
           <div className="flex justify-between items-center mb-8">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-sm">Giao dịch mới nhất</h3>
              <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                 <Filter size={18} />
              </button>
           </div>
           <div className="flex-1 space-y-5">
              {expenses.map(exp => (
                <div key={exp.id} className="flex justify-between items-start group cursor-pointer p-1 rounded-2xl transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 rounded-2xl flex items-center justify-center transition-all">
                         <exp.icon size={20} />
                      </div>
                      <div className="min-w-0">
                         <p className="text-sm font-bold text-slate-900 truncate group-hover:text-primary transition-colors mb-1">{exp.name}</p>
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.category}</span>
                            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                            <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase">{exp.date}</span>
                         </div>
                      </div>
                   </div>
                   <div className="text-right shrink-0 ml-4">
                      <p className="text-sm font-black text-slate-900 mb-1">{exp.amount.toLocaleString('vi-VN')} đ</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${exp.status === 'PAID' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
                         {exp.status === 'PAID' ? 'Hoàn tất' : 'Chờ duyệt'}
                      </span>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-8 py-4 bg-slate-900 text-white text-xs font-extrabold uppercase tracking-widest rounded-2xl shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              Xem tất cả giao dịch <ChevronRight size={14} />
           </button>
        </div>
      </div>
    </div>
  );
}

function AlertCircle(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
