var BowlingFrame = (function() {
  function BowlingFrame() {
    this.NUM_OF_PINS = 10;
    this.remainingPins = this.NUM_OF_PINS;
    this.rollsAmount = 2;
    this.partialScores = [];
    this.score = -1;
    this.bonus = 'None';
  }

  BowlingFrame.prototype.hasRollsAvailable = function() {
    return (this.rollsAmount - this.partialScores.length) > 0;
  };

  BowlingFrame.prototype.isFinished = function() {
    return !this.hasRollsAvailable() || this.hasBonus();
  };

  BowlingFrame.prototype.hasBonus = function() {
    return this.bonus != 'None';
  };

  BowlingFrame.prototype.addRoll = function(partialScore) {
    this.partialScores.push(partialScore);
    this.setBonus(partialScore);
    this.remainingPins -= partialScore;
  };

  BowlingFrame.prototype.calculateScore = function() {
    this.score = 0;
    for (i = 0; i < this.partialScores.length; i++) {
      this.score += this.partialScores[i];
    }
    return this.score;
  };

  BowlingFrame.prototype.setBonus = function(partialScore) {
    if(partialScore == this.NUM_OF_PINS){
      this.bonus = 'Strike';
    }
    else if(partialScore == this.remainingPins){
      this.bonus = 'Spare';
    }
  };

  return BowlingFrame;

})();
