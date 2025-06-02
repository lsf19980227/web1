document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map-container');
    const imageModal = document.getElementById('image-modal');
    const modalProvinceCity = document.getElementById('modal-province-city');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalTime = document.getElementById('modal-time');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const closeButton = imageModal.querySelector('.close-button');
    const prevButton = imageModal.querySelector('.prev');
    const nextButton = imageModal.querySelector('.next');

    // 示例旅行数据 (请替换为您的实际数据)
    const travelData = [
        {
            provinceId: '重庆', // 对应 SVG 中省份的 id
            provinceName: '重庆市',
            city: '重庆',
            description: '在重庆的市中心，感受重庆的独特魅力。',
            time: '2023年3月',
            path: '重庆.JPG' // 示例图片路径，请确保图片存在
        },

        {
            provinceId: 'guangdong', // 对应 SVG 中省份的 id
            provinceName: '广东省',
            city: '广州',
            description: '在广州感受骑楼文化',
            time: '2024年6月',
            path: '广州.jpg' // 示例图片路径，请确保图片存在
        },

        {
            provinceId: 'jilin', // 对应 SVG 中省份的 id
            provinceName: '吉林省',
            city: '长白山',
            description: '在长白山的山顶，感受大自然的美景。',
            time: '2024年8月',
            path: '吉林-长白山.JPG' // 示例图片路径，请确保图片存在
        },
        
        {
            provinceId: 'jilin', // 对应 SVG 中省份的 id
            provinceName: '吉林省',
            city: '延吉',
            description: '在延吉感受朝鲜族文化。',
            time: '2024年8月',
            path: '吉林-延吉.JPG' // 示例图片路径，请确保图片存在
        },
        {
            provinceId: 'neimenggu', // 对应 SVG 中省份的 id
            provinceName: '内蒙古自治区',
            city: '包头',
            description: '在昆仑草原看一望无际。',
            time: '2024年7月',
            path: '内蒙古.JPG' // 示例图片路径，请确保图片存在
        },
        {
            provinceId: 'yunnan',
            provinceName: '云南省',
            city: '大理',
            description: '在洱海听海鸥鸣叫。',
            time: '2025年2月',
            path: '云南-大理.jpg'
        },
        {
            provinceId: 'yunnan',
            provinceName: '云南省',
            city: '丽江',
            description: '在丽江感受云贵古镇的美丽。',
            time: '2025年2月',
            path: '云南-丽江.JPG'
        }
        
        
        // ...更多旅行数据
    ];

    let currentProvinceImages = [];
    let currentImageIndex = 0;

    // 加载SVG地图
    fetch('chinaMap.svg')
        .then(response => response.text())
        .then(svgData => {
            mapContainer.innerHTML = svgData;
            const provinces = mapContainer.querySelectorAll('.province');
            provinces.forEach(province => {
                // 检查该省份是否有旅行数据
                const hasTravelData = travelData.some(item => item.provinceId === province.id);
                if (hasTravelData) {
                    province.classList.add('visited'); // 标记有数据的省份
                }

                province.addEventListener('click', () => {
                    const provinceId = province.id;
                    const provinceName = province.getAttribute('name') || provinceId; // SVG中可能没有name属性，用id代替
                    currentProvinceImages = travelData
                        .filter(item => item.provinceId === provinceId)
                        .sort((a, b) => new Date(a.time.replace('年', '-').replace('月', '')) - new Date(b.time.replace('年', '-').replace('月', ''))); // 按时间升序
                    
                    if (currentProvinceImages.length > 0) {
                        currentImageIndex = 0;
                        displayImage(currentImageIndex, provinceName);
                        imageModal.style.display = 'block';
                    } else {
                        // 可以选择提示用户该省份暂无图片
                        alert(provinceName + ' 暂无旅行图片');
                    }
                });
            });
        })
        .catch(error => console.error('Error loading SVG map:', error));

    // 显示指定索引的图片
    function displayImage(index, provinceName) {
        if (currentProvinceImages.length === 0 || index < 0 || index >= currentProvinceImages.length) {
            // 如果没有图片或索引无效，可以隐藏模态框或显示提示
            slideshowContainer.style.display = 'none';
            return;
        }
        slideshowContainer.style.display = 'block';
        const imageData = currentProvinceImages[index];
        modalProvinceCity.textContent = `${provinceName} - ${imageData.city}`;
        modalImage.src = imageData.path;
        modalImage.alt = `${imageData.city} - ${imageData.description}`;
        modalDescription.textContent = `描述：${imageData.description}`;
        modalTime.textContent = `时间：${imageData.time}`;

        // 更新幻灯片导航按钮的可见性
        prevButton.style.display = index === 0 ? 'none' : 'block';
        nextButton.style.display = index === currentProvinceImages.length - 1 ? 'none' : 'block';
        
        // 清除并重新创建slide-item以强制重新渲染（如果需要更复杂的幻灯片效果）
        const slideItem = slideshowContainer.querySelector('.slide-item');
        slideItem.style.display = 'block'; // 确保当前项可见
    }

    // 关闭模态框
    function closeModal() {
        imageModal.style.display = 'none';
        currentProvinceImages = [];
        currentImageIndex = 0;
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // 点击模态框外部关闭
    window.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            closeModal();
        }
    });

    // 按 Esc 键关闭模态框
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageModal.style.display === 'block') {
            closeModal();
        }
    });

    // 上一张图片
    prevButton.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            displayImage(currentImageIndex, currentProvinceImages[currentImageIndex].provinceName);
        }
    });

    // 下一张图片
    nextButton.addEventListener('click', () => {
        if (currentImageIndex < currentProvinceImages.length - 1) {
            currentImageIndex++;
            displayImage(currentImageIndex, currentProvinceImages[currentImageIndex].provinceName);
        }
    });
});