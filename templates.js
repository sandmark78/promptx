// 模板数据加载和管理

let allTemplates = [];
let currentCategory = 'all';

// 加载所有模板
async function loadTemplates() {
    const templateFiles = [
        'templates/01-tech-templates.json',
        'templates/02-finance-templates.json',
        'templates/03-creative-templates.json',
        'templates/04-auto-templates.json',
        'templates/05-research-templates.json',
        'templates/06-painpoint-templates.json',
        'templates/07-training-templates.json'
    ];

    allTemplates = []; // 清空数组
    
    for (const file of templateFiles) {
        try {
            console.log('正在加载:', file);
            const response = await fetch(file);
            console.log('响应状态:', response.status);
            
            if (!response.ok) {
                console.warn(`文件 ${file} 返回 ${response.status}，跳过`);
                continue;
            }
            
            const data = await response.json();
            console.log('解析数据:', data);
            
            if (data.templates && Array.isArray(data.templates)) {
                allTemplates = [...allTemplates, ...data.templates];
                console.log(`已加载 ${data.templates.length} 个模板`);
            }
        } catch (error) {
            console.error(`加载 ${file} 失败:`, error);
        }
    }

    console.log('总模板数:', allTemplates.length);
    renderTemplates();
}

// 渲染模板卡片
function renderTemplates() {
    const container = document.getElementById('templates');
    if (!container) {
        console.error('找不到 templates 容器');
        return;
    }
    
    console.log('当前分类:', currentCategory);
    console.log('总模板数:', allTemplates.length);
    
    const filtered = currentCategory === 'all' 
        ? allTemplates 
        : allTemplates.filter(t => t.category === currentCategory);

    console.log('筛选后模板数:', filtered.length);

    if (filtered.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center col-span-3 py-12 text-lg">暂无模板，敬请期待...</p>';
        return;
    }

    container.innerHTML = filtered.map(template => `
        <div class="template-card bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 cursor-pointer hover:shadow-xl transition border border-gray-100" onclick="useTemplate('${template.id}')">
            <div class="flex justify-between items-start mb-3">
                <h3 class="font-bold text-gray-900 text-base">${template.name}</h3>
                <span class="text-xs ${getDifficultyColor(template.difficulty)} px-2 py-1 rounded-full font-medium">
                    ${getDifficultyStars(template.difficulty)}
                </span>
            </div>
            <p class="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">${template.scenario}</p>
            <div class="flex justify-between items-center">
                <span class="text-xs ${getCategoryBadgeColor(template.category)} px-2 py-1 rounded-md font-medium">${getCategoryName(template.category)}</span>
                <button class="text-xs text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1">
                    使用 <span>→</span>
                </button>
            </div>
        </div>
    `).join('');
}

// 获取难度颜色
function getDifficultyColor(difficulty) {
    if (difficulty <= 2) return 'bg-green-100 text-green-700';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
}

// 获取难度星星
function getDifficultyStars(difficulty) {
    return '⭐'.repeat(difficulty);
}

// 获取分类名称
function getCategoryName(category) {
    const names = {
        'tech': '💻 编程',
        'creative': '✍️ 文案',
        'finance': '💰 变现',
        'auto': '🤖 自动化',
        'research': '📊 分析',
        'painpoint': '🚑 痛点',
        'training': '📖 训练'
    };
    return names[category] || category;
}

// 获取分类徽章颜色
function getCategoryBadgeColor(category) {
    const colors = {
        'tech': 'bg-blue-100 text-blue-700',
        'creative': 'bg-pink-100 text-pink-700',
        'finance': 'bg-yellow-100 text-yellow-700',
        'auto': 'bg-purple-100 text-purple-700',
        'research': 'bg-indigo-100 text-indigo-700',
        'painpoint': 'bg-red-100 text-red-700',
        'training': 'bg-green-100 text-green-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
}

// 筛选模板
function filterTemplates(category) {
    console.log('筛选分类:', category);
    currentCategory = category;
    
    // 更新按钮样式
    const buttons = document.querySelectorAll('#categoryFilter .category-btn');
    console.log('找到按钮数:', buttons.length);
    
    buttons.forEach(btn => {
        const onClick = btn.getAttribute('onclick');
        console.log('按钮 onclick:', onClick);
        
        if (onClick && onClick.includes(`'${category}'`)) {
            btn.classList.add('active');
            btn.classList.remove('bg-gray-100', 'text-gray-700');
            console.log('激活按钮:', btn);
        } else {
            btn.classList.remove('active');
            btn.classList.add('bg-gray-100', 'text-gray-700');
        }
    });
    
    renderTemplates();
    
    // 滚动到模板区域
    const templatesSection = document.getElementById('templates');
    if (templatesSection) {
        templatesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 使用模板
function useTemplate(templateId) {
    const template = allTemplates.find(t => t.id === templateId);
    if (template) {
        // 填充输入框
        const input = document.getElementById('input');
        input.value = template.bad_prompt || template.scenario;
        updateCharCount();
        
        // 滚动到输入框
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // 显示提示
        showToast(`✅ 已加载模板：${template.name}`);
    } else {
        console.error('找不到模板:', templateId);
        showToast('❌ 模板加载失败');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成，开始加载模板...');
    loadTemplates();
});
