// Vercel Serverless Function - API 代理
module.exports = async function handler(req, res) {
    console.log('🦞 收到 API 请求:', req.method);
    
    // 只允许 POST 请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, apiKey } = req.body;
    console.log('📝 Prompt 长度:', prompt?.length || 0);

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    // 使用 Mistral AI API
    const MISTRAL_API_KEY = process.env.GROQ_API_KEY || apiKey;
    const MISTRAL_MODEL = 'mistral-large-latest';

    if (!MISTRAL_API_KEY) {
        console.error('❌ API Key 未配置');
        return res.status(500).json({ 
            error: 'API Key 未配置',
            hint: '请在 Vercel 配置 GROQ_API_KEY 环境变量'
        });
    }

    try {
        console.log('🚀 调用 Mistral AI API...');
        
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: MISTRAL_MODEL,
                messages: [
                    { 
                        role: 'system', 
                        content: '你是 OpenClaw 提示词专家，专门帮助用户将简单想法扩展为专业级 OpenClaw 提示词。请用中文输出，使用 XML 标签结构化指令。'
                    },
                    { 
                        role: 'user', 
                        content: prompt 
                    }
                ],
                max_tokens: 4096,
                temperature: 0.7
            })
        });

        console.log('📡 API 响应状态:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ API 错误:', errorData);
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ API 调用成功');
        console.log('📝 响应长度:', data.choices?.[0]?.message?.content?.length || 0);

        res.status(200).json({
            result: data.choices[0].message.content
        });
    } catch (error) {
        console.error('💥 API 异常:', error.message);
        res.status(500).json({
            error: error.message || '服务器错误',
            details: error.toString()
        });
    }
}
