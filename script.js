document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const scoreDisplay = document.getElementById('score');
    const clickValueDisplay = document.getElementById('clickValue');
    const upgradeButton = document.getElementById('upgradeButton');
    const upgradeCountDisplay = document.getElementById('upgradeCount');
    const upgradeCostDisplay = document.getElementById('upgradeCost');
    const resetButton = document.getElementById('resetButton');
    const achievementMessage = document.getElementById('achievementMessage');
    const autoClickerButton = document.getElementById('autoClickerButton');
    const autoClickerCostDisplay = document.getElementById('autoClickerCost');
    const autoClickerStatusDisplay = document.getElementById('autoClickerStatus');
    const autoClickerCountDisplay = document.getElementById('autoClickerCount');
    const buyBonusButton = document.getElementById('buyBonusButton');
    const bonusCostDisplay = document.getElementById('bonusCost');
    const scoreBonusDisplay = document.getElementById('scoreBonus');
    const shopButton = document.getElementById('shopButton');
    const shop = document.getElementById('shop');
    const buyMultiplierButton = document.getElementById('buyMultiplier');
    const multiplierCostDisplay = document.getElementById('multiplierCost');
    const clickMultiplierDisplay = document.getElementById('clickMultiplier');
    const totalClicksDisplay = document.getElementById('totalClicks');
    const highestScoreDisplay = document.getElementById('highestScore');
    const themeButtons = document.querySelectorAll('.themeButton');

    let score = parseInt(localStorage.getItem('score')) || 0;
    let clicksPerClick = parseInt(localStorage.getItem('clicksPerClick')) || 1;
    let upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 10;
    let upgrades = parseInt(localStorage.getItem('upgrades')) || 0;
    let autoClickerCost = 50;
    let autoClickerCount = parseInt(localStorage.getItem('autoClickerCount')) || 0;
    let scoreBonus = parseInt(localStorage.getItem('scoreBonus')) || 0;
    let clickMultiplier = parseInt(localStorage.getItem('clickMultiplier')) || 1;
    let autoClickerActive = localStorage.getItem('autoClickerActive') === 'true';
    let totalClicks = parseInt(localStorage.getItem('totalClicks')) || 0;
    let highestScore = parseInt(localStorage.getItem('highestScore')) || 0;

    function updateUI() {
        scoreDisplay.textContent = score;
        clickValueDisplay.textContent = clicksPerClick * clickMultiplier;
        upgradeCountDisplay.textContent = upgrades;
        upgradeCostDisplay.textContent = upgradeCost;
        autoClickerCostDisplay.textContent = autoClickerCost;
        autoClickerCountDisplay.textContent = autoClickerCount;
        autoClickerStatusDisplay.textContent = autoClickerActive ? 'Active' : 'Inactive';
        bonusCostDisplay.textContent = 100;
        scoreBonusDisplay.textContent = scoreBonus;
        multiplierCostDisplay.textContent = 200;
        clickMultiplierDisplay.textContent = clickMultiplier;
        totalClicksDisplay.textContent = totalClicks;
        highestScoreDisplay.textContent = highestScore;
        achievementMessage.textContent = getAchievement();
        saveGameState();
    }

    function saveGameState() {
        localStorage.setItem('score', score);
        localStorage.setItem('clicksPerClick', clicksPerClick);
        localStorage.setItem('upgradeCost', upgradeCost);
        localStorage.setItem('upgrades', upgrades);
        localStorage.setItem('autoClickerCount', autoClickerCount);
        localStorage.setItem('scoreBonus', scoreBonus);
        localStorage.setItem('clickMultiplier', clickMultiplier);
        localStorage.setItem('autoClickerActive', autoClickerActive);
        localStorage.setItem('totalClicks', totalClicks);
        localStorage.setItem('highestScore', highestScore);
    }

    function getAchievement() {
        if (score >= 10000) {
            return 'Achievement Unlocked: 10000 Points!';
        } else if (upgrades >= 25) {
            return 'Achievement Unlocked: 25 Upgrades!';
        } else if (autoClickerCount >= 10) {
            return 'Achievement Unlocked: 10 Auto-Clickers!';
        } else {
            return '';
        }
    }

    function activateAutoClicker() {
        if (score >= autoClickerCost) {
            score -= autoClickerCost;
            autoClickerCount++;
            autoClickerActive = true;
            autoClickerCost = Math.floor(autoClickerCost * 1.5);
            updateUI();
            setInterval(() => {
                if (autoClickerActive) {
                    score += clicksPerClick * clickMultiplier;
                    totalClicks++;
                    updateUI();
                }
            }, 1000);
        } else {
            alert('Not enough score for auto-clicker!');
        }
    }

    function buyScoreBonus() {
        const bonusCost = 100;
        if (score >= bonusCost) {
            score -= bonusCost;
            scoreBonus += 100;
            updateUI();
        } else {
            alert('Not enough score for bonus!');
        }
    }

    function buyClickMultiplier() {
        if (score >= 200) {
            score -= 200;
            clickMultiplier++;
            updateUI();
        } else {
            alert('Not enough score for click multiplier!');
        }
    }

    function chooseTheme(theme) {
        document.body.className = theme;
    }

    clickButton.addEventListener('click', () => {
        score += clicksPerClick * clickMultiplier + scoreBonus;
        totalClicks++;
        if (score > highestScore) {
            highestScore = score;
        }
        updateUI();
    });

    upgradeButton.addEventListener('click', () => {
        if (score >= upgradeCost) {
            score -= upgradeCost;
            clicksPerClick++;
            upgrades++;
            upgradeCost = Math.floor(upgradeCost * 1.5);
            updateUI();
        } else {
            alert('Not enough score for upgrade!');
        }
    });

    resetButton.addEventListener('click', () => {
        score = 0;
        clicksPerClick = 1;
        upgrades = 0;
        upgradeCost = 10;
        autoClickerCost = 50;
        autoClickerCount = 0;
        autoClickerActive = false;
        scoreBonus = 0;
        clickMultiplier = 1;
        totalClicks = 0;
        highestScore = 0;
        updateUI();
        alert('Game has been reset. You can start over with a fresh score.');
    });

    autoClickerButton.addEventListener('click', () => {
        activateAutoClicker();
    });

    buyBonusButton.addEventListener('click', () => {
        buyScoreBonus();
    });

    shopButton.addEventListener('click', () => {
        shop.style.display = shop.style.display === 'none' ? 'block' : 'none';
    });

    buyMultiplierButton.addEventListener('click', () => {
        buyClickMultiplier();
    });

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chooseTheme(button.getAttribute('data-theme'));
        });
    });

    updateUI();
});
