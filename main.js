
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

class LottoBall extends HTMLElement {
    // 1. Specify observed attributes
    static get observedAttributes() {
        return ['number'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create the basic structure
        const style = document.createElement('style');
        style.textContent = `
            :host {
                --ball-color-1: #f5a623; /* Orange */
                --ball-color-2: #4a90e2; /* Blue */
                --ball-color-3: #e94e77; /* Pink */
                --ball-color-4: #50e3c2; /* Teal */
                --ball-color-5: #7ed321; /* Green */
            }

            .ball {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 1.5rem;
                font-weight: bold;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                /* Add a transition for a nice effect */
                transition: transform 0.3s ease, background-color 0.3s ease;
            }
            .ball:hover {
                transform: scale(1.1);
            }
        `;

        const circle = document.createElement('div');
        circle.classList.add('ball');

        this.shadowRoot.append(style, circle);
    }

    // 2. React to attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'number') {
            const circle = this.shadowRoot.querySelector('.ball');
            const color = this.getColorForNumber(newValue);

            circle.textContent = newValue;
            circle.style.backgroundColor = color;
        }
    }

    getColorForNumber(number) {
        const num = parseInt(number, 10);
        const style = getComputedStyle(this);
        if (num <= 10) return style.getPropertyValue('--ball-color-1');
        if (num <= 20) return style.getPropertyValue('--ball-color-2');
        if (num <= 30) return style.getPropertyValue('--ball-color-3');
        if (num <= 40) return style.getPropertyValue('--ball-color-4');
        return style.getPropertyValue('--ball-color-5');
    }
}

customElements.define('lotto-ball', LottoBall);

const generatorBtn = document.getElementById('generator-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers-container');

generatorBtn.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    const numbers = generateUniqueNumbers();

    // Add a little delay for a staggered animation effect
    numbers.forEach((number, index) => {
        setTimeout(() => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            lottoNumbersContainer.appendChild(lottoBall);
        }, index * 100);
    });
});

function generateUniqueNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}
