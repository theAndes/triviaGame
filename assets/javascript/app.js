//arrazy of objects! Qs, As, and Images
let questions = [
    Q1 = {
        question: "The idea of self-government is in the first three words of the Constitution. What are these words?",
        answer: "We the People",
        others: ['Form perfect Union', 'Establish this Constitution', 'The Blessings of Liberty '],
        image: 'assets/images/CONSTITUTION.jpg'
    },
    Q2 = {
        question: "How many amendments does the Constitution have?",
        answer: "twenty-seven (27)",
        others: ['twenty-one (21)', 'twenty-nine (29)', 'twenty-five (25)'],
        image: 'assets/images/27_Amendments.jpg'
    },
    Q3 = {
        question: "Who is in charge of the executive branch?",
        answer: "The President",
        others: ['The Attorney General', 'The Supreme Court', 'Speaker of the House'],
        image: 'assets/images/prez.jpeg'
    },
    Q4 = {
        question: "How many U.S. Senators are there?",
        answer: "one hundred (100)",
        others: ['fifty (50)', '435', 'five hundred (500)'],
        image: 'assets/images/senators.jpg'
    },
    Q5 = {
        question: "We elect a U.S. Representative for how many years?",
        answer: "two (2)",
        others: ['four (4)', 'six (6)', 'eight (8)'],
        image: 'assets/images/two.png'
    },
    Q6 = {
        question: "Who was President during World War I?",
        answer: "Woodrow Wilson",
        others: ['Franklin Roosevelt', 'Calvin Coolidge', 'William Howard Taft'],
        image: 'assets/images/Wilson_1919.png'
    },
    Q7 = {
        question: "Who was President during World War II?",
        answer: "Franklin Roosevelt",
        others: ['Woodrow Wilson', 'Calvin Coolidge', 'William Howard Taft'],
        image: 'assets/images/roosevelt.jpg'
    },
    Q8 = {
        question: "What territory did the United States buy from France in 1803?",
        answer: "Louisiana",
        others: ['Florida', 'Oregon Territory', 'Alaska'],
        image: 'assets/images/Louisiana_Purchase.jpg'
    },

    Q9 = {
        question: "When was the Constitution written?",
        answer: "1787",
        others: ['1785', '1786', '1789'],
        image: 'assets/images/washington.jpg'
    },
    Q10 = {
        question: "Who wrote the Declaration of Independence?",
        answer: "Thomas Jefferson",
        others: ['Andrew Jackson', 'Paul Revere', 'ALexander Hamilton'],
        image: 'assets/images/tomJeff.jpg'
    },
]





let intervalId;
let clockRunning = false; //clock checker
let time = 10; //timer
let el1 = Math.floor(Math.random() * questions.length); //used to randomize the questions
let notAnswered = 0, wrong = 0, right = 0; //Stats
let userSelection; //Users choice for answer
let holdAsked = []; //will be used to hold already asked questions. then moved back into questions at restart
let tempOthers = []; //set to not modify original array. will need all original contents when game resets




//restart button hidden
$('#restart').hide();
//////////////////////////////////

//Buttons
$('#start').on('click', start);
$('#restart').on('click', start);//will be used at end of game to restart game
///////////////////////////////


//ToDo: Start game function

function start() {
    //TODO: If there are no more questions to asked. do a full reset of global variables.
    if (questions.length === 0) {

        $('#removeMe').remove()//Removes the DIv with the stats
        $('#restart').hide()//hide the restart button

        time = 10; // reset time
        questions = holdAsked; //reload questions
        el1 = Math.floor(Math.random() * questions.length); //used to randomize the questions
        notAnswered = 0, wrong = 0, right = 0; //Stats
        userSelection;
        holdAsked = []//reset
        tempOthers = [];//reset
    }

    //  TODO: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(count, 1000)//interval ID set!!!
        clockRunning = true;
    }

    //Hide the start button and intro
    $('#intro').hide();
    //Show the clock
    $('#clock-display').removeClass('hide');

    //Pass random question into question function
    question(el1);

}
/////////////////////////////////////////////////////////////////////////


//Question function takes the random questions and pushes the datat to designated areas in the DOM

function question(q) {

    //This will allow me to use the tempOthers array. Dont want to permantly affect questions array data.  
    for (let i = 0; i < questions[q].others.length; i++) {
        tempOthers.unshift(questions[q].others[i]);

    }

    //this will push the answer into the temp array
    tempOthers.unshift(questions[q].answer)

    //randomize the thepOthers array so the choices will never be in same order
    shuffle(tempOthers);
    //shuffle array function

    //////sending info to the DOM. Creating Divs to hold our data putting our oblects on the screen for user.
    $('.questions-answers').append('<div class="questions"><p>' + questions[q].question + '</p></div>')

    //this will send the data in each index to the UL. Four possible answers, Four LIs. Ran into issues here, created four ULs with on LI in each 
    for (var i = 0; i < tempOthers.length; i++) {
        var el2 = tempOthers[i];

        $('.questions').append(
            '<div class="answers"><ul><li class="answer" value=' + i + '>' + el2 + '</li></ul></div>')
    };



    //answer checker after selection
    $('.answer').click(function () {
        
        //set userSelection to answer value which is the index value of the randomized list
        userSelection = $(this).attr('value');
        
        //TODO: IF userSlection is the answer object index of tempOthers
        if (userSelection == tempOthers.indexOf(questions[el1].answer)) {
            //count up the correct
            right++
            
            //image and answer objects
            $('.questions-answers').append(
                '<div class="time-end"><div><p>You are correct!</p></div><div id="image"><img src="'
                + questions[el1].image + '"></div><p>The answer is:<p>'
                + questions[el1].answer + '</p><div>');

            //stop the clock
            stop()
            //this one will start clearing out data in arrays, clears out the question and answer, and images
            removeItem()




        }
        //DRY was not applied for this else. this if the answer is wrong
        else {
            $('.questions-answers').append(
                '<div class="time-end"><div><p>No. You are wrong!</p></div><div id="image"><img src="'
                + questions[el1].image + '"></div><p>The correct answer is:<p>'
                + questions[el1].answer + '</p><div>');
                wrong++
                stop()
                removeItem()
            }
    })//end of answer checker
}//end of question function
/////////////////////////////////////////////////////


//ToDo: This reset the questions
function reset() {
    //this will verify if there are any more questions and run the start function
    if (questions.length != 0) {
        el1 = Math.floor(Math.random() * questions.length) //DRY not applied :(
        $('.time-end').remove()
        $('.questions p').remove()

        time = 10;
        clearInterval(intervalId);
        $('#clock').text('00:10')
        start()
    }

    //once list is empty run the stats!   
    else {
        
        $('#clock').text('00:10')
        $('.questions-answers').html('<div id="removeMe"<p>Answered correctly: ' + right +
            '<p>Answered incorrectly: ' + wrong
            + '<p>Unanswered Questions: ' + notAnswered + '</p></div>')

        $('#restart').show()
    }
}//end of reset function
//////////////////////////////////////////////////////////////////

//TODO: TIMEOUT scree. More DRY opportunities
function timeOut() {

    notAnswered++


    $('.questions-answers').append(
        '<div class="time-end"><div><p>You ran out of time!</p></div><div id="image"><img src="'
        + questions[el1].image + '"></div><p>The answer is:<p>'
        + questions[el1].answer + '</p><div>');

        removeItem()
}//end of timeout function
//////////////////////////////////////////////////////////////////
        
//ToDO: clear DIV, PLace asked questions into empy array. Delete question from questions array so it doesnt get asked again.
//Clear trmpOthers array
function removeItem() {
    $('.questions').remove();
    holdAsked.unshift(questions[el1])
    questions.splice(el1, 1)
    clockRunning = false;
    clearInterval(intervalId);
    setTimeout(reset, 2000)
    tempOthers = []
}//end function
//////////////////////////////////////////

//TODO: Stop the clock
function stop() {

    clearInterval(intervalId);
    clockRunning = false;
}//end function

//TODO: rundown the clock
function count() {
    //send me to timout screen if i hit 
    if (time === 0 && clockRunning === true) {
        timeOut()

    }
    else {
        //  TODO: increment time by 1, remember we cant use "this" here.
        time--
        //  TODO: Get the current time, pass that into the timeConverter function,
        //        and save the result in a variable.
        newTime = timeConverter(time)
        $('#clock').text(newTime)
    }
}//end the count function
//////////////////////////


//ToDO: onvert the time.
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
}/////////////////
//////////////////////////////////////////////////////

//TODO: Shuffle my chioces
function shuffle(arra1) {
    let counter = arra1.length;//array length is 4
    let temp;
    let index;

    //While the counter is greater than 0 perfom function
    while (counter > 0) {
        //index will  be the a radom number between 0 and counter
        index = Math.floor(Math.random() * counter);
        //decrement counter
        counter--;

        //start the shuffle
        temp = arra1[counter];
        arra1[counter] = arra1[index];
        arra1[index] = temp;//new shuffled array
        //keep doing until counter is now 0.
    }
    return arra1; //pass back new new array when all done!!!YAY
}