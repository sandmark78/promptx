// Vercel Serverless Function - API 代理 (Mistral AI)
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

    // Mistral AI API 配置 (从环境变量读取)
    const MISTRAL_API_KEY = process.env.GROQ_API_KEY; // 使用现有环境变量
    const MISTRAL_MODEL = 'mistral-large-latest';

    if (!MISTRAL_API_KEY) {
        console.error('❌ API Key 未配置');
        return res.status(500).json({ 
            error: 'API Key 未配置',
            hint: '请在 Vercel 配置 GROQ_API_KEY 环境变量'
        });
    }

    console.log('🔍 API 调用开始:', {
        model: MISTRAL_MODEL,
        hasApiKey: !!MISTRAL_API_KEY,
        apiKeyLength: MISTRAL_API_KEY?.length || 0,
        promptLength: prompt.length
    });

    try {
        console.log('📡 调用 Mistral AI API:', MISTRAL_MODEL);
        
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
                        content: `你是提示词工程专家，专门帮助用户将简单想法扩展为专业级提示词。

你的任务是将用户的模糊需求转化为结构化、可执行的高质量提示词。

请使用中文输出，使用 XML 标签结构化指令。`
                    },
                    { 
                        role: 'user', 
                        content: prompt 
                    }
                ],
                stream: false,
                temperature: 0.7
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
