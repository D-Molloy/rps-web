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
      loss: "assets/loss.wav"
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
      case "lost":
        $("#song").attr("src", sounds.loss);
    }

    $("#song").trigger("play");
  }

  let wins = 0;
  let losses = 0;
  let draws = 0;
  let userChoice;
  let enemyChoice;
  const choices = ["ROCK", "PAPER", "SCISSORS"];
  let random = Math.floor(Math.random() * 3);

  const playRound = (userAtt, enemyAtt) => {
    $("#action-enemy-choice").text(enemyChoice);
    playSound("round");

    if (userAtt === "ROCK" && enemyAtt === "SCISSORS") {
      wins++;
    }

    if (userAtt === "ROCK" && enemyAtt === "PAPER") {
      losses++;
    }

    if (userAtt === "SCISSORS" && enemyAtt === "ROCK") {
      losses++;
    }

    if (userAtt === "SCISSORS" && enemyAtt === "PAPER") {
      wins++;
    }

    if (userAtt === "PAPER" && enemyAtt === "ROCK") {
      wins++;
    }

    if (userAtt === "PAPER"&& enemyAtt === "SCISSORS") {
      losses++;
    }

    if (userAtt === enemyAtt) {
      ties++;
    }
  }; //end playRound

  $("#begin").on("click", () => {
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
