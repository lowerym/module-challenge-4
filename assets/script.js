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

var summaryScreen = document.querySelector("#summaryScreen");
var finalScore = document.querySelector("#finalScore");
var submitInitialBtn = document.querySelector("#submitInitials");
var initialInput = document.querySelector("#initialInput");

var scoreScreen = document.querySelector("#scoreScreen");
var highScoresList = document.querySelector("#highScoresList");

var correctAnswers = 0;
var questionNumber = 0;
var scoreResult;
var questionIndex = 0;

// reference set of questions
var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: {
      1: 'strings',
      2: 'booleans',
      3: 'alerts',
      4: 'numbers',
    },
    correctAnswer: '3'
  },
  {
    question: "The condition in an if/else statement is enclosed with ___________.",
    answers: {
      1: 'quotes',
      2: 'curly brackets',
      3: 'parenthesis',
      4: 'square brackets'
    },
    correctAnswer: '2'
  },
  {
    question: "Arrays in JavaScript can be used to store ___________.",
    answers: {
      1: 'numbers and strings',
      2: 'other arrays',
      3: 'booleans',
      4: 'all of the above'
    },
    correctAnswer: '2'
  },
  {
    question: "String values must be enclosed within ___________ when being assigned to variables.",
    answers: {
      1: 'commas',
      2: 'curly brackets',
      3: 'quotes',
      4: 'parenthesis'
    },
    correctAnswer: '3'
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: {
      1: 'JavaScript',
      2: 'terminal/bash',
      3: 'for loops',
      4: 'console.log'
    },
    correctAnswer: '4'
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
