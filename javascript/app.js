// var h1Text = "SHALL WE PLAY A GAME?";
// function printSentence(id, sentence, speed){
//     var index=0;
//     var intObject= setInterval(function() {
//     document.getElementById(id).innerHTML+=sentence[index];
//     index++;
//     if(index==sentence.length){
//     clearInterval(intObject);
//     }
//     }, speed);
// }
// var mp3 = document.getElementById('song');
// function playSound(){
//     mp3.play();
// }
// window.onload = function (){
//     printSentence('diii', h1Text, 100);
//     playSound();
// };

$(document).ready(()=>{

    $("#begin").on("click", ()=>{
        $("#message-div").hide()
        $("#playground").css("display", "block");  
    })
    

})