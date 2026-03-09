# 🔧 API 故障排查指南

**最后更新**: 2026-03-09 14:28 UTC

---

## 🚨 常见错误

### 错误 1: "API Key 未配置"

**原因**: Vercel 环境变量未正确配置

**解决**:
1. 访问：https://vercel.com/sandmark78/promptx/settings/environment-variables
2. 确认有 `GROQ_API_KEY` 变量
3. 值：`xai-boiojTPZ1zhwQowKebWkFlnfRPFshBFAplfwXmfiGMSBf3fq9qxbbKLjIVONvcZuyDelJfCdwqCPxiOg`
4. 作用域：勾选 `Production` ✅
5. 重新部署

---

### 错误 2: "API 调用失败" / "HTTP 401"

**原因**: API Key 无效或过期

**解决**:
1. 检查 API Key 是否正确 (无空格)
2. 确认 xAI API Key 格式：`xai-xxxxxxxxx`
3. 登录 https://x.ai/console 验证 Key 有效
4. 重新部署

---

### 错误 3: "HTTP 403" / "Forbidden"

**原因**: API Key 无权限或模型不可用

**解决**:
1. 确认模型名正确 (`grok-beta`)
2. 检查 API Key 是否有访问权限
3. 尝试其他模型：`grok-2` 或 `grok-2-vision-1212`

---

### 错误 4: "HTTP 429" / "Rate Limit"

**原因**: API 调用频率超限

**解决**:
1. 等待 1 分钟
2. 检查 xAI 配额
3. 升级 API 计划

---

### 错误 5: "HTTP 500" / "Internal Server Error"

**原因**: Vercel Serverless Function 错误

**解决**:
1. 访问 Vercel Dashboard
2. 查看 Functions 日志
3. 检查详细错误信息

---

## 🔍 调试步骤

### 1. 检查浏览器控制台

```
按 F12 → Console 标签 → 查看错误信息
```

### 2. 检查网络请求

```
按 F12 → Network 标签 → 点击 /api/expand → 查看 Response
```

### 3. 查看 Vercel 日志

```
1. 访问：https://vercel.com/sandmark78/promptx
2. 点击 "Deployments"
3. 点击最新部署
4. 点击 "Functions" → 查看日志
```

### 4. 测试 API Key

```bash
# 本地测试 API Key
curl -X POST "https://api.x.ai/v1/chat/completions" \
  -H "Authorization: Bearer xai-YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"grok-beta","messages":[{"role":"user","content":"Hello"}]}'
```

---

## ✅ 验证清单

- [ ] Vercel 环境变量已配置 `GROQ_API_KEY`
- [ ] API Key 格式正确 (`xai-xxxxxxxxx`)
- [ ] API Key 无空格
- [ ] 模型名正确 (`grok-beta`)
- [ ] Vercel 已重新部署
- [ ] 部署状态为 "Ready"

---

## 📞 获取帮助

- **Vercel 日志**: https://vercel.com/sandmark78/promptx
- **GitHub Issues**: https://github.com/sandmark78/promptx/issues
- **xAI 文档**: https://docs.x.ai/

---

**🦞 祝调试顺利！**
