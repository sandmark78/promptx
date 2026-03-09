# 🦞 ClawPrompt - OpenClaw 提示词助手

**By 龙虾，For 龙虾**

专为 OpenClaw 用户设计的提示词助手，帮助从零起步与 OpenClaw 对话，让模型快速理解意图、输出更高质量结果。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sandmark78/promptx)

**在线使用**: https://clawprompt.vercel.app

---

## ✨ 功能特性

- 🚀 **一键生成** - 输入想法，生成专业 OpenClaw 提示词
- 📚 **50+ 模板** - 覆盖编程/文案/变现/自动化/分析
- 🦞 **OpenClaw 专用** - 内置 7 子 Agent/Cron/变现上下文
- 📝 **XML 结构化** - 让模型更容易理解和执行
- 💾 **一键下载** - 导出为 Markdown 文件
- 📜 **历史记录** - 本地保存最近 20 条
- ⌨️ **快捷键** - Ctrl+Enter 提交，Esc 清空

---

## 🚀 快速开始

### 在线使用
访问：[https://clawprompt.vercel.app](https://clawprompt.vercel.app)

### 本地部署
```bash
# 克隆仓库
git clone https://github.com/sandmark78/promptx.git

# 进入目录
cd promptx

# 用浏览器打开 index.html 即可
open index.html
```

### Vercel 部署
1. Fork 本仓库
2. 在 Vercel 导入项目
3. 配置环境变量 `GROQ_API_KEY`
4. 自动部署完成

---

## 📚 模板分类

### 💻 编程/调试 (5 个)
- Python 代码解释器
- Bug 诊断修复
- 单元测试生成
- 代码重构建议
- API 文档生成

### ✍️ 文案/创作 (5 个)
- 小红书爆款标题
- 小红书种草文案
- 公众号推文
- Twitter/X 推文
- Moltbook 技术分享帖

### 💰 变现/商业 (10 个)
- Gumroad 产品描述
- 闲鱼商品文案
- 商业计划书
- 竞品分析报告
- SWOT 分析
- 营销邮件
- 定价策略建议
- 收益追踪表
- 面包多产品描述
- 小红书带货文案

### 🤖 自动化/OpenClaw (10 个)
- Cron 任务配置
- Moltbook 自动发帖
- GitHub 自动发布
- 知识自动填充
- 数据自动抓取
- Reddit 自动发布
- Twitter/X 自动推文
- 邮件自动回复
- 文件自动整理
- 收益自动追踪

### 📊 分析/研究 (10 个)
- 长文总结
- 竞品分析
- 用户访谈提炼
- 市场趋势分析
- 用户画像生成
- 数据可视化建议
- 文献综述
- 实验设计
- 调查报告
- 案例研究

---

## 🎯 使用示例

### 输入
```
我想让 OpenClaw 帮我自动发布到 Moltbook
```

### 输出
```xml
<instructions>
你是 OpenClaw 的 AutoBot，专门负责自动化发布任务。
你的任务是帮助用户将内容发布到 Moltbook 平台。
</instructions>

<context>
用户正在使用 OpenClaw 进行知识变现和内容分发。
Moltbook 是一个 AI Agent 社交平台，需要验证后发布。
</context>

<steps>
1. 准备发布内容 (标题/内容/标签)
2. 调用 Moltbook API 发布帖子
3. 处理验证挑战 (如有)
4. 确认发布成功并记录
</steps>

<format>
使用 JSON 格式返回发布结果，包含：
- post_id: 帖子 ID
- status: 发布状态
- verification: 验证状态 (如需要)
</format>
```

---

## 🛠️ 技术栈

- **前端**: HTML + Tailwind CSS + Vanilla JavaScript
- **后端**: Vercel Serverless Functions (API 代理)
- **部署**: Vercel (自动 HTTPS)
- **AI**: Mistral AI (mistral-large-latest)
- **存储**: LocalStorage (历史记录)

---

## 💖 支持项目

如果你觉得这个工具有用，欢迎支持：

### 法币打赏
| 方式 | 账号/地址 |
|------|----------|
| **支付宝** | `sandmark78@gmail.com` |
| **微信支付** | 网站底部扫码 |

### 加密货币
| 币种 | 地址 |
|------|------|
| **USDC (Base)** | `0x718C84465686a977f8a9D5E7e8B5f8B5f8B5f8B5` |

---

## 📬 联系方式

- **邮箱**: sandmark78@gmail.com
- **GitHub**: [@sandmark78](https://github.com/sandmark78)
- **问题反馈**: [提交 Issue](https://github.com/sandmark78/promptx/issues)

---

## 📄 开源协议

MIT License - 自由使用、修改和分发

---

**🦞 By 龙虾，For 龙虾 - 让每个 OpenClaw 用户都能轻松上手！**
