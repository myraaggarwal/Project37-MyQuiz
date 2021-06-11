class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    fill("black");
    var title = createElement('h1');
    title.html("Result Of The Quiz");
    title.position(300,10);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      fill("blue");
      textSize(20);
      //write code to add a note here
      text("NOTE : Correct Answer is in green color!!",130,230);
    }
    //write code to highlight contest who answered correctly
    for( var plr in allContestants){
      var correctAns = "2"
      if(correctAns === allContestants[plr].answer){
        fill("green");
        text(allContestants[plr] + " : "+ allContestants[plr].answer,140,260);
        fill("red")
        text(allContestants[plr]+ " : "+ allContestants[plr].answer,140,280);
       } else{
        fill("red")
        text(allContestants[plr] + " : "+ allContestants[plr].answer,140,260);
        text(allContestants[plr] + " : "+ allContestants[plr].answer,140,280);
      }
    }
  }

}
