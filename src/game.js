var BowlingGame = (function() {
  function BowlingGame() {
    this.frames = [];
    this.startNewFrame();
    this.score = -1;
    this.frameScorer = new FrameScorer();
  }

  BowlingGame.prototype.addRoll = function(partialScore) {
    if (!this.currentFrame.hasRollsAvailable())
      this.startNewFrame();

    this.frameScorer.addRoll(partialScore, this.currentFrame);
    this.frameScorer.updatePendingFrames();

    if (this.isFinished()){
      this.frameScorer.clearPendingFrames();
      this.updateScore();
    }

    return partialScore;
  };

  BowlingGame.prototype.isFinished = function() {
    return this.frames.length == 10 && !this.currentFrame.hasRollsAvailable();
  };

  BowlingGame.prototype.updateScore = function() {
    this.score = 0;
    for (var i = 0; i < this.frames.length; i++) {
      this.score += this.frames[i].score;
    }
  };

  BowlingGame.prototype.startNewFrame = function() {
    this.currentFrame = new BowlingFrame(this.frames.length+1);
    return this.frames.push(this.currentFrame);
  };

  return BowlingGame;

})();
