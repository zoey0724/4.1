export interface TodoItem {
  id: string;
  title: string;
  dueDate: string;
  dueLabel: "今天" | "明天" | "已过期";
  completed: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  tag: string;
  tagType: "honor" | "notice" | "tech";
}

export interface SystemCard {
  id: string;
  name: string;
  iconName: string;
  status: "normal" | "alert";
  statusText: string;
  desc: string;
  url?: string;
}

export interface SystemCategory {
  title: string;
  systems: SystemCard[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export type DataCenterId = "wuxi" | "huailai" | "hqnoc";

export interface DataCenterMetrics {
  name: string;
  pue: number;
  temperature: number;
  powerLoadKw: number;
  savedKwh: number;
  status: "优" | "极佳" | "全面受控";
  remarks: string;
}
