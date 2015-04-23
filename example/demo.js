var player = new Player();
var game;

function start(){
  game = player.startGame();
  resetView();
  document.getElementById("play").disabled = false;
  document.getElementById("start").disabled = true;
};

function play(){
  partialScore = player.throwRoll();
  updateView();
  if(player.game.isFinished()){
    alert('Game finished');
    document.getElementById("play").disabled = true;
    document.getElementById("start").disabled = false;
  }
};

updateView =  function(){
  if(game.isFinished())
    document.getElementById('score').innerHTML = game.score;
  game.frames.forEach(updateFrame);
};

updateFrame = function(frame, frameIndex){
  frameScoreId = 'frame'+ (frameIndex+1);

  if(frame.score != -1)
    document.getElementById(frameScoreId).innerHTML = frame.score;

  frame.partialScores.forEach(function(score, scoreIndex){
    rollScoreId = frameScoreId + '_' + (scoreIndex+1);
    if (frame.bonus == 'Spare' && scoreIndex == 1)
      score = '/';
    else if (frame.bonus == 'Strike' && score == 10)
      score = 'X';
    document.getElementById(rollScoreId).innerHTML = score;
  });
};

resetView = function(){
  document.getElementById('score').innerHTML = '-';
  for(var i=1; i<=10; i++){
    var frameScoreId = 'frame'+ i;
    document.getElementById(frameScoreId).innerHTML = '-';
    document.getElementById(frameScoreId + '_' + 1).innerHTML = '-';
    document.getElementById(frameScoreId + '_' + 2).innerHTML = '-';
  }
}
