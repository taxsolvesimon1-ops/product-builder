
const themeSwitch = document.getElementById('checkbox');

// Function to apply the theme
const applyTheme = (isDarkMode) => {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        themeSwitch.checked = false;
    }
}

// Event listener for the theme switch
themeSwitch.addEventListener('change', (event) => {
    const isDarkMode = event.target.checked;
    localStorage.setItem('darkMode', isDarkMode);
    applyTheme(isDarkMode);
});

// Check for saved theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    applyTheme(isDarkMode);
});

const dinnerMenus = [
    "김치찌개",
    "비빔밥",
    "삼겹살",
    "불고기",
    "잡채",
    "떡볶이",
    "순두부찌개",
    "갈비",
    "짜장면",
    "라면",
    "피자"
];

const generatorBtn = document.getElementById('generator-btn');
const menuRecommendationContainer = document.getElementById('menu-recommendation-container');

generatorBtn.addEventListener('click', () => {
    menuRecommendationContainer.innerHTML = '';
    const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
    const recommendedMenu = dinnerMenus[randomIndex];
    
    const menuElement = document.createElement('div');
    menuElement.classList.add('menu-item');
    menuElement.textContent = recommendedMenu;
    
    menuRecommendationContainer.appendChild(menuElement);

    if (recommendedMenu === "피자") {
        const pizzaImage = document.createElement('img');
        pizzaImage.src = 'pizza.jpg';
        pizzaImage.alt = 'Delicious Pizza';
        pizzaImage.style.width = '200px'; 
        pizzaImage.style.marginTop = '1rem';
        menuRecommendationContainer.appendChild(pizzaImage);
    }
});
