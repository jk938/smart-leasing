import { GoogleGenAI, Type } from "@google/genai";
import { LeaseFormData, GeneratedContractResponse } from "../types";

// Initialize the client
// The API key must be available in the environment variable API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLeaseContract = async (data: LeaseFormData): Promise<GeneratedContractResponse> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    你是一位精通中国《民法典》及金融租赁法律法规的资深律师 AI。
    请根据以下输入信息，生成一份专业的融资租赁合同，并提供针对该业务场景的条款优化分析。

    **业务信息:**
    - 业务类型: ${data.leaseType}
    - 出租人 (甲方): ${data.lessorName} (法定地址: ${data.lessorAddress})
    - 承租人 (乙方): ${data.lesseeName} (法定地址: ${data.lesseeAddress})
    - 租赁物名称: ${data.equipmentName}
    - 租赁物型号: ${data.equipmentModel}
    - 租赁物价值: ${data.equipmentValue} 元
    - 租赁期限: ${data.leaseTermMonths} 个月
    - 租金总额: ${data.totalRent} 元
    - 支付频率: ${data.paymentFrequency}
    - 适用管辖地: ${data.jurisdiction}
    - 特别约定: ${data.specialConditions || "无"}

    **输出要求 (JSON):**
    
    1. **contractMarkdown**: 
       - 必须是一份结构严谨、用词专业的法律合同。
       - **排版要求**: 
         - **合同标题**: 使用 H1 (#) 居中显示，例如 "# 融资租赁合同（${data.leaseType}）"。
         - **章节标题**: 使用 H2 (##) 例如 "## 第一条 租赁物及所有权"。
         - **条款内容**: 必须条理清晰，分款项列出。
       - **内容要求**: 
         - 根据 "${data.leaseType}" 准确定义交易结构（直租含买卖条款，回租含所有权转移条款）。
         - 包含完整条款：合同主体、租赁物交付与验收、租金支付（分期表）、所有权保留、风险承担、保险责任、违约责任（含加速到期）、争议解决（管辖法院为 ${data.jurisdiction} 人民法院）。
         - 必须包含 "${data.specialConditions}" 中的内容。
    
    2. **optimizationAnalysis**:
       - 针对该合同的 AI 法律顾问意见书。
       - **格式**: Markdown。
       - **内容要求**: 
         - **核心风控点**: 解释为何在"${data.leaseType}"模式下设置特定条款（例如回租的权属确认、防范"名租实贷"）。
         - **合规性提示**: 引用《民法典》融资租赁合同章相关法条支持。
         - **操作建议**: 对签约后的履行管理提出建议（如中登网登记）。

    请严格按照定义的 JSON Schema 返回，确保 Markdown 格式正确。
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            contractMarkdown: {
              type: Type.STRING,
              description: "The full text of the financial leasing contract in Markdown format.",
            },
            optimizationAnalysis: {
              type: Type.STRING,
              description: "Explanation of clause optimizations and legal reasoning in Markdown format.",
            },
          },
          required: ["contractMarkdown", "optimizationAnalysis"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(text) as GeneratedContractResponse;
    return result;

  } catch (error) {
    console.error("Error generating contract:", error);
    throw error;
  }
};