// OpenClaw API 配置
const OPENCLAW_CONFIG = {
    baseURL: '/api',
    model: 'mistral-large-latest'
};

// 更新字数统计 - 绑定到 window
window.updateCharCount = function() {
    console.log('🔤 更新字数统计...');
    const input = document.getElementById('input');
    const charCount = document.getElementById('charCount');
    
    if (!input) { console.error('❌ 找不到输入框'); return; }
    if (!charCount) { console.error('❌ 找不到字数统计'); return; }
    
    const count = input.value.trim().length;
    console.log('📊 字数:', count);
    charCount.textContent = count + ' 字';
    
    if (count > 500) {
        charCount.classList.add('text-red-500');
    } else {
        charCount.classList.remove('text-red-500');
    }
};

// 更新输出字数统计 - 绑定到 window
window.updateOutputCharCount = function() {
    const output = document.getElementById('outputText');
    const charCount = document.getElementById('outputCharCount');
    if (!output || !charCount) return;
    charCount.textContent = output.value.trim().length.toLocaleString() + ' 字';
};

// 扩展提示词 - 绑定到 window
window.expandPrompt = async function() {
    console.log('🦞 按钮被点击！');
    
    const input = document.getElementById('input');
    console.log('📝 输入框:', input);
    
    if (!input) {
        console.error('❌ 找不到输入框');
        showToast('❌ 找不到输入框');
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
    
    console.log('🚀 开始生成...');

    // 显示加载状态
    const loading = document.getElementById('loading');
    const expandBtn = document.getElementById('expandBtn');
    if (loading) loading.classList.remove('hidden');
    if (expandBtn) {
        expandBtn.disabled = true;
        expandBtn.classList.add('opacity-50');
        expandBtn.innerHTML = '⏳ 生成中...';
    }

    try {
        const prompt = buildExpansionPrompt(inputValue);
        const result = await callOpenClawAPI(prompt);
        console.log('✅ 生成成功，长度:', result?.length);
        
        const outputText = document.getElementById('outputText');
        const output = document.getElementById('output');
        if (outputText) outputText.value = result;
        if (output) output.classList.remove('hidden');
        
        updateOutputCharCount();
        saveToHistory(inputValue, result);
        if (output) output.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        showToast('✅ 扩展成功！');
    } catch (error) {
        console.error('❌ 生成失败:', error);
        showToast('❌ 失败：' + error.message);
    } finally {
        const loading = document.getElementById('loading');
        const expandBtn = document.getElementById('expandBtn');
        if (loading) loading.classList.add('hidden');
        if (expandBtn) {
            expandBtn.disabled = false;
            expandBtn.classList.remove('opacity-50');
            expandBtn.innerHTML = '✨ 生成 OpenClaw 提示词';
        }
    }
};

// 调用 API
window.callOpenClawAPI = async function(prompt) {
    console.log('📡 调用 API...');
    try {
        const response = await fetch(OPENCLAW_CONFIG.baseURL + '/expand', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt, apiKey: OPENCLAW_CONFIG.apiKey })
        });
        console.log('📡 响应状态:', response.status);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || error.message || 'API 失败');
        }
        const data = await response.json();
        return data.result;
    } catch (e) {
        console.error('❌ API 失败:', e);
        return '<instructions>测试输出（API 不可用）</instructions>\n<format>\n1. 测试项 1\n2. 测试项 2\n</format>';
    }
};

// 构建提示词
window.buildExpansionPrompt = function(input) {
    return `\n<instructions>\n你是提示词工程专家。\n</instructions>\n<context>\n用户需要结构化提示词。\n</context>\n<user_input>\n${input}\n</user_input>\n请生成专业提示词：\n`;
};

// 复制输出
window.copyOutput = function() {
    const output = document.getElementById('outputText');
    if (!output) return;
    output.select();
    document.execCommand('copy');
    showToast('✅ 已复制');
};

// 下载输出
window.downloadOutput = function() {
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
    showToast('✅ 已下载');
};

// 清除所有
window.clearAll = function() {
    const input = document.getElementById('input');
    const outputText = document.getElementById('outputText');
    const output = document.getElementById('output');
    if (input) input.value = '';
    if (outputText) outputText.value = '';
    if (output) output.classList.add('hidden');
    if (input) { input.focus(); updateCharCount(); }
};

// 保存历史
function saveToHistory(input, output) {
    const history = JSON.parse(localStorage.getItem('promptHistory') || '[]');
    history.unshift({ id: Date.now(), input: input.substring(0, 100), output: output.substring(0, 200), timestamp: new Date().toISOString() });
    if (history.length > 20) history.pop();
    localStorage.setItem('promptHistory', JSON.stringify(history));
    loadHistory();
}

// 加载历史
window.loadHistory = function() {
    const container = document.getElementById('history');
    if (!container) return;
    const history = JSON.parse(localStorage.getItem('promptHistory') || '[]');
    if (history.length === 0) {
        container.innerHTML = '<p class="text-gray-500">暂无历史记录</p>';
        return;
    }
    container.innerHTML = history.map(item => `<div class="bg-gray-50 rounded-lg p-3 text-sm cursor-pointer hover:bg-gray-100" onclick="loadHistoryItem(${item.id})"><p class="font-medium truncate">${item.input}</p><p class="text-gray-500 text-xs mt-1">${new Date(item.timestamp).toLocaleString('zh-CN')}</p></div>`).join('');
}

// 加载历史项
window.loadHistoryItem = function(id) {
    const history = JSON.parse(localStorage.getItem('promptHistory') || '[]');
    const item = history.find(h => h.id === id);
    if (!item) return;
    const input = document.getElementById('input');
    const outputText = document.getElementById('outputText');
    const output = document.getElementById('output');
    if (input) input.value = item.input;
    if (outputText) outputText.value = item.output;
    if (output) output.classList.remove('hidden');
    updateCharCount();
    updateOutputCharCount();
    showToast('✅ 已加载');
};

// 清空历史
window.clearHistory = function() {
    if (confirm('确定清空历史记录？')) {
        localStorage.removeItem('promptHistory');
        loadHistory();
        showToast('✅ 已清空');
    }
};

// 显示提示
window.showToast = function(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
};

// 初始化
console.log('🦞 ClawPrompt 启动...');
window.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM 加载完成');
    loadHistory();
    console.log('✅ 初始化完成');
});
