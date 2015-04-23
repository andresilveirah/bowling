describe('Game class', function(){
  var game;

  beforeEach(function() {
    game = new BowlingGame();
  });

  describe('when constructor is called', function(){
    it("should behave create a proper object", function() {
      expect(game.frames.length).toEqual(1);
      expect(game.score).toEqual(-1);
      expect(game.currentFrame.constructor.name).toEqual('BowlingFrame');
      expect(game.frameScorer.constructor.name).toEqual('FrameScorer');
    });
  });

  describe('when addRoll is called', function(){
    beforeEach(function() {
      spyOn(game,'startNewFrame');
      spyOn(game,'updateScore');
      spyOn(game.frameScorer, 'clearPendingFrames');
    });

    it("should call add roll on the frameScorer", function() {
      spyOn(game.frameScorer,'addRoll');
      expect(game.addRoll(4));
      expect(game.frameScorer.addRoll).toHaveBeenCalledWith(4, game.currentFrame);
    });

    it("should update the pending frame", function() {
      spyOn(game.frameScorer,'updatePendingFrames');
      expect(game.addRoll(4));
      expect(game.frameScorer.updatePendingFrames).toHaveBeenCalled();
    });

    describe('when currentFrame hasRollsAvailable', function(){
      it("should not create a new frame", function() {
        spyOn(game.currentFrame, 'hasRollsAvailable').and.returnValue(true);
        expect(game.addRoll(4));
        expect(game.startNewFrame).not.toHaveBeenCalled();
      });
    });

    describe('when currentFrame has not rolls available', function(){
      it("should not create a new frame", function() {
        spyOn(game.currentFrame, 'hasRollsAvailable').and.returnValue(false);
        expect(game.addRoll(4));
        expect(game.startNewFrame).toHaveBeenCalled();
      });
    });

    describe('when game is not finished', function(){
      it("should not update the score", function() {
        spyOn(game, 'isFinished').and.returnValue(false);
        expect(game.addRoll(4));
        expect(game.frameScorer.clearPendingFrames).not.toHaveBeenCalled();
        expect(game.updateScore).not.toHaveBeenCalled();
      });
    });

    describe('when game is finished', function(){
      it("should not create a new frame", function() {
        spyOn(game, 'isFinished').and.returnValue(true);
        expect(game.addRoll(4));
        expect(game.frameScorer.clearPendingFrames).toHaveBeenCalled();
        expect(game.updateScore).toHaveBeenCalled();
      });
    });
  });

  describe('when isFinished is called', function(){
    describe('when has less then 10 frames', function(){
      it("should return false", function() {
        game.frames = [1,2,3,4,5];
        expect(game.isFinished()).toBeFalsy();
      });
    });
    describe('when has rolls Available in the current frame', function(){
      it("should return false", function() {
        game.frames = [1,2,3,4,5,6,7,8,9,10];
        spyOn(game.currentFrame, 'hasRollsAvailable').and.returnValue(true);
        expect(game.isFinished()).toBeFalsy();
      });
    });
    describe('when has 10 frames and no rolls available', function(){
      it("should return true", function() {
        game.frames = [1,2,3,4,5,6,7,8,9,10];
        spyOn(game.currentFrame, 'hasRollsAvailable').and.returnValue(false);
        expect(game.isFinished()).toBeTruthy();
      });
    });
  });

  describe('when startNewFrame is called', function(){
    it("should create a new frame", function() {
      expect(game.frames.length).toEqual(1);
      game.startNewFrame();
      expect(game.frames.length).toEqual(2);
    });
  });

  describe('when updateScore is called', function(){
    it("should update the score", function() {
      game.frames[0].score = 8;
      game.frames.push({score: 7});
      expect(game.score).toEqual(-1);
      game.updateScore();
      expect(game.score).toEqual(15);
    });
  });
});
