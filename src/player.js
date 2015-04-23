var Player = (function() {
  function Player() {}

  Player.prototype.startGame = function() {
    this.game = new BowlingGame();
    return this.game;
  };

  Player.prototype.throwRoll = function() {
    score = Math.floor(Math.random() * this.game.currentFrame.remainingPins);
    return this.game.addRoll(score);
  };

  return Player;

})();
