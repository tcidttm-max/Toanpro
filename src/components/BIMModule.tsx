import { useState } from 'react';
import { 
  Box, 
  Maximize2, 
  Layers, 
  Info, 
  Settings, 
  Eye, 
  EyeOff,
  Search,
  Upload,
  Link as LinkIcon
} from 'lucide-react';

export default function BIMModule() {
  const [activeModel, setActiveModel] = useState('Chung cư Blue Sky - Revit 2024');
  const [layers, setLayers] = useState([
    { name: 'Kết cấu thép', visible: true },
    { name: 'Bê tông cốt thép', visible: true },
    { name: 'Hệ thống MEP', visible: false },
    { name: 'Kiến trúc & Hoàn thiện', visible: true },
    { name: 'Thiết bị công trường', visible: true },
  ]);

  const toggleLayer = (index: number) => {
    const newLayers = [...layers];
    newLayers[index].visible = !newLayers[index].visible;
    setLayers(newLayers);
  };

  return (
    <div className="flex flex-col h-[700px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative border border-white/5">
      {/* Top Toolbar */}
      <div className="p-4 bg-slate-800/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/20 text-primary rounded-lg">
            <Box size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Mô hình BIM 3D</p>
            <h4 className="text-sm font-bold text-white tracking-tight">{activeModel}</h4>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
            <Settings size={18} />
          </button>
          <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
            <Maximize2 size={18} />
          </button>
          <button className="ml-2 flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-all">
            <Upload size={14} /> Tải mô hình (.ifc, .rvt)
          </button>
        </div>
      </div>

      <div className="flex flex-1 relative overflow-hidden">
        {/* BIM Sidebar - Layers & Elements */}
        <div className="w-72 bg-slate-800/50 backdrop-blur-md border-r border-white/5 flex flex-col relative z-10">
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Tìm cấu kiện..." 
                className="w-full bg-slate-900/50 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-primary/50"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Lớp mô hình</p>
               <div className="space-y-1">
                 {layers.map((layer, i) => (
                   <button 
                     key={i} 
                     onClick={() => toggleLayer(i)}
                     className={`w-full flex items-center justify-between p-2 rounded-lg transition-all hover:bg-white/5 ${layer.visible ? 'text-slate-300' : 'text-slate-600'}`}
                   >
                     <span className="text-xs font-medium">{layer.name}</span>
                     {layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                   </button>
                 ))}
               </div>
            </div>

            <div>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Cấu kiện liên kết</p>
               <div className="space-y-2">
                 {[
                   { name: 'Cột C1-24 (Tầng 5)', status: 'In Progress', task: 'Đổ bê tông C1' },
                   { name: 'Dầm B4-02 (Tầng 5)', status: 'Delayed', task: 'Lắp cốt thép' },
                   { name: 'Sàn S5-01', status: 'Completed', task: 'Đổ bê tông' },
                 ].map((el, i) => (
                   <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl group hover:border-primary/30 transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                         <p className="text-[11px] font-bold text-white group-hover:text-primary transition-colors">{el.name}</p>
                         <LinkIcon size={12} className="text-slate-500" />
                      </div>
                      <p className="text-[10px] text-slate-500">Tác vụ: <span className="text-slate-300">{el.task}</span></p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* 3D View Mockup */}
        <div className="flex-1 relative bg-[#1e293b]">
           {/* Grid Pattern */}
           <div className="absolute inset-0 opacity-10" style={{ 
             backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}></div>

           {/* Mockup 3D Elements */}
           <div className="absolute inset-0 flex items-center justify-center p-20">
              <div className="w-full h-full relative perspective-[1000px] flex items-center justify-center">
                 {/* This represents a 3D building structure block */}
                 <div className="relative w-96 h-[400px] transform-gpu rotate-x-[30deg] rotate-y-[-30deg] border-2 border-primary/20 backdrop-blur-sm shadow-[0_0_50px_rgba(37,99,235,0.1)]">
                    {/* Floors */}
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`absolute w-full h-1 bg-primary/20 border-t border-primary/50 shadow-[0_0_15px_rgba(37,99,235,0.2)]`} 
                        style={{ bottom: `${i * 15}%` }}
                      >
                         {/* Columns vertical */}
                         <div className="absolute left-[10%] bottom-0 w-1 h-[60px] bg-primary/30 origin-bottom transform translate-y-full"></div>
                         <div className="absolute right-[10%] bottom-0 w-1 h-[60px] bg-primary/30 origin-bottom transform translate-y-full"></div>
                         <div className="absolute left-1/2 bottom-0 w-1 h-[60px] bg-primary/30 origin-bottom transform translate-y-full"></div>
                      </div>
                    ))}
                    
                    {/* Active Construction Zone highlighting */}
                    <div 
                      className="absolute left-0 bottom-[60%] w-full h-[15%] bg-primary/20 animate-pulse border-y border-primary/50 flex items-center justify-center overflow-hidden"
                    >
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
                       <div className="relative z-10 px-3 py-1 bg-primary text-white text-[9px] font-black uppercase rounded shadow-lg">
                          Construction Zone
                       </div>
                    </div>
                 </div>

                 {/* Floating Info Badge */}
                 <div className="absolute top-20 right-20 p-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-in fade-in duration-1000">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                       <p className="text-[10px] font-bold text-white uppercase tracking-widest text-green-400">Model Optimized</p>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mb-1">FPS: 60</p>
                    <p className="text-xs text-slate-300 font-medium">Elements: 4,520</p>
                 </div>
              </div>
           </div>

           {/* View Controls */}
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 p-2 bg-slate-800/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl z-20">
              <button className="p-3 text-slate-400 hover:text-white bg-white/5 rounded-xl transition-all">
                 <Box size={18} />
              </button>
              <button className="p-3 text-white bg-primary rounded-xl shadow-lg shadow-primary/20">
                 <Maximize2 size={18} />
              </button>
              <button className="p-3 text-slate-400 hover:text-white bg-white/5 rounded-xl transition-all">
                 <Layers size={18} />
              </button>
              <div className="w-px h-8 bg-white/10 mx-1"></div>
              <button className="p-3 text-slate-400 hover:text-white bg-white/5 rounded-xl transition-all">
                 <Info size={18} />
              </button>
           </div>
        </div>
      </div>

      {/* BIM Properties Info */}
      <div className="p-4 bg-slate-800 border-t border-white/5 flex items-center gap-6">
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Loại định dạng:</span>
           <span className="px-2 py-0.5 bg-slate-700 text-slate-300 text-[10px] font-bold rounded uppercase">IFC 4.0</span>
        </div>
        <div className="flex items-center gap-2 border-l border-white/10 pl-6">
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tọa độ thực:</span>
           <span className="text-slate-300 text-[10px] font-mono">10.762622, 106.660172</span>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-3">
           <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-2/3"></div>
           </div>
           <span className="text-[10px] font-bold text-slate-400 uppercase">Đang tải dữ liệu...</span>
        </div>
      </div>
    </div>
  );
}
