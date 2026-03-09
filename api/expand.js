// Vercel Serverless Function - API 代理 (xAI Grok)
// 绕过 CORS 限制

export default async function handler(req, res) {
    // 只允许 POST 请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    // xAI API 配置
    const XAI_API_KEY = 'xai-boiojTPZ1zhwQowKebWkFlnfRPFshBFAplfwXmfiGMSBf3fq9qxbbKLjIVONvcZuyDelJfCdwqCPxiOg';
    const XAI_MODEL = 'grok-beta';

    try {
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${XAI_API_KEY}`
            },
            body: JSON.stringify({
                model: XAI_MODEL,
                messages: [
                    { role: 'user', content: prompt }
                ],
                max_tokens: 4096
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API 调用失败');
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
