# 🔧 故障排查指南

**最后更新**: 2026-03-09 13:52 UTC

---

## 🚨 常见问题

### 问题 1: 点击"扩展"没反应

**症状**: 点击按钮后一直显示"生成中..."

**原因**: Vercel 部署未完成，API 代理不可用

**解决方案**:
1. 等待 2-3 分钟 Vercel 自动部署
2. 刷新页面 (Ctrl+Shift+R 强制刷新)
3. 检查浏览器控制台错误 (F12)

---

### 问题 2: CORS 错误

**症状**: 浏览器控制台显示 CORS 错误

**原因**: 直接调用 DashScope API 被浏览器拦截

**解决方案**:
1. 确保使用 Vercel 部署 (非本地运行)
2. 检查 `/api/expand.js` 是否存在
3. 重新部署触发 API 更新

---

### 问题 3: API Key 错误

**症状**: "API 调用失败" 或 "Invalid API Key"

**原因**: API Key 配置错误或过期

**解决方案**:
1. 检查 `app.js` 中的 `apiKey` 配置
2. 确认 API Key 格式正确
3. 联系 OpenClaw 管理员更新

---

### 问题 4: 模板加载失败

**症状**: 模板库显示空白

**原因**: `templates.json` 加载失败

**解决方案**:
1. 检查浏览器控制台网络错误
2. 确认 `templates.json` 文件存在
3. 清除浏览器缓存

---

## 🔍 调试步骤

### 1. 检查浏览器控制台
```
按 F12 → Console 标签 → 查看错误信息
```

### 2. 检查网络请求
```
按 F12 → Network 标签 → 查看 /api/expand 请求
```

### 3. 检查 Vercel 部署
```
访问：https://vercel.com/sandmark78/promptx/deployments
查看最新部署状态
```

### 4. 检查 GitHub 提交
```
访问：https://github.com/sandmark78/promptx/commits/main
确认最新提交已推送
```

---

## 📞 获取帮助

- **提交 Issue**: https://github.com/sandmark78/promptx/issues
- **邮件联系**: sandmark78@gmail.com
- **查看日志**: Vercel Dashboard → Deployments → View Logs

---

## ✅ 正常工作流程

```
1. 输入内容 → "帮我写一个数据分析报告"
2. 点击"扩展提示词"
3. 显示"生成中..."动画 (约 5-10 秒)
4. 显示扩展结果 (XML 格式)
5. 可以复制结果
6. 自动保存到历史
```

如果以上任何一步失败，请参考上述排查指南。

---

**🦞 祝使用愉快！**
