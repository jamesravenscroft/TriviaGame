//SPLASH SCREEN LOADER
// $('.enter_link').click(function() { 
//   $(this).parent().fadeOut(500);
// });


var pos = 0;
    var correct = 0;
    var test, test_status, question, choice, choices, chA, chB, chC;
    
    var questions = [
  ["I must:", "NOT falter.", "NOT fear.", "CALM my nerves.", "B"],
  ["Fear is:", "THE Sadist's Illusion", "THE Ultimate Truth", "THE Mind Killer", "C"],
  ["Fear is:", "THE little-death that brings total obliteration.", "NECESSARY to human survival.", "A fool's companion.", "A"],
  ["I will:", "OUTSMART this witch.", "AVOID further harm.", "FACE my fear", "C"],
  ["I will:", "FORGIVE transgressions", "PERMIT it to pass over me and through me.", "FIGHT relelntlessly", "B"],
  ["And when it has gone past I will:", "CHANNEL my energy into my hand and destroy the box.", "CHALLENGE all opponents that wish to bring such pain to me in the future.", "TURN the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.", "C"]
  
];
    
  function get(x){
  return document.getElementById(x);
}

function renderQuestion(){
  test = get("test");
  if(pos >= questions.length){
    test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct. Perhaps you should review 'Litany Against Fear'</h2>";
    get("test_status").innerHTML = "Test completed";
    // resets the variable to allow users to restart the test
    pos = 0;
    correct = 0;
    if (correct = 6) {
alert("You have mastered the Litany Against Fear. You have survived the Gom Jabbar. Perhaps you are the Kwizats Haderach...."); 
    }
  
          // stops rest of renderQuestion function running when test is completed
    return false;
  }
  get("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
  question = questions[pos][0];
  chA = questions[pos][1];
  chB = questions[pos][2];
  chC = questions[pos][3];
  test.innerHTML = "<h3>"+question+"</h3>";
  // the += appends to the data we started on the line above
  test.innerHTML += "<input type='radio' name='choices' value='A'> "+chA+"<br>";
  test.innerHTML += "<input type='radio' name='choices' value='B'> "+chB+"<br>";
  test.innerHTML += "<input type='radio' name='choices' value='C'> "+chC+"<br><br>";
  test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}

function checkAnswer(){
  // use getElementsByName because we have an array which it will loop through
  choices = document.getElementsByName("choices");
  for(var i=0; i<choices.length; i++){
    if(choices[i].checked){
      choice = choices[i].value;
    }
  }
  // checks if answer matches the correct choice
  if(choice == questions[pos][4]){
    //each time there is a correct answer this value increases
    correct++;
  }
  // changes position of which character user is on
  pos++;
  // then the renderQuestion function runs again to go to next question
  renderQuestion();
}

window.addEventListener("load", renderQuestion, false);


//oooooooooooooo    timer   ooooooooooooooooooooooo
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);

//     when (seconds =0) {
// alert("The Pain was too great");
//     };
}

window.onload = function () {
    var fiveMinutes = 60 * 2,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};

var windowTimeout = setTimeout(function() {
        alert('The Pain has overwhlemed you\n' 
    + "forcing you to retract\n" 
    + 'your hand from the Box.\n' 
    + 'As Promised, Reverend Mother\n'
    + 'struck you with the Gom Jabbar.\n' 
    + '▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬\n' 
     
    + 'You are dead.\n' 
    );
      }, 122000);
