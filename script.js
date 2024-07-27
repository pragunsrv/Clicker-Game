document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const scoreDisplay = document.getElementById('score');
    const clickValueDisplay = document.getElementById('clickValue');
    const upgradeButton = document.getElementById('upgradeButton');
    const upgradeCostDisplay = document.getElementById('upgradeCost');

    let score = 0;
    let clicksPerClick = 1;
    let upgradeCost = 10;

    clickButton.addEventListener('click', () => {
        score += clicksPerClick;
        scoreDisplay.textContent = score;
    });

    upgradeButton.addEventListener('click', () => {
        if (score >= upgradeCost) {
            score -= upgradeCost;
            clicksPerClick++;
            upgradeCost = Math.floor(upgradeCost * 1.5); // Increase the cost for the next upgrade
            scoreDisplay.textContent = score;
            clickValueDisplay.textContent = clicksPerClick;
            upgradeCostDisplay.textContent = upgradeCost;
        } else {
            alert('Not enough score for upgrade!');
        }
    });
});
