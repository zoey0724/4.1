import React from "react";
import {
  Building,
  Zap,
  ThermometerSun,
  ShieldAlert,
  BatteryCharging,
  Layout,
  Workflow,
  Cpu,
  CloudLightning,
  Activity,
  Eye,
  Bot,
  Cloud,
  GitMerge,
  Users,
  Layers,
  Wallet,
  FileCheck,
  DollarSign,
  BookOpen,
  Truck,
  Award,
  Building2,
  Database,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

interface SystemIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const SystemIcon: React.FC<SystemIconProps> = ({ name, size = 40, className = "" }) => {
  switch (name) {
    case "Building":
      return <Building size={size} className={className} />;
    case "Zap":
      return <Zap size={size} className={className} />;
    case "ThermometerSun":
      return <ThermometerSun size={size} className={className} />;
    case "ShieldAlert":
      return <ShieldAlert size={size} className={className} />;
    case "BatteryCharging":
      return <BatteryCharging size={size} className={className} />;
    case "Layout":
      return <Layout size={size} className={className} />;
    case "Workflow":
      return <Workflow size={size} className={className} />;
    case "Cpu":
      return <Cpu size={size} className={className} />;
    case "CloudLightning":
      return <CloudLightning size={size} className={className} />;
    case "Activity":
      return <Activity size={size} className={className} />;
    case "Eye":
      return <Eye size={size} className={className} />;
    case "Bot":
      return <Bot size={size} className={className} />;
    case "Cloud":
      return <Cloud size={size} className={className} />;
    case "GitMerge":
      return <GitMerge size={size} className={className} />;
    case "Users":
      return <Users size={size} className={className} />;
    case "Layers":
      return <Layers size={size} className={className} />;
    case "Wallet":
      return <Wallet size={size} className={className} />;
    case "FileCheck":
      return <FileCheck size={size} className={className} />;
    case "DollarSign":
      return <DollarSign size={size} className={className} />;
    case "BookOpen":
      return <BookOpen size={size} className={className} />;
    case "Truck":
      return <Truck size={size} className={className} />;
    case "Award":
      return <Award size={size} className={className} />;
    case "Building2":
      return <Building2 size={size} className={className} />;
    case "Database":
      return <Database size={size} className={className} />;
    case "TrendingUp":
      return <TrendingUp size={size} className={className} />;
    case "AlertTriangle":
      return <AlertTriangle size={size} className={className} />;
    default:
      return <HelpCircle size={size} className={className} />;
  }
};
