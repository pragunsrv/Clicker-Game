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

    let score = parseInt(localStorage.getItem('score')) || 0;
    let clicksPerClick = parseInt(localStorage.getItem('clicksPerClick')) || 1;
    let upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 10;
    let upgrades = parseInt(localStorage.getItem('upgrades')) || 0;
    let autoClickerCost = 50;
    let autoClickerCount = parseInt(localStorage.getItem('autoClickerCount')) || 0;
    let scoreBonus = parseInt(localStorage.getItem('scoreBonus')) || 0;
    let autoClickerActive = localStorage.getItem('autoClickerActive') === 'true';

    function updateUI() {
        scoreDisplay.textContent = score;
        clickValueDisplay.textContent = clicksPerClick;
        upgradeCountDisplay.textContent = upgrades;
        upgradeCostDisplay.textContent = upgradeCost;
        autoClickerCostDisplay.textContent = autoClickerCost;
        autoClickerCountDisplay.textContent = autoClickerCount;
        autoClickerStatusDisplay.textContent = autoClickerActive ? 'Active' : 'Inactive';
        bonusCostDisplay.textContent = autoClickerCount > 0 ? 100 : 100; // Example cost
        scoreBonusDisplay.textContent = scoreBonus;
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
        localStorage.setItem('autoClickerActive', autoClickerActive);
    }

    function getAchievement() {
        if (score >= 1000) {
            return 'Achievement Unlocked: 1000 Points!';
        } else if (upgrades >= 10) {
            return 'Achievement Unlocked: 10 Upgrades!';
        } else if (autoClickerCount >= 5) {
            return 'Achievement Unlocked: 5 Auto-Clickers!';
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
                    score += clicksPerClick;
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
            scoreBonus += 100; // Example bonus amount
            updateUI();
        } else {
            alert('Not enough score for bonus!');
        }
    }

    clickButton.addEventListener('click', () => {
        score += clicksPerClick + scoreBonus; // Apply score bonus
        updateUI();
    });

    upgradeButton.addEventListener('click', () => {
        if (score >= upgradeCost) {
            score -= upgradeCost;
            clicksPerClick++;
            upgrades++;
            upgradeCost = Math.floor(upgradeCost * 1.5); // Increase the cost for the next upgrade
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
        updateUI();
        alert('Game has been reset. You can start over with a fresh score.');
    });

    autoClickerButton.addEventListener('click', () => {
        activateAutoClicker();
    });

    buyBonusButton.addEventListener('click', () => {
        buyScoreBonus();
    });

    updateUI();
});
