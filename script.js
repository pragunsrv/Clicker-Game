document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const scoreDisplay = document.getElementById('score');
    const clickValueDisplay = document.getElementById('clickValue');
    const upgradeButton = document.getElementById('upgradeButton');
    const upgradeCountDisplay = document.getElementById('upgradeCount');
    const upgradeCostDisplay = document.getElementById('upgradeCost');
    const resetButton = document.getElementById('resetButton');

    let score = 0;
    let clicksPerClick = 1;
    let upgradeCost = 10;
    let upgrades = 0;

    function updateUI() {
        scoreDisplay.textContent = score;
        clickValueDisplay.textContent = clicksPerClick;
        upgradeCountDisplay.textContent = upgrades;
        upgradeCostDisplay.textContent = upgradeCost;
    }

    clickButton.addEventListener('click', () => {
        score += clicksPerClick;
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
        updateUI();
        alert('Game has been reset. You can start over with a fresh score.');
    });
});
