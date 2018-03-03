$(document).ready(() => {
  var shallWe = "SHALL WE PLAY A GAME?";
  var rules = "Victory condition: 5 wins.";
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
        $("#song").attr("src", sounds.loss)
    }

    $("#song").trigger("play");
  }
  printString("message", shallWe, 100);
  playSound("greet");

  $("#begin").on("click", () => {
    $(".fade").fadeOut("slow");
    $("#begin").toggleClass("weapon");
    setTimeout(() => {
      printString("message-rule", rules, 30);
    }, 2000);
    setTimeout(() => {
      $("#message-div").hide();
      $("#playground").css("display", "block");
      playSound("spangled")
    }, 4000);
  });
});
