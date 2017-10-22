//  Interval Exercise (follow the instructions below).

//  This code will run as soon as the page loads.
window.onload = function() {
console.log("B");
  //  Click events are done for us:
  $("#submit-button").click(submitAnswer);
  stopwatch.start();
  
};

var questions = [
  "Which of these iconic games was released in 1985?",
  "Which Michael J. Fox movie came out in 1985?",
  "Which team won the Superbowl in 1985?",
  "Who were the World Series Champions of 1985?",
  "Which of these ladies won Miss America in 1985?"
  ];

var correctAnswer = ["Super Mario Brothers", "Teen Wolf", "San Fransisco 49ers", "Kansas City Royals", "Sharlene Wells"];
var incorrectAnswers = {
"0": ["Metroid", "Donkey Kong", "Legend of Zelda"],
"1": ["The Goonies", "Light of Day", "Back to the Future II"],
"2": ["Miami Dolphins", "Denver Broncos", "Washington Redskins"],
"3": ["St Louis Cardinals", "Toronto Blue Jays", "Los Angeles Dodgers"],
"4": ["Laura Martinez-Herring", "Melissa Bradley", "Kathy Manning"]
}

answerImages = ["assets/images/mario-team.png", "assets/images/Teen-Wolf.png", "assets/images/49ers.gif", "assets/images/royals.gif", "assets/images/miss-america.gif"]

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// Detremines which question the user is on.
var questionCounter = 0;

var submitTimeout;

//  Our stopwatch object.
var stopwatch = {

  time: 15,

  reset: function() {

    stopwatch.time = 15;

    //  TODO: Change the "display" div to "00:00."
    $("#timer").text("00:15");
    clearInterval(intervalId);
    for (var i=1; i<=4; i++) {
      $("#answer-"+i).text("");
    }

  },

  start: function() {
    console.log("A");
      //  TODO: Use setInterval to start the count here and set the clock to running.
      //if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
      //}
      submitTimeout = setTimeout(function() {
        console.log("D");
        submitAnswer(false);
      }, 15900);

  },
  stop: function() {

    //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);

  },

  count: function() {
    //  TODO: increment time by 1, remember we cant use "this" here.
    stopwatch.time--;
    //  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
    var currentTime = stopwatch.timeConverter(stopwatch.time);
    //        and save the result in a variable.

    //  TODO: Use the variable you just created to show the converted time in the "display" div.
    $("#timer").text(currentTime);

  },

  //  THIS FUNCTION IS DONE FOR US!
  //  We do not need to touch it.

  timeConverter: function(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  } // End of timeConverter function
}; // End of stopwatch object

function submitAnswer(clicked) {
  console.log("C");
  clearTimeout(submitTimeout);
  $("#timer").css("display","none");
  $("#question").text("The correct answer was " + correctAnswer[questionCounter]);
  $("#answers").css("display","none");
  $("#image").css("display", "inline-block");
  $("#image").css("background-image", "url(" + answerImages[questionCounter] + ")");

  stopwatch.reset();
  var correctChoice = Math.floor(Math.random() * 4) + 1;

  setTimeout(function() {
    questionCounter++;
    var otherChoices = 0;
    $("#timer").css("display","inline-block");
    $("#question").text(questions[questionCounter]);
    $("#answers").css("display","block");
    $("#image").css("display", "none");
    $("#answer-"+correctChoice).text(correctAnswer[questionCounter]);
    for (var i=1; i<=4; i++) {
      if ($("#answer-"+i).text() === "") {
        console.log("Z");
        console.log(questionCounter);
        var numberString = questionCounter.toString();
        $("#answer-"+i).text(incorrectAnswers[numberString][otherChoices]);
        otherChoices++;
      }
    }
    stopwatch.start();
  }, 4000);
};

