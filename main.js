
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
    "Kimchi Jjigae",
    "Bibimbap",
    "Samgyeopsal",
    "Bulgogi",
    "Japchae",
    "Tteokbokki",
    "Sundubu Jjigae",
    "Galbi",
    "Jajangmyeon",
    "Ramyeon"
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
});
