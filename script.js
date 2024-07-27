document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const upgradeButton = document.getElementById('upgradeButton');
    const resetButton = document.getElementById('resetButton');
    const autoClickerButton = document.getElementById('autoClickerButton');
    const buyBonusButton = document.getElementById('buyBonusButton');
    const shopButton = document.getElementById('shopButton');
    const buyMultiplierButton = document.getElementById('buyMultiplierButton');
    const buySpecialItemButton = document.getElementById('buySpecialItemButton');
    const themeButtons = document.querySelectorAll('.themeButton');
    const dailyRewardButton = document.getElementById('dailyReward');
    const sortBySelect = document.getElementById('sortBySelect');
    const leaderboardList = document.getElementById('leaderboardList');
    const achievementList = document.getElementById('achievementList');
    const tutorial = document.getElementById('tutorial');
    const closeTutorialButton = document.getElementById('closeTutorial');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const clickValueDisplay = document.getElementById('clickValueDisplay');
    const upgradeCountDisplay = document.getElementById('upgradeCountDisplay');
    const upgradeCostDisplay = document.getElementById('upgradeCostDisplay');
    const autoClickerCostDisplay = document.getElementById('autoClickerCostDisplay');
    const autoClickerCountDisplay = document.getElementById('autoClickerCountDisplay');
    const autoClickerStatusDisplay = document.getElementById('autoClickerStatusDisplay');
    const scoreBonusDisplay = document.getElementById('scoreBonusDisplay');
    const clickMultiplierDisplay = document.getElementById('clickMultiplierDisplay');
    const specialItemCostDisplay = document.getElementById('specialItemCostDisplay');
    const specialItemStatusDisplay = document.getElementById('specialItemStatusDisplay');
    const totalClicksDisplay = document.getElementById('totalClicksDisplay');
    const highestScoreDisplay = document.getElementById('highestScoreDisplay');
    const currentLevelDisplay = document.getElementById('currentLevelDisplay');
    const dailyRewardDisplay = document.getElementById('dailyReward');

    if (!scoreDisplay || !clickValueDisplay || !upgradeCountDisplay || !upgradeCostDisplay ||
        !autoClickerCountDisplay || !autoClickerStatusDisplay || !scoreBonusDisplay ||
        !clickMultiplierDisplay || !specialItemStatusDisplay || !totalClicksDisplay ||
        !highestScoreDisplay || !currentLevelDisplay || !dailyRewardDisplay) {
        console.error('One or more elements are missing in the HTML.');
        return;
    }

    let score = 0;
    let clicksPerClick = 1;
    let upgrades = 0;
    let upgradeCost = 10;
    let autoClickerCost = 50;
    let autoClickerCount = 0;
    let autoClickerActive = false;
    let scoreBonus = 0;
    let clickMultiplier = 1;
    let specialItemBought = false;
    let totalClicks = 0;
    let highestScore = 0;
    let currentLevel = 1;
    let dailyRewardCollected = false;
    let achievements = [
        { level: 100, message: 'Achievement Unlocked: 100 Points!' },
        { level: 500, message: 'Achievement Unlocked: 500 Points!' },
        { level: 1000, message: 'Achievement Unlocked: 1000 Points!' }
    ];

    function updateDisplay() {
        if (scoreDisplay) scoreDisplay.textContent = score;
        if (clickValueDisplay) clickValueDisplay.textContent = clicksPerClick;
        if (upgradeCountDisplay) upgradeCountDisplay.textContent = upgrades;
        if (upgradeCostDisplay) upgradeCostDisplay.textContent = upgradeCost;
        if (autoClickerCountDisplay) autoClickerCountDisplay.textContent = autoClickerCount;
        if (autoClickerStatusDisplay) autoClickerStatusDisplay.textContent = autoClickerActive ? 'Active' : 'Inactive';
        if (scoreBonusDisplay) scoreBonusDisplay.textContent = scoreBonus;
        if (clickMultiplierDisplay) clickMultiplierDisplay.textContent = clickMultiplier;
        if (specialItemStatusDisplay) specialItemStatusDisplay.textContent = specialItemBought ? 'Bought' : 'Not Bought';
        if (totalClicksDisplay) totalClicksDisplay.textContent = totalClicks;
        if (highestScoreDisplay) highestScoreDisplay.textContent = highestScore;
        if (currentLevelDisplay) currentLevelDisplay.textContent = currentLevel;
        if (dailyRewardDisplay) dailyRewardDisplay.textContent = dailyRewardCollected ? 'Reward Collected' : 'Reward Available';
    }

    function checkAchievements() {
        achievements.forEach(achievement => {
            if (score >= achievement.level) {
                alert(achievement.message);
                achievements = achievements.filter(a => a.level > achievement.level);
                updateAchievements();
            }
        });
    }

    function updateAchievements() {
        if (achievementList) {
            achievementList.innerHTML = '';
            achievements.forEach(achievement => {
                const li = document.createElement('li');
                li.textContent = `Reach ${achievement.level} Points: ${achievement.message}`;
                achievementList.appendChild(li);
            });
        }
    }

    function updateLeaderboard() {
        // Placeholder for leaderboard update logic
        if (leaderboardList) {
            leaderboardList.innerHTML = '<li>Leaderboard feature coming soon!</li>';
        }
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.style.backgroundColor = '#333';
            document.body.style.color = '#fff';
        } else {
            document.body.style.backgroundColor = '#f4f4f4';
            document.body.style.color = '#000';
        }
    }

    function addAutoClicker() {
        if (score >= autoClickerCost) {
            score -= autoClickerCost;
            autoClickerCount++;
            autoClickerActive = true;
            autoClickerCost = Math.floor(autoClickerCost * 1.5);
            updateDisplay();
        }
    }

    function buySpecialItem() {
        if (score >= 500) {
            score -= 500;
            specialItemBought = true;
            updateDisplay();
        }
    }

    function collectDailyReward() {
        if (!dailyRewardCollected) {
            score += 100;
            dailyRewardCollected = true;
            updateDisplay();
        }
    }

    clickButton.addEventListener('click', () => {
        score += clicksPerClick * clickMultiplier;
        totalClicks++;
        if (score > highestScore) {
            highestScore = score;
        }
        checkAchievements();
        updateDisplay();
    });

    upgradeButton.addEventListener('click', () => {
        if (score >= upgradeCost) {
            score -= upgradeCost;
            clicksPerClick++;
            upgrades++;
            upgradeCost = Math.floor(upgradeCost * 1.5);
            updateDisplay();
        }
    });

    resetButton.addEventListener('click', () => {
        score = 0;
        clicksPerClick = 1;
        upgrades = 0;
        upgradeCost = 10;
        totalClicks = 0;
        highestScore = 0;
        currentLevel = 1;
        dailyRewardCollected = false;
        updateDisplay();
    });

    autoClickerButton.addEventListener('click', addAutoClicker);
    buyBonusButton.addEventListener('click', () => {
        if (score >= 200) {
            score -= 200;
            clickMultiplier += 0.5;
            updateDisplay();
        }
    });

    shopButton.addEventListener('click', () => {
        const shop = document.getElementById('shop');
        shop.style.display = shop.style.display === 'none' ? 'block' : 'none';
    });

    buyMultiplierButton.addEventListener('click', () => {
        if (score >= 200) {
            score -= 200;
            clickMultiplier += 1;
            updateDisplay();
        }
    });

    buySpecialItemButton.addEventListener('click', buySpecialItem);

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            applyTheme(theme);
        });
    });

    dailyRewardButton.addEventListener('click', collectDailyReward);

    sortBySelect.addEventListener('change', () => {
        // Placeholder for sorting logic
        updateLeaderboard();
    });

    closeTutorialButton.addEventListener('click', () => {
        tutorial.style.display = 'none';
    });

    updateDisplay();
});
