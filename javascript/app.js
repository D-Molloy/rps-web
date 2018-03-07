$(document).ready(() => {
  var shallWe = "SHALL WE PLAY A GAME?";
  var rules = "Victory condition: 3 wins.";
  function printString(id, sentence, speed) {
    var index = 0;
    var intObject = setInterval(() => {
      document.getElementById(id).innerHTML += sentence[index];
      index++;
      if (index == sentence.length) {
        clearInterval(intObject);
      }
    }, speed);
  }

  function playSound(cue) {
    var sounds = {
      greet: "assets/play.mp3",
      spangled: "assets/spangled.mp3",
      round: "assets/round.wav",
      win: "assets/win.wav",
      loss: "assets/loss.wav",
      end: "assets/end.wav"
    };

    switch (cue) {
      case "greet":
        $("#song").attr("src", sounds.greet);
        break;
      case "spangled":
        $("#song").attr("src", sounds.spangled);
        break;
      case "round":
        $("#song").attr("src", sounds.round);
        break;
      case "win":
        $("#song").attr("src", sounds.win);
        break;
      case "loss":
        $("#song").attr("src", sounds.loss);
        break;
      case "end":
        $("#song").attr("src", sounds.end);
    }

    $("#song").trigger("play");
  }



  let wins = 0;
  let losses = 0;
  let draws = 0;
  let userChoice;
  let enemyChoice;
  const choices = ["ROCK", "PAPER", "SCISSORS"];
  
  const resetVars = () => {
    wins = 0;
    losses = 0;
    draws = 0;
    $("#user-losses, #user-wins, #user-draws, #enemy-wins, #enemy-losses, #enemy-draws").text(wins);
  };

  const checkWins = () => {
    if (wins === 3) {
        resetVars()
      playSound("end");
      $("#playground").css("display", "none");
      $("#message, #message-rule").hide();
      //   $("#message-rule").hide()
      $("#end-text, #end-ask").show();
      $("#message-div").show();
      printString("end-text", "A WINNER IS YOU!", 100);
      setTimeout(() => {
        printString("end-ask", "Play again?", 100);
        $("#begin").fadeIn(5000);
      }, 1000);
    } else if (losses === 3) {
    resetVars()
      playSound("end");
      $("#playground").css("display", "none");
      $("#message").toggleClass("fade");
      $("#message, #message-rule").hide();
      //   $("#message-rule").hide()
      $("#end-text, #end-ask").show();
      $("#message-div").show();
      printString("end-text", "LOSER! ALL YOUR BASE BELONG TO US!", 100);
      setTimeout(() => {
        printString("end-ask", "Play again?", 100);
        $("#begin").fadeIn(5000);
      }, 1000);
    } else {
      $("#options").show();
    }
  };

  const clearChoices = () => {
    $("#action-user-choice").text("");
    $("#action-enemy-choice").text("");
  };

  const playRound = (userAtt, enemyAtt) => {
    $("#action-enemy-choice").text(enemyChoice);
    playSound("round");

    //remove win/loss sounds from inside timeouts

    if (userAtt === "ROCK" && enemyAtt === "SCISSORS") {
      wins++;
      playSound("win");
      $("#user-wins").text(wins);
      $("#enemy-losses").text(wins);
      setTimeout(() => {
        clearChoices();
        checkWins();
      }, 1000);
    }

    if (userAtt === "ROCK" && enemyAtt === "PAPER") {
      losses++;
      playSound("loss");
      $("#user-losses").text(losses);
      $("#enemy-wins").text(losses);
      setTimeout(() => {
        clearChoices();
        checkWins();
      }, 1000);
    }

    if (userAtt === "SCISSORS" && enemyAtt === "ROCK") {
      losses++;
      playSound("loss");
      $("#user-losses").text(losses);
      $("#enemy-wins").text(losses);
      setTimeout(() => {
        clearChoices();
        checkWins();
      }, 1000);
    }

    if (userAtt === "SCISSORS" && enemyAtt === "PAPER") {
      wins++;
      playSound("win");
      $("#user-wins").text(wins);
      $("#enemy-losses").text(wins);
      setTimeout(() => {
        clearChoices();
        checkWins();
      }, 1000);
    }

    if (userAtt === "PAPER" && enemyAtt === "ROCK") {
      wins++;
      playSound("win");
      $("#user-wins").text(wins);
      $("#enemy-losses").text(wins);
      setTimeout(() => {
        clearChoices();
        checkWins();
      }, 1000);
    }

    if (userAtt === "PAPER" && enemyAtt === "SCISSORS") {
      losses++;
      playSound("loss");
      $("#user-losses").text(losses);
      $("#enemy-wins").text(losses);
      setTimeout(() => {
        clearChoices();
        checkWins();
      }, 1000);
    }

    if (userAtt === enemyAtt) {
      draws++;
      playSound("round");
      $("#user-draws").text(draws);
      $("#enemy-draws").text(draws);
      setTimeout(() => {
        clearChoices();
        checkWins();
      }, 1000);
    }
  }; //end playRound

  $("#begin").on("click", () => {
    $("#end-text, #end-ask").empty();
    $("#end-text, #end-ask").hide();
    $("#message-rule")
      .empty()
      .show();
    $("#options").show();
    $(".fade").fadeOut("slow");
    $("#begin").toggleClass("weapon");
    setTimeout(() => {
      printString("message-rule", rules, 30);
    }, 2000);
    setTimeout(() => {
      $("#message-div").hide();
      $("#playground").css("display", "block");
      playSound("spangled");
    }, 4000);
  });

  $(".weapon").on("click", function() {
    $("#options").hide();
    let random = Math.floor(Math.random() * 3);
    userChoice = $(this)
      .text()
      .trim();
    playSound("round");
    $("#action-user-choice").text(userChoice);
    enemyChoice = choices[random];
    setTimeout(() => playRound(userChoice, enemyChoice), 1000);
  });

  printString("message", shallWe, 100);
  playSound("greet");
});
