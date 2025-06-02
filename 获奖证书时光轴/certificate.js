// 示例证书数据 (实际项目中可以从后端获取或定义在JS中)
const certificatesData = [

    {
        year: "2024",
        title: "出版资格证书",
        date: "2024年11月",
        location: "新闻出版署",
        category: "技能",
        image: "images/出版证书.png"
    },
    {
        year: "2018",
        title: "国家奖学金",
        date: "2018年9月",
        location: "国家",
        issuer: "国家教育部",
        category: "荣誉",
        image: "images/国家奖学金.png"
    },
    {
        year: "2019",
        title: "科技创新奖学金",
        date: "2019年6月",
        location: "山东省",
        issuer: "中国海洋大学",
        category: "荣誉",
        image: "images/科技创新.png"
    },
    {
        year: "2020",
        title: "优秀毕业生",
        date: "2020年6月",
        location: "山东省",
        category: "荣誉",
        image: "images/优秀毕业生.png"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.querySelector('.timeline');
    const modal = document.getElementById('certificate-modal');
    const modalCertificateImage = document.getElementById('modal-certificate-image');
    const modalCertificateTitle = document.getElementById('modal-certificate-title');
    const modalCertificateTime = document.getElementById('modal-certificate-time');
    const modalCertificateLocation = document.getElementById('modal-certificate-location');
    const modalCertificateIssuer = document.getElementById('modal-certificate-issuer');
    const modalCertificateCategory = document.getElementById('modal-certificate-category');
    const modalAudioPlayer = document.getElementById('modal-audio-player');
    const closeButton = document.querySelector('.close-button');

    // 动态生成时间轴内容
    function populateTimeline() {
        // 先清空现有的示例内容
        timeline.innerHTML = ''; 

        // 按年份降序排序证书
        certificatesData.sort((a, b) => parseInt(b.year) - parseInt(a.year) || new Date(b.date.replace('年', '-').replace('月', '')) - new Date(a.date.replace('年', '-').replace('月', '')));

        certificatesData.forEach(cert => {
            const timelineItem = document.createElement('div');
            timelineItem.classList.add('timeline-item');
            timelineItem.setAttribute('data-year', cert.year);

            const timelineContent = document.createElement('div');
            timelineContent.classList.add('timeline-content');

            const certificateCard = document.createElement('div');
            certificateCard.classList.add('certificate-card');
            certificateCard.addEventListener('click', () => openModal(cert));

            const thumbnail = document.createElement('img');
            thumbnail.src = cert.image;
            thumbnail.alt = cert.title + " 缩略图";
            thumbnail.classList.add('certificate-thumbnail');

            const categoryBadge = document.createElement('div');
            categoryBadge.classList.add('certificate-category-badge');
            categoryBadge.textContent = cert.category;

            const title = document.createElement('h3');
            title.textContent = cert.title;

            const date = document.createElement('p');
            date.classList.add('certificate-date');
            date.textContent = cert.date;

            certificateCard.appendChild(thumbnail);
            certificateCard.appendChild(categoryBadge);
            certificateCard.appendChild(title);
            certificateCard.appendChild(date);
            timelineContent.appendChild(certificateCard);
            timelineItem.appendChild(timelineContent);
            timeline.appendChild(timelineItem);
        });
    }

    // 打开详情模态框
    function openModal(certificate) {
        modalCertificateImage.src = certificate.image;
        modalCertificateImage.alt = certificate.title + " 证书详情";
        modalCertificateTitle.textContent = certificate.title;
        modalCertificateTime.textContent = `获奖时间：${certificate.date}`;
        modalCertificateLocation.textContent = `获奖地点：${certificate.location}`;
        modalCertificateIssuer.textContent = `颁发机构：${certificate.issuer}`;
        modalCertificateCategory.textContent = certificate.category;
        modalCertificateCategory.className = 'category-tag'; // Reset classes
        // 根据类别设置不同颜色 (可选)
        // switch (certificate.category.toLowerCase()) {
        //     case '学术': modalCertificateCategory.classList.add('academic'); break;
        //     case '科技': modalCertificateCategory.classList.add('tech'); break;
        //     // ...更多类别
        // }
        
        // 处理音频
        if (certificate.audio) {
            modalAudioPlayer.querySelector('source').src = certificate.audio;
            modalAudioPlayer.load(); // 重新加载音频
            modalAudioPlayer.style.display = 'block';
        } else {
            modalAudioPlayer.style.display = 'none';
        }

        // 处理视频
        const modalVideoPlayer = document.getElementById('modal-video-player');
        if (certificate.video && modalVideoPlayer) {
            modalVideoPlayer.querySelector('source').src = certificate.video;
            modalVideoPlayer.load(); // 重新加载视频
            modalVideoPlayer.style.display = 'block';
        } else if (modalVideoPlayer) {
            modalVideoPlayer.style.display = 'none';
        }

        modal.style.display = 'block';
    }

    // 关闭模态框
    function closeModal() {
        modal.style.display = 'none';
        // 重置音频
        modalAudioPlayer.pause();
        modalAudioPlayer.currentTime = 0;
        
        // 重置视频
        const modalVideoPlayer = document.getElementById('modal-video-player');
        if (modalVideoPlayer) {
            modalVideoPlayer.pause();
            modalVideoPlayer.currentTime = 0;
        }
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // 点击模态框外部关闭
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // 按 Esc 键关闭模态框
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // 初始化
    if (timeline && certificatesData.length > 0) {
        populateTimeline();
    } else if (timeline) {
        timeline.innerHTML = '<p style="text-align:center;">暂无证书数据。</p>';
    }

    // 滚动视差效果 (简单示例，可以根据需要扩展)
    // window.addEventListener('scroll', () => {
    //     const timelineItems = document.querySelectorAll('.timeline-item');
    //     timelineItems.forEach(item => {
    //         const rect = item.getBoundingClientRect();
    //         if (rect.top < window.innerHeight * 0.8 && rect.bottom >= 0) {
    //             // 可以添加进入视口的动画
    //             item.style.opacity = '1';
    //             item.style.transform = 'translateY(0)';
    //         } else {
    //             // item.style.opacity = '0';
    //             // item.style.transform = 'translateY(20px)';
    //         }
    //     });
    // });
});