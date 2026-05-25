import React from "react";
import { Zap, Sun, Moon } from "lucide-react";

interface AIDCHeaderProps {
  currentCenter: string;
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export const AIDCHeader: React.FC<AIDCHeaderProps> = ({
  currentCenter,
  isLightMode,
  onToggleTheme,
}) => {
  return (
    <header className={`fixed top-0 left-0 right-0 h-[72px] backdrop-blur-md border-b z-50 flex items-center justify-between px-6 transition-all duration-300 ${
      isLightMode 
        ? "bg-white/95 border-slate-200 shadow-sm" 
        : "bg-[#0A0A0A]/95 border-[#00E5A0]/30"
    }`}>
      {/* Left side: Logo */}
      <div className="flex items-center gap-3">
        <div className={`relative flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden group border transition-all ${
          isLightMode
            ? "bg-emerald-500/10 border-emerald-300 text-emerald-600"
            : "bg-[#00E5A0]/10 border-[#00E5A0]/30 text-[#00E5A0] shadow-[0_0_15px_rgba(0,229,160,0.15)]"
        }`}>
          <Zap size={22} className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${
            isLightMode ? "text-emerald-600" : "text-[#00E5A0]"
          }`} />
          <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${
            isLightMode ? "bg-emerald-500/20" : "bg-[#00E5A0]/20"
          }`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span id="logo-title" className={`text-lg font-bold tracking-wider transition-colors ${
              isLightMode ? "text-slate-900" : "text-[#00E5A0]"
            }`}>
              AIDC Workbench
            </span>
            <div className={`px-2 py-0.5 text-[10px] uppercase font-mono rounded border transition-all ${
              isLightMode
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/20"
            }`}>
              Unified
            </div>
          </div>
          <p className={`text-[10px] transition-colors ${isLightMode ? "text-slate-500" : "text-[#9E9E9E]"}`}>
            AIDC 数智化运营统一工作台
          </p>
        </div>
      </div>

      {/* Center status message */}
      <div className={`hidden md:flex items-center gap-2 text-xs border px-3 py-1.5 rounded-full transition-all ${
        isLightMode
          ? "bg-slate-100 border-slate-200 text-slate-600"
          : "bg-[#1A1A1A] border-[#2A2A2A] text-[#9E9E9E]"
      }`}>
        <span className={`w-2 h-2 rounded-full animate-pulse ${isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]"}`} />
        <span className="opacity-80">当前控流点:</span>
        <span className={`font-medium transition-colors ${isLightMode ? "text-slate-800" : "text-[#E0E0E0]"}`}>
          {currentCenter}
        </span>
      </div>

      {/* Right side: Theme switch, Welcome text & profile */}
      <div className="flex items-center gap-4">
        {/* Toggle Theme button */}
        <button
          onClick={onToggleTheme}
          id="theme-toggle-btn"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-sm transition-all duration-300 cursor-pointer ${
            isLightMode
              ? "bg-emerald-50/50 hover:bg-emerald-50 border-emerald-200 text-emerald-700 hover:border-emerald-300"
              : "bg-[#161616] hover:bg-[#1C1C1C] border-[#2A2A2A] text-[#00E5A0] hover:border-[#00E5A0]/50"
          }`}
          title="一键切换颜色"
        >
          {isLightMode ? (
            <>
              <Moon size={14} className="text-emerald-600" />
              <span>切换深色</span>
            </>
          ) : (
            <>
              <Sun size={14} className="text-amber-400" />
              <span>一键切换颜色</span>
            </>
          )}
        </button>

        <div className="hidden sm:block text-right">
          <p className={`text-sm font-medium transition-colors ${isLightMode ? "text-slate-800" : "text-[#E0E0E0]"}`}>
            您好，<span className={`font-semibold ${isLightMode ? "text-emerald-600" : "text-[#00E5A0]"}`}>山姆</span>
          </p>
          <p className={`text-[11px] transition-colors ${isLightMode ? "text-slate-400" : "text-[#9E9E9E]"}`}>
            高级数据中心物理安全 & 电力审核官
          </p>
        </div>

        {/* Gray avatar circle spacer with active status outline */}
        <div className="relative">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 overflow-hidden transition-all ${
            isLightMode
              ? "border-emerald-500 shadow-sm"
              : "border-[#00E5A0] shadow-[0_0_10px_rgba(0,229,160,0.2)]"
          }`}>
            <div className={`flex items-center justify-center w-full h-full font-bold text-sm bg-gradient-to-br transition-all ${
              isLightMode
                ? "from-slate-100 to-slate-200 text-emerald-700"
                : "from-[#1A1A1A] to-[#2B2B2B] text-[#00E5A0]"
            }`}>
              SAM
            </div>
          </div>
          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 transition-all ${
            isLightMode
              ? "bg-emerald-500 border-white"
              : "bg-[#00E5A0] border-[#0A0A0A]"
          }`} />
        </div>
      </div>
    </header>
  );
};
