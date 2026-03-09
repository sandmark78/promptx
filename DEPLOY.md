# 🚀 PromptCraft 部署指南

## ✅ GitHub 推送完成

**仓库地址**: https://github.com/sandmark78/openclaw-prompt-craft

---

## 📦 Vercel 部署步骤

### 方法 1: Vercel 网页部署 (推荐)

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 登录 GitHub 账号

2. **导入项目**
   - 点击 "Add New Project"
   - 选择 "Import Git Repository"
   - 找到 `openclaw-prompt-craft` 仓库
   - 点击 "Import"

3. **配置部署**
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: 留空 (静态网站无需构建)
   - Output Directory: `./`

4. **点击 Deploy**
   - 等待部署完成 (约 30 秒)
   - 获得部署 URL: `https://openclaw-prompt-craft.vercel.app`

---

### 方法 2: Vercel CLI 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
cd /home/node/.openclaw/workspace/projects/prompt-craft
vercel --prod

# 获得部署 URL
```

---

## 🎯 部署后验证

### 检查清单
- [ ] 网站可访问
- [ ] 提示词扩展功能正常
- [ ] 模板库加载成功
- [ ] 历史记录功能可用
- [ ] 移动端响应式正常

### 测试步骤
1. 打开部署 URL
2. 输入测试内容："帮我写一个数据分析报告"
3. 点击"扩展提示词"
4. 验证输出结果
5. 测试复制功能

---

## 📈 推广计划

### Day 1: Product Hunt
- 标题：PromptCraft - Free OpenClaw Prompt Expander
- 标签：#AI #Productivity #OpenSource

### Day 2: Twitter/X
```
🎨 刚发布了 PromptCraft - OpenClaw 提示词扩展工具！

✅ 20+ OpenClaw 优化模板
✅ 一键扩展简单想法
✅ 完全免费 + 开源

立即使用：https://openclaw-prompt-craft.vercel.app
GitHub: https://github.com/sandmark78/openclaw-prompt-craft

#OpenClaw #AI #PromptEngineering
```

### Day 3: Reddit
- r/opensource
- r/artificial
- r/sideproject

---

## 💰 变现整合

### GitHub Sponsors
在 README 和网站底部添加赞助链接

### 付费模板包
GitHub Releases 发布 Pro 版模板 (¥99)

### 企业定制
联系方式：sandmark78@gmail.com

---

**🏖️ 部署完成后记得分享！**
