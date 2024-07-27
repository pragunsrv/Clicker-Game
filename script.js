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
    const buySpecialItemButton = document.getElementById('buySpecialItem');
    const specialItemCostDisplay = document.getElementById('specialItemCost');
    const specialItemStatusDisplay = document.getElementById('specialItemStatus');
    const totalClicksDisplay = document.getElementById('totalClicks');
    const highestScoreDisplay = document.getElementById('highestScore');
    const currentLevelDisplay = document.getElementById('currentLevel');
    const dailyRewardDisplay = document.getElementById('dailyReward');
    const leaderboardList = document.getElementById('leaderboardList');
    const sortBySelect = document.getElementById('sortBy');
    const achievementList = document.getElementById('achievementList');
    const themeButtons = document.querySelectorAll('.themeButton');
    const closeTutorialButton = document.getElementById('closeTutorial');
    const tutorial = document.getElementById('tutorial');

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
    let currentLevel = parseInt(localStorage.getItem('currentLevel')) || 1;
    let lastLogin = localStorage.getItem('lastLogin');
    let dailyRewardCollected = localStorage.getItem('dailyRewardCollected') === 'true';
    let specialItemBought = localStorage.getItem('specialItemBought') === 'true';

    const achievements = [
        { level: 1000, message: 'Achievement Unlocked: 1000 Points!' },
        { level: 5000, message: 'Achievement Unlocked: 5000 Points!' },
        { level: 10000, message: 'Achievement Unlocked: 10000 Points!' }
    ];
    let unlockedAchievements = [];

    function updateUI() {
        scoreDisplay.textContent = score;
        clickValueDisplay.textContent = clicksPerClick;
        upgradeCountDisplay.textContent = upgrades;
        upgradeCostDisplay.textContent = upgradeCost;
        autoClickerCostDisplay.textContent = autoClickerCost;
        autoClickerCountDisplay.textContent = autoClickerCount;
        autoClickerStatusDisplay.textContent = autoClickerActive ? 'Active' : 'Inactive';
        scoreBonusDisplay.textContent = scoreBonus;
        multiplierCostDisplay.textContent = 200;
        clickMultiplierDisplay.textContent = clickMultiplier;
        specialItemCostDisplay.textContent = 500;
        specialItemStatusDisplay.textContent = specialItemBought ? 'Bought' : 'Not Bought';
        totalClicksDisplay.textContent = totalClicks;
        highestScoreDisplay.textContent = highestScore;
        currentLevelDisplay.textContent = currentLevel;
        dailyRewardDisplay.textContent = dailyRewardCollected ? 'Collected' : 'Not Collected';

        // Update achievements
        achievementList.innerHTML = '';
        achievements.forEach(ach => {
            if (score >= ach.level && !unlockedAchievements.includes(ach.message)) {
                unlockedAchievements.push(ach.message);
                achievementList.innerHTML += `<li>${ach.message}</li>`;
            }
        });

        // Update leaderboard
        const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboardData.sort((a, b) => b.score - a.score);
        leaderboardList.innerHTML = '';
        leaderboardData.forEach(entry => {
            leaderboardList.innerHTML += `<li>${entry.name}: ${entry.score} (Clicks: ${entry.clicks})</li>`;
        });
    }

    function activateAutoClicker() {
        if (score >= autoClickerCost) {
            score -= autoClickerCost;
            autoClickerCount++;
            autoClickerActive = true;
            autoClickerCost = Math.floor(autoClickerCost * 1.5);
            updateUI();
            localStorage.setItem('autoClickerActive', autoClickerActive);
            setInterval(() => {
                if (autoClickerActive) {
                    score += clicksPerClick * clickMultiplier + scoreBonus;
                    totalClicks++;
                    if (score > highestScore) highestScore = score;
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

    function buySpecialItem() {
        const specialItemCost = 500;
        if (score >= specialItemCost) {
            score -= specialItemCost;
            specialItemBought = true;
            updateUI();
        } else {
            alert('Not enough score for special item!');
        }
    }

    function chooseTheme(theme) {
        document.body.className = theme;
    }

    function levelUp() {
        if (score >= currentLevel * 1000) {
            score -= currentLevel * 1000;
            currentLevel++;
            updateUI();
        }
    }

    function collectDailyReward() {
        if (!dailyRewardCollected) {
            dailyRewardCollected = true;
            score += 500;
            updateUI();
        } else {
            alert('Daily reward already collected!');
        }
    }

    function saveGame() {
        localStorage.setItem('score', score);
        localStorage.setItem('clicksPerClick', clicksPerClick);
        localStorage.setItem('upgradeCost', upgradeCost);
        localStorage.setItem('upgrades', upgrades);
        localStorage.setItem('autoClickerCost', autoClickerCost);
        localStorage.setItem('autoClickerCount', autoClickerCount);
        localStorage.setItem('scoreBonus', scoreBonus);
        localStorage.setItem('clickMultiplier', clickMultiplier);
        localStorage.setItem('autoClickerActive', autoClickerActive);
        localStorage.setItem('totalClicks', totalClicks);
        localStorage.setItem('highestScore', highestScore);
        localStorage.setItem('currentLevel', currentLevel);
        localStorage.setItem('lastLogin', new Date().toISOString());
        localStorage.setItem('dailyRewardCollected', dailyRewardCollected);
        localStorage.setItem('specialItemBought', specialItemBought);
    }

    function resetGame() {
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
        currentLevel = 1;
        dailyRewardCollected = false;
        specialItemBought = false;
        updateUI();
        saveGame();
        alert('Game has been reset. You can start over with a fresh score.');
    }

    function sortLeaderboard() {
        const sortBy = sortBySelect.value;
        let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
        if (sortBy === 'score') {
            leaderboardData.sort((a, b) => b.score - a.score);
        } else if (sortBy === 'clicks') {
            leaderboardData.sort((a, b) => b.clicks - a.clicks);
        }
        leaderboardList.innerHTML = '';
        leaderboardData.forEach(entry => {
            leaderboardList.innerHTML += `<li>${entry.name}: ${entry.score} (Clicks: ${entry.clicks})</li>`;
        });
    }

    function addLeaderboardEntry(name) {
        let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboardData.push({ name: name, score: score, clicks: totalClicks });
        localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
        sortLeaderboard();
    }

    clickButton.addEventListener('click', () => {
        score += clicksPerClick * clickMultiplier + scoreBonus;
        totalClicks++;
        if (score > highestScore) highestScore = score;
        levelUp();
        updateUI();
        saveGame();
    });

    upgradeButton.addEventListener('click', () => {
        if (score >= upgradeCost) {
            score -= upgradeCost;
            clicksPerClick++;
            upgrades++;
            upgradeCost = Math.floor(upgradeCost * 1.5);
            updateUI();
            saveGame();
        } else {
            alert('Not enough score for upgrade!');
        }
    });

    resetButton.addEventListener('click', () => {
        resetGame();
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

    buySpecialItemButton.addEventListener('click', () => {
        buySpecialItem();
    });

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chooseTheme(button.getAttribute('data-theme'));
        });
    });

    document.getElementById('dailyReward').addEventListener('click', () => {
        collectDailyReward();
    });

    sortBySelect.addEventListener('change', () => {
        sortLeaderboard();
    });

    document.getElementById('closeTutorial').addEventListener('click', () => {
        tutorial.style.display = 'none';
    });

    // Initialize last login
    lastLogin = new Date().toISOString();
    updateUI();
});
