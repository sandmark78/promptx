# 🦞 ClawPrompt - OpenClaw 专用提示词助手

**By 龙虾，For 龙虾**

---

## 🎯 定位

**专为 OpenClaw 用户设计的提示词助手**

帮助从零起步的用户：
- ✅ 理解如何与 OpenClaw 对话
- ✅ 生成专业级 OpenClaw 提示词
- ✅ 学习 OpenClaw 最佳实践
- ✅ 快速上手知识管理/变现

---

## 📚 OpenClaw 提示词模板

### 从零起步 (新手必备)
- 如何开始第一次对话
- OpenClaw 基础配置
- 理解 7 子 Agent 架构
- 第一次 Cron 任务配置

### 知识管理
- 知识获取任务配置
- 知识库填充策略
- 知识质量审计
- 知识检索系统开发

### 平台发布
- Moltbook 自动发帖
- Reddit 内容发布
- Twitter/X 推文生成
- GitHub 仓库管理

### 知识变现
- Gumroad 产品上架
- ClawHub 技能发布
- 闲鱼/面包多配置
- 收益追踪系统

### 系统优化
- API 配置与替换
- Cron 任务优化
- 子 Agent 任务分配
- 性能监控与调试

---

## 🦞 为什么需要 ClawPrompt？

### 新手痛点
1. **不知道如何开始** - 第一次对话怎么写？
2. **不理解 OpenClaw 能力** - 能做什么？不能做什么？
3. **提示词太简单** - 生成的内容质量差
4. **缺少结构化** - 没有 XML 标签，Agent 理解困难

### ClawPrompt 解决
1. ✅ **从零起步指导** - 专门的新手提示词
2. ✅ **OpenClaw 上下文** - Agent 了解 OpenClaw 生态
3. ✅ **专业级扩展** - 包含角色/上下文/示例/格式
4. ✅ **XML 结构化** - Agent 更容易理解和执行

---

## 🚀 使用示例

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

<examples>
示例 1: 发布技术分享帖
示例 2: 发布产品推广帖
</examples>
```

---

## 🦞 核心优势

| 特性 | 通用工具 | ClawPrompt |
|------|---------|-----------|
| OpenClaw 上下文 | ❌ | ✅ 内置 |
| 7 子 Agent 理解 | ❌ | ✅ 深度集成 |
| Cron 任务支持 | ❌ | ✅ 原生支持 |
| 变现经验 | ❌ | ✅ 实战经验 |
| 新手友好 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 📖 从零起步指南

### 第一步：注册 OpenClaw
1. 访问 OpenClaw 官网
2. 注册账号
3. 配置 Telegram/Discord

### 第二步：理解能力
- 7 个子 Agent 各司其职
- Cron 定时任务自动执行
- 知识库 411k+ 点可用

### 第三步：开始对话
1. 打开 ClawPrompt
2. 输入你的想法
3. 生成专业提示词
4. 复制到 OpenClaw 使用

### 第四步：持续优化
- 查看生成结果
- 调整提示词
- 保存成功模板

---

**🦞 By 龙虾，For 龙虾 - 让每个 OpenClaw 用户都能轻松上手！**
