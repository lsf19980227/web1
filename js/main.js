// DOM元素
const navbar = document.querySelector('.navbar');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const articleCards = document.querySelectorAll('.article-card');
const modal = document.getElementById('article-modal');
const modalContent = document.getElementById('modal-article-content');
const closeModal = document.querySelector('.close-modal');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const backToTop = document.getElementById('back-to-top');

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.boxShadow = '0 2px 10px var(--shadow-color)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// 轮播图功能
let currentSlide = 0;
const slideCount = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (index + slideCount) % slideCount;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// 自动轮播
let slideInterval = setInterval(nextSlide, 5000);

// 轮播图控制按钮
prevBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    prevSlide();
    slideInterval = setInterval(nextSlide, 5000);
});

nextBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    nextSlide();
    slideInterval = setInterval(nextSlide, 5000);
});

// 文章卡片点击事件
articleCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.article-title').textContent;
        const category = card.querySelector('.article-category').textContent;
        const date = card.querySelector('.date').textContent;
        const excerpt = card.querySelector('.article-excerpt').textContent;
        const image = card.querySelector('img').src;

        // 构建文章详情HTML
        const articleHTML = `
            <div class="modal-article">
                <img src="${image}" alt="${title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px;">
                <div class="article-category" style="margin-top: 1rem;">${category}</div>
                <h1 style="margin: 1rem 0; color: var(--primary-color);">${title}</h1>
                <div class="article-meta" style="margin-bottom: 1rem; color: var(--text-color);">${date}</div>
                <p style="color: var(--text-color);">${excerpt}</p>
                <p style="margin-top: 1rem; color: var(--text-color);">这是一篇示例文章的详细内容。在实际应用中，这里将展示完整的文章内容。您可以添加更多的段落、图片、代码示例等。</p>
            </div>
        `;

        modalContent.innerHTML = articleHTML;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// 关闭弹窗
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// 留言功能
const leaveMessageBtn = document.getElementById('leave-message-btn');
const messageModal = document.getElementById('message-modal');
const messageForm = document.getElementById('message-form');
const closeMessageModal = messageModal.querySelector('.close-modal');

// 打开留言弹窗
leaveMessageBtn.addEventListener('click', () => {
    messageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// 关闭留言弹窗
closeMessageModal.addEventListener('click', () => {
    messageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// 点击弹窗外部关闭
window.addEventListener('click', (e) => {
    if (e.target === messageModal) {
        messageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// 提交留言表单
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    // 这里可以添加发送留言到服务器的逻辑
    alert(`感谢您的留言！\n称呼：${name}\n内容：${message}`);
    
    // 重置表单并关闭弹窗
    messageForm.reset();
    messageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// 暗色模式切换
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// 返回顶部按钮
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});