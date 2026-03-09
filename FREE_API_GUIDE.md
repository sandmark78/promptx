# 🆓 免费 API 配置指南

**最后更新**: 2026-03-09 13:58 UTC

---

## 🏆 推荐：Groq (完全免费)

### 注册步骤

1. **访问 Groq 控制台**
   - URL: https://console.groq.com
   - 点击 "Sign Up"

2. **注册账号**
   - 使用邮箱或 Google 账号
   - 无需信用卡

3. **创建 API Key**
   - 进入 "API Keys" 页面
   - 点击 "Create API Key"
   - 复制 Key (格式：`gsk_xxxxxxxxxxxxx`)

4. **配置到 Vercel**
   - 访问 Vercel Dashboard
   - 找到 `promptx` 项目
   - Settings → Environment Variables
   - 添加 `GROQ_API_KEY` = 你的 Key
   - 重新部署

---

## 📊 免费 API 对比

### Groq (推荐)
| 项目 | 详情 |
|------|------|
| **价格** | ✅ 完全免费 (目前) |
| **速度** | ⚡ 超快 (LPU 加速) |
| **模型** | Llama 3 70B/8B |
| **限制** | 无硬性限制 |
| **质量** | ⭐⭐⭐⭐⭐ (接近 GPT-4) |

### Hugging Face
| 项目 | 详情 |
|------|------|
| **价格** | ✅ 30k tokens/月免费 |
| **速度** | 🐌 中等 |
| **模型** | 多种开源模型 |
| **限制** | 速率限制 |
| **质量** | ⭐⭐⭐⭐ |

### Google Gemini
| 项目 | 详情 |
|------|------|
| **价格** | ✅ 60 次/分钟免费 |
| **速度** | ⚡ 快 |
| **模型** | Gemini Pro |
| **限制** | 速率限制 |
| **质量** | ⭐⭐⭐⭐⭐ |

---

## 🔧 Vercel 环境变量配置

### 步骤

1. **访问 Vercel Dashboard**
   - https://vercel.com/sandmark78/promptx

2. **进入设置**
   - Settings → Environment Variables

3. **添加变量**
   ```
   Name: GROQ_API_KEY
   Value: gsk_xxxxxxxxxxxxx
   Environment: Production (勾选)
   ```

4. **保存并重新部署**
   - 点击 Save
   - Redeploy

---

## 📝 代码修改

### api/expand.js (使用 Groq)

```javascript
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = 'llama3-70b-8192';

const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'user', content: prompt }]
    })
});
```

---

## ✅ 测试

部署后访问 https://clawprompt.vercel.app

测试内容：
```
帮我写一个数据分析报告
```

应该正常生成结果！

---

## 🦞 状态

**推荐**: Groq (完全免费 + 超快)  
**注册**: https://console.groq.com  
**配置**: Vercel 环境变量

---

**🏖️ 5 分钟搞定，永久免费！** 🚀
