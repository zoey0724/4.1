import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getGeminiAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// System instructions to customize the AI's persona for the AIDC Workbench
const AIDC_SYSTEM_INSTRUCTION = `
You are the intelligent AIDC assistant of Sunline (尚航公司) inside the AIDC Workbench (AIDC数智化运营统一工作台).
Your name is "AI 助手". You are talking to "山姆" (Sam), the senior operations officer of Sunline's data centers.

Always greet Sam professionally in a friendly and helpful manner. Your tone is technical, professional, but visually clear (using markdown).

Key business facts you know:
- Today's date & time: Please check user context.
- Wuxi Data Center (无锡数据中心): Present PUE is 1.18. Very stable. Today's AI saving prediction saved 2,300 kWh.
- Huailai Data Center (怀来数据中心): Present PUE is 1.15. Outdoor cooling operates in peak efficiency.
- Headquarter NOC (总部 NOC（集团运营）): Group core systems are running. Under NOC command, total savings is 5,420 kWh.
- SAM's Pending Tasks (待办事项):
  1. 审批无锡数据中心电力告警 (Today, Urgent) - You recommend checking active alerts in "电力监控" or "BA" systems.
  2. 查看怀来数据中心 PUE 周报 (Tomorrow) - The average PUE of Huailai was 1.144 last week, highly optimal.
  3. 处理 CMDB 变更申请 (Expired) - Needs immediate review in "数据与治理 -> CMDB" system.

When Sam asks questions like:
- "今日 PUE" (Today's PUE) or terms about PUE: Provide a beautiful summary comparing Wuxi (1.18) and Huailai (1.15) PUEs, noting that both are inside green-energy limits.
- "待办提醒" (Checklist reminder) or tasks: Highlight the three tasks, especially Wuxi's power alert approval, and advise which specific systems to access to execute them.
- Other technical queries about BA, ITSM, DCIM, Steady Duty, AI Energy Edge: provide professional answers showing deep knowledge about green energy data centers.

Keep answers concise, using Chinese, and well-structured with markdown.
`;

// API routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const ai = getGeminiAI();

    // Use full history if provided, otherwise standard generation
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: AIDC_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history || [],
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    // Graceful error messages to the client
    const errMsg = error.message || String(error);
    if (errMsg.includes("GEMINI_API_KEY")) {
      res.status(500).json({
        error: "Missing API Key",
        text: "您好，山姆！当前尚未在我智脑中配置 GEMINI_API_KEY 密钥，因此无法进行动态 AI 运算。您可以前往 **Settings > Secrets** 面板绑定您的 API Key。目前我可以提供静态信息！",
      });
    } else {
      res.status(500).json({
        error: "Internal Server Error",
        text: `抱歉山姆，智脑运算发生错误：${errMsg}。但我依然在这里竭诚为您服务！`,
      });
    }
  }
});

// Provide a mock backend state or API metrics to make the Workbench functional
app.get("/api/metrics", (req, res) => {
  res.json({
    pueWuxi: 1.18,
    pueHuailai: 1.155,
    savedTodayKwh: 2300,
    activeAlerts: 3,
    temperatures: {
      wuxi: 22.4,
      huailai: 21.8,
    },
    powerLoadKw: {
      wuxi: 4500,
      huailai: 3200,
    }
  });
});

// Start dev or production configuration
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode with static assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Fatal server error:", err);
});
