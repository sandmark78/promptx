// 用户数据
const userData = {
    occupation: '',
    painPoints: [],
    scenarios: []
};

// 选择职业选项
function selectOption(type, value) {
    console.log('🦞 选择职业:', type, value);
    userData.occupation = value;
    
    const customDiv = document.getElementById('customOccupation');
    if (value === '自定义') {
        if (customDiv) {
            customDiv.classList.remove('hidden');
            setTimeout(() => {
                const input = document.getElementById('customOccupationInput');
                if (input) input.focus();
            }, 100);
        }
    } else {
        if (customDiv) customDiv.classList.add('hidden');
    }
    
    const clickedBtn = event.currentTarget;
    const allBtns = clickedBtn.parentElement.querySelectorAll('button');
    allBtns.forEach(btn => btn.classList.remove('border-purple-500', 'bg-purple-50'));
    clickedBtn.classList.add('border-purple-500', 'bg-purple-50');
}

// 切换自定义输入框
function toggleCustom(elementId) {
    const customDiv = document.getElementById(elementId);
    if (customDiv) {
        customDiv.classList.toggle('hidden');
        setTimeout(() => {
            const input = customDiv.querySelector('input');
            if (input) input.focus();
        }, 100);
    }
}

// 下一步
function nextStep(currentStep) {
    console.log('🚀 下一步：步骤', currentStep);
    
    if (currentStep === 1) {
        const customValue = document.getElementById('customOccupationInput')?.value.trim() || '';
        if (userData.occupation === '自定义' && !customValue) {
            alert('请输入你的职业/身份');
            return;
        }
        if (!userData.occupation) {
            alert('请先选择或输入你的职业/身份');
            return;
        }
        if (userData.occupation === '自定义' && customValue) {
            userData.occupation = customValue;
        }
    }
    else if (currentStep === 2) {
        const painPoints = document.querySelectorAll('.pain-point:checked');
        const customPainPointDiv = document.getElementById('customPainPoint');
        const customPainPointInput = document.getElementById('customPainPointInput');
        const isCustomHidden = customPainPointDiv ? customPainPointDiv.classList.contains('hidden') : true;
        const customValue = customPainPointInput ? customPainPointInput.value.trim() : '';
        
        let values = [];
        painPoints.forEach(cb => {
            if (cb.value !== '自定义' && cb.value.trim()) {
                values.push(cb.value.trim());
            }
        });
        if (isCustomHidden === false && customValue) {
            values.push(customValue);
        }
        
        if (values.length === 0) {
            alert('请至少选择一个痛点');
            return;
        }
        userData.painPoints = values;
    }
    else if (currentStep === 3) {
        const scenarios = document.querySelectorAll('.scenario:checked');
        const customScenarioDiv = document.getElementById('customScenario');
        const customScenarioInput = document.getElementById('customScenarioInput');
        const isCustomHidden = customScenarioDiv ? customScenarioDiv.classList.contains('hidden') : true;
        const customValue = customScenarioInput ? customScenarioInput.value.trim() : '';
        
        let values = [];
        scenarios.forEach(cb => {
            if (cb.value !== '自定义' && cb.value.trim()) {
                values.push(cb.value.trim());
            }
        });
        if (isCustomHidden === false && customValue) {
            values.push(customValue);
        }
        
        if (values.length === 0) {
            alert('请至少选择一个场景');
            return;
        }
        userData.scenarios = values;
    }
    
    document.getElementById('step' + currentStep)?.classList.add('hidden');
    document.getElementById('step' + currentStep)?.classList.remove('active');
    
    const nextStepNum = currentStep + 1;
    const nextEl = document.getElementById('step' + nextStepNum);
    if (nextEl) {
        nextEl.classList.remove('hidden');
        nextEl.classList.add('active');
    }
    
    updateProgress(nextStepNum);
}

// 上一步
function prevStep(currentStep) {
    document.getElementById('step' + currentStep)?.classList.add('hidden');
    document.getElementById('step' + currentStep)?.classList.remove('active');
    
    const prevStepNum = currentStep - 1;
    const prevEl = document.getElementById('step' + prevStepNum);
    if (prevEl) {
        prevEl.classList.remove('hidden');
        prevEl.classList.add('active');
    }
    
    updateProgress(prevStepNum);
}

// 更新进度
function updateProgress(step) {
    const progress = (step / 4) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = '第 ' + step + ' 步 / 共 4 步';
}

// 生成推荐
function generateRecommendations() {
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');
    const loading = document.getElementById('loading');
    const recommendations = document.getElementById('recommendations');
    
    if (step3) step3.classList.add('hidden');
    if (step4) step4.classList.remove('hidden');
    if (loading) loading.classList.remove('hidden');
    if (recommendations) recommendations.classList.add('hidden');
    
    updateProgress(4);
    
    setTimeout(() => {
        if (loading) loading.classList.add('hidden');
        if (recommendations) recommendations.classList.remove('hidden');
        showRecommendations();
    }, 2000);
}

// 显示推荐结果
function showRecommendations() {
    console.log('🎯 显示推荐结果...');
    
    const occupation = userData.occupation || '职场人士';
    const painPoints = userData.painPoints || [];
    const scenarios = userData.scenarios || [];
    
    let template = recommendationTemplates[occupation];
    if (!template) {
        template = {
            title: '🎯 通用高效方案',
            icon: '🎯',
            features: [
                { name: '智能助手', desc: '7x24 小时在线', icon: '🤖' },
                { name: '自动化', desc: '解放双手', icon: '⚙️' },
                { name: '知识管理', desc: '井井有条', icon: '🗂️' },
                { name: '内容生成', desc: '高效创作', icon: '✍️' }
            ],
            workflow: '输入需求 → AI 处理 → 输出结果',
            timeSaved: '每天节省 2+ 小时'
        };
    }
    
    const container = document.getElementById('recommendations');
    if (!container) {
        console.error('❌ 找不到 recommendations 容器');
        return;
    }
    
    // 过滤痛点中的"自定义"前缀
    const cleanPainPoints = painPoints.map(p => p.replace(/^自定义：?/, '').trim()).filter(p => p.length > 0);
    
    container.innerHTML = `
        <div class="text-center mb-8">
            <div class="text-6xl mb-4">${template.icon}</div>
            <h3 class="text-3xl font-bold text-gray-900 mb-2">${template.title}</h3>
            <p class="text-gray-600">基于你的职业「${occupation}」定制</p>
        </div>
        
        <div class="bg-purple-50 rounded-2xl p-6 mb-8">
            <h4 class="text-xl font-bold text-gray-900 mb-4">🎯 你的痛点，我们懂</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${cleanPainPoints.length > 0 ? cleanPainPoints.map(p => `<div class="flex items-center"><span class="text-red-500 mr-2">😫</span><span>${p}</span></div>`).join('') : '<p class="text-gray-500">暂无痛点</p>'}
            </div>
        </div>
        
        <div class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
            <h4 class="text-xl font-bold text-gray-900 mb-4">✨ 为你推荐的核心功能</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${template.features.map(f => `<div class="bg-white rounded-xl p-4 shadow-sm"><div class="flex items-center mb-2"><span class="text-2xl mr-3">${f.icon}</span><span class="font-semibold text-gray-900">${f.name}</span></div><p class="text-gray-600 text-sm">${f.desc}</p></div>`).join('')}
            </div>
        </div>
        
        <div class="bg-green-50 rounded-2xl p-6 mb-8">
            <h4 class="text-xl font-bold text-gray-900 mb-4">🔄 推荐工作流</h4>
            <div class="flex items-center justify-center space-x-4 text-center">
                ${template.workflow.split(' → ').map((step, i) => `<div><div class="bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium">${step}</div>${i < template.workflow.split(' → ').length - 1 ? '<span class="text-green-600 text-2xl">→</span>' : ''}</div>`).join('')}
            </div>
        </div>
        
        <div class="text-center">
            <div class="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-semibold">⏰ ${template.timeSaved}</div>
        </div>
        
        <div class="mt-8 p-6 bg-blue-50 rounded-2xl">
            <h4 class="text-xl font-bold text-gray-900 mb-4">🚀 下一步</h4>
            <p class="text-gray-700 mb-4">点击下方按钮，自动生成你的专属助手提示词，并跳转到提示词优化器进行专业优化！</p>
            <button onclick="generatePromptAndRedirect()" class="gradient-bg text-white font-semibold py-4 px-8 rounded-xl hover:opacity-90 transition text-lg w-full">✨ 生成助手提示词 →</button>
        </div>
        
        <div class="mt-6 text-center">
            <button onclick="restart()" class="text-gray-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition">🔄 重新测试</button>
        </div>
    `;
}

// 生成简单提示词
function generateSimplePrompt() {
    const occupation = userData.occupation || '职场人士';
    const cleanPainPoints = userData.painPoints.length > 0 ? userData.painPoints.join(', ') : '工作效率需要提升';
    const cleanScenarios = userData.scenarios.length > 0 ? userData.scenarios.join(', ') : '日常工作';
    return `我是一名${occupation}，日常遇到的痛点有：${cleanPainPoints}。主要使用场景包括：${cleanScenarios}。请为我设计一个专属的 AI 助手，帮助我解决这些问题，提高工作效率。`;
}

// 生成提示词并跳转
function generatePromptAndRedirect() {
    console.log('🚀 生成提示词并跳转...');
    const simplePrompt = generateSimplePrompt();
    console.log('📝 生成的提示词:', simplePrompt);
    
    localStorage.setItem('scenarioPrompt', JSON.stringify({
        prompt: simplePrompt,
        occupation: userData.occupation,
        painPoints: userData.painPoints,
        scenarios: userData.scenarios,
        timestamp: Date.now()
    }));
    
    window.location.href = 'index.html?mode=assistant&auto=true';
}

// 重新开始
function restart() {
    userData.occupation = '';
    userData.painPoints = [];
    userData.scenarios = [];
    
    document.getElementById('step4')?.classList.add('hidden');
    document.getElementById('step1')?.classList.remove('hidden');
    document.getElementById('step1')?.classList.add('active');
    document.getElementById('loading')?.classList.remove('hidden');
    document.getElementById('recommendations')?.classList.add('hidden');
    
    document.getElementById('customOccupationInput').value = '';
    document.getElementById('customOccupation')?.classList.add('hidden');
    document.getElementById('customPainPointInput').value = '';
    document.getElementById('customPainPoint')?.classList.add('hidden');
    document.getElementById('customScenarioInput').value = '';
    document.getElementById('customScenario')?.classList.add('hidden');
    
    document.querySelectorAll('.pain-point, .scenario').forEach(cb => cb.checked = false);
    document.querySelectorAll('#step1 button').forEach(btn => btn.classList.remove('border-purple-500', 'bg-purple-50'));
    
    updateProgress(1);
}

console.log('🦞 OpenClaw 场景推荐器启动...');
