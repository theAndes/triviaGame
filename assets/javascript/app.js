//Qs, As, and Images
let questions = [
    Q1={
        question:"The idea of self-government is in the first three words of the Constitution. What are these words?",
        answer:"We the People",
        others: ['test','test','test'],
        image:'assets/images/CONSTITUTION.jpg'
    },
    Q2={
        question:"How many amendments does the Constitution have?",
        answer:"twenty-seven (27)",
        others: ['test','test','test'],
        image:'assets/images/27_Amendments.jpg'
    },
    Q3={
        question:"Who is in charge of the executive branch?",
        answer:"the President",
        others: ['test','test','test'],
        image:'assets/images/prez.jpeg'
    },
    Q4={
        question:"How many U.S. Senators are there?",
        answer:"one hundred (100)",
        others: ['test','test','test'],
        image:'assets/images/senators.jpg'
    },
    Q5={
        question:"We elect a U.S. Representative for how many years?",
        answer:"two (2)",
        others: ['test','test','test'],
        image:'assets/images/two.png'
    },
    Q6={
        question:"Who was President during World War I?",
        answer:"Woodrow Wilson",
        others: ['test','test','test'],
        image:'assets/images/Wilson_1919.png'
    },
    Q7={
        question:"Who was President during World War II?",
        answer:"Franklin Roosevelt ",
        others: ['test','test','test'],
        image:'assets/images/roosevelt.jpg'
    },
    Q8={
        question:"What territory did the United States buy from France in 1803?",
        answer:"Louisiana",
        others: ['test','test','test'],
        image:'assets/images/louisiana_Purchase.jpg'
    },
    
    Q9={
        question:"When was the Constitution written?",
        answer:"1787",
        others: ['test','test','test'],
        image:'assets/images/washington.jpg'
    },
    Q10={
        question:"Who wrote the Declaration of Independence?",
        answer:  "Thomas Jefferson",
        others: ['Andrew Jackson','Paul Revere','ALexander Hamilton'],
        image: 'assets/images/tomJeff.jpg'
    },
]





let intervalId;
let clockRunning = false; //clock checker
let time = 25; //timer
let el1 =  Math.floor(Math.random() * questions.length); //used to randomize the questions
let notAnswered= 0, wrong= 0, right = 0; //Stats
let userSelection;






window.onload = function() {
    $('#start').on("click", start);
    





function reset() {
    if(time===0 && questions.length != 0){
        el1 =  Math.floor(Math.random() * questions.length)
        $('.time-end').remove()
        $('.questions p').remove()

        time = 25;
        clearInterval(intervalId);
        $('#clock').text('00:25')
        start()
    }
    
    
    else{
        $("#start").on("click", start);
        
        $('.time-end').html('<p>Answered correctly: '+ right +
        '<p>Answered incorrectly: '+  wrong
        +'<p>Unanswered Questions: ' + notAnswered +'</p><div><button id="start">ReStart Trivia</button><div>')
       
        $('.questions p').remove()
        $(this).on("click", start);
        
    }
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
    
    question(el1);

  }

  
  
  
  
  
  function count() {
    if (time === 0 && clockRunning === true) {
        timeOut()
        
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
  
  
  //WIll need to change the objects in this function
  function timeOut(){

    notAnswered++

      $('.questions-answers').append(
          '<div class="time-end"><div><p>You ran out of time!</p></div><div id="image"><img src="'
          +  questions[el1].image +'"></div><p>The answer is:<p>'
          + questions[el1].answer +'</p><div>' );
      

          $('.answers ul').remove();


        questions.splice(el1,1) 
        clockRunning = false;
        clearInterval(intervalId);
        setTimeout(reset,5000)
        
        

      

  }
  
  
  
  
  function question(q){
      questions[q].others.unshift(questions[q].answer)
        shuffle(questions[q].others);
      
      function shuffle(arra1) {
        let counter = arra1.length;
        let temp;
        let index;
    
        
        while (counter > 0) {
    
            index = Math.floor(Math.random() * counter);
    
            counter--;
   
            temp = arra1[counter];
            arra1[counter] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    }
      
      $('.questions').append('<p>' + questions[q].question +'</p>')
      
      for (var i = 0; i <questions[q].others.length ; i++) {
        
          
          var el2 = questions[q].others[i];
           
           
            $('.answers').append(
                '<ul><li class="answer" value=' + i + '>'
                + el2 +'</li></ul>')
            }

            $('.answer').click(function(){
                userSelection = $(this).attr('value');
                console.log(userSelection);
                
                if(userSelection == questions[el1].others.indexOf(questions[el1].answer)){


                
                console.log('correct');
                }
                else{
                    console.log('not correct');
                    
                }

            })
            

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







};