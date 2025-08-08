// デフォルト検索条件
const defaultSearchParams = {
    keywords: ["VBAツール作成", "JavaScriptツール開発", "自動化ツール"],
    minPrice: 600000,  // 60万円以上
    workStyle: "フルリモート",
    projectType: "ツール作成"
};

// モックデータ（実際のAPIが利用可能になるまでの仮データ）
const mockJobs = [
    {
        id: 1,
        title: "Excel VBAツール開発",
        price: 700000,
        workStyle: "フルリモート",
        description: "営業支援ツールのVBA開発。Excel自動化、レポート作成機能の実装",
        skills: ["VBA", "Excel", "Access"],
        datePosted: "2025-01-05",
        company: "株式会社テックソリューション"
    },
    {
        id: 2,
        title: "JavaScriptによる業務自動化ツール開発",
        price: 850000,
        workStyle: "フルリモート",
        description: "Node.jsを使用したWebスクレイピング・自動化ツールの開発",
        skills: ["JavaScript", "Node.js", "Puppeteer"],
        datePosted: "2025-01-06",
        company: "デジタルイノベーション株式会社"
    },
    {
        id: 3,
        title: "Python自動化スクリプト作成",
        price: 650000,
        workStyle: "一部リモート",
        description: "データ処理自動化、レポート自動生成システムの構築",
        skills: ["Python", "pandas", "自動化"],
        datePosted: "2025-01-04",
        company: "データサイエンス株式会社"
    },
    {
        id: 4,
        title: "Access VBAデータベースツール開発",
        price: 600000,
        workStyle: "フルリモート",
        description: "顧客管理システムのVBA開発、フォーム作成",
        skills: ["VBA", "Access", "SQL"],
        datePosted: "2025-01-07",
        company: "ビジネスシステム株式会社"
    },
    {
        id: 5,
        title: "Google Apps Script業務効率化ツール",
        price: 550000,
        workStyle: "フルリモート",
        description: "Google Workspace連携ツールの開発、自動化処理実装",
        skills: ["GAS", "JavaScript", "Google API"],
        datePosted: "2025-01-03",
        company: "クラウドソリューション株式会社"
    },
    {
        id: 6,
        title: "PowerShell自動化スクリプト開発",
        price: 680000,
        workStyle: "常駐",
        description: "Windows環境の自動化、サーバー管理ツールの開発",
        skills: ["PowerShell", "Windows", "自動化"],
        datePosted: "2025-01-08",
        company: "インフラテック株式会社"
    },
    {
        id: 7,
        title: "VBAマクロツール高度化",
        price: 750000,
        workStyle: "フルリモート",
        description: "既存VBAツールの機能拡張、パフォーマンス改善",
        skills: ["VBA", "Excel", "最適化"],
        datePosted: "2025-01-02",
        company: "エンタープライズソフト株式会社"
    },
    {
        id: 8,
        title: "Webスクレイピングツール開発",
        price: 720000,
        workStyle: "フルリモート",
        description: "Pythonによるデータ収集ツールの開発、定期実行バッチ作成",
        skills: ["Python", "BeautifulSoup", "Selenium"],
        datePosted: "2025-01-06",
        company: "データ分析サービス株式会社"
    }
];

// 現在の検索結果を保持
let currentResults = [];

// 検索機能
function searchJobs() {
    const keyword = document.getElementById('keyword').value.toLowerCase();
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const workStyle = document.getElementById('workStyle').value;

    // フィルタリング
    currentResults = mockJobs.filter(job => {
        const matchKeyword = !keyword || 
            job.title.toLowerCase().includes(keyword) || 
            job.description.toLowerCase().includes(keyword) ||
            job.skills.some(skill => skill.toLowerCase().includes(keyword));
        
        const matchPrice = job.price >= minPrice;
        const matchWorkStyle = !workStyle || workStyle === '全て' || job.workStyle === workStyle;

        return matchKeyword && matchPrice && matchWorkStyle;
    });

    displayResults(currentResults);
}

// 結果表示
function displayResults(jobs) {
    const resultsContainer = document.getElementById('results');
    
    if (jobs.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">検索条件に一致する案件が見つかりませんでした。</p>';
        return;
    }

    const html = jobs.map(job => `
        <div class="job-card">
            <div class="job-header">
                <h3>${job.title}</h3>
                <span class="job-price">¥${job.price.toLocaleString()}/月</span>
            </div>
            <div class="job-company">${job.company}</div>
            <div class="job-description">${job.description}</div>
            <div class="job-meta">
                <span class="work-style">${job.workStyle}</span>
                <span class="date-posted">投稿日: ${job.datePosted}</span>
            </div>
            <div class="job-skills">
                ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <button class="apply-btn" onclick="applyForJob(${job.id})">応募する</button>
        </div>
    `).join('');

    resultsContainer.innerHTML = `
        <div class="results-header">
            <h2>検索結果（${jobs.length}件）</h2>
        </div>
        ${html}
    `;
}

// ソート機能
function sortResults() {
    const sortBy = document.getElementById('sortBy').value;
    let sortedResults = [...currentResults];

    switch(sortBy) {
        case 'price-desc':
            sortedResults.sort((a, b) => b.price - a.price);
            break;
        case 'price-asc':
            sortedResults.sort((a, b) => a.price - b.price);
            break;
        case 'date-desc':
            sortedResults.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
            break;
    }

    displayResults(sortedResults);
}

// 検索条件リセット
function resetSearch() {
    document.getElementById('keyword').value = defaultSearchParams.keywords[0];
    document.getElementById('minPrice').value = defaultSearchParams.minPrice;
    document.getElementById('workStyle').value = defaultSearchParams.workStyle;
    document.getElementById('results').innerHTML = '<p class="loading">検索ボタンをクリックして案件を表示してください</p>';
    currentResults = [];
}

// 応募機能（仮実装）
function applyForJob(jobId) {
    const job = mockJobs.find(j => j.id === jobId);
    if (job) {
        alert(`「${job.title}」への応募を受け付けました！\n\n※これはデモ機能です。実際の応募は行われません。`);
        
        // Firebaseにフィードバックを記録（feedback-system.jsが処理）
        if (typeof window.recordFeedback === 'function') {
            window.recordFeedback('job-application', {
                jobId: jobId,
                jobTitle: job.title,
                timestamp: new Date().toISOString()
            });
        }
    }
}

// ページ読み込み時に初期表示
document.addEventListener('DOMContentLoaded', function() {
    // デフォルト値をセット
    document.getElementById('keyword').value = defaultSearchParams.keywords[0];
    document.getElementById('minPrice').value = defaultSearchParams.minPrice;
    document.getElementById('workStyle').value = defaultSearchParams.workStyle;
    
    // 初期検索を実行
    searchJobs();
});