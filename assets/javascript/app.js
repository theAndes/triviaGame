//Qs, As, and Images
let questions = [
    Q1={
        question:"The idea of self-government is in the first three words of the Constitution. What are these words?",
        answer:"We the People",
        others: ['Form perfect Union','Establish this Constitution','The Blessings of Liberty '],
        image:'assets/images/CONSTITUTION.jpg'
    },
    Q2={
        question:"How many amendments does the Constitution have?",
        answer:"twenty-seven (27)",
        others: ['twenty-one (21)','twenty-nine (29)','twenty-five (25)'],
        image:'assets/images/27_Amendments.jpg'
    },
    Q3={
        question:"Who is in charge of the executive branch?",
        answer:"The President",
        others: ['The Attorney General','The Supreme Court','Speaker of the House'],
        image:'assets/images/prez.jpeg'
    },
    Q4={
        question:"How many U.S. Senators are there?",
        answer:"one hundred (100)",
        others: ['fifty (50)','435','five hundred (500)'],
        image:'assets/images/senators.jpg'
    },
    Q5={
        question:"We elect a U.S. Representative for how many years?",
        answer:"two (2)",
        others: ['four (4)','six (6)','eight (8)'],
        image:'assets/images/two.png'
    },
    Q6={
        question:"Who was President during World War I?",
        answer:"Woodrow Wilson",
        others: ['Franklin Roosevelt','Calvin Coolidge','William Howard Taft'],
        image:'assets/images/Wilson_1919.png'
    },
    Q7={
        question:"Who was President during World War II?",
        answer:"Franklin Roosevelt",
        others: ['Woodrow Wilson','Calvin Coolidge','William Howard Taft'],
        image:'assets/images/roosevelt.jpg'
    },
    Q8={
        question:"What territory did the United States buy from France in 1803?",
        answer:"Louisiana",
        others: ['Florida','Oregon Territory','Alaska'],
        image:'assets/images/Louisiana_Purchase.jpg'
    },
    
    Q9={
        question:"When was the Constitution written?",
        answer:"1787",
        others: ['1785','1786','1789'],
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
let time = 10; //timer
let el1 =  Math.floor(Math.random() * questions.length); //used to randomize the questions
let notAnswered= 0, wrong= 0, right = 0; //Stats
let userSelection;
let holdAsked=[];
let tempOthers =[]







$('#start').on('click',function(){
    start()
    console.log('start button clicked');});
    $('#restart').hide();

    $('#restart').on('click',start);





function reset() {
    if( questions.length != 0){
        el1 =  Math.floor(Math.random() * questions.length)
        $('.time-end').remove()
        $('.questions p').remove()

        time = 10;
        clearInterval(intervalId);
        $('#clock').text('00:10')
        start()
    }
    
    
    else{
    
        

        $('#clock').text('00:10')
        
        
        $('.questions-answers').html('<div id="removeMe"<p>Answered correctly: '+ right +
        '<p>Answered incorrectly: '+  wrong
        +'<p>Unanswered Questions: ' + notAnswered +'</p></div>')
        
        $('#restart').show()
        
    }
}





function start() {
        if(questions.length === 0 ){
            console.log("Resart game");
            $('#removeMe').remove()
            $('#restart').hide()
         //clock checker
        time = 10; //timer
        questions=holdAsked;
        el1 =  Math.floor(Math.random() * questions.length); //used to randomize the questions
        notAnswered= 0, wrong= 0, right = 0; //Stats
        userSelection;
        holdAsked=[]
        tempOthers =[];
        }

    //  TODO: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(count,1000)
        clockRunning = true;
        console.log('ingame');
        
        
    }
    //Hide the start button and intro

    $('#intro').hide();
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
    console.log('not answered' + notAnswered);
    

      $('.questions-answers').append(
          '<div class="time-end"><div><p>You ran out of time!</p></div><div id="image"><img src="'
          +  questions[el1].image +'"></div><p>The answer is:<p>'
          + questions[el1].answer +'</p><div>' );
      

          removeItem()
          //$('.answers ul').remove();


        
        

      

  }
  
  function removeItem(){
    $('.questions').remove();
    holdAsked.unshift(questions[el1])
    questions.splice(el1,1) 
    clockRunning = false;
    clearInterval(intervalId);
    setTimeout(reset,2000)
    tempOthers=[]
  }
  
  
  function question(q){
       
      
      for (let i = 0; i < questions[q].others.length; i++) {
           tempOthers.unshift(questions[q].others[i]);
          
      }
      tempOthers.unshift(questions[q].answer)
      shuffle(tempOthers);

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
      
      $('.questions-answers').append('<div class="questions"><p>' + questions[q].question +'</p></div>')
      
      for (var i = 0; i <tempOthers.length ; i++) {
        
          
          var el2 = tempOthers[i];
           
           
            $('.questions').append(
                ' <div class="answers"><ul><li class="answer" value=' + i + '>'
                + el2 +'</li></ul></div>')
            }

            $('.answer').click(function(){
                userSelection = $(this).attr('value');
                console.log(userSelection);
                
                if(userSelection == questions[el1].others.indexOf(questions[el1].answer)){
                    right++
                    console.log('correct');
                    
                    
                    $('.questions-answers').append(
                        '<div class="time-end"><div><p>You are correct!</p></div><div id="image"><img src="'
                        +  questions[el1].image +'"></div><p>The answer is:<p>'
                        + questions[el1].answer +'</p><div>' );

                    stop()
                    removeItem()

                
                }
                else{
                    
                    $('.questions-answers').append(
          '<div class="time-end"><div><p>No. You are wrong!</p></div><div id="image"><img src="'
          +  questions[el1].image +'"></div><p>The correct answer is:<p>'
          + questions[el1].answer +'</p><div>' );
                    
                    wrong++
                    console.log('not correct');
                    stop()
                    removeItem()
                    
                }

            })
            

  }
  
  
  
  function stop() {

    clearInterval(intervalId);
    clockRunning = false;
  }
  
  
  
  
  
 
  
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







