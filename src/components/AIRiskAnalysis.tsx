/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  AlertTriangle, 
  Sparkles, 
  Activity, 
  ShieldCheck,
  RefreshCw,
  Info,
  ChevronRight,
  Target,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

export default function AIRiskAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const performAIAnalysis = async () => {
    setAnalyzing(true);
    setReport(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const prompt = `
        Bạn là một kỹ sư xây dựng kỳ cựu và chuyên gia quản lý rủi ro. 
        Dựa trên dữ liệu dự án xây dựng Chung cư Blue Sky hiện tại:
        - Tiến độ: Trễ 5 ngày so với baseline.
        - Nhân lực: Thiếu 15 công nhân cơ khí.
        - Thời tiết: Dự báo mưa lớn trong 3 ngày tới.
        - Ngân sách: Đã chi 45%, kế hoạch đúng ra là 40%.
        - Vật tư: Thép đủ dùng cho 2 tuần, Xi măng còn đủ cho 3 ngày.

        Hãy phân tích:
        1. Các rủi ro tiềm ẩn (Kỹ thuật, Tiến độ, Chi phí).
        2. Cảnh báo sớm các vấn đề có thể xảy ra.
        3. Khuyến nghị hành động cụ thể để tối ưu hóa quy trình.
        
        Viết báo cáo chuyên nghiệp, ngắn gọn bằng tiếng Việt, sử dụng cấu trúc rõ ràng, chuyên sâu.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setReport(response.text || "Không thể khởi tạo báo cáo.");
    } catch (error) {
      console.error("AI Analysis Error:", error);
      setReport("Có lỗi xảy ra khi kết nối với Gemini AI. Vui lòng kiểm tra API Key.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
             <span>Trung tâm</span>
             <ChevronRight size={12} />
             <span className="text-slate-900">Phân tích rủi ro</span>
          </nav>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Phân tích rủi ro AI</h2>
        </div>
        <button 
          onClick={performAIAnalysis}
          disabled={analyzing}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:scale-100 active:scale-95 group"
        >
          {analyzing ? (
            <RefreshCw size={18} className="animate-spin" />
          ) : (
            <Zap size={18} className="group-hover:animate-pulse" />
          )}
          {analyzing ? 'Đang phân tích dữ liệu...' : 'Bắt đầu phân tích AI'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Chỉ số rủi ro', value: '4.2', total: '/10', color: 'text-orange-600', bg: 'bg-orange-50', icon: AlertTriangle, status: 'Trung bình' },
          { label: 'Độ tin cậy', value: '92', total: '%', color: 'text-green-600', bg: 'bg-green-50', icon: ShieldCheck, status: 'Cao' },
          { label: 'Biến động chi phí', value: '+3.5', total: '%', color: 'text-red-600', bg: 'bg-red-50', icon: Activity, status: 'Cảnh báo' },
          { label: 'Dự phòng rủi ro', value: '12', total: 'ngày', color: 'text-blue-600', bg: 'bg-blue-50', icon: Target, status: 'An toàn' },
        ].map((item, i) => (
          <div key={i} className="technical-card !p-6 shadow-md shadow-slate-200/50 border-none group hover:translate-y-[-4px] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 rounded-xl ${item.bg} ${item.color}`}>
                <item.icon size={22} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${item.bg} ${item.color}`}>
                {item.status}
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
            <div className="flex items-baseline gap-1">
               <p className={`text-2xl font-extrabold tracking-tight ${item.color}`}>{item.value}</p>
               <p className="text-xs font-bold text-slate-400 uppercase">{item.total}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="technical-card !p-0 border-none shadow-xl shadow-slate-200/50 bg-white overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-8 border-b border-civil-line flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/10">
                <Sparkles size={24} />
             </div>
             <div>
                <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-base">
                  Báo cáo cố vấn AI chuyên sâu
                </h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Kiểm soát trực quan bởi mô hình Gemini 1.5</p>
             </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dữ liệu thời gian thực</span>
          </div>
        </div>

        <div className="p-10 flex-1 relative bg-slate-50/20">
          {!report && !analyzing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-white shadow-sm border border-slate-100 rounded-3xl flex items-center justify-center mb-8">
                <Activity size={40} className="text-primary opacity-20" />
              </div>
              <h4 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-2">Sẵn sàng phân tích</h4>
              <p className="text-sm text-slate-400 font-medium max-w-sm">Nhấn nút "Bắt đầu phân tích AI" để trợ lý AI CivilPro quét toàn bộ cơ sở dữ liệu dự án và phát hiện các rủi ro tiềm ẩn.</p>
            </div>
          )}

          {analyzing && (
            <div className="space-y-8 pt-10">
               <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                     <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                     <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                     <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">AI đang quét dữ liệu hiện trường...</p>
               </div>
               <div className="space-y-6">
                 <div className="h-4 bg-slate-200/50 w-3/4 rounded-full animate-pulse"></div>
                 <div className="h-4 bg-slate-200/50 w-full rounded-full animate-pulse"></div>
                 <div className="h-4 bg-slate-200/50 w-5/6 rounded-full animate-pulse"></div>
                 <div className="h-4 bg-slate-200/50 w-2/3 rounded-full animate-pulse"></div>
               </div>
               <div className="grid grid-cols-2 gap-8 mt-12">
                  <div className="h-40 bg-slate-200/30 rounded-3xl animate-pulse"></div>
                  <div className="h-40 bg-slate-200/30 rounded-3xl animate-pulse"></div>
               </div>
            </div>
          )}

          {report && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-sm max-w-none prose-slate"
            >
              <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700 bg-white p-10 border border-slate-100 rounded-3xl shadow-sm selection:bg-primary/10">
                {report}
              </div>
              <div className="mt-8 flex items-center gap-4 bg-slate-900 p-6 rounded-3xl shadow-xl shadow-slate-900/10">
                <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                <div className="flex-1">
                   <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1">Cố vấn BIM thông minh:</p>
                   <p className="text-[13px] text-slate-400 italic">"AI đề xuất sử dụng mô hình BIM 4D để mô phỏng lại trình tự thi công sàn tầng 6 nhằm giảm xung đột nhân lực và tối ưu hóa thời gian cẩu lắp."</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="technical-card !p-8 border-l-4 border-l-red-500 shadow-md shadow-slate-200/50 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-bold uppercase tracking-widest flex items-center gap-3 text-slate-800">
              <AlertCircle size={20} className="text-red-500" />
              Vùng rủi ro kỹ thuật
            </h4>
            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">Cần xử lý ngay</span>
          </div>
          <div className="space-y-4">
             {[
               { level: 'High', title: 'Độ lệch cốt thép sàn tầng 5', desc: 'Vượt ngưỡng cho phép 2mm, cần điều chỉnh lại thép chờ.' },
               { level: 'Medium', title: 'Kiểm định giàn giáo phía Đông', desc: 'Cần kiểm tra các mối nối sau trận mưa đêm qua.' }
             ].map((r, i) => (
                <div key={i} className="p-4 rounded-2xl bg-red-50/50 border border-red-100 group transition-all hover:bg-red-50">
                   <div className="flex items-center gap-3 mb-1">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${r.level === 'High' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>{r.level}</span>
                      <p className="text-xs font-extrabold text-slate-900">{r.title}</p>
                   </div>
                   <p className="text-[11px] text-slate-500 font-medium ml-4">{r.desc}</p>
                </div>
             ))}
          </div>
        </div>
        
        <div className="technical-card !p-8 border-l-4 border-l-green-500 shadow-md shadow-slate-200/50 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-bold uppercase tracking-widest flex items-center gap-3 text-slate-800">
              <CheckCircle2 size={20} className="text-green-500" />
              Chỉ số an toàn & Kiểm soát
            </h4>
            <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">Ổn định</span>
          </div>
          <div className="space-y-4">
             {[
               { title: 'Thoát nước tầng hầm', desc: 'Đã kiểm tra và vận hành ổn định trong điều kiện mưa lớn.' },
               { title: 'Bảo hiểm nhân sự mới', desc: 'Đã cập nhật danh sách và hoàn tất thủ tục cho 45 công nhân mới.' }
             ].map((r, i) => (
                <div key={i} className="p-4 rounded-2xl bg-green-50/50 border border-green-100 group transition-all hover:bg-green-50">
                   <div className="flex items-center gap-3 mb-1">
                      <CheckCircle2 size={12} className="text-green-600" />
                      <p className="text-xs font-extrabold text-slate-900">{r.title}</p>
                   </div>
                   <p className="text-[11px] text-slate-500 font-medium ml-6">{r.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
