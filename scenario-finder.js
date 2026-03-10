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

// 选择选项
function selectOption(type, value) {
    if (type === 'occupation') {
        userData.occupation = value;
        document.getElementById('occupationInput').value = value;
    }
    
    // 高亮选中
    const buttons = event.target.closest('button').parentElement.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('border-purple-500', 'bg-purple-50'));
    event.target.closest('button').classList.add('border-purple-500', 'bg-purple-50');
}

// 下一步
function nextStep(currentStep) {
    // 验证
    if (currentStep === 1) {
        const occupationInput = document.getElementById('occupationInput').value.trim();
        if (!occupationInput) {
            alert('请先选择或输入你的职业/身份');
            return;
        }
        userData.occupation = occupationInput;
    } else if (currentStep === 2) {
        const painPoints = document.querySelectorAll('.pain-point:checked');
        userData.painPoints = Array.from(painPoints).map(cb => cb.value);
        if (userData.painPoints.length === 0) {
            alert('请至少选择一个痛点');
            return;
        }
    }
    
    // 隐藏当前步骤
    document.getElementById('step' + currentStep).classList.add('hidden');
    document.getElementById('step' + currentStep).classList.remove('active');
    
    // 显示下一步
    const nextStepNum = currentStep + 1;
    document.getElementById('step' + nextStepNum).classList.remove('hidden');
    document.getElementById('step' + nextStepNum).classList.add('active');
    
    // 更新进度
    updateProgress(nextStepNum);
}

// 上一步
function prevStep(currentStep) {
    document.getElementById('step' + currentStep).classList.add('hidden');
    document.getElementById('step' + currentStep).classList.remove('active');
    
    const prevStepNum = currentStep - 1;
    document.getElementById('step' + prevStepNum).classList.remove('hidden');
    document.getElementById('step' + prevStepNum).classList.add('active');
    
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
    // 收集场景
    const scenarios = document.querySelectorAll('.scenario:checked');
    userData.scenarios = Array.from(scenarios).map(cb => cb.value);
    
    // 显示加载
    document.getElementById('step3').classList.add('hidden');
    document.getElementById('step4').classList.remove('hidden');
    updateProgress(4);
    
    // 模拟 AI 分析
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('recommendations').classList.remove('hidden');
        showRecommendations();
    }, 2000);
}

// 显示推荐结果
function showRecommendations() {
    const occupation = userData.occupation;
    const painPoints = userData.painPoints;
    const scenarios = userData.scenarios;
    
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
            <h4 class="text-xl font-bold text-gray-900 mb-4">🚀 立即开始</h4>
            <p class="text-gray-700 mb-4">点击下方按钮，直接使用为你定制的功能！</p>
            <div class="flex flex-wrap gap-3 justify-center">
                ${template.features.map(f => `
                    <a href="index.html" class="bg-white border-2 border-purple-200 text-purple-700 px-4 py-2 rounded-lg hover:border-purple-500 transition text-sm font-medium">
                        ${f.icon} ${f.name}
                    </a>
                `).join('')}
            </div>
        </div>
    `;
}

// 重新开始
function restart() {
    userData.occupation = '';
    userData.painPoints = [];
    userData.scenarios = [];
    
    document.getElementById('step4').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
    document.getElementById('step1').classList.add('active');
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('recommendations').classList.add('hidden');
    
    // 重置表单
    document.getElementById('occupationInput').value = '';
    document.querySelectorAll('.pain-point, .scenario').forEach(cb => cb.checked = false);
    
    updateProgress(1);
}

// 初始化
console.log('🦞 OpenClaw 场景推荐器启动...');
