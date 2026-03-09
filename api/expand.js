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

    // xAI API 配置 (从环境变量读取)
    const XAI_API_KEY = process.env.GROQ_API_KEY; // 使用 GROQ_API_KEY 环境变量
    const XAI_MODEL = 'grok-4-1-fast-reasoning';

    if (!XAI_API_KEY) {
        console.error('❌ API Key 未配置');
        return res.status(500).json({ 
            error: 'API Key 未配置',
            hint: '请在 Vercel 配置 GROQ_API_KEY 环境变量'
        });
    }

    console.log('🔍 API 调用开始:', {
        model: XAI_MODEL,
        hasApiKey: !!XAI_API_KEY,
        apiKeyLength: XAI_API_KEY?.length || 0
    });

    try {
        console.log('📡 调用 xAI API:', XAI_MODEL);
        
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
                max_tokens: 4096,
                stream: false
            })
        });

        console.log('📡 API 响应状态:', response.status);
        
        // 读取响应文本
        const responseText = await response.text();
        console.log('📄 API 响应:', responseText.substring(0, 500));

        // 解析 JSON
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`响应解析失败：${responseText.substring(0, 200)}`);
        }

        if (!response.ok) {
            console.error('❌ API 错误:', data);
            throw new Error(data.error?.message || data.message || `HTTP ${response.status}`);
        }

        console.log('✅ API 调用成功');
        console.log('📝 响应长度:', data.choices?.[0]?.message?.content?.length || 0);

        res.status(200).json({
            result: data.choices[0].message.content
        });
    } catch (error) {
        console.error('💥 API 异常:', error.message);
        res.status(500).json({
            error: error.message || '服务器错误',
            details: error.toString(),
            timestamp: new Date().toISOString()
        });
    }
}
