var BowlingFrame = (function() {
  function BowlingFrame(id) {
    this.id = id;
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

  BowlingFrame.prototype.hasBonus = function() {
    return this.bonus != 'None';
  };

  BowlingFrame.prototype.addRoll = function(partialScore) {
    this.partialScores.push(partialScore);
    this.remainingPins -= partialScore;
    this.setBonus(partialScore);
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
      if (this.id == 10){
        this.rollsAmount = 3;
        this.remainingPins = this.NUM_OF_PINS;
      }
      else{
        this.rollsAmount = 1;
      }
    }
    else if(this.remainingPins === 0){
      this.bonus = 'Spare';
      if (this.id == 10){
        this.remainingPins = this.NUM_OF_PINS;
        this.rollsAmount = 3;
      }
    }
  };

  return BowlingFrame;

})();
