/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  TrendingUp, 
  Users, 
  Clock, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  FolderOpen,
  ClipboardList,
  UserCheck,
  CalendarDays,
  Wallet,
  TrendingDown,
  Activity,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line
} from 'recharts';

export default function Dashboard() {
  const projectStatusData = [
    { name: 'Kế hoạch', value: 0, color: '#94A3B8' },
    { name: 'Đang làm', value: 6, color: '#3B82F6' },
    { name: 'Tạm dừng', value: 0, color: '#F59E0B' },
    { name: 'Hoàn thành', value: 0, color: '#10B981' },
  ];

  const healthData = [
    { name: 'Bình thường', value: 5, color: '#10B981' },
    { name: 'Tăng tốc', value: 0, color: '#0EA5E9' },
    { name: 'Lưu ý', value: 0, color: '#FCD34D' },
    { name: 'Rủi ro', value: 0, color: '#EF4444' },
    { name: 'Chậm trễ', value: 1, color: '#991B1B' },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Project Status Summary */}
        <div className="lg:col-span-4 technical-card !p-0 overflow-hidden bg-white">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">6</div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Thống kê dự án</span>
            </div>
            <Activity size={14} className="text-slate-400" />
          </div>
          <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-32 h-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={50}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-slate-800">6</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase">Dự án</span>
              </div>
            </div>
            <div className="flex-1 space-y-2 w-full">
              {projectStatusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-[11px] font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
                    <span className="text-slate-500">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">{item.value}</span>
                    <span className="text-slate-400">({item.value > 0 ? '100' : '0'}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Metrics Summary */}
        <div className="lg:col-span-4 technical-card !p-0 overflow-hidden bg-white">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">6</div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Sức khỏe dự án</span>
            </div>
            <Activity size={14} className="text-slate-400" />
          </div>
          <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-32 h-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={50}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {healthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-slate-800">6</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase">Tình trạng</span>
              </div>
            </div>
            <div className="flex-1 space-y-1.5 w-full">
              {healthData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-[11px] font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
                    <span className="text-slate-500">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">{item.value}</span>
                    <span className="text-slate-400">({item.value > 0 ? Math.round((item.value/6)*100) : '0'}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Participation Stats */}
        <div className="lg:col-span-4 technical-card bg-white">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-between">
            Dự án tôi tham gia: 3
            <ChevronRight size={14} />
          </h3>
          <div className="grid grid-cols-2 gap-y-6">
            <div>
              <p className="text-slate-500 text-[11px] font-bold mb-1">Giám đốc dự án</p>
              <p className="text-xl font-extrabold text-slate-900">0</p>
            </div>
            <div>
              <p className="text-slate-500 text-[11px] font-bold mb-1">Thành viên</p>
              <p className="text-xl font-extrabold text-slate-900">0</p>
            </div>
            <div>
              <p className="text-slate-500 text-[11px] font-bold mb-1">Chỉ huy</p>
              <p className="text-xl font-extrabold text-slate-900">3</p>
            </div>
            <div>
              <p className="text-slate-500 text-[11px] font-bold mb-1">Theo dõi</p>
              <p className="text-xl font-extrabold text-slate-900">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Stakeholder Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Investor Card (CĐT) */}
        <div className="technical-card hover:shadow-lg transition-all border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">CHỦ ĐẦU TƯ (CĐT)</span>
            <Wallet size={16} className="text-slate-300" />
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium font-sans">Hợp đồng</span>
                <span className="font-bold text-slate-800 font-mono">19.957.819.428</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium font-sans">Đã thực hiện</span>
                <span className="font-bold text-emerald-600 font-mono">29.244.758.303</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium font-sans">Đã nghiệm thu</span>
                <span className="font-bold text-blue-600 font-mono">22.609.652.600</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium font-sans italic">Đề nghị thanh toán (1)-(2)-(3)</span>
                <span className="font-bold text-slate-600 font-mono">6.130.000.000</span>
             </div>
             <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-900 font-extrabold font-sans">CĐT còn nợ</span>
                <span className="text-lg font-black text-red-600 font-mono">2.851.000.000</span>
             </div>
          </div>
        </div>

        {/* Contractor Card (NT) */}
        <div className="technical-card hover:shadow-lg transition-all border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">NHÀ THẦU (NT)</span>
            <Users size={16} className="text-slate-300" />
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium font-sans">Hợp đồng</span>
                <span className="font-bold text-slate-800 font-mono">1.601.860.000</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium font-sans">Đã thực hiện</span>
                <span className="font-bold text-emerald-600 font-mono">821.472.800</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium font-sans">Đã nghiệm thu</span>
                <span className="font-bold text-blue-600 font-mono">282.744.800</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium font-sans italic">Đề nghị thanh toán (4)-(5)-(6)</span>
                <span className="font-bold text-slate-600 font-mono">282.600.000</span>
             </div>
             <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-900 font-extrabold font-sans">Còn nợ NT</span>
                <span className="text-lg font-black text-slate-400 font-mono">0</span>
             </div>
          </div>
        </div>

        {/* Supplier Card (NCC) */}
        <div className="technical-card hover:shadow-lg transition-all border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">NHÀ CUNG CẤP (NCC)</span>
            <Users size={16} className="text-slate-300" />
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium font-sans">Hợp đồng</span>
                <span className="font-bold text-slate-800 font-mono">4.734.775.000</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium font-sans">Đề nghị thanh toán</span>
                <span className="font-bold text-emerald-600 font-mono">4.711.341.300</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium font-sans">Đã thực tế thanh toán (1)-(2)-(3)</span>
                <span className="font-bold text-blue-600 font-mono">427.675.000</span>
             </div>
             <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-900 font-extrabold font-sans">Còn nợ NCC</span>
                <span className="text-lg font-black text-red-600 font-mono">4.283.666.300</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project List / Map View Placeholder */}
        <div className="lg:col-span-1 technical-card bg-white !p-0 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Hạng mục chính - ME - Điện</h3>
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest italic">Dự án: P00061</span>
          </div>
          <div className="p-6">
             <div className="flex items-start gap-4 mb-8">
               <div className="flex-1">
                 <div className="flex gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded uppercase">Đang thực hiện</span>
                    <span className="px-2 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded">Ngày tạo: 10/03/2026</span>
                 </div>
                 <h4 className="text-lg font-black text-slate-900 mb-4">Hạng mục Cơ Điện (M&E)</h4>
                 <div className="flex gap-10">
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Ngày bắt đầu</p>
                      <p className="text-xs font-bold text-blue-600">01/01/2026</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Ngày kết thúc</p>
                      <p className="text-xs font-bold text-red-400">01/01/2027</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Tình trạng</p>
                      <p className="text-xs font-bold text-orange-600 underline">Chậm tiến độ</p>
                    </div>
                 </div>
               </div>
               <div className="w-24 h-24 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[{ value: 84 }, { value: 16 }]}
                        innerRadius={25}
                        outerRadius={35}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        <Cell fill="#3B82F6" />
                        <Cell fill="#F1F5F9" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs font-black text-slate-800">152</span>
                    <span className="text-[6px] font-bold text-slate-400 uppercase">Công việc</span>
                  </div>
               </div>
             </div>
             <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-bold">
                   <span className="text-slate-500">Tiến độ kế hoạch</span>
                   <span className="text-slate-900">84%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 w-[84%]"></div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                   <span className="text-slate-500">Tiến độ thực tế</span>
                   <span className="text-slate-800">82%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-orange-500 w-[82%]"></div>
                </div>
             </div>
          </div>
        </div>

        {/* Map View Card */}
        <div className="lg:col-span-1 technical-card !p-0 overflow-hidden relative min-h-[300px]">
           <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
            alt="Construction Map" 
            className="w-full h-full object-cover opacity-60 grayscale"
           />
           <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[1px]"></div>
           <div className="absolute top-4 left-4 right-4 flex justify-between">
              <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm">
                <p className="text-[10px] font-black text-slate-900 uppercase">Vị trí dự án</p>
                <p className="text-[9px] font-medium text-slate-500">Phú Giáo, Bình Dương</p>
              </div>
              <div className="bg-blue-600 text-white p-2 rounded-lg shadow-lg">
                <Activity size={16} />
              </div>
           </div>
           
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25 scale-150"></div>
                <div className="relative w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-xl"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
