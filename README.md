# triviaGame 
###### mobile


1. List of question objects
    1. Randomize the the order the questions will appear on screen
    1. shuffle array order of possible choices
1. Capture user selection into a variable
    1. Check user selection against correct answer
1. Delete question from list to ensure it is not asked again
1. When game is complete display stats and provide option to restart game
    * get user stats
    * counter for timeout, wrong, right
1. Restart will not reload page. It will reset all variables
    1. Retrieve deleted questions


  
###### how to shuffle your array
```javascript
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

```
[Link to Game!](https://theandes.github.io/triviaGame/)
