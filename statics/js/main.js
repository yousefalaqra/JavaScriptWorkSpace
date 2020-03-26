// challenge 1: Your age in days.
function yourAgeInDays(){
    var age = prompt("Waht year you were born?");
    var ageInDays = (2020-age) * 365;

    var h1 = document.createElement('h1');
    var answer = document.createTextNode('You are ' + ageInDays + ' days old');
    h1.setAttribute('id', 'result')
    h1.appendChild(answer);
    document.getElementById('flex-result').appendChild(h1);
}

function reset(){
    document.getElementById('result').remove();
}


// challenge 2: Cat generator.
function genCat(){
    var img = document.createElement('img');
    img.src = 'http://thecatapi.com/api/images/get?format=src&type=gif&size=small';
    document.getElementById('flex-cat-gen').appendChild(img);
}


// challenge 3: Rock, Paper, Scissors

function rpsGame(selectedChoice){
    // step one: get the user choice id and the bot choice(randomly)
    var userChoice, botChoice;
    userChoice = selectedChoice.id;
    botChoice = createRandomChoice(); // return string ==> rock, paper, or Scissors
    console.log('User Choice:', userChoice);
    console.log('Bot Choice:', botChoice);


    // step two: decide who won, user or the bot??
    var matchResult = getMatchResult(userChoice, botChoice); // return list ==> [1,0] user won, [0,1] bot won, or [0.5,0.5] a tie.
    console.log('match result:', matchResult);

    // step three: get the final maessage of the game..
    var finalMessage = getMessage(matchResult) // return an object ==> Ie: {'message': 'you won!', 'color': 'green'}.
    console.log('final message:', finalMessage);

    // Fianly: change the dom to track the game stage.
    rpsDomManipulate(userChoice, botChoice, finalMessage);

}

function createRandomChoice(){
    var randomNumber = Math.floor(Math.random()*3);
    var choice = getChoice(randomNumber);
    
    return choice;
}

function getChoice(number){
    return ['rock', 'paper', 'scissors'][number];
}

function getMatchResult(userChoice, botChoice){
    resultDatabase = 
        {
            'rock': {
                'rock':0.5, 'paper':0, 'scissors': 1,
            },

            'paper': {
                'rock':1, 'paper':0.5, 'scissors': 0,
            },

            'scissors': {
                'rock':0, 'paper':1, 'scissors': 0.5,
            },
        }
    
    var matchResult = [resultDatabase[userChoice][botChoice], resultDatabase[botChoice][userChoice]]

    return matchResult;
}

function getMessage([useerResult, botResult]){
    if(useerResult === 0){
        return {'message': 'You lost!', 'color': 'Red'};
    }else if(useerResult === 1){
        return {'message': 'You won!', 'color': 'Green'};
    }else{
        return {'message': 'Tie!', 'color': 'Yellow'};
    }
}

function rpsDomManipulate(userChoice, botChoice, finalMessage){
    // store the values of the images sources to use them in the later code ...
    var imagesDatabase = {
       'rock': document.getElementById('rock').src,
       'paper': document.getElementById('paper').src,
       'scissors': document.getElementById('scissors').src
    }

    // remove the image eleemnts form the dom...
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    // initlize the elemnts that will show up after the user made the selection...
    var userChoiceImageDivElement = document.createElement('div');
    var finalMessageDivElement = document.createElement('div');
    var botChoiceDivElement = document.createElement('div');

    // make changes to the added elemnts ... 
    userChoiceImageDivElement.innerHTML = "<img src='" + imagesDatabase[userChoice] + "' style='width: 150px; height: 150px; box-shadow: 0px 10px 55px blue;'>"
    finalMessageDivElement.innerHTML = "<h2 style='size=66px; color:" + finalMessage.color + ";'>" + finalMessage.message + "</h2>"  
    botChoiceDivElement.innerHTML = "<img src='" + imagesDatabase[botChoice] + "' style='width: 150px; height: 150px; box-shadow: 0px 10px 55px yellow;'>"

    // append the new elements into the flex contaoner div...
    document.getElementById("flex-images").appendChild(userChoiceImageDivElement);
    document.getElementById("flex-images").appendChild(finalMessageDivElement);
    document.getElementById("flex-images").appendChild(botChoiceDivElement);

}


// challenge 4: change the colors of all the buttons 

// first: select all the elements in the dom that have with a button tag
var allButtonsList = document.getElementsByTagName('button');

// sesond: save the orginal color class of all the colors, to use them later in the rest function
var buttonsOrginalColorsList =  new Array();
for (let i = 0; i< allButtonsList.length; i++){
    buttonsOrginalColorsList.push(allButtonsList[i].classList[1]);
}

// third: write down the main fucntion the will be triggred whne the user make a selection
function changeBackGroundColors(option){
    // handle all the user selections by calling the right function depending on the selected color.
        switch(option.value){
        case 'red': changeToRed();
        break;

        case 'green': changeToGreen();
        break;

        case 'random': changeToRandom();
        break;

        case 'reset': restColors();
        break;

        default: break;
    }
}

// fourth: implemnt the functions that are going to  change the colors of the buttins based on the user selection

// change the buttons colors to red function.
function changeToRed(){
    for (let i = 0; i<allButtonsList.length; i++){
        allButtonsList[i].classList.remove(allButtonsList[i].classList[1]);
        allButtonsList[i].classList.add('btn-danger');
    }
}

// change the buttons colors to green function
function changeToGreen(){
    for (let i = 0; i<allButtonsList.length; i++){
        allButtonsList[i].classList.remove(allButtonsList[i].classList[1]);
        allButtonsList[i].classList.add('btn-success');
    }
}

// change the buttons color to random colors function.
function changeToRandom(){
    
    let colorsOptions = ['btn-success', 'btn-danger', 'btn-primary', 'btn-warning'];

    for (let i = 0; i<allButtonsList.length; i++){
        let randomColorNumber = Math.floor(Math.random()*4);
        allButtonsList[i].classList.remove(allButtonsList[i].classList[1]);
        allButtonsList[i].classList.add(colorsOptions[randomColorNumber]);
    }
}

// rest the buttons to it's orginal colors function
function restColors(){
    for (let i = 0; i<allButtonsList.length; i++){
        allButtonsList[i].classList.remove(allButtonsList[i].classList[1]);
        allButtonsList[i].classList.add(buttonsOrginalColorsList[i]);
    }
}

