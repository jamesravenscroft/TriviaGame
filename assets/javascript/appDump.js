(function() {
  var questions = [{
    question: "What is 2*5?",
    choices: [2, 5, 10, 15, 20],
    correctAnswer: 2
  }, {
    question: "What is 3*6?",
    choices: [3, 6, 9, 12, 18],
    correctAnswer: 4
  }, {
    question: "What is 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
  }, {
    question: "What is 1*7?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 3
  }, {
    question: "What is 8*8?",
    choices: [20, 30, 40, 50, 64],
    correctAnswer: 4
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();

// //Red Hover image
// var game = new Phaser.Game(config);

// function preload ()
// {
//     this.load.image('feyd', '..assets/images/feydRauthaArtKnife');
// }

// function create ()
// {
//     var container = this.add.container(0, 0);

//     var sprite = this.add.image(200, 200, 'eye').setInteractive();

//     sprite.setScale(-1, 1);
//     sprite.setOrigin(0);
    
//     container.add(sprite);

//     sprite.on('pointerover', function () {
//         console.log('over');
//         this.setTint(0xff0000);
//    });

//     sprite.on('pointerout', function () {
//         console.log('out');
//         this.clearTint();
//    });
// }


const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');




function buildQuiz(){}

function showResults(){}

// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);


// Displaying the Q
const myQuestions = [
 {
   question: "Who is the strongest?",
   answers: {
     a: "Superman",
     b: "The Terminator",
     c: "Waluigi, obviously"
   },
   correctAnswer: "c"
 },
 {
   question: "What is the best site ever created?",
   answers: {
     a: "SitePoint",
     b: "Simple Steps Code",
     c: "Trick question; they're both the best"
   },
   correctAnswer: "c"
 },
 {
   question: "Where is Waldo really?",
   answers: {
     a: "Antarctica",
     b: "Exploring the Pacific Ocean",
     c: "Sitting in a tree",
     d: "Minding his own business, so stop asking"
   },
   correctAnswer: "d"
 }
];


// Build quiz
function buildQuiz(){
 // we'll need a place to store the HTML output
 const output = [];

 // for each question...
 myQuestions.forEach(
   (currentQuestion, questionNumber) => {

     // we'll want to store the list of answer choices
     const answers = [];

     // and for each available answer...
     for(letter in currentQuestion.answers){

       // ...add an HTML radio button
       answers.push(
         `<label>
           <input type="radio" name="question${questionNumber}" value="${letter}">
           ${letter} :
           ${currentQuestion.answers[letter]}
         </label>`
       );
     }

     // add this question and its answers to the output
     output.push(
       `<div class="question"> ${currentQuestion.question} </div>
       <div class="answers"> ${answers.join('')} </div>`
     );
   }
 );

 // finally combine our output list into one string of HTML and put it on the page
 quizContainer.innerHTML = output.join('');
}


Output
myQuestions.forEach( (currentQuestion, questionNumber) => {
 // here goes the code we want to run for each question
});

// we'll want to store the list of answer choices
const answers = [];

// and for each available answer...
for(letter in currentQuestion.answers){

 // ...add an html radio button
 answers.push(
   `<label>
     <input type="radio" name="question${questionNumber}" value="${letter}">
     ${letter} :
     ${currentQuestion.answers[letter]}
   </label>`
 );
}

// add this question and its answers to the output
output.push(
 `<div class="question"> ${currentQuestion.question} </div>
 <div class="answers"> ${answers.join('')} </div>`
);

// Display result

quizContainer.innerHTML = output.join('');

function showResults(){

 // gather answer containers from our quiz
 const answerContainers = quizContainer.querySelectorAll('.answers');

 // keep track of user's answers
 let numCorrect = 0;

 // for each question...
 myQuestions.forEach( (currentQuestion, questionNumber) => {

   // find selected answer
   const answerContainer = answerContainers[questionNumber];
   const selector = 'input[name=question'+questionNumber+']:checked';
   const userAnswer = (answerContainer.querySelector(selector) || {}).value;

   // if answer is correct
   if(userAnswer===currentQuestion.correctAnswer){
     // add to the number of correct answers
     numCorrect++;

     // color the answers green
     answerContainers[questionNumber].style.color = 'lightgreen';
   }
   // if answer is wrong or blank
   else{
     // color the answers red
     answerContainers[questionNumber].style.color = 'red';
   }
 });

 // show number of correct answers out of total

resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;
}



const answerContainers = quizContainer.querySelectorAll('.answers');

// keep track of user's answers
let numCorrect = 0;
// Now we can loop through each question and check the answers.
// for each question...
myQuestions.forEach( (currentQuestion, questionNumber) => {

 // find selected answer
 const answerContainer = answerContainers[questionNumber];
 const selector = `input[name=question${questionNumber}]:checked`;
 const userAnswer = (answerContainer.querySelector(selector) || {}).value;

 // if answer is correct
 if(userAnswer===currentQuestion.correctAnswer){
   // add to the number of correct answers
   numCorrect++;

   // color the answers green
   answerContainers[questionNumber].style.color = 'lightgreen';
 }
 // if answer is wrong or blank
 else{
   // color the answers red
   answerContainers[questionNumber].style.color = 'red';
 }
});


// find selected answer
const answerContainer = answerContainers[questionNumber];
const selector = `input[name=question${questionNumber}]:checked`;
const userAnswer = (answerContainer.querySelector(selector) || {}).value;

// Evaluating the Answers and Displaying the Result
// The next statements in our answer-checking loop will let us handle correct and incorrect answers.
// if answer is correct
if(userAnswer===currentQuestion.correctAnswer){
 // add to the number of correct answers
 numCorrect++;

 // color the answers green
 answerContainers[questionNumber].style.color = 'lightgreen';
}
// if answer is wrong or blank
else{
 // color the answers red
 answerContainers[questionNumber].style.color = 'red';
}

// show number of correct answers out of total
resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;


(function(){
 // put the rest of your code here
})();

//  Simple Timer Solution

// Step 1:
// Use the following Audio file below:
// var audio = new Audio("raven.mp3");

// //  Step 2:
// //  after 5 seconds, execute the fiveSeconds function
// //  after 10 seconds, execute the tenSeconds function
// //  after 15 seconds, execute the timeUp function

// setTimeout(fiveSeconds, 1000 * 5);
// setTimeout(tenSeconds, 1000 * 10);
// setTimeout(timeUp, 1000 * 15);

// //  Step 3:
// //  Fill in the blanks to these functions.
// function fiveSeconds() {
//   // in the element with an id of time-left add an h2 saying About 10 Seconds Left!
//   // console log 10 seconds left
//   $("#time-left").append("<h2>About 10 Seconds Left!</h2>");
//   console.log("10 seconds left");
// }

// function tenSeconds() {
//   // in the element with an id of time-left add an h2 saying About 5 Seconds Left!
//   // console log 5 seconds left
//   $("#time-left").append("<h2>About 5 Seconds Left!</h2>");
//   console.log("5 seconds left");
// }

// function timeUp() {
//   // in the element with an id of time-left add an h2 saying Time's Up!
//   // console log done
//   console.log("done");
//   $("#time-left").append("<h2>Time's Up!</h2>");
//   console.log("time is up");

//   //  The following line will play the audio file we linked to above:
//   audio.play();
// }


// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2019 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);



// Blue Hover image PHASER
// var game = new Phaser.Game(config);

// function preload ()
// {
//     this.load.image('paul', 'assets/images/InkedpaulCaladanAge15.jpg');
// }

// function create ()
// {
//     var container = this.add.container(0, 0);

//     var sprite = this.add.image(200, 200, 'paul').setInteractive();

//     sprite.setScale(-1, 1);
//     sprite.setOrigin(0);
    
//     container.add(sprite);

//     sprite.on('pointerover', function () {
//         console.log('over');
//         this.setTint(0xff0000);
//    });

//     sprite.on('pointerout', function () {
//         console.log('out');
//         this.clearTint();
//    });
// }