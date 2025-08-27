class SlidingPuzzle {
    constructor() {
        this.size = 3;
        this.tiles = [];
        this.emptyPos = { row: this.size - 1, col: this.size - 1 };
        this.moves = 0;
        this.startTime = Date.now();
        this.timer = null;
        this.isPlaying = false;
        
        this.initializeGame();
        this.setupEventListeners();
        this.startTimer();
    }
    
    initializeGame() {
        this.createTiles();
        this.shuffleTiles();
        this.renderPuzzle();
        this.updateGameInfo();
        this.isPlaying = true;
    }
    
    createTiles() {
        this.tiles = [];
        for (let i = 0; i < this.size * this.size - 1; i++) {
            this.tiles.push(i + 1);
        }
        this.tiles.push(0); // 0 represents empty space
    }
    
    shuffleTiles() {
        // Fisher-Yates shuffle algorithm
        for (let i = this.tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
        }
        
        // Ensure puzzle is solvable
        if (!this.isSolvable()) {
            this.shuffleTiles();
        }
        
        // Update empty position
        this.updateEmptyPosition();
    }
    
    isSolvable() {
        let inversions = 0;
        const tilesCopy = [...this.tiles];
        
        for (let i = 0; i < tilesCopy.length - 1; i++) {
            if (tilesCopy[i] === 0) continue;
            for (let j = i + 1; j < tilesCopy.length; j++) {
                if (tilesCopy[j] === 0) continue;
                if (tilesCopy[i] > tilesCopy[j]) {
                    inversions++;
                }
            }
        }
        
        // For 3x3 puzzle, it's solvable if inversions are even
        return inversions % 2 === 0;
    }
    
    updateEmptyPosition() {
        const emptyIndex = this.tiles.indexOf(0);
        this.emptyPos.row = Math.floor(emptyIndex / this.size);
        this.emptyPos.col = emptyIndex % this.size;
    }
    
    renderPuzzle() {
        const puzzleElement = document.getElementById('puzzle');
        puzzleElement.innerHTML = '';
        
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const index = row * this.size + col;
                const tileValue = this.tiles[index];
                
                const tile = document.createElement('div');
                tile.className = 'tile';
                
                if (tileValue === 0) {
                    tile.classList.add('empty');
                    tile.textContent = '';
                } else {
                    tile.textContent = tileValue;
                    
                    // Check if tile is movable
                    if (this.isTileMovable(row, col)) {
                        tile.classList.add('movable');
                    }
                }
                
                tile.addEventListener('click', () => this.handleTileClick(row, col));
                puzzleElement.appendChild(tile);
            }
        }
    }
    
    isTileMovable(row, col) {
        return (
            (Math.abs(row - this.emptyPos.row) === 1 && col === this.emptyPos.col) ||
            (Math.abs(col - this.emptyPos.col) === 1 && row === this.emptyPos.row)
        );
    }
    
    handleTileClick(row, col) {
        if (!this.isPlaying) return;
        
        if (this.isTileMovable(row, col)) {
            this.moveTile(row, col);
            this.moves++;
            this.updateGameInfo();
            this.renderPuzzle();
            
            if (this.checkWin()) {
                this.handleWin();
            }
        }
    }
    
    moveTile(row, col) {
        const tileIndex = row * this.size + col;
        const emptyIndex = this.emptyPos.row * this.size + this.emptyPos.col;
        
        // Swap tile with empty space
        [this.tiles[tileIndex], this.tiles[emptyIndex]] = [this.tiles[emptyIndex], this.tiles[tileIndex]];
        
        // Update empty position
        this.emptyPos.row = row;
        this.emptyPos.col = col;
    }
    
    checkWin() {
        for (let i = 0; i < this.tiles.length - 1; i++) {
            if (this.tiles[i] !== i + 1) {
                return false;
            }
        }
        return this.tiles[this.tiles.length - 1] === 0;
    }
    
    handleWin() {
        this.isPlaying = false;
        clearInterval(this.timer);
        
        const winMessage = document.createElement('div');
        winMessage.className = 'win-message';
        winMessage.innerHTML = `
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You solved the puzzle in ${this.moves} moves!</p>
            <p>Time: ${this.formatTime(Date.now() - this.startTime)}</p>
            <button onclick="this.parentElement.remove(); game.newGame();">Play Again</button>
        `;
        
        document.body.appendChild(winMessage);
        
        // Remove win message after 5 seconds if not clicked
        setTimeout(() => {
            if (winMessage.parentElement) {
                winMessage.remove();
            }
        }, 5000);
    }
    
    updateGameInfo() {
        document.getElementById('moves').textContent = this.moves;
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            if (this.isPlaying) {
                const elapsed = Date.now() - this.startTime;
                document.getElementById('time').textContent = this.formatTime(elapsed);
            }
        }, 1000);
    }
    
    formatTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    newGame() {
        this.moves = 0;
        this.startTime = Date.now();
        this.isPlaying = true;
        this.initializeGame();
        this.startTimer();
    }
    
    solve() {
        if (!this.isPlaying) return;
        
        // Simple solving algorithm - move tiles to their correct positions
        this.isPlaying = false;
        clearInterval(this.timer);
        
        const solveInterval = setInterval(() => {
            let moved = false;
            
            for (let i = 0; i < this.tiles.length - 1; i++) {
                const currentRow = Math.floor(i / this.size);
                const currentCol = i % this.size;
                const targetRow = Math.floor(i / this.size);
                const targetCol = i % this.size;
                
                if (this.tiles[i] === i + 1) continue;
                
                // Find where the correct tile is
                const correctTileIndex = this.tiles.indexOf(i + 1);
                const correctTileRow = Math.floor(correctTileIndex / this.size);
                const correctTileCol = correctTileIndex % this.size;
                
                // Move the correct tile to its position
                if (this.moveTileTowards(correctTileRow, correctTileCol, targetRow, targetCol)) {
                    moved = true;
                    this.moves++;
                    this.updateGameInfo();
                    this.renderPuzzle();
                    break;
                }
            }
            
            if (!moved || this.checkWin()) {
                clearInterval(solveInterval);
                if (this.checkWin()) {
                    this.handleWin();
                } else {
                    this.isPlaying = true;
                    this.startTimer();
                }
            }
        }, 200);
    }
    
    moveTileTowards(fromRow, fromCol, toRow, toCol) {
        // Simple pathfinding to move tile towards target
        if (fromRow === toRow && fromCol === toCol) return false;
        
        // Try to move the tile towards the target
        if (fromRow < toRow && this.isTileMovable(fromRow + 1, fromCol)) {
            this.moveTile(fromRow + 1, fromCol);
            return true;
        } else if (fromRow > toRow && this.isTileMovable(fromRow - 1, fromCol)) {
            this.moveTile(fromRow - 1, fromCol);
            return true;
        } else if (fromCol < toCol && this.isTileMovable(fromRow, fromCol + 1)) {
            this.moveTile(fromRow, fromCol + 1);
            return true;
        } else if (fromCol > toCol && this.isTileMovable(fromRow, fromCol - 1)) {
            this.moveTile(fromRow, fromCol - 1);
            return true;
        }
        
        return false;
    }
    
    setupEventListeners() {
        document.getElementById('new-game').addEventListener('click', () => this.newGame());
        document.getElementById('solve').addEventListener('click', () => this.solve());
    }
}

// Initialize the game when the page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new SlidingPuzzle();
}); 