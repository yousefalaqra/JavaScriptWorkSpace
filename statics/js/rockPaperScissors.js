
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