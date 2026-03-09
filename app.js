// OpenClaw API 配置 (xAI Grok)
const OPENCLAW_CONFIG = {
    baseURL: '/api', // 使用 Vercel Serverless Function
    model: 'grok-beta'
};

// 提示词模板库
let templates = [];
let currentCategory = 'all';

// 快捷键支持
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter 快速提交
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const input = document.getElementById('input');
        if (document.activeElement === input) {
            expandPrompt();
        }
    }
});

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', async () => {
    await loadTemplates();
    loadHistory();
    renderTemplates();
});

// 加载模板
async function loadTemplates() {
    try {
        const response = await fetch('templates.json');
        templates = await response.json();
    } catch (error) {
        console.error('加载模板失败:', error);
        templates = [];
    }
}

// 扩展提示词
async function expandPrompt() {
    const input = document.getElementById('input').value.trim();
    if (!input) {
        showToast('⚠️ 请输入内容');
        document.getElementById('input').focus();
        return;
    }

    // 显示加载状态
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('expandBtn').disabled = true;
    document.getElementById('expandBtn').classList.add('opacity-50');
    document.getElementById('expandBtn').innerHTML = '<span class="animate-spin">⏳</span> 生成中...';

    try {
        const prompt = buildExpansionPrompt(input);
        const result = await callOpenClawAPI(prompt);
        
        // 显示结果
        document.getElementById('outputText').value = result;
        document.getElementById('output').classList.remove('hidden');
        
        // 保存到历史
        saveToHistory(input, result);
        
        // 滚动到结果
        document.getElementById('output').scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        showToast('✅ 扩展成功！');
    } catch (error) {
        console.error('扩展失败:', error);
        showToast('❌ 扩展失败：' + error.message, 'error');
    } finally {
        // 恢复按钮状态
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('expandBtn').disabled = false;
        document.getElementById('expandBtn').classList.remove('opacity-50');
        document.getElementById('expandBtn').innerHTML = '<span>✨</span> 扩展提示词';
    }
}

// 调用 OpenClaw API (通过 Vercel Serverless Function)
async function callOpenClawAPI(prompt) {
    const response = await fetch(`${OPENCLAW_CONFIG.baseURL}/expand`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
            apiKey: OPENCLAW_CONFIG.apiKey
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.message || 'API 调用失败');
    }

    const data = await response.json();
    return data.result;
}

// 构建扩展提示词
function buildExpansionPrompt(input) {
    return `
<instructions>
你是一个提示词工程专家，专门帮助用户将简单想法扩展为专业级 OpenClaw 提示词。
</instructions>

<context>
用户正在使用 OpenClaw (本地优先 AI 助手)，需要结构化、清晰的提示词。
OpenClaw 支持 1M 上下文窗口，XML 标签结构化，多工具调用。
</context>

<expansion_rules>
1. 添加清晰的角色定义
2. 用 XML 标签结构化指令 (<instructions>, <context>, <examples>, <format>)
3. 添加 3-5 个相关示例
4. 指定输出格式
5. 添加上下文和约束
6. 用中文输出
</expansion_rules>

<user_input>
${input}
</user_input>

请生成完整的扩展提示词：
`;
}

// 显示提示
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `fixed bottom-4 right-4 text-white px-6 py-3 rounded-lg shadow-lg transform transition duration-300 ${
        type === 'error' ? 'bg-red-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
    }`;
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// 复制输出
function copyOutput() {
    const output = document.getElementById('outputText');
    output.select();
    document.execCommand('copy');
    showToast('✅ 已复制到剪贴板');
}

// 清除所有
function clearAll() {
    document.getElementById('input').value = '';
    document.getElementById('outputText').value = '';
    document.getElementById('output').classList.add('hidden');
    document.getElementById('input').focus();
}

// 筛选模板
function filterTemplates(category) {
    currentCategory = category;
    
    // 更新按钮样式
    const buttons = document.querySelectorAll('#categoryFilter button');
    buttons.forEach(btn => {
        if (btn.textContent.includes(getCategoryName(category))) {
            btn.classList.remove('bg-gray-100', 'text-gray-700');
            btn.classList.add('bg-purple-100', 'text-purple-700');
        } else {
            btn.classList.add('bg-gray-100', 'text-gray-700');
            btn.classList.remove('bg-purple-100', 'text-purple-700');
        }
    });
    
    renderTemplates();
}

// 获取分类中文名
function getCategoryName(category) {
    const names = {
        'all': '全部',
        'content': '内容创作',
        'code': '代码开发',
        'analysis': '数据分析',
        'business': '商业应用'
    };
    return names[category] || '全部';
}

// 渲染模板
function renderTemplates() {
    const container = document.getElementById('templates');
    const filtered = currentCategory === 'all' 
        ? templates 
        : templates.filter(t => t.category === currentCategory);
    
    container.innerHTML = filtered.map(template => `
        <div class="bg-gray-50 rounded-xl p-4 hover:shadow-md transition cursor-pointer" onclick="useTemplate('${template.id}')">
            <h3 class="font-semibold text-gray-900 mb-2">${template.title}</h3>
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">${template.description}</p>
            <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">${template.category_name}</span>
        </div>
    `).join('');
}

// 使用模板
function useTemplate(templateId) {
    const template = templates.find(t => t.id === templateId);
    if (template) {
        document.getElementById('input').value = template.example_input;
        showToast('✅ 模板已加载到输入框');
    }
}

// 保存到历史
function saveToHistory(input, output) {
    const history = JSON.parse(localStorage.getItem('promptHistory') || '[]');
    history.unshift({
        id: Date.now(),
        input: input.substring(0, 100),
        output: output.substring(0, 200),
        timestamp: new Date().toISOString()
    });
    
    // 只保留最近 20 条
    if (history.length > 20) history.pop();
    
    localStorage.setItem('promptHistory', JSON.stringify(history));
    loadHistory();
}

// 加载历史
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('promptHistory') || '[]');
    const container = document.getElementById('history');
    
    if (history.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-sm">暂无历史记录</p>';
        return;
    }
    
    container.innerHTML = history.map(item => `
        <div class="bg-gray-50 rounded-lg p-3 text-sm cursor-pointer hover:bg-gray-100 transition" onclick="loadHistoryItem(${item.id})">
            <p class="text-gray-900 font-medium truncate">${item.input}</p>
            <p class="text-gray-500 text-xs mt-1">${new Date(item.timestamp).toLocaleString('zh-CN')}</p>
        </div>
    `).join('');
}

// 加载历史项
function loadHistoryItem(id) {
    const history = JSON.parse(localStorage.getItem('promptHistory') || '[]');
    const item = history.find(h => h.id === id);
    if (item) {
        document.getElementById('input').value = item.input;
        document.getElementById('outputText').value = item.output;
        document.getElementById('output').classList.remove('hidden');
    }
}

// 清空历史
function clearHistory() {
    if (confirm('确定要清空历史记录吗？')) {
        localStorage.removeItem('promptHistory');
        loadHistory();
        showToast('✅ 历史已清空');
    }
}

// 显示提示
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `fixed bottom-4 right-4 text-white px-6 py-3 rounded-lg shadow-lg transform transition duration-300 ${
        type === 'error' ? 'bg-red-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
    }`;
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}
