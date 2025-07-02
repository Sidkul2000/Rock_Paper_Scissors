/**
 * Main entry point for the Rock Paper Scissors simulation
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create and initialize game
    const game = new Game('game-canvas');
    game.initialize();
    game.start();

    // Add click handler to restart when winner is shown
    document.getElementById('winner-overlay').addEventListener('click', () => {
        // Hide winner overlay
        document.getElementById('winner-overlay').style.display = 'none';
        
        // Reset game
        game.initialize();
        game.start();
    });
});