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
        'templates/05-research-templates.json'
    ];

    for (const file of templateFiles) {
        try {
            const response = await fetch(file);
            const data = await response.json();
            allTemplates = [...allTemplates, ...data.templates];
        } catch (error) {
            console.error(`加载 ${file} 失败:`, error);
        }
    }

    renderTemplates();
}

// 渲染模板卡片
function renderTemplates() {
    const container = document.getElementById('templates');
    const filtered = currentCategory === 'all' 
        ? allTemplates 
        : allTemplates.filter(t => t.category === currentCategory);

    if (filtered.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center col-span-3">暂无模板</p>';
        return;
    }

    container.innerHTML = filtered.map(template => `
        <div class="template-card bg-gray-50 rounded-xl p-4 cursor-pointer hover:shadow-lg transition" onclick="useTemplate('${template.id}')">
            <div class="flex justify-between items-start mb-2">
                <h3 class="font-semibold text-gray-900">${template.name}</h3>
                <span class="text-xs ${getDifficultyColor(template.difficulty)} px-2 py-1 rounded-full">
                    ${getDifficultyStars(template.difficulty)}
                </span>
            </div>
            <p class="text-sm text-gray-600 mb-2 line-clamp-2">${template.scenario}</p>
            <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">${getCategoryName(template.category)}</span>
                <button class="text-xs text-purple-600 hover:text-purple-800 font-medium">使用 →</button>
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
        'research': '📊 分析'
    };
    return names[category] || category;
}

// 筛选模板
function filterTemplates(category) {
    currentCategory = category;
    
    // 更新按钮样式
    const buttons = document.querySelectorAll('#categoryFilter button');
    buttons.forEach(btn => {
        const onClick = btn.getAttribute('onclick');
        if (onClick && onClick.includes(`'${category}'`)) {
            btn.classList.remove('bg-gray-100', 'text-gray-700');
            btn.classList.add('bg-purple-100', 'text-purple-700');
        } else {
            btn.classList.add('bg-gray-100', 'text-gray-700');
            btn.classList.remove('bg-purple-100', 'text-purple-700');
        }
    });
    
    renderTemplates();
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
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', loadTemplates);
