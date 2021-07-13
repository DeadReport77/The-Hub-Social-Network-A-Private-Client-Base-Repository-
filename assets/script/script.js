// collect the elements from the HTML for usage
var gameTimer = document.querySelector("#time-disp");
var currQuest = document.querySelector("#curr-quest");
var answer1 = document.querySelector("#ans1");
var answer2 = document.querySelector("#ans2");
var answer3 = document.querySelector("#ans3");
var answer4 = document.querySelector("#ans4");
var startBttn = document.querySelector("#start-button");
var scoreBttn = document.querySelector("#view-scores");
var ansDisp = document.querySelector(".question-ans");
var scoresDiv = document.querySelector(".display-scores");
var finalScore = document.querySelector("#show-score");
var scoreDisp = document.querySelector(".capture-init");
var restartBttn = document.querySelector("#restart");
var clearBttn = document.querySelector("#clear-scores")
var initBttn = document.querySelector("#add-init");
var enterInit = document.querySelector("#user-init");
restartBttn.style.display = "none";
clearBttn.style.display = "none";

// set the scores array to an empty variable and start score at 0
var scoresArray = [];
var userScore = 0;

// set timer variables
var timer = 240;
var qIndex = -1;
var timerInterval;

// fancy timer formatting
const Duration = luxon.Duration;

// Pull data from localStorage
var prevScores = JSON.parse(localStorage.getItem("Previous Entries"));

// check data present in local storage if clear button has been clicked
  if (prevScores !== null){
      scoresArray = prevScores;
  };

userScores();

// start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    timer--;
    var formattedTime = Duration.fromObject({seconds: timer}).toFormat('m:ss');
    gameTimer.textContent = formattedTime;
    if (formattedTime === "0:00" || formattedTime.includes("-")) {
      endQuiz();
    }
  }, 1000);
}

// display the next question
function nextQ() {
  if (++qIndex === VKquestions.length) {
    endQuiz();
    return;
  }
  currQuest.textContent = VKquestions[qIndex].question;
  answer1.textContent = VKquestions[qIndex].answers[0].text;
  answer2.textContent = VKquestions[qIndex].answers[1].text;
  answer3.textContent = VKquestions[qIndex].answers[2].text;
  answer4.textContent = VKquestions[qIndex].answers[3].text;
}

// display a randomized question
function randomQ(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var s = Math.floor(Math.random() * i);
    var switchedQ = array[i];
    array[i] = array[s];
    array[s] = switchedQ;
  }
  nextQ();
}

// end the assessment and display scores
function endQuiz() {
  clearInterval(timerInterval);
  if (timer < 0) {
    timer = 0;
  }
  calcScore();
  gameTimer.textContent = "0:00";
  ansDisp.style.display = "none";
  scoreDisp.style.display = "inline"; 
  finalScore.textContent = userScore;
  restartBttn.style.display = "inline"; 
  scoreBttn.style.display = "inline"; 
}

// Event listener to start quiz
startBttn.addEventListener("click", function startQuiz() {
  timer = 240;
  startTimer();
  userScore = 0;
  startBttn.style.display = "none";
  scoreBttn.style.display = "none";
  randomQ(VKquestions);

  document.querySelectorAll("li").forEach(function (choice) {
    choice.classList.add("answer");
    choice.addEventListener("click", function (event) {
      VKquestions.forEach((matchAns) => {
        matchAns.answers.forEach((answer) => {
          if (answer.text === event.target.textContent && answer.points === 0) {
            timer -= 20;
          } else if (answer.text === event.target.textContent) {
            userScore += answer.points;
            console.log(userScore);
          }
        });
      });
      nextQ();
    });
  });
});

// Event listener to save score
initBttn.addEventListener("click", function(event) {
      event.preventDefault();
      var userInits = enterInit.value;
      scoresArray.push({initials:userInits, score:userScore});
      console.log(scoresArray);
      localStorage.setItem("Previous Entries", JSON.stringify(scoresArray));
      currQuest.innerHTML = "";
      gameTimer.textContent = "4:00";
      scoreDisp.innerHTML = "<h4>Your score has been saved.</h>";
});

// Event listener to view previous scores
function userScores() {
    scoreBttn.addEventListener("click", function() {
        scoreBttn.style.display = "none";
        startBttn.style.display = "none"; 
        ansDisp.style.display = "none";
        scoreDisp.style.display = "none";
        currQuest.textContent = "Previous Subject Scores:"
        currQuest.style.color = "goldenrod"
        scoresDiv.style.display = "inline-block";
        restartBttn.style.display = "inline"; 
        clearBttn.style.display = "inline";
        scoresArray.forEach(prevScore => {
            var eachScore = document.createElement("p");
            var status = "";
            if (prevScore.score <= 50) {status = "Confirmed Human"} 
            else if (prevScore.score > 139) {status = "Confirmed Replicant"}
            else if (prevScore.score > 99 && prevScore.score < 140) {status = "Possible Replicant"}
            else {status = "Probable Human"};
            eachScore.classList.add("prev-score");
            eachScore.textContent = prevScore.initials + "   |   " + status;
            scoresDiv.appendChild(eachScore);
        })
    });
};

// Event listener to clear previous searches
clearBttn.addEventListener("click", function() {
    localStorage.setItem("Previous Entries", null);
    location.reload();
});

// Event listener to start quiz
restartBttn.addEventListener("click", function() {
    location.reload();
});

// Display result based on userScore
function calcScore() {
  if (userScore > 139) {
      currQuest.textContent = "CONFIRMED REPLICANT";
      currQuest.style.color = "red";
  } else if (userScore > 99 && userScore < 140) {
      currQuest.textContent = "Possible Replicant. Surveillance authorized.";
      currQuest.style.color = "honeydew";
  } else if (userScore <= 50) {
      currQuest.textContent = "Confirmed Human.";
      currQuest.style.color = "#0cb906";
  } else {
      currQuest.textContent = "Probable Human. Await more data.";
  } 
};