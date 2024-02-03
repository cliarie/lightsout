document.addEventListener('DOMContentLoaded', () => {
    const gridSize = 5;
    const lightsGrid = document.getElementById('lightsGrid');
    let lightsState = initializeLights();

    function initializeLights() {
        const initialState = [];
        for (let i = 0; i < gridSize; i++) {
            const row = [];
            for (let j = 0; j < gridSize; j++) {
                row.push(Math.random() < 0.5); // true represents 'on', false represents 'off'
            }
            initialState.push(row);
        }
        return initialState;
    }

    function renderGrid() {
        lightsGrid.innerHTML = '';
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.textContent = lightsState[i][j] ? '●' : '○';
                cell.addEventListener('click', () => toggleLights(i, j));
                lightsGrid.appendChild(cell);
            }
        }
    }

    function toggleLights(row, col) {
        lightsState[row][col] = !lightsState[row][col]; // Toggle the clicked light

        // Toggle adjacent lights
        if (row > 0) lightsState[row - 1][col] = !lightsState[row - 1][col];
        if (row < gridSize - 1) lightsState[row + 1][col] = !lightsState[row + 1][col];
        if (col > 0) lightsState[row][col - 1] = !lightsState[row][col - 1];
        if (col < gridSize - 1) lightsState[row][col + 1] = !lightsState[row][col + 1];

        renderGrid();

        // Check if all lights are off (game over condition)
        if (lightsState.every(row => row.every(light => !light))) {
            alert('Congratulations! You turned off all the lights.');
            lightsState = initializeLights(); // Restart the game
            renderGrid();
        }
    }

    // Initial render
    renderGrid();
});
