describe('FrameScorer class', function(){
  var frameScorer;

  beforeEach(function() {
    frameScorer = new FrameScorer();
  });

  describe('when constructor is called', function(){
    it("should behave create a proper object", function() {
      expect(frameScorer.rolls.length).toEqual(0);
      expect(frameScorer.framesToUpdate.length).toEqual(0);
      expect(frameScorer._callbacks).toEqual({
        Spare: jasmine.any(Function),
        Strike: jasmine.any(Function)
      });
    });
  });

  describe('when registerUpdateFrame is called', function(){
    it("should insert new item in framesToUpdate", function() {
      var frame = new BowlingFrame();
      frame.bonus = 'Strike';
      expect(frameScorer.framesToUpdate.length).toEqual(0);
      frameScorer.registerUpdateFrame(frame);
      expect(frameScorer.framesToUpdate.length).toEqual(1);
      expect(frameScorer.framesToUpdate[0].frame).toEqual(frame);
      expect(frameScorer.framesToUpdate[0].index).toEqual(2);
      expect(frameScorer.framesToUpdate[0].update).toEqual(jasmine.any(Function));
    });
  });

  describe('when addRoll is called', function(){
    it("should insert new item in rolls", function() {
      frame = new BowlingFrame();
      spyOn(frame, 'addRoll');
      spyOn(frameScorer, 'calculateScore');
      expect(frameScorer.rolls.length).toEqual(0);
      frameScorer.addRoll(4, frame);
      expect(frameScorer.rolls.length).toEqual(1);
      expect(frameScorer.rolls[0]).toEqual(4);
      expect(frame.addRoll).toHaveBeenCalledWith(4);
      expect(frameScorer.calculateScore).toHaveBeenCalled();
    });
  });

  describe('when clearPendingFrames is called', function(){
    it("should empty framesToUpdate", function() {
      var frame = new BowlingFrame();
      frame.bonus = 'Strike';
      spyOn(frame, 'calculateScore');
      frameScorer.registerUpdateFrame(frame);
      expect(frameScorer.framesToUpdate.length).toEqual(1);
      frameScorer.clearPendingFrames();
      expect(frameScorer.framesToUpdate.length).toEqual(0);
      expect(frame.calculateScore).toHaveBeenCalled();
    });
  });

  describe('when updatePendingFrames is called', function(){
    it("should update the frame ready", function() {
      var frame = new BowlingFrame();
      var updateSpy = jasmine.createSpy('updateFn');
      frameScorer.rolls = [1,2,3,4,5,6];
      frameScorer.framesToUpdate.push({
        index: 3,
        frame: frame,
        update: updateSpy
      });
      expect(frameScorer.framesToUpdate.length).toEqual(1);
      frameScorer.updatePendingFrames();
      expect(frameScorer.framesToUpdate.length).toEqual(0);
      expect(updateSpy).toHaveBeenCalled();
    });
  });
});
