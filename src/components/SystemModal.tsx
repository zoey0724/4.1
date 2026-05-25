import React, { useState } from "react";
import { X, Play, Shield, Terminal, CheckCircle } from "lucide-react";
import { SystemCard } from "../types";
import { SystemIcon } from "./SystemIcon";

interface SystemModalProps {
  system: SystemCard | null;
  onClose: () => void;
  isLightMode: boolean;
}

export const SystemModal: React.FC<SystemModalProps> = ({ system, onClose, isLightMode }) => {
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  if (!system) return null;

  // Generate unique simulated metrics based on system name
  const getSimulatedTelemetry = (name: string) => {
    const isAlert = system.status === "alert";
    return {
      status: isAlert ? "异常" : "良好",
      healthScore: isAlert ? 74 : 98,
      latencyMs: isAlert ? 180 : 12,
      lastUpdated: "刚刚",
      logs: isAlert
        ? [
            { time: "06:45:10", text: "[警告] 配电柜 #4 逆变器变频过载 115%", level: "error" },
            { time: "06:40:22", text: "[调试] 系统执行 PUE 重校准运算完毕", level: "info" },
            { time: "05:12:00", text: "[日志] 智能负荷下发平衡命令成功", level: "success" },
          ]
        : [
            { time: "06:55:01", text: "[日志] 连续无偏差闭环自动化巡航中", level: "success" },
            { time: "06:30:15", text: "[日志] 自适应参数学习已更新完毕 (1.14 PUE)", level: "info" },
            { time: "05:00:00", text: "[日志] 与 Steady Datasphere 同步 12,430 条遥测数据", level: "success" },
          ],
    };
  };

  const telemetry = getSimulatedTelemetry(system.name);

  const handleLaunchConsole = () => {
    setActionStatus(`正在加载【${system.name}】远程控制台及接线网络...`);
    setTimeout(() => {
      setActionStatus(null);
    }, 2500);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn ${
      isLightMode ? "bg-slate-900/60" : "bg-[#0A0A0A]/85 backdrop-blur-sm"
    }`}>
      {/* Container card frame */}
      <div
        className={`w-full max-w-lg rounded-2xl border overflow-hidden shadow-2xl relative transition-all duration-300 ${
          isLightMode
            ? "bg-white border-slate-200"
            : `bg-[#1A1A1A] ${system.status === "alert" ? "border-amber-500/40" : "border-[#00E5A0]/30"}`
        }`}
      >
        {/* Glow effect at top */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent to-transparent opacity-60 ${
          isLightMode ? "via-emerald-500" : "via-[#00E5A0]"
        }`} />

        {/* Modal Header */}
        <div className={`flex items-start justify-between p-6 pb-4 border-b transition-colors ${
          isLightMode ? "border-slate-100" : "border-[#2A2A2A]"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border transition-colors ${
              isLightMode
                ? "bg-emerald-50 text-emerald-600 border-emerald-150"
                : "bg-[#2A2A2A] text-[#00E5A0] border-[#333]"
            }`}>
              <SystemIcon name={system.iconName} size={28} />
            </div>
            <div>
              <h3 className={`text-xl font-bold transition-colors ${
                isLightMode ? "text-slate-800" : "text-[#E0E0E0]"
              }`}>{system.name}</h3>
              <p className={`text-xs transition-colors ${isLightMode ? "text-slate-400" : "text-[#9E9E9E]"}`}>
                模块化统一智控客户端
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isLightMode
                ? "bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800"
                : "bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#9E9E9E] hover:text-[#E0E0E0]"
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Action Status Toast feedback inside */}
        {actionStatus && (
          <div className={`mx-6 mt-4 p-3 rounded-lg border text-xs flex items-center gap-2 animate-slideUp ${
            isLightMode 
              ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
              : "bg-[#1A3A2A]/50 border-[#00E5A0]/20 text-[#00E5A0]"
          }`}>
            <CheckCircle size={14} className="animate-pulse" />
            <span>{actionStatus}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto font-sans">
          {/* Status summary banner */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`border p-3 rounded-lg text-center transition-colors ${
              isLightMode ? "bg-slate-50 border-slate-150" : "bg-[#252525]/50 border--[#2A2A2A]"
            }`}>
              <span className={`text-[10px] block mb-1 ${isLightMode ? "text-slate-400" : "text-[#9E9E9E]"}`}>健康指数</span>
              <span
                className={`text-lg font-bold font-mono ${
                  system.status === "alert" 
                    ? "text-amber-500" 
                    : (isLightMode ? "text-emerald-600" : "text-[#00E5A0]")
                }`}
              >
                {telemetry.healthScore}%
              </span>
            </div>
            <div className={`border p-3 rounded-lg text-center transition-colors ${
              isLightMode ? "bg-slate-50 border-slate-150" : "bg-[#252525]/50 border--[#2A2A2A]"
            }`}>
              <span className={`text-[10px] block mb-1 ${isLightMode ? "text-slate-400" : "text-[#9E9E9E]"}`}>系统响应</span>
              <span className={`text-lg font-bold font-mono transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>
                {telemetry.latencyMs}ms
              </span>
            </div>
            <div className={`border p-3 rounded-lg text-center transition-colors ${
              isLightMode ? "bg-slate-50 border-slate-150" : "bg-[#252525]/50 border--[#2A2A2A]"
            }`}>
              <span className={`text-[10px] block mb-1 ${isLightMode ? "text-slate-400" : "text-[#9E9E9E]"}`}>状态控制</span>
              <span
                className={`text-sm font-semibold flex items-center justify-center gap-1 mt-1 ${
                  system.status === "alert" 
                    ? "text-amber-500" 
                    : (isLightMode ? "text-emerald-600" : "text-[#00E5A0]")
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    system.status === "alert" 
                      ? "bg-amber-400 animate-pulse" 
                      : (isLightMode ? "bg-emerald-500" : "bg-[#00E5A0]")
                  }`}
                />
                {system.statusText}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className={`space-y-1 p-4 rounded-xl border transition-colors ${
            isLightMode ? "bg-slate-50 border-slate-200" : "bg-[#252525]/30 border-[#2A2A2A]"
          }`}>
            <span className={`text-xs uppercase font-mono flex items-center gap-1.5 ${
              isLightMode ? "text-slate-400" : "text-[#9E9E9E]"
            }`}>
              <Shield size={12} className={isLightMode ? "text-emerald-500" : "text-[#00E5A0]"} /> 业务职责描述
            </span>
            <p className={`text-sm leading-relaxed pt-1 transition-colors ${
              isLightMode ? "text-slate-700" : "text-[#E0E0E0]"
            }`}>{system.desc}</p>
          </div>

          {/* Real-time event log terminal */}
          <div className="space-y-2">
            <span className={`text-xs uppercase font-mono flex items-center gap-1.5 justify-between ${
              isLightMode ? "text-slate-400" : "text-[#9E9E9E]"
            }`}>
              <span className="flex items-center gap-1.5">
                <Terminal size={12} className={isLightMode ? "text-emerald-500" : "text-[#00E5A0]"} /> 节点实时日志 (控制台)
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono border ${
                isLightMode 
                  ? "text-emerald-600 bg-emerald-50 border-emerald-200" 
                  : "text-[#00E5A0] bg-[#00E5A0]/10 border-[#00E5A0]/20"
              }`}>
                LIVE STREAM
              </span>
            </span>

            <div className={`p-3 rounded-xl font-mono text-[11px] space-y-2 h-[120px] overflow-y-auto border transition-colors ${
              isLightMode ? "bg-slate-900 text-slate-300 border-slate-250" : "bg-[#0A0A0A] text-[#9E9E9E] border-[#2A2A2A]"
            }`}>
              {telemetry.logs.map((log, idx) => (
                <div key={idx} className="flex gap-2 items-start opacity-90">
                  <span className="text-slate-500 select-none">[{log.time}]</span>
                  <span
                    className={
                      log.level === "error"
                        ? "text-red-400 font-semibold"
                        : log.level === "success"
                        ? (isLightMode ? "text-emerald-400" : "text-[#00E5A0]")
                        : "text-blue-400"
                    }
                  >
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`p-6 pt-2 border-t flex gap-3 transition-colors ${
          isLightMode ? "border-slate-100" : "border-[#2A2A2A]"
        }`}>
          <button
            onClick={onClose}
            className={`flex-1 py-1 px-3 rounded-full border text-sm font-semibold transition-all cursor-pointer h-10 flex items-center justify-center ${
              isLightMode
                ? "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                : "border-[#3A3A3A] bg-transparent text-[#E0E0E0] hover:bg-[#2A2A2A] hover:border-[#4A4A4A]"
            }`}
          >
            返回工作台
          </button>
          <button
            onClick={handleLaunchConsole}
            className={`flex-1 py-1 px-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer h-10 ${
              isLightMode
                ? "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-md"
                : "bg-[#00E5A0] text-[#0A0A0A] hover:bg-[#00D490] hover:shadow-[0_0_15px_rgba(0,229,160,0.5)]"
            }`}
          >
            <Play size={14} className="fill-current" />
            进入控制台
          </button>
        </div>
      </div>
    </div>
  );
};
