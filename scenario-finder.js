// 用户数据
const userData = {
    occupation: '',
    painPoints: [],
    scenarios: []
};

// 推荐模板库
const recommendationTemplates = {
    '开发者/程序员': {
        title: '💻 开发者专属方案',
        icon: '💻',
        features: [
            { name: '代码解释器', desc: '快速理解陌生代码库', icon: '🔍' },
            { name: 'Bug 诊断修复', desc: '自动定位并修复问题', icon: '🐛' },
            { name: '单元测试生成', desc: '自动生成测试用例', icon: '✅' },
            { name: 'API 文档生成', desc: '一键生成完整文档', icon: '📖' }
        ],
        workflow: '代码遇到问题 → 用 Bug 诊断 → 生成测试 → 生成文档',
        timeSaved: '每周节省 10+ 小时'
    },
    '内容创作者': {
        title: '✍️ 创作者专属方案',
        icon: '✍️',
        features: [
            { name: '爆款标题生成', desc: '10 个标题任选', icon: '🎯' },
            { name: '种草文案', desc: '真诚不做作', icon: '💚' },
            { name: '多平台适配', desc: '一次生成多平台版本', icon: '📱' },
            { name: '内容日历', desc: '自动规划发布计划', icon: '📅' }
        ],
        workflow: '输入主题 → 生成标题 → 生成文案 → 多平台发布',
        timeSaved: '每篇内容节省 2-3 小时'
    },
    '学生/研究者': {
        title: '📚 学习研究专属方案',
        icon: '📚',
        features: [
            { name: '文献总结', desc: '快速提取核心观点', icon: '📄' },
            { name: '知识点整理', desc: '结构化学习笔记', icon: '🗂️' },
            { name: '论文润色', desc: '学术化表达优化', icon: '✒️' },
            { name: '实验设计', desc: '科学实验方案', icon: '🧪' }
        ],
        workflow: '阅读文献 → 自动总结 → 整理笔记 → 论文润色',
        timeSaved: '每篇论文节省 5+ 小时'
    },
    '创业者/老板': {
        title: '🚀 创业者专属方案',
        icon: '🚀',
        features: [
            { name: '商业计划书', desc: '投资人喜欢的格式', icon: '📊' },
            { name: '竞品分析', desc: '快速了解市场', icon: '🔍' },
            { name: '营销邮件', desc: '高转化率模板', icon: '📧' },
            { name: '数据报告', desc: '自动化生成', icon: '📈' }
        ],
        workflow: '市场分析 → 竞品调研 → 商业计划 → 营销推广',
        timeSaved: '每周节省 15+ 小时'
    },
    '运营/市场': {
        title: '📈 运营市场专属方案',
        icon: '📈',
        features: [
            { name: '社交媒体文案', desc: '多平台一键生成', icon: '📱' },
            { name: '数据分析', desc: '自动洞察趋势', icon: '📊' },
            { name: '用户画像', desc: '精准用户洞察', icon: '👤' },
            { name: '活动策划', desc: '完整活动方案', icon: '🎉' }
        ],
        workflow: '数据分析 → 用户洞察 → 内容生成 → 效果追踪',
        timeSaved: '每个活动节省 8+ 小时'
    }
};

// 选择职业选项 (接受两个参数：type, value)
function selectOption(type, value) {
    console.log('🦞 选择职业:', type, value);
    userData.occupation = value;
    
    // 显示/隐藏自定义输入框
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
        if (customDiv) {
            customDiv.classList.add('hidden');
        }
    }
    
    // 高亮选中的按钮
    const clickedBtn = event.currentTarget;
    const allBtns = clickedBtn.parentElement.querySelectorAll('button');
    allBtns.forEach(btn => {
        btn.classList.remove('border-purple-500', 'bg-purple-50');
    });
    clickedBtn.classList.add('border-purple-500', 'bg-purple-50');
}

// 切换自定义输入框显示
function toggleCustom(elementId) {
    console.log('🔧 切换自定义:', elementId);
    const customDiv = document.getElementById(elementId);
    if (customDiv) {
        const isHidden = customDiv.classList.contains('hidden');
        console.log('当前状态:', isHidden ? '隐藏' : '显示');
        
        if (isHidden) {
            customDiv.classList.remove('hidden');
            setTimeout(() => {
                const input = customDiv.querySelector('input');
                if (input) {
                    input.focus();
                    console.log('聚焦输入框');
                }
            }, 100);
        } else {
            customDiv.classList.add('hidden');
        }
    } else {
        console.error('❌ 找不到元素:', elementId);
    }
}

// 下一步
function nextStep(currentStep) {
    console.log('🚀 下一步：步骤', currentStep);
    
    // 验证步骤 1
    if (currentStep === 1) {
        const customOccupationDiv = document.getElementById('customOccupation');
        const customOccupationInput = document.getElementById('customOccupationInput');
        const isCustomHidden = customOccupationDiv ? customOccupationDiv.classList.contains('hidden') : true;
        const customValue = customOccupationInput ? customOccupationInput.value.trim() : '';
        
        console.log('验证步骤 1:', {
            occupation: userData.occupation,
            isCustomHidden: isCustomHidden,
            customValue: customValue
        });
        
        // 如果选择了自定义但没有输入值
        if (userData.occupation === '自定义' && isCustomHidden === false && !customValue) {
            alert('请输入你的职业/身份');
            customOccupationInput.focus();
            return;
        }
        
        // 如果没有选择任何职业
        if (!userData.occupation) {
            alert('请先选择或输入你的职业/身份');
            return;
        }
        
        // 如果选择了自定义，使用输入的值
        if (userData.occupation === '自定义' && customValue) {
            userData.occupation = customValue;
        }
    }
    // 验证步骤 2
    else if (currentStep === 2) {
        const painPoints = document.querySelectorAll('.pain-point:checked');
        const customPainPointDiv = document.getElementById('customPainPoint');
        const customPainPointInput = document.getElementById('customPainPointInput');
        const isCustomHidden = customPainPointDiv ? customPainPointDiv.classList.contains('hidden') : true;
        const customValue = customPainPointInput ? customPainPointInput.value.trim() : '';
        
        let painPointValues = Array.from(painPoints).map(cb => cb.value);
        
        // 添加自定义痛点
        if (isCustomHidden === false && customValue) {
            painPointValues.push('自定义：' + customValue);
        }
        
        console.log('验证步骤 2:', {
            selectedCount: painPoints.length,
            isCustomHidden: isCustomHidden,
            customValue: customValue,
            totalPainPoints: painPointValues.length
        });
        
        if (painPointValues.length === 0) {
            alert('请至少选择一个痛点');
            return;
        }
        
        userData.painPoints = painPointValues;
    }
    
    // 隐藏当前步骤
    const currentEl = document.getElementById('step' + currentStep);
    if (currentEl) {
        currentEl.classList.add('hidden');
        currentEl.classList.remove('active');
        console.log('隐藏步骤', currentStep);
    }
    
    // 显示下一步
    const nextStepNum = currentStep + 1;
    const nextEl = document.getElementById('step' + nextStepNum);
    if (nextEl) {
        nextEl.classList.remove('hidden');
        nextEl.classList.add('active');
        console.log('显示步骤', nextStepNum);
    }
    
    // 更新进度
    updateProgress(nextStepNum);
}

// 上一步
function prevStep(currentStep) {
    console.log('🔙 上一步：步骤', currentStep);
    
    const currentEl = document.getElementById('step' + currentStep);
    if (currentEl) {
        currentEl.classList.add('hidden');
        currentEl.classList.remove('active');
    }
    
    const prevStepNum = currentStep - 1;
    const prevEl = document.getElementById('step' + prevStepNum);
    if (prevEl) {
        prevEl.classList.remove('hidden');
        prevEl.classList.add('active');
    }
    
    updateProgress(prevStepNum);
}

// 更新进度条
function updateProgress(step) {
    const progress = (step / 4) * 100;
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
    if (progressText) {
        progressText.textContent = '第 ' + step + ' 步 / 共 4 步';
    }
    
    console.log('📊 进度:', progress + '%');
}

// 生成推荐
function generateRecommendations() {
    console.log('🎯 生成推荐...');
    
    // 收集场景
    const scenarios = document.querySelectorAll('.scenario:checked');
    const customScenarioDiv = document.getElementById('customScenario');
    const customScenarioInput = document.getElementById('customScenarioInput');
    const isCustomHidden = customScenarioDiv ? customScenarioDiv.classList.contains('hidden') : true;
    const customValue = customScenarioInput ? customScenarioInput.value.trim() : '';
    
    let scenarioValues = Array.from(scenarios).map(cb => cb.value);
    
    // 添加自定义场景
    if (isCustomHidden === false && customValue) {
        scenarioValues.push('自定义：' + customValue);
    }
    
    userData.scenarios = scenarioValues;
    
    console.log('📊 用户数据:', userData);
    
    // 显示加载动画
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');
    const loading = document.getElementById('loading');
    const recommendations = document.getElementById('recommendations');
    
    if (step3) step3.classList.add('hidden');
    if (step4) step4.classList.remove('hidden');
    if (loading) loading.classList.remove('hidden');
    if (recommendations) recommendations.classList.add('hidden');
    
    updateProgress(4);
    
    // 模拟 AI 分析
    setTimeout(() => {
        if (loading) loading.classList.add('hidden');
        if (recommendations) recommendations.classList.remove('hidden');
        showRecommendations();
    }, 2000);
}

// 显示推荐结果
function showRecommendations() {
    const occupation = userData.occupation;
    const painPoints = userData.painPoints;
    const scenarios = userData.scenarios;
    
    console.log('显示推荐，职业:', occupation);
    
    // 找到最匹配的模板
    let template = recommendationTemplates[occupation];
    if (!template) {
        // 默认推荐
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
    
    // 生成推荐内容
    const container = document.getElementById('recommendations');
    if (!container) {
        console.error('❌ 找不到 recommendations 容器');
        return;
    }
    
    container.innerHTML = `
        <div class="text-center mb-8">
            <div class="text-6xl mb-4">${template.icon}</div>
            <h3 class="text-3xl font-bold text-gray-900 mb-2">${template.title}</h3>
            <p class="text-gray-600">基于你的职业「${occupation}」定制</p>
        </div>
        
        <div class="bg-purple-50 rounded-2xl p-6 mb-8">
            <h4 class="text-xl font-bold text-gray-900 mb-4">🎯 你的痛点，我们懂</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${painPoints.map(p => `<div class="flex items-center"><span class="text-red-500 mr-2">😫</span><span>${p}</span></div>`).join('')}
            </div>
        </div>
        
        <div class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
            <h4 class="text-xl font-bold text-gray-900 mb-4">✨ 为你推荐的核心功能</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${template.features.map(f => `
                    <div class="bg-white rounded-xl p-4 shadow-sm">
                        <div class="flex items-center mb-2">
                            <span class="text-2xl mr-3">${f.icon}</span>
                            <span class="font-semibold text-gray-900">${f.name}</span>
                        </div>
                        <p class="text-gray-600 text-sm">${f.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="bg-green-50 rounded-2xl p-6 mb-8">
            <h4 class="text-xl font-bold text-gray-900 mb-4">🔄 推荐工作流</h4>
            <div class="flex items-center justify-center space-x-4 text-center">
                ${template.workflow.split(' → ').map((step, i) => `
                    <div>
                        <div class="bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium">${step}</div>
                        ${i < template.workflow.split(' → ').length - 1 ? '<span class="text-green-600 text-2xl">→</span>' : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="text-center">
            <div class="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-semibold">
                ⏰ ${template.timeSaved}
            </div>
        </div>
        
        <div class="mt-8 p-6 bg-blue-50 rounded-2xl">
            <h4 class="text-xl font-bold text-gray-900 mb-4">🚀 下一步</h4>
            <p class="text-gray-700 mb-4">点击下方按钮，自动生成你的专属助手提示词，并跳转到提示词优化器进行专业优化！</p>
            <button onclick="generatePromptAndRedirect()" class="gradient-bg text-white font-semibold py-4 px-8 rounded-xl hover:opacity-90 transition text-lg">✨ 生成助手提示词 →</button>
        </div>
        
        <div class="mt-6 text-center">
            <button onclick="restart()" class="text-gray-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition">🔄 重新测试</button>
        </div>
    `;
}

// 生成简单提示词并跳转
function generatePromptAndRedirect() {
    console.log('🚀 生成提示词并跳转...');
    
    const simplePrompt = generateSimplePrompt();
    console.log('📝 生成的提示词:', simplePrompt);
    
    // 存储到 localStorage
    localStorage.setItem('scenarioPrompt', JSON.stringify({
        prompt: simplePrompt,
        occupation: userData.occupation,
        painPoints: userData.painPoints,
        scenarios: userData.scenarios,
        timestamp: Date.now()
    }));
    
    // 跳转到优化器
    window.location.href = 'index.html?mode=assistant&auto=true';
}

// 生成简单提示词（去除"自定义："前缀）
function generateSimplePrompt() {
    const occupation = userData.occupation;
    
    // 去除痛点中的"自定义："前缀
    const cleanPainPoints = userData.painPoints.map(p => p.replace(/^自定义：/, '')).join(', ');
    
    // 去除场景中的"自定义："前缀
    const cleanScenarios = userData.scenarios.map(s => s.replace(/^自定义：/, '')).join(', ');
    
    return `我是一名${occupation}，日常遇到的痛点有：${cleanPainPoints}。主要使用场景包括：${cleanScenarios}。请为我设计一个专属的 AI 助手，帮助我解决这些问题，提高工作效率。`;
}

// 重新开始
function restart() {
    console.log('🔄 重新开始...');
    
    userData.occupation = '';
    userData.painPoints = [];
    userData.scenarios = [];
    
    // 隐藏步骤 4
    const step4 = document.getElementById('step4');
    const step1 = document.getElementById('step1');
    const loading = document.getElementById('loading');
    const recommendations = document.getElementById('recommendations');
    
    if (step4) step4.classList.add('hidden');
    if (step1) {
        step1.classList.remove('hidden');
        step1.classList.add('active');
    }
    if (loading) loading.classList.remove('hidden');
    if (recommendations) recommendations.classList.add('hidden');
    
    // 重置表单
    const customOccupationInput = document.getElementById('customOccupationInput');
    const customOccupation = document.getElementById('customOccupation');
    const customPainPointInput = document.getElementById('customPainPointInput');
    const customPainPoint = document.getElementById('customPainPoint');
    const customScenarioInput = document.getElementById('customScenarioInput');
    const customScenario = document.getElementById('customScenario');
    
    if (customOccupationInput) customOccupationInput.value = '';
    if (customOccupation) customOccupation.classList.add('hidden');
    if (customPainPointInput) customPainPointInput.value = '';
    if (customPainPoint) customPainPoint.classList.add('hidden');
    if (customScenarioInput) customScenarioInput.value = '';
    if (customScenario) customScenario.classList.add('hidden');
    
    // 重置所有复选框
    document.querySelectorAll('.pain-point, .scenario').forEach(cb => {
        cb.checked = false;
    });
    
    // 重置按钮样式
    document.querySelectorAll('#step1 button').forEach(btn => {
        btn.classList.remove('border-purple-500', 'bg-purple-50');
    });
    
    updateProgress(1);
}

// 初始化
console.log('🦞 OpenClaw 场景推荐器启动...');
console.log('✅ 脚本加载完成');
