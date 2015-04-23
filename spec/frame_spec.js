describe('Frame class', function(){
  var frame;

  beforeEach(function() {
    frame = new BowlingFrame();
  });

  describe('when constructor is called', function(){
    it("should behave create a proper object", function() {
      expect(frame.NUM_OF_PINS).toEqual(10);
      expect(frame.remainingPins).toEqual(10);
      expect(frame.rollsAmount).toEqual(2);
      expect(frame.partialScores.length).toEqual(0);
      expect(frame.score).toEqual(-1);
      expect(frame.bonus).toEqual('None');
    });
  });

  describe('when hasRollsAvailable is called', function(){
    describe('when has not rolls', function(){
      it("should return false", function() {
        frame.rollsAmount = 0;
        expect(frame.hasRollsAvailable()).toEqual(false);
      });
    });

    describe('when has rolls', function(){
      it("should return true", function() {
        expect(frame.hasRollsAvailable()).toEqual(true);
      });
    });
  });

  describe('when isFinished is called', function(){
    describe('when has bonus and has no rolls', function(){
      beforeEach(function() {
        spyOn(frame, 'hasBonus').and.returnValue(true);
        spyOn(frame, 'hasRollsAvailable').and.returnValue(false);
      });

      it("should save the callbackFunction", function() {
        expect(frame.isFinished()).toEqual(true);
        expect(frame.hasBonus).not.toHaveBeenCalled();
        expect(frame.hasRollsAvailable).toHaveBeenCalled();
      });
    });

    describe('when has bonus and has rolls', function(){
      beforeEach(function() {
        spyOn(frame, 'hasBonus').and.returnValue(true);
        spyOn(frame, 'hasRollsAvailable').and.returnValue(true);
      });

      it("should save the callbackFunction", function() {
        expect(frame.isFinished()).toEqual(true);
        expect(frame.hasBonus).toHaveBeenCalled();
        expect(frame.hasRollsAvailable).toHaveBeenCalled();
      });
    });

    describe('when has no bonus and has rolls', function(){
      beforeEach(function() {
        spyOn(frame, 'hasBonus').and.returnValue(false);
        spyOn(frame, 'hasRollsAvailable').and.returnValue(true);
      });

      it("should save the callbackFunction", function() {
        expect(frame.isFinished()).toEqual(false);
        expect(frame.hasBonus).toHaveBeenCalled();
        expect(frame.hasRollsAvailable).toHaveBeenCalled();
      });
    });
  });

  describe('when calculateScore is called', function(){
    it("should update the score", function() {
      expect(frame.score).toEqual(-1);
      frame.partialScores.push(5);
      frame.calculateScore();
      expect(frame.score).toEqual(5);
    });
  });

  describe('when setBonus is called', function(){
    describe('when a it\'s strike', function(){

      it("should set the proper bonus", function() {
        expect(frame.bonus).toEqual('None');
        frame.setBonus(10);
        expect(frame.bonus).toEqual('Strike');
      });
    });
    describe('when it\'s spare', function(){

      it("should set the proper bonus", function() {
        frame.remainingPins = 5;
        expect(frame.bonus).toEqual('None');
        frame.setBonus(5);
        expect(frame.bonus).toEqual('Spare');
      });
    });
    describe('when no bonus', function(){

      it("should set the proper bonus", function() {
        expect(frame.bonus).toEqual('None');
        frame.setBonus(3);
        expect(frame.bonus).toEqual('None');
      });
    });
  });

  describe('when addRoll is called', function(){
    beforeEach(function() {
      spyOn(frame, 'setBonus');
    });

    it("should update the status", function() {
      var partialScore = 3;
      frame.addRoll(partialScore);
      expect(frame.partialScores).toEqual([partialScore]);
      expect(frame.setBonus).toHaveBeenCalledWith(partialScore);
      expect(frame.remainingPins).toEqual(7);
    });
  });

});