
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

    // Update AddToAny share text with recommended menu
    updateShareText(recommendedMenu);
});

// Update AddToAny share text dynamically
function updateShareText(menu) {
    const shareTitle = `오늘 저녁은 "${menu}"으로 결정! 🍽️ - 나도 메뉴 추천받기`;

    // Update AddToAny configuration
    if (typeof a2a !== 'undefined') {
        a2a.share_title = shareTitle;
    }

    // Update data attributes on the share kit
    const shareKit = document.querySelector('.a2a_kit');
    if (shareKit) {
        shareKit.setAttribute('data-a2a-title', shareTitle);
    }
}

// On Page Load
document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    applyTheme(isDarkMode);

    const isKorean = localStorage.getItem('isKorean') === 'true';
    applyLanguage(isKorean);
});
