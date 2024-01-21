// reference elements in web application
var timer = document.querySelector("#timer");
var timeLeft = document.querySelector("#timer-count");
var timesUp = document.querySelector("#timesUp");

var startButton = document.querySelector(".start-btn");
var startScreen = document.querySelector("#startScreen");

var questionScreen = document.querySelector("#questionScreen");
var questionTitle = document.querySelector("#questionTitle");
var choice1 = document.querySelector("#btn0");
var choice2 = document.querySelector("#btn1");
var choice3 = document.querySelector("#btn2");
var choice4 = document.querySelector("#btn3");
var answerCheck = document.querySelector("#answerCheck");

var summaryScreen = document.querySelector("#summaryScreen");
var finalScore = document.querySelector("#finalScore");
var submitInitialBtn = document.querySelector("#submitInitials");
var initialInput = document.querySelector("#initialInput");

var scoreScreen = document.querySelector("#scoreScreen");
var highScoresList = document.querySelector("#highScoresList");
var viewHighScores = document.querySelector("#viewHighScores");
var goBackButton = document.querySelector("#goBackButton");
var clearHighScoreButton = document.querySelector("#clearHighScoreButton");

var correctAnswers = 0;
var questionNumber = 0;
var scoreResult;
var questionIndex = 0;

// reference set of questions
const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctAnswer: "3. alerts"
  },
  {
    question: "The condition in an if/else statement is enclosed with ___________.",
    answers: [
      "1. quotes",
      "2. curly brackets",
      "3. parenthesis",
      "4. 'square brackets"
    ],
    correctAnswer: "2. curly brackets"
  },
  {
    question: "Arrays in JavaScript can be used to store ___________.",
    answers: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above"
    ],
    correctAnswer: "2. other arrays"
  },
  {
    question: "String values must be enclosed within ___________ when being assigned to variables.",
    answers: [
      "1. commas",
      "2. curly brackets",
      "3. quotes",
      "4. parenthesis"
    ],
    correctAnswer: "3. quotes"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log"
    ],
    correctAnswer: "4. console.log"
  },
];

// timer function
var totalTime = 101;
function newQuiz() {
  questionIndex = 0;
  totalTime = 100;
  timeLeft.textContent = totalTime;
  initialInput.textContent = "";

  startScreen.style.display = "none";
  questionScreen.style.display = "block";
  timer.style.display = "block";
  timesUp.style.display = "none";

  var startTimer = setInterval(function() {
    totalTime--;
    timeLeft.textContent = totalTime;
    if(totalTime <= 0) {
      clearInterval(startTimer);
      if (questionIndex < questions.length - 1) {
        gameOver();
      }
    }
  },1000);

  showQuiz();
}

// question function
function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].question;
  choice1.textContent = questions[questionIndex].answers[0];
  choice2.textContent = questions[questionIndex].answers[1];
  choice3.textContent = questions[questionIndex].answers[2];
  choice4.textContent = questions[questionIndex].answers[3];
}

// function shows if answer is correct or not
function checkAnswer(correctAnswer) {
  var lineBreak = document.querySelector("#lineBreak");
  lineBreak.style.display = "block";
  answerCheck.style.display = "block";
  if (questions[questionIndex].correctAnswer === questions[questionIndex].answers[correctAnswer]) {
    // if answer is correct, adds one point to score and add ten seconds to timer
    correctAnswers++;
    totalTime += 10;
    timeLeft.textContent = totalTime;
    answerCheck.textContent = "Correct!";
  } else {
    // if answer is wrong, remove ten seconds from timer
    totalTime -= 10;
    timeLeft.textContent = totalTime;
    answerCheck.textContent = "Wrong!";
  }
  // moves to the next question
  questionIndex++;
  if (questionIndex < questions.length) {
    nextQuestion();
  } else {
    gameOver();
  }
}

// each function selects an answer based on what the user clicks
function choose1() {
  checkAnswer(0);
}

function choose2() {
  checkAnswer(1);
}

function choose3() {
  checkAnswer(2);
}

function choose4() {
  checkAnswer(3);
}

// game ends either when all the questions are answers or the timer runs out
function gameOver() {
  summaryScreen.style.display = "block";
  questionScreen.style.display = "none";
  startScreen.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";

  // show final score
  finalScore.textContent = correctAnswers;
}

// enter initials and score in local storage
function storeHighScores(event) {
  event.preventDefault();

  // stops function if initial input is blank
  if (initialInput.value === "") {
    alert("Please enter your initials!");
    return;
  }

  startScreen.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  summaryScreen.style.display = "block";
  scoreScreen.style.display = "block";

  // stores high scores into local storage
  var savedHighScores = localStorage.getItem("High Scores");
  var scoresArray;

  if (savedHighScores === null) {
    scoresArray = [];
  } else {
    scoresArray = JSON.parse(savedHighScores)
  }

  var userScore = {
    initials: initialInput.value,
    score: finalScore.textContent
  }

  console.log(userScore);
  scoresArray.push(userScore);

  // converts array into string to store in local
  var scoresArrayString = JSON.stringify(scoresArray);
  window.localStorage.setItem("High Scores", scoresArrayString);

  // show current high scores
  showHighScores();
}

// function shows high scores
var i = 0;
function showHighScores() {
  startScreen.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  questionScreen.style.display = "none";
  summaryScreen.style.display = "none";
  scoreScreen.style.display = "block";

  var savedHighScores = localStorage.getItem("High Scores");

  // check if there are any high scores in local
  if (savedHighScores === null) {
    return;
  }
  console.log(savedHighScores);

  var storedHighScores = JSON.parse(savedHighScores);

  // prints scores on high score page and sorts by highest to lowest score
  for (; i < storedHighScores.length; i++) {
    storedHighScores.sort((a,b) => b.score - a.score);
    var eachNewHighScore = document.createElement("li");
    eachNewHighScore.innerHTML = storedHighScores[i].initials + " - " + storedHighScores[i].score;
    highScoresList.appendChild(eachNewHighScore);
  }
}

// event listeners
startButton.addEventListener("click", newQuiz);
choice1.addEventListener("click", choose1);
choice2.addEventListener("click", choose2);
choice3.addEventListener("click", choose3);
choice4.addEventListener("click", choose4);

submitInitialBtn.addEventListener("click", function(event){
  storeHighScores(event);
});

viewHighScores.addEventListener("click", function(event) {
  showHighScores(event);
});

goBackButton.addEventListener("click", function() {
  startScreen.style.display = "block";
  scoreScreen.style.display = "none";
});

clearHighScoreButton.addEventListener("click", function() {
  window.localStorage.removeItem("High Scores");
  highScoresList.innerHTML = "High Scores Cleared!";
  highScoresList.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});
