import { TodoItem, NewsItem, SystemCard, DataCenterId, DataCenterMetrics } from "./types";

export const INITIAL_TODOS: TodoItem[] = [
  {
    id: "todo-1",
    title: "审批无锡数据中心电力告警 (配电柜 #4 变频支路过载告警审批)",
    dueDate: "2026-05-25",
    dueLabel: "今天",
    completed: false,
  },
  {
    id: "todo-2",
    title: "查看怀来数据中心 PUE 周报 (确认间接蒸发冷却水泵耗电占比)",
    dueDate: "2026-05-26",
    dueLabel: "明天",
    completed: false,
  },
  {
    id: "todo-3",
    title: "处理 CMDB 变更申请 (尚航核心智算集群机柜资产位置变更同步)",
    dueDate: "2026-05-20",
    dueLabel: "已过期",
    completed: true,
  },
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "尚航荣获绿色数据中心卓越示范奖",
    desc: "在2026年亚太数字基础设施峰会上，尚航怀来智算中心凭借自主研发的AI双变频冷却控制算法与1.12 的年均设计PUE，顺利通过国家绿色三星认证并斩获该项大奖。",
    time: "2小时前",
    tag: "荣誉",
    tagType: "honor",
  },
  {
    id: "news-2",
    title: "AIDC 数智化运营一体化统一平台 2.8 版本升级通知",
    desc: "本次迭代重点升级了 Steady Duty 的故障自愈链路、AI Energy Edge 边缘电能分配网格，以及大模型数字员工的数据中台报表自主生成插件，提升数据分析效率40%。",
    time: "昨天",
    tag: "公告",
    tagType: "notice",
  },
  {
    id: "news-3",
    title: "尚航无锡太湖新城数据中心顺利完成220kV双主变扩容验收",
    desc: "无锡二期重载机房配电室完成了全部220kV负载的电力动态负荷实验，为未来250kW/柜的超高密度液冷机架部署奠定了极高可靠度的电源底盘。",
    time: "3天前",
    tag: "技术",
    tagType: "tech",
  },
];

// Data Center metric presets
export const DATA_CENTER_METRICS: Record<DataCenterId, DataCenterMetrics> = {
  wuxi: {
    name: "无锡数据中心",
    pue: 1.18,
    temperature: 22.4,
    powerLoadKw: 4500,
    savedKwh: 2300,
    status: "优",
    remarks: "今日华东电网绿电供应比率达 78.4%，冷源变频运转负载优越。",
  },
  huailai: {
    name: "怀来数据中心",
    pue: 1.144,
    temperature: 21.8,
    powerLoadKw: 3200,
    savedKwh: 1680,
    status: "极佳",
    remarks: "户外自然风间接冷却系统满额运行中，机架综合配电能耗极低。",
  },
  hqnoc: {
    name: "总部 NOC（集团运营）",
    pue: 1.16,
    temperature: 22.1,
    powerLoadKw: 7700,
    savedKwh: 5420,
    status: "全面受控",
    remarks: "全集团跨地域21个异地机房群集联动监测，AI能源调配全局最优。",
  },
};

// Systems definition
export const AIDC_OPERATIONS_SYSTEMS: SystemCard[] = [
  {
    id: "op-ba",
    name: "BA 楼宇自控",
    iconName: "Building",
    status: "normal",
    statusText: "正常运行",
    desc: "负责数据中心园区内冷冻机房、水泵阀门、精密空调以及通风温控制动机架等冷源设备的全自动化闭环调节与健康监测。",
  },
  {
    id: "op-power",
    name: "电力监控系统",
    iconName: "Zap",
    status: "alert",
    statusText: "1个告警",
    desc: "实时采样高压变电站、UPS不间断电源柜、柴油发电机组以及列头柜电能质量、谐波、负荷趋势与中性线电流状态。",
  },
  {
    id: "op-environment",
    name: "动力环境监控",
    iconName: "ThermometerSun",
    status: "normal",
    statusText: "正常运行",
    desc: "覆盖机房室内温湿度传感器、防漏水绳检测、消防烟感联动报警，以及各物理机房环境核心参数的实时态势监控。",
  },
  {
    id: "op-campus",
    name: "智慧园区系统",
    iconName: "ShieldAlert",
    status: "normal",
    statusText: "正常运行",
    desc: "基于高精度三维数字孪生底座，联动园区门禁人员轨迹、电子巡更、安防视频监控和大区域全息态势感知系统。",
  },
  {
    id: "op-bms",
    name: "BMS 电池管理",
    iconName: "BatteryCharging",
    status: "normal",
    statusText: "正常运行",
    desc: "针对集装箱储能以及UPS室铅酸/锂铁备用电池组的电压、内阻、温度和SOC/SOH估算，预防电池组内阻突变发热隐患。",
  },
  {
    id: "op-dcim",
    name: "DCIM 二维孪生",
    iconName: "Layout",
    status: "normal",
    statusText: "正常运行",
    desc: "结合资产架位、U位占用、机架供电极限、末端冷量分配和PUE实时动态仿真建模，对新排架与规划实施全周期数字推演。",
  },
  {
    id: "op-itsm",
    name: "ITSM（蓝鲸）",
    iconName: "Workflow",
    status: "normal",
    statusText: "正常运行",
    desc: "尚航运维核心服务台流程系统，管控事件变更、工单调测申请、值班巡检日志和跨部门运营协作工作流自流转服务。",
  },
];

export const AI_INTELLIGENT_SYSTEMS: SystemCard[] = [
  {
    id: "ai-edge",
    name: "AI Energy Edge",
    iconName: "Cpu",
    status: "normal",
    statusText: "正常",
    desc: "边缘高压直流电源分配网格AI自治芯片组。根据实时业务脉冲需求，动态调节高电磁响应高DC配电转化效率，降损5%。",
  },
  {
    id: "ai-cloud",
    name: "AI Energy Cloud",
    iconName: "CloudLightning",
    status: "normal",
    statusText: "正常",
    desc: "尚航集团智能云上总源调配大脑，全面分析外部气象走势预测、冷水塔自然冷却潜能与冷量传输延时算力智能平衡。",
  },
  {
    id: "ai-steady",
    name: "Steady Duty",
    iconName: "Activity",
    status: "normal",
    statusText: "正常",
    desc: "基于AI时序自编码检测引擎，针对服务器板载电压、磁盘异常IO读写、网络丢包抖动实现秒级故障预测与业务自愈转接。",
  },
  {
    id: "ai-vision",
    name: "AI云眸",
    iconName: "Eye",
    status: "normal",
    statusText: "正常",
    desc: "云端高精度图像算法引擎，支持全区无盲角红外测温热像、机架指示灯闪烁频率监控、线缆违规占道摆放与外来人员闯入自动截取告警。",
  },
  {
    id: "ai-staff",
    name: "AI数字员工平台",
    iconName: "Bot",
    status: "normal",
    statusText: "正常",
    desc: "大语言模型赋能的数据中心智能大客户助理，负责智能生成巡检月报、分析配电日志、全自动应答客户关于可用度及计费明细的复杂请求。",
  },
];

export const CLOUD_COMPUTING_SYSTEMS: SystemCard[] = [
  {
    id: "cloud-sunclouds",
    name: "Sunclouds",
    iconName: "Cloud",
    status: "normal",
    statusText: "正常",
    desc: "尚航自主研发的高机密智算宿主机虚拟化管理平台，提供高带宽、超低延迟的裸金属级算力节点调度与多VPC网络穿透服务。",
  },
  {
    id: "cloud-hybrid",
    name: "混合云平台",
    iconName: "GitMerge",
    status: "normal",
    statusText: "正常",
    desc: "跨越尚航自建计算节点、阿里云、腾讯云及公有云资产，实现安全、合规的多云统一算力编排、无缝业务多活灾备与按需溢出负载。",
  },
];

export const CUSTOMER_BILLING_SYSTEMS: SystemCard[] = [
  {
    id: "billing-crm",
    name: "CRM 系统",
    iconName: "Users",
    status: "normal",
    statusText: "正常",
    desc: "尚航政企客户生命周期价值管理主节点，覆盖商流合同、算力托管租赁计费策略，以及异地机架销售意向漏斗模型追踪。",
  },
  {
    id: "billing-catic",
    name: "Catic 系统",
    iconName: "Layers",
    status: "normal",
    statusText: "正常",
    desc: "客户综合带宽流量监控和BGP跨运营商家带宽资源动态切片管控。提供精确到3秒级的九五网流计费与质量画像透视。",
  },
  {
    id: "billing-mida",
    name: "米袋系统",
    iconName: "Wallet",
    status: "normal",
    statusText: "正常",
    desc: "高性能销售预算、佣金比例、应收账款催付及企业各职能线财务核销一体化工作套件，完美适配超大规模分布式合同台账核对。",
  },
  {
    id: "billing-aidcbill",
    name: "AIDC 计费平台",
    iconName: "FileCheck",
    status: "normal",
    statusText: "正常",
    desc: "专注于智算中心定制化PUE加价算力折算、弹性电费扣回、空调能效分摊与多地域大批次高密度电源电费专线综合计费模块。",
  },
];

export const FINANCIAL_SYSTEMS: SystemCard[] = [
  {
    id: "finance-xinfutong",
    name: "薪福通",
    iconName: "DollarSign",
    status: "normal",
    statusText: "正常",
    desc: "招商银行薪福通开放版，深度对接尚航薪资批量代发、差旅极速报销审批、企业福袋兑换和多主体独立薪酬核算核发流程。",
  },
  {
    id: "finance-kingdee",
    name: "金蝶云系统",
    iconName: "BookOpen",
    status: "normal",
    statusText: "正常",
    desc: "尚航集团总账ERP。处理记账凭证、资产负债表生成、各子公司及分机构财务合并审计，提供最高标准的企业合规与流动性账目记录。",
  },
];

export const SUPPLY_CHAIN_SYSTEMS: SystemCard[] = [
  {
    id: "supply-platform",
    name: "供应链与交付平台",
    iconName: "Truck",
    status: "normal",
    statusText: "正常",
    desc: "针对服务器、光模块、高密主板、机架液冷管件及动力母线的集中采购计划申报、异地仓库库存盘点点验、工程物流排线追踪和快速安装上架交付全生命周期管控。",
  },
];

export const ORG_OFFICE_SYSTEMS: SystemCard[] = [
  {
    id: "office-hrm",
    name: "HRM + 培训",
    iconName: "Award",
    status: "normal",
    statusText: "正常",
    desc: "人才招聘漏斗追踪绩效考评(OKRs)、数智化全员持证上岗培训在线学习系统。内置高标准的绿色机房电工安全操作及高压特种作业培训微课。",
  },
  {
    id: "office-oa",
    name: "OA 协同办公",
    iconName: "Building2",
    status: "normal",
    statusText: "正常",
    desc: "通用的日常行政公文流转、请客差旅申请审批、章印用信线上备案流程、全员即时通知及团队协作门户入口。",
  },
];

export const DATA_GOVERNANCE_SYSTEMS: SystemCard[] = [
  {
    id: "data-cmdb",
    name: "CMDB 资产平台",
    iconName: "Database",
    status: "normal",
    statusText: "正常",
    desc: "唯一权威配置管理数据库。对网络拓扑线缆、光纤接续、交换机端口、宿主机逻辑槽位和客户主机的元数据及生命周期参数进行多维度、跨地区追踪。",
  },
  {
    id: "data-sphere",
    name: "Steady Datasphere (数据中台)",
    iconName: "TrendingUp",
    status: "normal",
    statusText: "正常",
    desc: "尚航全场景决策大脑底盘。打通生产、销售、客服、计费、财务及电力能源的离线/实时数仓(Data Lakehouse)，配合AI机器人轻松进行一键经营提问与自动Pue调优预测。",
  },
];
