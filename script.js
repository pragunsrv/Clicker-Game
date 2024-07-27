document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        clickButton: document.getElementById('clickButton'),
        upgradeButton: document.getElementById('upgradeButton'),
        resetButton: document.getElementById('resetButton'),
        autoClickerButton: document.getElementById('autoClickerButton'),
        buyBonusButton: document.getElementById('buyBonusButton'),
        shopButton: document.getElementById('shopButton'),
        buyMultiplierButton: document.getElementById('buyMultiplierButton'),
        buySpecialItemButton: document.getElementById('buySpecialItemButton'),
        themeButtons: document.querySelectorAll('.themeButton'),
        dailyRewardButton: document.getElementById('dailyReward'),
        sortBySelect: document.getElementById('sortBySelect'),
        leaderboardList: document.getElementById('leaderboardList'),
        achievementList: document.getElementById('achievementList'),
        tutorial: document.getElementById('tutorial'),
        closeTutorialButton: document.getElementById('closeTutorial'),
        scoreDisplay: document.getElementById('scoreDisplay'),
        clickValueDisplay: document.getElementById('clickValueDisplay'),
        upgradeCountDisplay: document.getElementById('upgradeCountDisplay'),
        upgradeCostDisplay: document.getElementById('upgradeCostDisplay'),
        autoClickerCountDisplay: document.getElementById('autoClickerCountDisplay'),
        autoClickerStatusDisplay: document.getElementById('autoClickerStatusDisplay'),
        scoreBonusDisplay: document.getElementById('scoreBonusDisplay'),
        clickMultiplierDisplay: document.getElementById('clickMultiplierDisplay'),
        specialItemStatusDisplay: document.getElementById('specialItemStatusDisplay'),
        totalClicksDisplay: document.getElementById('totalClicksDisplay'),
        highestScoreDisplay: document.getElementById('highestScoreDisplay'),
        currentLevelDisplay: document.getElementById('currentLevelDisplay'),
        dailyRewardDisplay: document.getElementById('dailyRewardDisplay')
    };

    // Log each element to check if they are null
    for (const [key, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`Element with ID ${key} is missing in the HTML.`);
        } else {
            console.log(`Element with ID ${key} is present.`);
        }
    }

    if (!elements.scoreDisplay || !elements.clickValueDisplay || !elements.upgradeCountDisplay || !elements.upgradeCostDisplay ||
        !elements.autoClickerCountDisplay || !elements.autoClickerStatusDisplay || !elements.scoreBonusDisplay ||
        !elements.clickMultiplierDisplay || !elements.specialItemStatusDisplay || !elements.totalClicksDisplay ||
        !elements.highestScoreDisplay || !elements.currentLevelDisplay || !elements.dailyRewardDisplay) {
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
        if (elements.scoreDisplay) elements.scoreDisplay.textContent = score;
        if (elements.clickValueDisplay) elements.clickValueDisplay.textContent = clicksPerClick;
        if (elements.upgradeCountDisplay) elements.upgradeCountDisplay.textContent = upgrades;
        if (elements.upgradeCostDisplay) elements.upgradeCostDisplay.textContent = upgradeCost;
        if (elements.autoClickerCountDisplay) elements.autoClickerCountDisplay.textContent = autoClickerCount;
        if (elements.autoClickerStatusDisplay) elements.autoClickerStatusDisplay.textContent = autoClickerActive ? 'Active' : 'Inactive';
        if (elements.scoreBonusDisplay) elements.scoreBonusDisplay.textContent = scoreBonus;
        if (elements.clickMultiplierDisplay) elements.clickMultiplierDisplay.textContent = clickMultiplier;
        if (elements.specialItemStatusDisplay) elements.specialItemStatusDisplay.textContent = specialItemBought ? 'Bought' : 'Not Bought';
        if (elements.totalClicksDisplay) elements.totalClicksDisplay.textContent = totalClicks;
        if (elements.highestScoreDisplay) elements.highestScoreDisplay.textContent = highestScore;
        if (elements.currentLevelDisplay) elements.currentLevelDisplay.textContent = currentLevel;
        if (elements.dailyRewardDisplay) elements.dailyRewardDisplay.textContent = dailyRewardCollected ? 'Reward Collected' : 'Reward Available';
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
        if (elements.achievementList) {
            elements.achievementList.innerHTML = '';
            achievements.forEach(achievement => {
                const li = document.createElement('li');
                li.textContent = `Reach ${achievement.level} Points: ${achievement.message}`;
                elements.achievementList.appendChild(li);
            });
        }
    }

    function updateLeaderboard() {
        // Placeholder for leaderboard update logic
        if (elements.leaderboardList) {
            elements.leaderboardList.innerHTML = '<li>Leaderboard feature coming soon!</li>';
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

    elements.clickButton.addEventListener('click', () => {
        score += clicksPerClick * clickMultiplier;
        totalClicks++;
        if (score > highestScore) {
            highestScore = score;
        }
        checkAchievements();
        updateDisplay();
    });

    elements.upgradeButton.addEventListener('click', () => {
        if (score >= upgradeCost) {
            score -= upgradeCost;
            clicksPerClick++;
            upgrades++;
            upgradeCost = Math.floor(upgradeCost * 1.5);
            updateDisplay();
        }
    });

    elements.resetButton.addEventListener('click', () => {
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

    elements.autoClickerButton.addEventListener('click', addAutoClicker);
    elements.buyBonusButton.addEventListener('click', () => {
        if (score >= 200) {
            score -= 200;
            clickMultiplier += 0.5;
            updateDisplay();
        }
    });

    elements.shopButton.addEventListener('click', () => {
        const shop = document.getElementById('shop');
        shop.style.display = shop.style.display === 'none' ? 'block' : 'none';
    });

    elements.buyMultiplierButton.addEventListener('click', () => {
        if (score >= 200) {
            score -= 200;
            clickMultiplier += 1;
            updateDisplay();
        }
    });

    elements.buySpecialItemButton.addEventListener('click', buySpecialItem);

    elements.themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            applyTheme(theme);
        });
    });

    elements.dailyRewardButton.addEventListener('click', collectDailyReward);

    elements.sortBySelect.addEventListener('change', () => {
        // Placeholder for sorting logic
        updateLeaderboard();
    });

    elements.closeTutorialButton.addEventListener('click', () => {
        elements.tutorial.style.display = 'none';
    });

    updateDisplay();
});
