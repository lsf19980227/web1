// 主题切换功能
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // 检查本地存储中的主题设置
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }

    // 监听系统主题变化
    prefersDarkScheme.addListener((e) => {
        const shouldBeDark = e.matches;
        document.body.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
        localStorage.setItem('theme', shouldBeDark ? 'dark' : 'light');
    });

    // 切换按钮点击事件
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}));