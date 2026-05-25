import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

interface AIChatBotProps {
  isLightMode: boolean;
}

export const AIChatBot: React.FC<AIChatBotProps> = ({ isLightMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-msg",
      sender: "assistant",
      text: "您好，山姆！我是您的智能助手，可以帮您查询运营数据、处理待办或解答问题。",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Handle message send
  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setErrorStatus(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map message history to Gemini API format ({ role: 'user' | 'model', parts: [{ text: ... }] })
      const history = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to query Gemini AI API");
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        text: data.text || "抱歉山姆，智控分析中枢未能返回有效答复。",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setErrorStatus(err.message || String(err));
      
      // Fallback message for rich UX
      const errBotMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: "assistant",
        text: `【智脑离线提示】未检测到有效的 GEMINI_API_KEY。请在 Settings > Secrets 中绑定 API Key。
        
        作为离线策略，目前为您匹配本地 AIDC 运营预案：
        * ${textToSend.includes("PUE") ? "今日无锡 PUE 1.18，怀来 PUE 1.144，处于极优低能耗负荷运行。" : "当前待办有 (1) 审批无锡电力告警 (2) 怀来 PUE 周报核准 (3) CMDB 数据校对。"}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errBotMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(inputValue);
    }
  };

  const handleQuickReply = (pillText: string) => {
    sendMessage(pillText);
  };

  return (
    <>
      {/* Floating Action Button Wrapper with Immersive UI pulse glow backdrops */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative group">
          {/* Outer high intensity blur pulse generator */}
          <div className={`absolute inset-0 rounded-full blur-[10px] opacity-60 animate-pulse pointer-events-none ${
            isLightMode ? "bg-emerald-400" : "bg-[#00E5A0]"
          }`}></div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg ${
              isLightMode
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
                : "bg-[#00E5A0] hover:bg-[#00D490] text-[#0A0A0A] shadow-[0_0_20px_rgba(0,229,160,0.4)]"
            }`}
            title="AI 智能运营助手"
          >
            {isOpen ? (
              <X className={`w-6 h-6 transition-transform duration-300 rotate-90 ${isLightMode ? "text-white" : "text-[#0A0A0A]"}`} />
            ) : (
              <div className="relative">
                <Bot className={`w-7 h-7 animate-pulse ${isLightMode ? "text-white" : "text-[#0A0A0A]"}`} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Chat dialog window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 w-[360px] h-[520px] rounded-2xl border overflow-hidden shadow-2xl flex flex-col z-40 transition-all duration-300 animate-slideUp font-sans ${
          isLightMode
            ? "bg-white border-slate-200 shadow-xl shadow-slate-300/20"
            : "bg-[#1A1A1A] border-[#00E5A0]/40"
        }`}>
          
          {/* Top Banner (Header bg #00E5A0 or Emerald-500) */}
          <div className={`px-4 py-3 flex items-center justify-between transition-colors ${
            isLightMode ? "bg-emerald-500 text-white" : "bg-[#00E5A0] text-[#0A0A0A]"
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded flex items-center justify-center ${
                isLightMode ? "bg-white/20 text-white" : "bg-[#0A0A0A] text-[#00E5A0]"
              }`}>
                <Bot size={16} />
              </div>
              <div>
                <h4 className="font-bold text-[13px] tracking-wide">AI 助手</h4>
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isLightMode ? "bg-white" : "bg-[#0A0A0A]"}`} />
                  <span className="text-[10px] opacity-75 font-medium">山姆的专属 AIDC 智脑</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={`p-1 rounded-full text-white/85 hover:bg-black/15 transition-colors cursor-pointer ${
                isLightMode ? "text-white" : "text-[#0A0A0A]"
              }`}
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Notice Panel */}
          {errorStatus && (
            <div className={`border-b px-3 py-1.5 flex items-center gap-2 text-[10px] ${
              isLightMode ? "bg-amber-50 border-amber-100 text-amber-700" : "bg-amber-500/15 border-amber-500/20 text-amber-400"
            }`}>
              <AlertCircle size={12} className="shrink-0" />
              <span>智能沙盒运行中</span>
            </div>
          )}

          {/* Messages Area - Scrollable */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-3 transition-colors ${
            isLightMode ? "bg-slate-50" : "bg-[#0A0A0A]/90"
          }`}>
            {messages.map((msg) => {
              const isAssistant = msg.sender === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 max-w-[85%] ${
                    isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"
                  }`}
                >
                  {isAssistant && (
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 self-end border ${
                      isLightMode
                        ? "bg-emerald-55/10 border-emerald-200 text-emerald-700"
                        : "bg-[#00E5A0]/10 border-[#00E5A0]/30 text-[#00E5A0]"
                    }`}>
                      AI
                    </div>
                  )}
                  <div className="space-y-1">
                    <div
                      className={`px-3 py-2 rounded-2xl text-[11px] leading-relaxed whitespace-pre-wrap border ${
                        isAssistant
                          ? (isLightMode 
                              ? "bg-white text-slate-800 border-slate-200 rounded-bl-sm shadow-xs" 
                              : "bg-[#1A3A2A] text-[#00E5A0] border-[#00E5A0]/20 rounded-bl-sm shadow")
                          : (isLightMode
                              ? "bg-emerald-500 text-white border-emerald-500 rounded-br-sm shadow-xs"
                              : "bg-[#2A2A2A] text-[#E0E0E0] border-[#3A3A3A] rounded-br-sm index-10")
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-[#9E9E9E] px-1 block text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing Loader indication */}
            {isLoading && (
              <div className="flex gap-2 max-w-[80%] mr-auto items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 self-center border ${
                  isLightMode
                    ? "bg-emerald-55/10 border-emerald-200 text-emerald-700"
                    : "bg-[#00E5A0]/10 border-[#00E5A0]/30 text-[#00E5A0]"
                }`}>
                  AI
                </div>
                <div className={`px-3 py-2 rounded-2xl text-[11px] flex items-center gap-1.5 border ${
                  isLightMode
                    ? "bg-white text-slate-500 border-slate-200"
                    : "bg-[#1A3A2A]/50 text-[#00E5A0] border-[#00E5A0]/10"
                }`}>
                  <RefreshCw size={11} className={`animate-spin ${isLightMode ? "text-emerald-500" : "text-[#00E5A0]"}`} />
                  <span>智脑分析中...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick capsules suggestion pre-input */}
          <div className={`px-3 py-2 border-t flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none select-none ${
            isLightMode ? "bg-slate-100 border-slate-200" : "bg-[#1A1A1A] border-[#2A2A2A]"
          }`}>
            <button
              onClick={() => handleQuickReply("今日 PUE")}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-full transition-all cursor-pointer flex items-center gap-1 shrink-0 border ${
                isLightMode
                  ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-emerald-650"
                  : "bg-[#2A2A2A] hover:bg-[#333333] border-[#3A3A3A] text-[#00E5A0] hover:text-[#00D490]"
              }`}
            >
              今日 PUE
            </button>
            <button
              onClick={() => handleQuickReply("待办提醒")}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-full transition-all cursor-pointer flex items-center gap-1 shrink-0 border ${
                isLightMode
                  ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-emerald-650"
                  : "bg-[#2A2A2A] hover:bg-[#333333] border-[#3A3A3A] text-[#00E5A0] hover:text-[#00D490]"
              }`}
            >
              待办提醒
            </button>
            <button
              onClick={() => handleQuickReply("无锡数据中心电力告警深度分析")}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-full transition-all cursor-pointer flex items-center gap-1 shrink-0 border ${
                isLightMode
                  ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-emerald-650"
                  : "bg-[#2A2A2A] hover:bg-[#333333] border-[#3A3A3A] text-[#00E5A0] hover:text-[#00D490]"
              }`}
            >
              告警深度分析
            </button>
          </div>

          {/* Input & Send area */}
          <div className={`p-3 border-t flex gap-2 ${
            isLightMode ? "bg-white border-slate-200" : "bg-[#0A0A0A] border-[#2A2A2A]"
          }`}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入问题..."
              className={`flex-1 rounded-lg py-1.5 px-3 text-[11px] outline-none transition-all border ${
                isLightMode
                  ? "bg-slate-50 border-slate-200 focus:border-emerald-500 text-slate-800 placeholder-slate-400"
                  : "bg-[#1A1A1A] border-[#2A2A2A] focus:border-[#00E5A0]/60 text-[#E0E0E0] placeholder-[#4A4A4A]"
              }`}
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center shrink-0 w-8 h-8 ${
                isLightMode
                  ? "bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-100 text-white"
                  : "bg-[#00E5A0] hover:bg-[#00D490] disabled:bg-gray-700/80 disabled:text-gray-500 text-black font-bold"
              }`}
            >
              <Send size={14} className={`fill-current ${isLightMode ? "text-white" : "text-[#0A0A0A]"}`} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
