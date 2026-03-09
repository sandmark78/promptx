// Vercel Serverless Function - API 代理 (Groq 免费版)
// 使用 Groq 替代 DashScope，完全免费！

export default async function handler(req, res) {
    // 只允许 POST 请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    // Groq API 配置
    const GROQ_API_KEY = process.env.GROQ_API_KEY || 'gsk_xxxxxxxxxxxxx'; // 替换为你的 Groq API Key
    const GROQ_MODEL = 'llama3-70b-8192'; // Llama 3 70B

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: [
                    { role: 'user', content: prompt }
                ],
                max_tokens: 4096,
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'API 调用失败');
        }

        res.status(200).json({
            result: data.choices[0].message.content
        });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            error: error.message || '服务器错误'
        });
    }
}
