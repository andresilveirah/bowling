var FrameScorer = (function() {
  function FrameScorer() {
    this.rolls = [];
    this.framesToUpdate = [];
    this._callbacks = {
      Spare: function(frame, rollIndex){
        frame.score = this.rolls[rollIndex-1] + this.rolls[rollIndex] + this.rolls[rollIndex+1];
      },
      Strike: function(frame, rollIndex){
        frame.score = this.rolls[rollIndex] + this.rolls[rollIndex+1] + this.rolls[rollIndex+2];
      }
    };
  }

  FrameScorer.prototype.registerUpdateFrame = function(frame) {
    offset = {Spare: 1, Strike: 2}[frame.bonus];
    this.framesToUpdate.push({
      frame: frame,
      index: this.rolls.length + offset,
      update: this._callbacks[frame.bonus].bind(this, frame, this.rolls.length - 1)
    });
  };

  FrameScorer.prototype.addRoll = function(partialScore, frame) {
    this.rolls.push(partialScore);
    frame.addRoll(partialScore);
    this.calculateScore(frame);
  };

  FrameScorer.prototype.calculateScore = function(frame) {
    if (frame.hasBonus()) {
      this.registerUpdateFrame(frame);
    }
    else if (!frame.hasRollsAvailable()) {
      frame.calculateScore();
    }
  };

  FrameScorer.prototype.clearPendingFrames = function(){
    for(var i=this.framesToUpdate.length-1; i>=0; i--){
      this.framesToUpdate[i].frame.calculateScore();
      this.framesToUpdate.splice(i,1);
    }
  };

  FrameScorer.prototype.updatePendingFrames = function(){
    for(var i=this.framesToUpdate.length-1; i>=0; i--){
      if(this.framesToUpdate[i].index <= this.rolls.length){
        this.framesToUpdate[i].update();
        this.framesToUpdate.splice(i,1);
      }
    }
  };

  return FrameScorer;

})();
