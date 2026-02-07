
// Theme Switcher
const themeSwitch = document.getElementById('checkbox');
const applyTheme = (isDarkMode) => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    themeSwitch.checked = isDarkMode;
}
themeSwitch.addEventListener('change', (event) => {
    localStorage.setItem('darkMode', event.target.checked);
    applyTheme(event.target.checked);
});

// Language Switcher
const languageToggle = document.getElementById('language-toggle');
const applyLanguage = (isKorean) => {
    currentMenus = isKorean ? dinnerMenusKR : dinnerMenusEN;
    languageToggle.checked = isKorean;
};
languageToggle.addEventListener('change', (event) => {
    localStorage.setItem('isKorean', event.target.checked);
    applyLanguage(event.target.checked);
});

// Menu Data
const dinnerMenusKR = {
    "김치찌개": "Kimchi Jjigae",
    "비빔밥": "Bibimbap",
    "삼겹살": "Samgyeopsal",
    "불고기": "Bulgogi",
    "잡채": "Japchae",
    "떡볶이": "Tteokbokki",
    "순두부찌개": "Sundubu Jjigae",
    "갈비": "Galbi",
    "짜장면": "Jajangmyeon",
    "라면": "Ramyeon",
    "피자": "Pizza"
};
const dinnerMenusEN = Object.fromEntries(Object.entries(dinnerMenusKR).map(([k, v]) => [v, k]));
let currentMenus = dinnerMenusKR; // Default to Korean

const generatorBtn = document.getElementById('generator-btn');
const menuRecommendationContainer = document.getElementById('menu-recommendation-container');

// Current recommended menu for sharing
let currentRecommendedMenu = '';

generatorBtn.addEventListener('click', () => {
    menuRecommendationContainer.innerHTML = '';

    const menuKeys = Object.keys(currentMenus);
    const randomIndex = Math.floor(Math.random() * menuKeys.length);
    const recommendedMenu = menuKeys[randomIndex];
    const englishMenuName = languageToggle.checked ? currentMenus[recommendedMenu] : recommendedMenu;

    // Store for sharing
    currentRecommendedMenu = recommendedMenu;

    // Create and display the menu item text
    const menuElement = document.createElement('div');
    menuElement.classList.add('menu-item');
    menuElement.textContent = recommendedMenu;
    menuRecommendationContainer.appendChild(menuElement);

    // Create and display the image
    const imageElement = document.createElement('img');
    if (englishMenuName === "Pizza") {
        imageElement.src = 'pizza.jpg';
    } else {
        imageElement.src = `https://via.placeholder.com/200x200.png?text=${englishMenuName.replace(/\s/g, '+')}`;
    }
    imageElement.alt = `An image of ${recommendedMenu}`;
    imageElement.style.width = '200px';
    imageElement.style.marginTop = '1rem';
    imageElement.style.borderRadius = '8px';
    menuRecommendationContainer.appendChild(imageElement);

    // Create share buttons
    const shareContainer = document.createElement('div');
    shareContainer.classList.add('share-container');
    shareContainer.innerHTML = `
        <p class="share-title">친구에게 공유하기</p>
        <div class="share-buttons">
            <button class="share-btn kakao" onclick="shareKakao()" aria-label="카카오톡 공유">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 3C6.48 3 2 6.48 2 10.5c0 2.55 1.69 4.78 4.22 6.08-.13.47-.84 3.01-.87 3.21 0 0-.02.13.07.18.08.05.18.02.18.02.24-.03 2.78-1.82 3.22-2.13.38.05.77.08 1.18.08 5.52 0 10-3.48 10-7.44C20 6.48 17.52 3 12 3z"/></svg>
            </button>
            <button class="share-btn facebook" onclick="shareFacebook()" aria-label="페이스북 공유">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>
            <button class="share-btn twitter" onclick="shareTwitter()" aria-label="트위터 공유">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </button>
            <button class="share-btn copy" onclick="copyLink()" aria-label="링크 복사">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
            </button>
        </div>
    `;
    menuRecommendationContainer.appendChild(shareContainer);
});

// Share Functions
const siteUrl = 'https://taxsolvesimon1-ops.github.io/product-builder/';

function getShareText() {
    return `오늘 저녁은 "${currentRecommendedMenu}"으로 결정! 🍽️\n나도 메뉴 추천받기 👉`;
}

function shareKakao() {
    const text = getShareText();
    const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(text)}`;
    window.open(kakaoUrl, '_blank', 'width=600,height=400');
}

function shareFacebook() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}&quote=${encodeURIComponent(getShareText())}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
}

function shareTwitter() {
    const text = getShareText();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(siteUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function copyLink() {
    const text = `${getShareText()}\n${siteUrl}`;
    navigator.clipboard.writeText(text).then(() => {
        showToast('링크가 복사되었습니다!');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('링크가 복사되었습니다!');
    });
}

function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}


// On Page Load
document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    applyTheme(isDarkMode);

    const isKorean = localStorage.getItem('isKorean') === 'true';
    applyLanguage(isKorean);
});
