import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Sparkles,
  Calendar,
  Plus,
  Trash2,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Flame,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Bookmark,
  Info
} from "lucide-react";
import { AIDCHeader } from "./components/AIDCHeader";
import { SystemModal } from "./components/SystemModal";
import { AIChatBot } from "./components/AIChatBot";
import { SystemIcon } from "./components/SystemIcon";
import { TodoItem, NewsItem, SystemCard, DataCenterId } from "./types";
import {
  INITIAL_TODOS,
  INITIAL_NEWS,
  DATA_CENTER_METRICS,
  AIDC_OPERATIONS_SYSTEMS,
  AI_INTELLIGENT_SYSTEMS,
  CLOUD_COMPUTING_SYSTEMS,
  CUSTOMER_BILLING_SYSTEMS,
  FINANCIAL_SYSTEMS,
  SUPPLY_CHAIN_SYSTEMS,
  ORG_OFFICE_SYSTEMS,
  DATA_GOVERNANCE_SYSTEMS,
} from "./data";

export default function App() {
  // Application Interactive States
  const [selectedCenterId, setSelectedCenterId] = useState<DataCenterId>("wuxi");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>(INITIAL_TODOS);
  const [newTodoText, setNewTodoText] = useState("");
  const [selectedSystem, setSelectedSystem] = useState<SystemCard | null>(null);
  const [metrics, setMetrics] = useState(DATA_CENTER_METRICS[selectedCenterId]);
  const [isLightMode, setIsLightMode] = useState(false);

  // Sync metrics indicator when selectedCenterId updates
  useEffect(() => {
    setMetrics(DATA_CENTER_METRICS[selectedCenterId]);
  }, [selectedCenterId]);

  // Toggle todo completion
  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo item
  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Add custom dynamic todo item
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    const newItem: TodoItem = {
      id: `todo-${Date.now()}`,
      title: newTodoText,
      dueDate: new Date().toISOString().split("T")[0],
      dueLabel: "今天",
      completed: false,
    };

    setTodos([newItem, ...todos]);
    setNewTodoText("");
  };

  // Simple dropdown selection processor
  const handleSelectCenter = (centerId: DataCenterId) => {
    setSelectedCenterId(centerId);
    setIsOpenDropdown(false);
  };

  return (
    <div className={`min-h-screen font-sans antialiased pb-20 transition-all duration-300 relative overflow-hidden ${
      isLightMode 
        ? "bg-slate-50 text-slate-800 selection:bg-emerald-550 selection:text-white" 
        : "bg-[#0A0A0A] text-[#E0E0E0] selection:bg-[#00E5A0] selection:text-[#0A0A0A]"
    }`}>
      
      {/* Subtle Grid Lines Background (Immersive UI Layout specification) */}
      <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none transition-all ${
        isLightMode ? "opacity-[0.05]" : "opacity-[0.03]"
      }`}>
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `radial-gradient(${isLightMode ? '#10B981' : '#00E5A0'} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      </div>

      {/* Fixed Header */}
      <AIDCHeader 
        currentCenter={metrics.name} 
        isLightMode={isLightMode} 
        onToggleTheme={() => setIsLightMode(!isLightMode)} 
      />

      {/* Decorative ambient background lights (Circuit matrix feel) */}
      <div className="absolute top-[72px] left-0 right-0 h-[400px] pointer-events-none overflow-hidden select-none z-0">
        <div className={`absolute top-10 left-10 w-[500px] h-[500px] rounded-full filter blur-[120px] transition-all duration-300 ${isLightMode ? 'bg-[#10B981]/5' : 'bg-[#00E5A0]/5'}`} />
        <div className={`absolute top-40 right-10 w-[400px] h-[400px] rounded-full filter blur-[100px] transition-all duration-300 ${isLightMode ? 'bg-[#10B981]/5' : 'bg-[#00E5A0]/5'}`} />
      </div>

      {/* Main Content scrollable container, desktop 1440 grid aligned */}
      <main className="relative z-10 pt-[96px] max-w-7xl mx-auto px-6 space-y-6">
        
        {/* ================= FIRST ROW (两列，各占 6 格 / 50%) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: 我的待办 (6 Columns) */}
          <div className={`lg:col-span-6 rounded-2xl border p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 ${
            isLightMode 
              ? "bg-white border-slate-200/90 hover:border-emerald-500/30" 
              : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#00E5A0]/20"
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b mb-3 ${isLightMode ? "border-slate-100" : "border-[#2A2A2A]"}`}>
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-3.5 rounded ${isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]"}`} />
                <h2 className={`text-base font-semibold transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>我的待办</h2>
                <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono transition-colors ${
                  isLightMode 
                    ? "text-emerald-700 bg-emerald-55/65 border border-emerald-100/70" 
                    : "text-[#00E5A0] bg-[#00E5A0]/10"
                }`}>
                  {todos.filter(t => !t.completed).length} 未完成
                </span>
              </div>
              <button 
                onClick={() => alert("目前已加载最新待办项。")}
                className={`text-[11px] hover:underline transition-colors ${
                  isLightMode 
                    ? "text-emerald-600 hover:text-emerald-700" 
                    : "text-[#00E5A0] hover:text-[#00D490]"
                }`}
              >
                更多工作流 →
              </button>
            </div>

            {/* Todo List Block */}
            <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
              {todos.length === 0 ? (
                <div className={`text-center py-6 text-xs ${isLightMode ? "text-slate-400" : "text-gray-600"}`}>
                  暂无运营待办项
                </div>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-350 group ${
                      isLightMode 
                        ? "bg-slate-50 border-slate-200/60 hover:border-emerald-550/40" 
                        : "bg-[#0A0A0A]/50 border-[#2A2A2A] hover:border-[#00E5A0]/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      {/* Circular Dynamic Checkbox - Cyber/Immersive Style */}
                      <button
                        onClick={() => handleToggleTodo(todo.id)}
                        className="focus:outline-none shrink-0 transition-all cursor-pointer"
                      >
                        {todo.completed ? (
                          <div className={`w-4.5 h-4.5 border-2 rounded-full flex items-center justify-center ${
                            isLightMode ? "border-emerald-500" : "border-[#00E5A0]"
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]"}`}></div>
                          </div>
                        ) : (
                          <div className={`w-4.5 h-4.5 border-2 rounded-full transition-colors ${
                            isLightMode 
                              ? "border-slate-300 hover:border-emerald-500" 
                              : "border-[#2A2A2A] hover:border-[#00E5A0]/60"
                          }`}></div>
                        )}
                      </button>

                      {/* Todo title */}
                      <span
                        onClick={() => handleToggleTodo(todo.id)}
                        className={`text-xs cursor-pointer truncate transition-all leading-relaxed select-none ${
                          todo.completed
                            ? (isLightMode ? "text-slate-400 line-through font-light" : "text-[#4A4A4A] line-through font-light")
                            : `${isLightMode ? "text-slate-700 hover:text-emerald-500" : "text-[#E0E0E0] hover:text-[#00E5A0]"} font-medium`
                        }`}
                      >
                        {todo.title}
                      </span>
                    </div>

                    {/* Due Label */}
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono border ${
                          todo.dueLabel === "今天"
                            ? (isLightMode ? "bg-red-50 text-red-600 border-red-200" : "bg-red-500/10 text-red-400 border border-red-500/20")
                            : todo.dueLabel === "明天"
                            ? (isLightMode ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-blue-500/10 text-blue-400 border border-blue-500/20")
                            : (isLightMode ? "bg-slate-100 text-slate-500 border-slate-205" : "bg-gray-800 text-gray-500 border border-gray-700 font-light")
                        }`}
                      >
                        {todo.dueLabel}
                      </span>

                      {/* Delete action button */}
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                          isLightMode 
                            ? "text-slate-400 hover:text-red-600 hover:bg-red-50" 
                            : "text-gray-600 hover:text-red-400 hover:bg-red-500/10"
                        }`}
                        title="删除备忘"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* RIGHT: 公司新闻 (6 Columns) */}
          <div className={`lg:col-span-6 rounded-2xl border p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 ${
            isLightMode 
              ? "bg-white border-slate-200/90 hover:border-emerald-500/30" 
              : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#00E5A0]/20"
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b mb-3 ${isLightMode ? "border-slate-100" : "border-[#2A2A2A]"}`}>
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-3.5 rounded ${isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]"}`} />
                <h2 className={`text-base font-semibold transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>公司新闻</h2>
                <span className={`px-2 py-0.5 text-[9px] rounded border transition-all ${
                  isLightMode
                    ? "bg-slate-100 text-slate-600 border-slate-200"
                    : "text-gray-400 bg-[#252525] border-gray-800"
                }`}>
                  2026 最新动态
                </span>
              </div>
              <div className={`flex items-center gap-1.5 text-[11px] transition-colors ${isLightMode ? "text-slate-500" : "text-[#9E9E9E]"}`}>
                <Calendar size={12} />
                <span>{new Date().toISOString().split("T")[0]}</span>
              </div>
            </div>

            {/* News list */}
            <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
              {INITIAL_NEWS.map((news) => (
                <div
                  key={news.id}
                  className={`p-2.5 rounded-xl border border-transparent transition-all ${
                    isLightMode
                      ? "bg-slate-50 hover:border-slate-200 hover:bg-slate-100/50"
                      : "bg-[#222222]/40 hover:border-[#2A2A2A] hover:bg-[#252525]/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className={`text-xs font-bold leading-snug cursor-pointer transition-colors line-clamp-1 ${
                      isLightMode ? "text-slate-800 hover:text-emerald-600" : "text-[#F0F0F0] hover:text-[#00E5A0]"
                    }`}>
                      {news.title}
                    </h3>
                    <span
                      className={`text-[8px] px-1 py-0.5 rounded-sm font-semibold shrink-0 border ${
                        news.tagType === "honor"
                          ? (isLightMode ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-amber-500/10 text-amber-400 border border-amber-500/20")
                          : news.tagType === "notice"
                          ? (isLightMode ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20")
                          : (isLightMode ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-blue-500/10 text-blue-400 border border-blue-500/20")
                      }`}
                    >
                      {news.tag}
                    </span>
                  </div>
                  <p className={`text-[10px] mt-1 line-clamp-1 leading-relaxed transition-colors ${isLightMode ? "text-slate-500" : "text-[#9E9E9E]"}`}>
                    {news.desc}
                  </p>
                  <div className={`flex items-center justify-between mt-1.5 pt-1 border-t ${isLightMode ? "border-slate-100" : "border-[#2A2A2A]/40"}`}>
                    <span className="text-[9px] text-gray-400 font-mono">{news.time}</span>
                    <button className={`text-[9px] flex items-center gap-0.5 transition-colors ${
                      isLightMode ? "text-slate-500 hover:text-emerald-700" : "text-gray-400 hover:text-[#00E5A0]"
                    }`}>
                      阅读全文 <ArrowUpRight size={9} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= SECOND ROW: AIDC运营 (全宽 12 Columns - 含切换下拉框) ================= */}
        <section className={`rounded-2xl border p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 ${
          isLightMode 
            ? "bg-white border-slate-200/90 hover:border-emerald-500/30" 
            : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#00E5A0]/20"
        }`}>
          
          {/* Section title & Intersecting Datacenter Dropdown */}
          <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b mb-6 ${isLightMode ? "border-slate-100" : "border-[#2A2A2A]"}`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-2.5 h-6 rounded ${isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]"}`} />
              <div>
                <h2 className={`text-lg font-bold tracking-wide transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>AIDC 运营系统监视</h2>
                <p className={`text-[11px] transition-colors ${isLightMode ? "text-slate-500" : "text-[#9E9E9E]"}`}>包含楼宇微气候环境、直流配电网运行的7大智控节点</p>
              </div>
            </div>

            {/* Custom styled drop-down switcher */}
            <div className="relative z-30 w-full sm:w-auto">
              <button
                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                className={`w-full sm:w-[220px] rounded-lg py-2 px-3 text-xs font-semibold flex items-center justify-between transition-all cursor-pointer h-9 border ${
                  isLightMode 
                    ? "bg-white text-slate-700 border-emerald-555 hover:shadow-xs" 
                    : "bg-black text-[#E0E0E0] border-[#00E5A0] hover:shadow-[0_0_10px_rgba(0,229,160,0.25)]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]"}`} />
                  {metrics.name}
                </span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isLightMode ? "text-emerald-550" : "text-[#00E5A0]"} ${isOpenDropdown ? "rotate-180" : ""}`} />
              </button>

              {isOpenDropdown && (
                <div className={`absolute right-0 mt-1.5 w-full sm:w-[220px] rounded-lg shadow-xl overflow-hidden animate-fadeIn z-50 border ${
                  isLightMode 
                    ? "bg-white border-slate-200 text-slate-705" 
                    : "bg-[#121212] border-[#00E5A0]/40 text-gray-450"
                }`}>
                  <button
                    onClick={() => handleSelectCenter("wuxi")}
                    className={`w-full text-left py-2 px-3 text-xs font-medium transition-colors flex items-center justify-between ${
                      isLightMode 
                        ? (selectedCenterId === "wuxi" ? "bg-emerald-50 text-emerald-700 font-semibold" : "hover:bg-slate-50 text-slate-600")
                        : (selectedCenterId === "wuxi" ? "bg-[#00E5A0]/10 text-[#00E5A0]" : "text-gray-400 hover:bg-[#00E5A0]/10 hover:text-[#00E5A0]")
                    }`}
                  >
                    <span>无锡数据中心</span>
                    <span className="text-[10px] font-mono text-gray-400">华东主控点</span>
                  </button>
                  <button
                    onClick={() => handleSelectCenter("huailai")}
                    className={`w-full text-left py-2 px-3 text-xs font-medium transition-colors flex items-center justify-between ${
                      isLightMode 
                        ? (selectedCenterId === "huailai" ? "bg-emerald-55 text-emerald-700 font-semibold" : "hover:bg-slate-50 text-slate-600")
                        : (selectedCenterId === "huailai" ? "bg-[#00E5A0]/10 text-[#00E5A0]" : "text-gray-400 hover:bg-[#00E5A0]/10 hover:text-[#00E5A0]")
                    }`}
                  >
                    <span>怀来数据中心</span>
                    <span className="text-[10px] font-mono text-gray-400">华北自然冷</span>
                  </button>
                  <button
                    onClick={() => handleSelectCenter("hqnoc")}
                    className={`w-full text-left py-2 px-3 text-xs font-medium transition-colors flex items-center justify-between ${
                      isLightMode 
                        ? (selectedCenterId === "hqnoc" ? "bg-emerald-55 text-emerald-700 font-semibold" : "hover:bg-slate-50 text-slate-600")
                        : (selectedCenterId === "hqnoc" ? "bg-[#00E5A0]/10 text-[#00E5A0]" : "text-gray-400 hover:bg-[#00E5A0]/10 hover:text-[#00E5A0]")
                    }`}
                  >
                    <span>总部 NOC（集团运营）</span>
                    <span className="text-[10px] font-mono text-gray-400">全局监视</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 7 Systems Horizontal Wrap Area */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {AIDC_OPERATIONS_SYSTEMS.map((sys) => (
              <div
                key={sys.id}
                onClick={() => setSelectedSystem(sys)}
                className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center text-center group transition-all duration-350 hover:-translate-y-1 relative h-[130px] border ${
                  isLightMode 
                    ? "bg-slate-50 border-slate-200 hover:border-emerald-500 hover:shadow-xs" 
                    : "bg-[#0A0A0A] border-[#2A2A2A] hover:border-[#00E5A0]"
                }`}
              >
                {/* Active alert flag light with immersive glowing shadow */}
                <span className="absolute top-3 right-3 flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${sys.status === "alert" ? "bg-[#FFB800]" : (isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]")}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${sys.status === "alert" ? "bg-[#FFB800] shadow-[0_0_4px_#FFB800]" : (isLightMode ? "bg-emerald-500 shadow-[0_0_4px_#10B981]" : "bg-[#00E5A0] shadow-[0_0_4px_#00E5A0]")}`} />
                </span>

                <div className={`transition-colors duration-300 mb-2 ${isLightMode ? "text-slate-500 group-hover:text-emerald-500" : "text-[#9E9E9E] group-hover:text-[#00E5A0]"}`}>
                  <SystemIcon name={sys.iconName} size={28} />
                </div>
                
                <h3 className={`text-xs font-semibold transition-colors ${isLightMode ? "text-slate-800 group-hover:text-emerald-600" : "text-[#E0E0E0] group-hover:text-[#00E5A0]"}`}>
                  {sys.name}
                </h3>
                
                <span className={`text-[9px] mt-1 font-mono tracking-wider transition-colors ${sys.status === "alert" ? "text-amber-500 font-semibold" : (isLightMode ? "text-slate-400" : "text-gray-500")}`}>
                  {sys.statusText}
                </span>

                {/* Subtle indicator background glow on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none ${isLightMode ? "bg-emerald-55/[0.035]" : "bg-[#00E5A0]/2"}`} />
              </div>
            ))}
          </div>
        </section>

        {/* ================= THIRD ROW: AI 智能运营 (全宽 12 Columns) ================= */}
        <section className={`rounded-2xl border p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 ${
          isLightMode 
            ? "bg-white border-slate-200/90 hover:border-emerald-500/30" 
            : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#00E5A0]/20"
        }`}>
          <div className={`flex items-center justify-between pb-4 border-b mb-6 ${isLightMode ? "border-slate-100" : "border-[#2A2A2A]"}`}>
            <div className="flex items-center gap-2.5">
              <Cpu className={isLightMode ? "text-emerald-500" : "text-[#00E5A0]"} size={20} />
              <div>
                <h2 className={`text-lg font-bold tracking-wide transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>AI 智能运营平台</h2>
                <p className={`text-[11px] transition-colors ${isLightMode ? "text-slate-500" : "text-[#9E9E9E]"}`}>尚航自研的边缘及中心AI推理、预测 and 自愈系统</p>
              </div>
            </div>
            <div className={`hidden sm:flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border font-semibold transition-all ${
              isLightMode
                ? "text-emerald-650 bg-emerald-55/40 border-emerald-200"
                : "text-[#00E5A0] bg-[#00E5A0]/10 border-[#00E5A0]/30 shadow-[0_0_10px_rgba(0,229,160,0.1)]"
            }`}>
              <Sparkles size={13} className="animate-spin duration-[4000ms]" />
              <span>智能自治大脑</span>
            </div>
          </div>

          {/* 5 Systems Horizontal List */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {AI_INTELLIGENT_SYSTEMS.map((sys) => (
              <div
                key={sys.id}
                onClick={() => setSelectedSystem(sys)}
                className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center text-center group transition-all duration-350 hover:-translate-y-1 h-[120px] border ${
                  isLightMode 
                    ? "bg-slate-50 border-slate-200 hover:border-emerald-500 hover:shadow-xs" 
                    : "bg-[#0A0A0A] border-[#2A2A2A] hover:border-[#00E5A0] hover:shadow-[0_0_15px_rgba(0,229,160,0.2)]"
                }`}
              >
                <div className={`transition-colors duration-300 mb-2 ${isLightMode ? "text-slate-500 group-hover:text-emerald-500" : "text-[#9E9E9E] group-hover:text-[#00E5A0]"}`}>
                  <SystemIcon name={sys.iconName} size={28} />
                </div>
                <h3 className={`text-xs font-semibold transition-colors ${isLightMode ? "text-slate-800 group-hover:text-emerald-600" : "text-[#E0E0E0] group-hover:text-[#00E5A0]"}`}>
                  {sys.name}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FOURTH ROW: 智算云 & 客户与计费 (两列) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT: 智算云 (6 Columns) */}
          <div className={`rounded-2xl border p-5 shadow-2xl transition-all duration-350 flex flex-col justify-between ${
            isLightMode 
              ? "bg-white border-slate-200/90 hover:border-emerald-500/30" 
              : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#00E5A0]/30"
          }`}>
            <div>
              <div className={`flex items-center gap-2 pb-4 border-b mb-4 ${isLightMode ? "border-slate-100" : "border-[#2A2A2A]"}`}>
                <span className={`w-1.5 h-4 rounded ${isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]"}`} />
                <h2 className={`text-sm md:text-base font-bold tracking-wide transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>智算云</h2>
              </div>
              <p className={`text-[11px] mb-4 transition-colors ${isLightMode ? "text-slate-500" : "text-[#9E9E9E]"}`}>主要智算Bare Metal裸金属管理机与混合云总控</p>

              <div className="grid grid-cols-2 gap-3">
                {CLOUD_COMPUTING_SYSTEMS.map((sys) => (
                  <div
                    key={sys.id}
                    onClick={() => setSelectedSystem(sys)}
                    className={`p-3 rounded-xl cursor-pointer group transition-all duration-350 text-center flex flex-col items-center justify-center h-[100px] border ${
                      isLightMode 
                        ? "bg-slate-50 border-slate-205 hover:border-emerald-500 hover:shadow-xs" 
                        : "bg-[#0A0A0A] border-[#2A2A2A] hover:border-[#00E5A0] hover:shadow-[0_0_12px_rgba(0,229,160,0.15)]"
                    }`}
                  >
                    <div className={`mb-2 transition-colors ${isLightMode ? "text-slate-400 group-hover:text-emerald-500" : "text-gray-500 group-hover:text-[#00E5A0]"}`}>
                      <SystemIcon name={sys.iconName} size={24} />
                    </div>
                    <span className={`text-xs font-semibold transition-colors ${isLightMode ? "text-slate-700 group-hover:text-emerald-600" : "text-[#E0E0E0] group-hover:text-[#00E5A0]"}`}>
                      {sys.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`mt-4 text-[10px] uppercase font-mono tracking-wider pt-2 border-t flex justify-between ${
              isLightMode ? "text-slate-400 border-slate-100" : "text-gray-500 border-[#2A2A2A]/40"
            }`}>
              <span>Managed Compute Services</span>
              <span>2 Nodes</span>
            </div>
          </div>

          {/* RIGHT: 客户与计费 (6 Columns) */}
          <div className={`rounded-2xl border p-5 shadow-2xl transition-all duration-350 ${
            isLightMode 
              ? "bg-white border-slate-200/90 hover:border-emerald-500/30" 
              : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#00E5A0]/30"
          }`}>
            <div className={`flex items-center gap-2 pb-4 border-b mb-4 ${isLightMode ? "border-slate-100" : "border-[#2A2A2A]"}`}>
              <span className={`w-1.5 h-4 rounded ${isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]"}`} />
              <h2 className={`text-sm md:text-base font-bold tracking-wide transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>客户与计费</h2>
            </div>
            <p className={`text-[11px] mb-4 transition-colors ${isLightMode ? "text-slate-500" : "text-[#9E9E9E]"}`}>政企客户支持、九五流量计费和定制化算力电费核算的综合工作台</p>

            <div className="grid grid-cols-2 gap-3">
              {CUSTOMER_BILLING_SYSTEMS.map((sys) => (
                <div
                  key={sys.id}
                  onClick={() => setSelectedSystem(sys)}
                  className={`p-3 rounded-xl cursor-pointer group transition-all duration-350 text-center flex flex-col items-center justify-center h-[90px] border ${
                    isLightMode 
                      ? "bg-slate-50 border-slate-205 hover:border-emerald-500 hover:shadow-xs" 
                      : "bg-[#0A0A0A] border-[#2A2A2A] hover:border-[#00E5A0] hover:shadow-[0_0_12px_rgba(0,229,160,0.15)]"
                  }`}
                >
                  <div className={`mb-1.5 transition-colors ${isLightMode ? "text-slate-400 group-hover:text-emerald-500" : "text-gray-500 group-hover:text-[#00E5A0]"}`}>
                    <SystemIcon name={sys.iconName} size={20} />
                  </div>
                  <span className={`text-xs font-medium transition-colors ${isLightMode ? "text-slate-700 group-hover:text-emerald-600" : "text-[#E0E0E0] group-hover:text-[#00E5A0]"}`}>
                    {sys.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= FIFTH ROW: 财务与业财 & 供应链与交付 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT: 财务与业财 */}
          <div className={`rounded-2xl border p-5 shadow-2xl transition-all duration-350 ${
            isLightMode 
              ? "bg-white border-slate-200/90 hover:border-emerald-500/30" 
              : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#00E5A0]/30"
          }`}>
            <div className={`flex items-center gap-2 pb-4 border-b mb-4 ${isLightMode ? "border-slate-100" : "border-[#2A2A2A]"}`}>
              <span className={`w-1.5 h-4 rounded ${isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]"}`} />
              <h2 className={`text-sm md:text-base font-bold tracking-wide transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>财务与业财</h2>
            </div>
            <p className={`text-[11px] mb-4 transition-colors ${isLightMode ? "text-slate-500" : "text-[#9E9E9E]"}`}>招行薪福通对接与集团金蝶总账ERP核算</p>

            <div className="grid grid-cols-2 gap-3">
              {FINANCIAL_SYSTEMS.map((sys) => (
                <div
                  key={sys.id}
                  onClick={() => setSelectedSystem(sys)}
                  className={`p-3 rounded-xl cursor-pointer group transition-all duration-350 text-center flex flex-col items-center justify-center h-[90px] border ${
                    isLightMode 
                      ? "bg-slate-50 border-slate-205 hover:border-emerald-500 hover:shadow-xs" 
                      : "bg-[#0A0A0A] border-[#2A2A2A] hover:border-[#00E5A0] hover:shadow-[0_0_12px_rgba(0,229,160,0.15)]"
                  }`}
                >
                  <div className={`mb-1.5 transition-colors ${isLightMode ? "text-slate-400 group-hover:text-emerald-500" : "text-gray-500 group-hover:text-[#00E5A0]"}`}>
                    <SystemIcon name={sys.iconName} size={20} />
                  </div>
                  <span className={`text-xs font-medium font-sans transition-colors ${isLightMode ? "text-slate-700 group-hover:text-emerald-600" : "text-[#E0E0E0] group-hover:text-[#00E5A0]"}`}>
                    {sys.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: 供应链与交付 */}
          <div className={`rounded-2xl border p-5 shadow-2xl transition-all duration-350 flex flex-col justify-between ${
            isLightMode 
              ? "bg-white border-slate-200/90 hover:border-emerald-500/30" 
              : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#00E5A0]/30"
          }`}>
            <div>
              <div className={`flex items-center gap-2 pb-4 border-b mb-4 ${isLightMode ? "border-slate-100" : "border-[#2A2A2A]"}`}>
                <span className={`w-1.5 h-4 rounded ${isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]"}`} />
                <h2 className={`text-sm md:text-base font-bold tracking-wide transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>供应链与交付</h2>
              </div>
              <p className={`text-[11px] mb-4 transition-colors ${isLightMode ? "text-slate-500" : "text-[#9E9E9E]"}`}>针对服务器资产、高密度电源母线采购工程与库存点验控制</p>

              <div className="grid grid-cols-1 gap-3">
                {SUPPLY_CHAIN_SYSTEMS.map((sys) => (
                  <div
                    key={sys.id}
                    onClick={() => setSelectedSystem(sys)}
                    className={`p-4 rounded-xl cursor-pointer group transition-all duration-350 text-center flex flex-col items-center justify-center h-[90px] border ${
                      isLightMode 
                        ? "bg-slate-50 border-slate-205 hover:border-emerald-500 hover:shadow-xs" 
                        : "bg-[#0A0A0A] border-[#2A2A2A] hover:border-[#00E5A0] hover:shadow-[0_0_12px_rgba(0,229,160,0.15)]"
                    }`}
                  >
                    <div className={`mb-1.5 transition-colors ${isLightMode ? "text-slate-400 group-hover:text-emerald-500" : "text-gray-500 group-hover:text-[#00E5A0]"}`}>
                      <SystemIcon name={sys.iconName} size={22} />
                    </div>
                    <span className={`text-xs font-semibold transition-colors ${isLightMode ? "text-slate-700 group-hover:text-emerald-600" : "text-[#E0E0E0] group-hover:text-[#00E5A0]"}`}>
                      {sys.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`mt-4 text-[10px] text-right uppercase font-mono tracking-wider transition-colors ${isLightMode ? "text-slate-400" : "text-gray-500"}`}>
              Asset Lifecycle Management System
            </div>
          </div>
        </div>

        {/* ================= SIXTH ROW: 组织与办公 & 数据与治理 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT: 组织与办公 */}
          <div className={`rounded-2xl border p-5 shadow-2xl transition-all duration-350 ${
            isLightMode 
              ? "bg-white border-slate-200/90 hover:border-emerald-500/30" 
              : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#00E5A0]/30"
          }`}>
            <div className={`flex items-center gap-2 pb-4 border-b mb-4 ${isLightMode ? "border-slate-100" : "border-[#2A2A2A]"}`}>
              <span className={`w-1.5 h-4 rounded ${isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]"}`} />
              <h2 className={`text-sm md:text-base font-bold tracking-wide transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>组织与办公</h2>
            </div>
            <p className={`text-[11px] mb-4 transition-colors ${isLightMode ? "text-slate-500" : "text-[#9E9E9E]"}`}>HRM人力模块及通用公文OA协同流程系统</p>

            <div className="grid grid-cols-2 gap-3">
              {ORG_OFFICE_SYSTEMS.map((sys) => (
                <div
                  key={sys.id}
                  onClick={() => setSelectedSystem(sys)}
                  className={`p-3 rounded-xl cursor-pointer group transition-all duration-350 text-center flex flex-col items-center justify-center h-[90px] border ${
                    isLightMode 
                      ? "bg-slate-50 border-slate-205 hover:border-emerald-500 hover:shadow-xs" 
                      : "bg-[#0A0A0A] border-[#2A2A2A] hover:border-[#00E5A0] hover:shadow-[0_0_12px_rgba(0,229,160,0.15)]"
                  }`}
                >
                  <div className={`mb-1.5 transition-colors ${isLightMode ? "text-slate-400 group-hover:text-emerald-500" : "text-gray-500 group-hover:text-[#00E5A0]"}`}>
                    <SystemIcon name={sys.iconName} size={20} />
                  </div>
                  <span className={`text-xs font-medium transition-colors ${isLightMode ? "text-slate-700 group-hover:text-emerald-600" : "text-[#E0E0E0] group-hover:text-[#00E5A0]"}`}>
                    {sys.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: 数据与治理 */}
          <div className={`rounded-2xl border p-5 shadow-2xl transition-all duration-350 ${
            isLightMode 
              ? "bg-white border-slate-200/90 hover:border-emerald-500/30" 
              : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#00E5A0]/30"
          }`}>
            <div className={`flex items-center gap-2 pb-4 border-b mb-4 ${isLightMode ? "border-slate-100" : "border-[#2A2A2A]"}`}>
              <span className={`w-1.5 h-4 rounded ${isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]"}`} />
              <h2 className={`text-sm md:text-base font-bold tracking-wide transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>数据与治理</h2>
            </div>
            <p className={`text-[11px] mb-4 transition-colors ${isLightMode ? "text-slate-500" : "text-[#9E9E9E]"}`}>唯一物理资产树CMDB 与 尚航大数据流湖仓中台</p>

            <div className="grid grid-cols-2 gap-3">
              {DATA_GOVERNANCE_SYSTEMS.map((sys) => (
                <div
                  key={sys.id}
                  onClick={() => setSelectedSystem(sys)}
                  className={`p-3 rounded-xl cursor-pointer group transition-all duration-350 text-center flex flex-col items-center justify-center h-[90px] border ${
                    isLightMode 
                      ? "bg-slate-50 border-slate-205 hover:border-emerald-500 hover:shadow-xs" 
                      : "bg-[#0A0A0A] border-[#2A2A2A] hover:border-[#00E5A0] hover:shadow-[0_0_12px_rgba(0,229,160,0.15)]"
                  }`}
                >
                  <div className={`mb-1.5 transition-colors ${isLightMode ? "text-slate-400 group-hover:text-emerald-500" : "text-gray-500 group-hover:text-[#00E5A0]"}`}>
                    <SystemIcon name={sys.iconName} size={20} />
                  </div>
                  <span className={`text-xs font-medium transition-colors ${isLightMode ? "text-slate-700 group-hover:text-emerald-600" : "text-[#E0E0E0] group-hover:text-[#00E5A0]"}`}>
                    {sys.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER METADATA INFO (Aesthetic structural honesty) */}
      <footer className={`mt-16 border-t py-8 text-center text-xs leading-loose transition-colors ${
        isLightMode ? "border-slate-200 text-slate-400" : "border-[#1C1C1C] text-gray-500"
      }`}>
        <p>AIDC Workbench © 2026 尚航公司数据中心运营研发中心版权所有</p>
        <p className={`text-[10px] font-mono mt-1 ${isLightMode ? "text-slate-450" : "text-gray-600"}`}>
          PLATFORM VER 2.8.5-RELEASE • NODE SECURE PROTOCOL • GREEN ELECTRICITY INTENSITY CONTROL
        </p>
      </footer>

      {/* SYSTEM FULL INFORMATION POPUP MODAL */}
      <SystemModal
        system={selectedSystem}
        onClose={() => setSelectedSystem(null)}
        isLightMode={isLightMode}
      />

      {/* BOTTOM-RIGHT FLOATING INTELLIGENT BOT PANEL */}
      <AIChatBot isLightMode={isLightMode} />

    </div>
  );
}
