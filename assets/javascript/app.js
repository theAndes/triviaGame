let questions = {
    Q1:{
        question:"The idea of self-government is in the first three words of the Constitution. What are these words?",
        answer:"We the People",
        others: ['','',''],
        image:''
    },
    Q2:{
        question:"How many amendments does the Constitution have?",
        answer:"twenty-seven (27)",
        others: ['','',''],
        image:''
    },
    Q3:{
        question:"Who is in charge of the executive branch?",
        answer:"the President",
        others: ['','',''],
        image:''
    },
    Q4:{
        question:"How many U.S. Senators are there?",
        answer:"one hundred (100)",
        others: ['','',''],
        image:''
    },
    Q5:{
        question:"We elect a U.S. Representative for how many years?",
        answer:"two (2)",
        others: ['','',''],
        image:''
    },
    Q6:{
        question:"Who was President during World War I?",
        answer:"Woodrow Wilson",
        others: ['','',''],
        image:''
    },
    Q7:{
        question:"Who was President during World War II?",
        answer:"Franklin Roosevelt ",
        others: ['','',''],
        image:''
    },
    Q8:{
        question:"What territory did the United States buy from France in 1803?",
        answer:"Louisiana",
        others: ['','',''],
        image:''
    },
    
    Q9:{
        question:"When was the Constitution written?",
        answer:"1787",
        others: ['','',''],
        image:''
    },
    Q10:{
        question:"Who wrote the Declaration of Independence?",
        answer:"Thomas Jefferson",
        others: ['','',''],
        image: 'assets/images/tomJeff.jpg'
    },
}


window.onload = function() {
    $("#start").on("click", start);
    
};

let intervalId;
let clockRunning = false;
let time = 25;


function reset() {
    clearInterval(intervalId);
    time = 25;
    clockRunning = false;
    //  Show the start button and hide the clock
    $('#intro').removeClass('hide');

    //$('#clock-display').addClass('hide')
    $('#clock').text('00:25')  
}





function start() {
    
    //  TODO: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(count,1000)
        clockRunning = true;
    }
    //Hide the start button and intro
    $('#intro').addClass('hide');
    //Show the clock
    $('#clock-display').removeClass('hide');

  }

  
  
  
  
  
  function count() {
    if (time === 0 && clockRunning===true) {
        timeOut()
        console.log(time);
        
    }
    else{
    //  TODO: increment time by 1, remember we cant use "this" here.
  time --
    //  TODO: Get the current time, pass that into the timeConverter function,
    //        and save the result in a variable.
  newTime = timeConverter(time)
  $('#clock').text(newTime)
    }
    //  TODO: Use the variable you just created to show the converted time in the "display" div.

  }
  
  
  
  function timeOut(){
      $('.questions-answers').append(
          '<div class="time-end"><p>You ran out of time!</p><p>The answer is:<p><span id="answer"></span></p>'+ questions.answer +'</div><div id="image"><img src="'+questions.Q10.image+'"></div>' );
      clockRunning = false;
      clearInterval(intervalId);


  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //  THIS FUNCTION IS DONE FOR US!
  //  We do not need to touch it.
  
  function timeConverter(t) {
  
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
  }