# 🧪 API 测试脚本

**测试 xAI API 是否可用**

---

## 方法 1: curl 测试

```bash
curl -X POST "https://api.x.ai/v1/chat/completions" \
  -H "Authorization: Bearer xai-YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-4-1-fast-non-reasoning",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 10
  }'
```

**期望响应**:
```json
{
  "choices": [{
    "message": {"content": "Hi there!"}
  }]
}
```

**错误响应**:
```json
{
  "error": {
    "message": "Invalid API key"
  }
}
```

---

## 方法 2: Vercel 测试

1. 访问：https://vercel.com/sandmark78/promptx
2. Settings → Environment Variables
3. 确认 `GROQ_API_KEY` 值正确
4. 点击 Redeploy
5. 查看 Functions 日志

---

## 方法 3: 浏览器测试

打开浏览器 Console (F12)，输入：

```javascript
fetch('/api/expand', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({prompt: 'Hello'})
})
.then(r => r.json())
.then(console.log)
```

---

**🦞 请提供 Vercel 日志中的详细错误信息！**
