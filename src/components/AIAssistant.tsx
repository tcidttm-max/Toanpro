/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  MessageSquare,
  ChevronDown,
  Bot,
  User,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'Chào bạn! Tôi là trợ lý AI CivilPro. Tôi có thể giúp bạn tra cứu hồ sơ, phân tích rủi ro hoặc soạn thảo văn bản. Bạn cần hỗ trợ gì hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ]
      });

      const text = response.text || 'Không có phản hồi từ AI.';
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Xin lỗi, tôi gặp lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        id="ai-assistant-toggle"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 right-6 lg:bottom-8 lg:right-8 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-[100] transition-colors ${
          isOpen ? 'bg-civil-dark text-white' : 'bg-civil-orange text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="animate-pulse" />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            className="fixed bottom-36 right-6 lg:bottom-24 lg:right-8 w-[350px] sm:w-[400px] h-[500px] bg-white shadow-2xl z-[100] border border-civil-line flex flex-col overflow-hidden rounded-sm"
          >
            {/* Header */}
            <div className="bg-civil-dark p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-civil-orange flex items-center justify-center rounded-sm">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-widest">Trợ lý AI CivilPro</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <p className="text-[10px] text-white/60 uppercase">Đang trực tuyến</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-civil-bg/10"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-sm shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-civil-dark text-white' : 'bg-civil-orange text-white'}`}>
                      {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-3 text-xs leading-relaxed shadow-sm border ${
                      m.role === 'user' 
                        ? 'bg-civil-dark text-white border-civil-dark rounded-tr-none' 
                        : 'bg-white text-civil-dark border-civil-line rounded-tl-none font-medium'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] flex gap-2">
                    <div className="w-6 h-6 bg-civil-orange rounded-sm shrink-0 flex items-center justify-center">
                      <Bot size={14} className="text-white" />
                    </div>
                    <div className="p-3 bg-white border border-civil-line rounded-sm rounded-tl-none flex gap-1 items-center">
                      <Loader2 size={12} className="animate-spin text-civil-orange" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-civil-orange">Đang suy nghĩ...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-civil-line bg-white">
              <div className="flex items-center bg-civil-bg border border-civil-line px-3 py-2 gap-2 focus-within:border-civil-orange transition-colors">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Đặt câu hỏi kĩ thuật hoặc tra cứu hồ sơ..."
                  className="bg-transparent text-xs outline-none w-full appearance-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="text-civil-orange disabled:opacity-30 hover:scale-110 transition-transform"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[8px] text-civil-dark/30 mt-2 text-center uppercase font-bold tracking-tighter">Powered by Google Gemini AI Model</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
