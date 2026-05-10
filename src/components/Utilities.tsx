/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Scale, 
  BookText, 
  Calculator, 
  CloudSun, 
  Search, 
  TrendingUp,
  FileText,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Zap,
  Tag,
  Download,
  SquarePen,
  FileSearch,
  Wand2,
  AlertTriangle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export default function Utilities() {
  const [activeTool, setActiveTool] = useState<'legal' | 'norms' | 'prices' | 'weather' | 'drafting' | 'incident' | 'search'>('legal');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('anytime');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAISearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      let prompt = "";

      switch (activeTool) {
        case 'legal':
          prompt = `Tra cứu văn bản pháp luật xây dựng Việt Nam cho từ khóa: "${searchQuery}". Hãy liệt kê các luật, thông tư, nghị định liên quan mới nhất và tóm tắt nội dung chính.`;
          break;
        case 'norms':
          prompt = `Tra cứu định mức xây dựng (định mức 10/2019/TT-BXD hoặc các định mức mới nhất) cho công tác: "${searchQuery}". Nêu mã hiệu và thành phần hao phí chính nếu có thể.`;
          break;
        case 'prices':
          prompt = `Dự báo và cung cấp thông tin giá vật tư xây dựng tháng 5/2026 tại khu vực Hồ Chí Minh cho loại vật tư: "${searchQuery}". Ghi chú về xu hướng tăng giảm giá.`;
          break;
        case 'weather':
          prompt = `Dự báo thời tiết xây dựng khu vực "${searchQuery}" trong 7 ngày tới. Phân tích tác động đến các công tác ngoài trời như đổ bê tông, lắp dựng thép.`;
          break;
        case 'drafting':
          prompt = `Hãy soạn thảo một văn bản chuyên nghiệp ngành xây dựng (Công văn, Tờ trình, Đề xuất hoặc Thư chính thức) cho mục đích: "${searchQuery}". 
          Yêu cầu:
          1. Sử dụng văn phong hành chính chuyên nghiệp của Việt Nam.
          2. Bao gồm đầy đủ Quốc hiệu, Tiêu ngữ, Tên văn bản mẫu, Kính gửi.
          3. Nội dung phải chi tiết, lập luận chặt chẽ (ví dụ: nếu thay đổi chi phí phải nêu lý do khách quan/chủ quan).
          4. Đề nghị phê duyệt và ký tên.`;
          break;
        case 'incident':
          prompt = `Phân tích và đề xuất giải pháp cho sự cố công trình: "${searchQuery}". Hãy phân tích nguyên nhân tiềm ẩn, mức độ nguy hiểm và quy trình khắc phục sự cố theo chuẩn kỹ thuật xây dựng.`;
          break;
        case 'search':
          prompt = `Tìm kiếm hồ sơ dự án cho từ khóa: "${searchQuery}". 
          Bộ lọc hiện tại: Loại tài liệu: ${filterType}, Phạm vi thời gian: ${filterDate}.
          Hãy giả lập kết quả tìm thấy trong kho lưu trữ dữ liệu của CivilPro. Bao gồm tên file, ngày tạo, kích thước và tóm tắt nội dung chính.`;
          break;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setResult(response.text);
    } catch (error) {
      setResult("Không thể thực hiện tra cứu AI. Vui lòng kiểm tra lại từ khóa hoặc kết nối.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
             <span>Danh mục</span>
             <ChevronRight size={12} />
             <span className="text-slate-900">Tiện ích</span>
          </nav>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Trung tâm tiện cứu AI</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl shadow-sm border border-primary/20">
             <Wand2 size={16} className="animate-pulse" />
             <span className="text-xs font-bold uppercase tracking-wider">Hỗ trợ bởi Gemini AI</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tools */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Tra cứu kỹ thuật</p>
            {[
              { id: 'legal', label: 'Luật & Nghị định', icon: Scale, desc: 'Thông tư, luật VN' },
              { id: 'norms', label: 'Định mức XD', icon: Calculator, desc: 'Mã hiệu & hao phí' },
              { id: 'prices', label: 'Giá vật tư', icon: TrendingUp, desc: 'Update tháng 5/2026' },
              { id: 'weather', label: 'Thời tiết', icon: CloudSun, desc: 'Báo cáo trạm' },
            ].map(tool => (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool.id as any);
                  setResult(null);
                  setSearchQuery('');
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all flex items-start gap-4 border ${
                  activeTool === tool.id 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10' 
                    : 'bg-white text-slate-500 border-civil-line hover:border-primary/50 group'
                }`}
              >
                <div className={`p-2 rounded-xl ${activeTool === tool.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                   <tool.icon size={20} />
                </div>
                <div className="min-w-0">
                   <p className="text-sm font-bold uppercase tracking-wider truncate">{tool.label}</p>
                   <p className={`text-[10px] font-medium mt-0.5 truncate ${activeTool === tool.id ? 'text-slate-400' : 'text-slate-400'}`}>{tool.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Nghiệp vụ hồ sơ & AI</p>
            {[
              { id: 'drafting', label: 'Soạn thảo bằng AI', icon: SquarePen, desc: 'Công văn, tờ trình' },
              { id: 'search', label: 'Tra hồ sơ dự án', icon: FileSearch, desc: 'Hợp đồng, dự toán' },
              { id: 'incident', label: 'Báo cáo sự cố', icon: AlertTriangle, desc: 'Phân tích & giải pháp' },
            ].map(tool => (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool.id as any);
                  setResult(null);
                  setSearchQuery('');
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all flex items-start gap-4 border ${
                  activeTool === tool.id 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10' 
                    : 'bg-white text-slate-500 border-civil-line hover:border-primary/50 group'
                }`}
              >
                <div className={`p-2 rounded-xl ${activeTool === tool.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                   <tool.icon size={20} />
                </div>
                <div className="min-w-0">
                   <p className="text-sm font-bold uppercase tracking-wider truncate">{tool.label}</p>
                   <p className={`text-[10px] font-medium mt-0.5 truncate ${activeTool === tool.id ? 'text-slate-400' : 'text-slate-400'}`}>{tool.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Search & Results */}
        <div className="lg:col-span-3 space-y-6">
          <div className="technical-card !p-8 border-none shadow-md shadow-slate-200/50">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                 <div className={`p-3 rounded-2xl ${loading ? 'bg-primary text-white animate-pulse' : 'bg-primary/10 text-primary'}`}>
                    <Zap size={24} />
                 </div>
                 <div>
                    <h3 className="font-extrabold text-lg text-slate-900 uppercase tracking-widest leading-none">
                       {
                         activeTool === 'legal' ? 'Tra cứu Luật' : 
                         activeTool === 'norms' ? 'Tra cứu Định mức' : 
                         activeTool === 'prices' ? 'Giá thị trường' : 
                         activeTool === 'weather' ? 'Dự báo công trường' :
                         activeTool === 'drafting' ? 'Soạn thảo văn bản AI' :
                         activeTool === 'incident' ? 'Xử lý sự cố' : 'Hồ sơ dự án'
                       }
                    </h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Đang sử dụng mô hình Gemini 1.5 Pro</p>
                 </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-center bg-slate-50 border border-civil-line px-5 py-4 gap-4 rounded-2xl focus-within:border-primary focus-within:bg-white transition-all shadow-inner group">
                   <Search size={20} className="text-slate-400 group-focus-within:text-primary transition-colors" />
                   <input 
                     type="text" 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                     placeholder={
                       activeTool === 'legal' ? "VD: Nghị định 15 về quản lý dự án..." :
                       activeTool === 'norms' ? "VD: Công tác xây gạch thẻ..." :
                       activeTool === 'prices' ? "VD: Giá thép Hòa Phát phi 18..." :
                       activeTool === 'drafting' ? "VD: Soạn thảo yêu cầu thay đổi chi phí vật liệu..." :
                       activeTool === 'incident' ? "VD: Nứt dầm sàn nhịp 8m sau khi tháo cốp pha..." :
                       activeTool === 'search' ? "VD: Quyết định phê duyệt dự án Blue Sky..." :
                       "VD: Dự báo thời tiết Quận 7 TPHCM..."
                     }
                     className="bg-transparent text-sm font-medium outline-none w-full appearance-none placeholder:text-slate-300"
                   />
                </div>
                <button 
                  onClick={handleAISearch}
                  disabled={loading || !searchQuery}
                  className="bg-primary text-white px-10 py-4 text-xs font-bold uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                >
                   {loading ? <RefreshCw size={18} className="animate-spin" /> : <RefreshCw size={18} />}
                   Thực hiện
                </button>
              </div>

              {activeTool === 'search' && (
                <div className="flex flex-wrap gap-6 pt-2 animate-in fade-in slide-in-from-top-1 duration-300">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Loại hồ sơ:</span>
                    <select 
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="bg-slate-50 border border-civil-line text-[10px] font-bold px-4 py-2 rounded-xl outline-none focus:border-primary transition-all"
                    >
                      <option value="all">Tất cả hồ sơ</option>
                      <option value="contract">Hợp đồng</option>
                      <option value="design">Hồ sơ thiết kế</option>
                      <option value="estimate">Dự toán/Dự thầu</option>
                      <option value="legal">Văn bản pháp lý PC</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Thời gian:</span>
                    <select 
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="bg-slate-50 border border-civil-line text-[10px] font-bold px-4 py-2 rounded-xl outline-none focus:border-primary transition-all"
                    >
                      <option value="anytime">Mọi lúc</option>
                      <option value="this-month">Tháng này</option>
                      <option value="last-3-months">3 tháng gần đây</option>
                      <option value="this-year">Năm 2026</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="technical-card min-h-[500px] bg-white relative overflow-hidden border-none shadow-md shadow-slate-200/50">
             <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
             
             <div className="relative z-10 h-full p-2">
                {!result && !loading && (
                   <div className="flex flex-col items-center justify-center pt-32 text-center">
                      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner border border-slate-100">
                        <Wand2 size={40} className="text-primary" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2 uppercase tracking-wide">Trợ lý AI CivilPro</h4>
                      <p className="text-sm text-slate-400 font-medium max-w-sm mb-10">Tôi có thể giúp bạn soạn thảo văn bản, phân tích nứt dầm sàn hoặc tra cứu giá vật tư xây dựng mới nhất.</p>
                      
                      <div className="flex flex-wrap justify-center gap-3 max-w-lg">
                         {(activeTool === 'drafting' ? [
                            'Soạn văn bản yêu cầu thay đổi chi phí vật liệu',
                            'Soạn tờ trình bổ sung vật tư khác',
                            'Thư thông báo thay đổi nhân sự chủ chốt'
                          ] : activeTool === 'incident' ? [
                            'Phân tích sự cố sụt lún hố móng sâu',
                            'Giải pháp xử lý nứt bê tông khối lớn',
                            'Nguyên nhân cháy nổ trạm biến áp tạm'
                          ] : [
                            'Nghị định 15/2021/ND-CP',
                            'Giá thép Hòa Phát tháng 5/2026',
                            'Định mức xây gạch đặc 10x10x20',
                            'Dự báo thời tiết xây dựng TPHCM'
                          ]).map(t => (
                              <button key={t} onClick={() => setSearchQuery(t)} className="text-[10px] font-bold uppercase tracking-widest border border-slate-100 bg-slate-50/50 text-slate-500 px-4 py-2.5 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                                 {t}
                              </button>
                          ))}
                      </div>
                   </div>
                )}

                {loading && (
                   <div className="space-y-8 pt-10">
                      <div className="flex items-center gap-4">
                         <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"></div>
                         </div>
                         <p className="text-xs font-bold uppercase tracking-widest text-primary">AI đang tổng hợp dữ liệu từ kho tri thức...</p>
                      </div>
                      <div className="space-y-4">
                        <div className="h-4 bg-slate-50 w-3/4 rounded-full animate-pulse"></div>
                        <div className="h-4 bg-slate-50 w-full rounded-full animate-pulse"></div>
                        <div className="h-4 bg-slate-50 w-5/6 rounded-full animate-pulse"></div>
                        <div className="h-4 bg-slate-50 w-2/3 rounded-full animate-pulse"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 mt-10">
                         <div className="h-40 bg-slate-50 rounded-3xl animate-pulse"></div>
                         <div className="h-40 bg-slate-50 rounded-3xl animate-pulse"></div>
                      </div>
                   </div>
                )}

                {result && (
                   <div className="mt-2 animate-in fade-in duration-500 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-8">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                               <Tag size={16} />
                            </div>
                            <div>
                               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">Kết quả đầu ra</p>
                               <span className="text-sm font-bold text-slate-800">{activeTool === 'drafting' ? 'Dự thảo văn bản chuyên nghiệp' : 'Dữ liệu kỹ thuật trích xuất'}</span>
                            </div>
                         </div>
                         <div className="flex gap-3">
                            <button className="flex items-center gap-2 text-xs font-bold px-5 py-2.5 border border-civil-line rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                               <Download size={16} /> Tải văn bản
                            </button>
                            <button className="flex items-center gap-2 text-xs font-bold px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg">
                               Xuất sang Word
                            </button>
                         </div>
                      </div>
                      
                      <div className="flex-1 whitespace-pre-wrap font-sans text-[13px] leading-[1.8] text-slate-700 bg-slate-50/50 p-10 border border-slate-100 border-dashed rounded-3xl selection:bg-primary/20 shadow-inner scrollbar-hide overflow-y-auto max-h-[600px]">
                        {result}
                      </div>

                      <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 py-8 border-t border-civil-line">
                         <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-green-100">
                               <CheckCircle2 size={12} /> Đã kiểm chứng pháp lý
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-blue-100">
                               <ExternalLink size={12} /> Sẵn sàng trình duyệt
                            </div>
                         </div>
                         <div className="flex gap-3 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none px-8 py-3.5 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 transition-all">Lưu vào kho dữ liệu</button>
                         </div>
                      </div>
                   </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle2(props: any) {
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
      <path d="m9 12 2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
