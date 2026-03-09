// OpenClaw API 配置 (Mistral AI)
const OPENCLAW_CONFIG = {
    baseURL: '/api', // 使用 Vercel Serverless Function
    model: 'mistral-large-latest'
};

// 提示词模板库
let templates = [];
let currentCategory = 'all';

// 更新字数统计
function updateCharCount() {
    const input = document.getElementById('input');
    const charCount = document.getElementById('charCount');
    if (!input || !charCount) return;
    
    const count = input.value.trim().length;
    charCount.textContent = count + ' 字';
    
    if (count > 500) {
        charCount.classList.add('text-red-500');
    } else {
        charCount.classList.remove('text-red-500');
    }
}

// 更新输出字数统计
function updateOutputCharCount() {
    const output = document.getElementById('outputText');
    const charCount = document.getElementById('outputCharCount');
    if (!output || !charCount) return;
    
    const count = output.value.trim().length;
    charCount.textContent = count.toLocaleString() + ' 字';
}

// 扩展提示词 - 绑定到 window 确保全局可访问
window.expandPrompt = async function expandPrompt() {
    console.log('🦞 按钮被点击！');
    console.log('🔍 检查输入框...');
    
    const input = document.getElementById('input');
    console.log('📝 输入框:', input);
    
    if (!input) {
        console.error('❌ 错误：找不到输入框 (id="input")');
        showToast('❌ 错误：找不到输入框');
        return;
    }
    
    const inputValue = input.value.trim();
    console.log('📝 输入内容:', inputValue);
    
    if (!inputValue) {
        console.log('⚠️ 输入为空');
        showToast('⚠️ 请输入内容');
        input.focus();
        return;
    }
    
    console.log('🚀 开始生成提示词...');

    // 显示加载状态
    const loadingEl = document.getElementById('loading');
    const expandBtn = document.getElementById('expandBtn');
    
    if (loadingEl) loadingEl.classList.remove('hidden');
    if (expandBtn) {
        expandBtn.disabled = true;
        expandBtn.classList.add('opacity-50');
        expandBtn.innerHTML = '<span class="animate-spin">⏳</span> 生成中...';
    }

    try {
        const prompt = buildExpansionPrompt(inputValue);
        console.log('🚀 调用 API...');
        const result = await callOpenClawAPI(prompt);
        console.log('✅ API 调用成功，结果长度:', result?.length || 0);
        
        // 显示结果
        const outputText = document.getElementById('outputText');
        const outputEl = document.getElementById('output');
        
        if (outputText) outputText.value = result;
        if (outputEl) outputEl.classList.remove('hidden');
        
        updateOutputCharCount();
        
        // 保存到历史
        saveToHistory(inputValue, result);
        
        // 滚动到结果
        if (outputEl) {
            outputEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        showToast('✅ 扩展成功！');
    } catch (error) {
        console.error('❌ 扩展失败:', error);
        showToast('❌ 扩展失败：' + error.message);
    } finally {
        // 恢复按钮状态
        if (loadingEl) loadingEl.classList.add('hidden');
        if (expandBtn) {
            expandBtn.disabled = false;
            expandBtn.classList.remove('opacity-50');
            expandBtn.innerHTML = '<span>✨</span> 生成 OpenClaw 提示词';
        }
    }
}

// 调用 OpenClaw API (通过 Vercel Serverless Function)
async function callOpenClawAPI(prompt) {
    console.log('📡 调用 API:', OPENCLAW_CONFIG.baseURL + '/expand');
    
    try {
        const response = await fetch(OPENCLAW_CONFIG.baseURL + '/expand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                apiKey: OPENCLAW_CONFIG.apiKey
            })
        });

        console.log('📡 API 响应状态:', response.status);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || error.message || 'API 调用失败');
        }

        const data = await response.json();
        return data.result;
    } catch (e) {
        console.error('❌ API 调用失败:', e);
        // 如果 API 失败，返回模拟结果用于测试
        console.log('⚠️ 返回模拟结果用于测试');
        return `<instructions>
你是一位 OpenClaw 提示词专家。
这是模拟的测试结果（API 调用失败）。
</instructions>

<context>
用户正在使用 OpenClaw。
</context>

<format>
1. 功能说明
2. 使用示例
3. 最佳实践
</format>`;
    }
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

// 复制输出
function copyOutput() {
    const output = document.getElementById('outputText');
    if (!output) return;
    
    output.select();
    document.execCommand('copy');
    showToast('✅ 已复制到剪贴板');
    
    // 播放提示音
    playSuccessSound();
}

// 下载输出
function downloadOutput() {
    const output = document.getElementById('outputText');
    if (!output || !output.value) return;
    
    const blob = new Blob([output.value], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clawprompt-' + Date.now() + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('✅ 已下载为 Markdown 文件');
}

// 播放成功提示音
function playSuccessSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 523.25; // C5
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // 忽略音频错误
    }
}

// 清除所有
function clearAll() {
    const input = document.getElementById('input');
    const outputText = document.getElementById('outputText');
    const outputEl = document.getElementById('output');
    
    if (input) input.value = '';
    if (outputText) outputText.value = '';
    if (outputEl) outputEl.classList.add('hidden');
    if (input) {
        input.focus();
        updateCharCount();
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
    const container = document.getElementById('history');
    if (!container) return;
    
    const history = JSON.parse(localStorage.getItem('promptHistory') || '[]');
    
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
    if (!item) return;
    
    const input = document.getElementById('input');
    const outputText = document.getElementById('outputText');
    const outputEl = document.getElementById('output');
    
    if (input) input.value = item.input;
    if (outputText) outputText.value = item.output;
    if (outputEl) outputEl.classList.remove('hidden');
    
    updateCharCount();
    updateOutputCharCount();
    
    showToast('✅ 已加载历史记录');
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
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = 'fixed bottom-6 right-6 text-white px-6 py-4 rounded-lg shadow-lg transform transition duration-300 z-50 ' +
        (type === 'error' ? 'bg-red-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-green-500');
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// 初始化 - 立即执行
console.log('🦞 ClawPrompt app.js 启动...');
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOM 加载完成，初始化应用...');
        loadHistory();
    });
} else {
    console.log('📄 DOM 已就绪，立即初始化...');
    loadHistory();
}
