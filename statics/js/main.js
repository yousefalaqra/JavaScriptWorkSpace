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


// Challenge 5: Blackjack ... Let's play!!

// step 1: intilize the game varibles, const, objects, sounds, and event listners that will be used later on..

let blackjackGame = {
    'player': {'name':'player' ,'div': '#player-cards-area', 'score':0, 'busted': false},
    'dealer': {'name':'dealer' ,'div': '#dealer-cards-area', 'score':0, 'busted': false},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'],
    'cardsValues': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'j': 10, 'q': 10, 'k': 10, 'a': [1, 10] },
    'gameStatus': {'status': 0}, // status will detrmine the game result as the following: 0: draw, 1: player wins,  2: delaer lose
    'gmaeResults': {'wins': 0, 'losses': 0, 'draws': 0},
};

const player = blackjackGame['player'];
const dealer = blackjackGame['dealer'];
const gameStatus = blackjackGame['gameStatus'];
const gmaeResults = blackjackGame['gmaeResults']

let hitCardSoundTrack = new Audio('statics/sounds/hit.mp3');
let bustedSoundTrack = new Audio('statics/sounds/busted.mp3');
let lossSoundTrack = new Audio('statics/sounds/loss.mp3');
let windSoundTrack = new Audio('statics/sounds/win.mp3');

document.querySelector('#hit').addEventListener("click", onHitClicked);
document.querySelector('#stand').addEventListener("click", onStandClicked);
document.querySelector('#deal').addEventListener('click', onDealClicked);

let playerTurn = true;
let dealerTurn = false;


// step 2: implemnttion of the event listenrs functions


// onHitClicked(): the function will be resbonsible for handling the cases when the player clicks on 'Hit'
function onHitClicked(){
    if(playerTurn){
        // case one: when the player clicks hit a random card must be thrown
        let card = throwCard(player);
    
        // case two: after the card has been thrown, the vlaue of the card must be added to the score result in the player area
        // ie: if the the card is equal to 7 the socre reuslt must be incrmented with 7.
        incrementCardValue(card, player);
    
        // case three: update the socre board for the player with the incremented score value.
        updateScore(player);
    
        // case four: invert the value of the hitClicked to be true, so the player can click Stand
        dealerTurn = true;
    }
}

// onStandClicked(): handle the cases when the player clicks Stand button 
function onStandClicked(){
    debugger;
    if(dealerTurn){  
        // case 1 invert the value of playerTurn to be false, so the player won't be able to click on Hit again 
        playerTurn = false;
        // case 2: when the player clicks stand that means he finished his turn, next will be the dealr turn..
        launchDealer();
    
        // case 3: when the dealer finished his turn, a winner must be choosen.. you or the dealr?!
        decideWinner();
    
        // case 4: when the result of the game has been decalred, it must be displayed in the dom!
        displayResult();
    
        // case 5 : the table results, must display the accumulated results of the all the player games.
        displayAccumulatedPlayerGameResults();
    }
}

// onDealClicked(): handle the cases when the player clicks Deal
function onDealClicked(){
    // case 1: when the player clicks deal, the scores of each competitors have to be reseted to 0
    resetCompetitorsScores();
    
    // case 2: also, the game status baord has to be rested to 'Let's play!'
    resetGameStatus();

    // case 3: finaly, remove all the playing cards from the dom
    removePlayingCards();
}

// resetCompetitorsScores(): rest the socre result elemnts  in the competitors areas to be 0 again. 
function resetCompetitorsScores(){

    blackjackGame['player']['score'] = 0;
    blackjackGame['dealer']['score'] = 0;
    blackjackGame['player']['busted'] = false;
    blackjackGame['dealer']['busted'] = false;

    playerTurn = true;
    dealerTurn = false;

    var playerSocreTextElement = document.querySelector('#player-score-text');
    var dealerSocreTextElemnt = document.querySelector('#dealer-score-text');

    var playerSocreElement = document.querySelector('#player-score');
    var dealerSocreElemnt = document.querySelector('#dealer-score');
    
    playerSocreTextElement.innerHTML = 'You:';
    dealerSocreTextElemnt.innerHTML = 'Delaer:';

    playerSocreTextElement.style.color = "#ffff";
    dealerSocreTextElemnt.style.color = "#ffff";

    playerSocreElement.innerHTML = '0';
    dealerSocreElemnt.innerHTML = '0';
}

// resetGameStatus(): rest the game status board to be "Let's play!".
function resetGameStatus(){
    var gameResultEelemnt = document.querySelector('#game-status');
    gameResultEelemnt.innerHTML = "Let's play!";
    gameResultEelemnt.style.color = "black";
}

// removePlayingCards
function removePlayingCards(){
    document.querySelector('#player-cards-area').innerHTML="";
    document.querySelector('#dealer-cards-area').innerHTML="";
}

// displayAccumulatedPlayerGameResults(): will update the table values with player reuslts
function displayAccumulatedPlayerGameResults(){
    var winsElement = document.querySelector('#wins');
    var lossesElement = document.querySelector('#losses');
    var drawsElement = document.querySelector('#draws');

    winsElement.innerHTML = gmaeResults['wins'].toString();
    lossesElement.innerHTML = gmaeResults['losses'].toString();
    drawsElement.innerHTML = gmaeResults['draws'].toString();
}

// launchDealer(): handle the dealr turn by thrown cards autmaticly.
function launchDealer(){
    while(dealer['score'] <= 15){
        card = throwCard(dealer);
        incrementCardValue(card, dealer);
        updateScore(dealer);
    }
}

// decideWinner(): detrmine the winner based on the socres of each competitor
function decideWinner(){
    // wwins cases:
    // 1) competitor(delaer or player) score is grater than the other competitor score and the the competitor not busted(score < 21) => competitor wins
    // 2) competitor not busted and the other competitor is busted => competitor wins.

    // draw cases: 
    // 1) both competitors having the same socre,
    // 2) both competitors are busted.

    // player wins...
    debugger;
    if(player['score'] > dealer['score'] && !player['busted']){
        blackjackGame['gameStatus']['status'] = 1;
        gmaeResults['wins']++;
    }else if(!player['busted'] && dealer['busted']){
        blackjackGame['gameStatus']['status'] = 1;
        gmaeResults['wins']++;
    }// player lose...
    else if(dealer['score'] > player['score'] && !dealer['busted']){
        blackjackGame['gameStatus']['status'] = 2;
        gmaeResults['losses']++;
    }else if(!dealer['busted'] && player['busted']){
        blackjackGame['gameStatus']['status'] = 2;
        gmaeResults['losses']++;
    }// draw...
    else if(dealer['score'] === player['score']){
        blackjackGame['gameStatus']['status'] = 0;
        gmaeResults['draws']++;
    }else if(dealer['busted'] && dealer['busted']){
        blackjackGame['gameStatus']['status'] = 0;
        gmaeResults['draws']++;
    }

    // stop the dealer
    dealerTurn = false;
}

// displayResult(): access to the game reslt elemnt in the dom and change it's value corrsbonding to the game status
function displayResult(){
    debugger
    let gameResultEelemnt = document.querySelector('#game-status');
    let gameStauts = gameStatus['status'];

    switch(gameStauts){
        case 0:
            gameResultEelemnt.innerHTML = "Draw!";
            gameResultEelemnt.style.color = "yellow";
            break;

        case 1:
            gameResultEelemnt.innerHTML = "You won!";
            gameResultEelemnt.style.color = "green";
            windSoundTrack.play();
            break;

        case 2: 
            gameResultEelemnt.innerHTML = "You lost!";
            gameResultEelemnt.style.color = "red";
            lossSoundTrack.play();
            break;

        default:
            break;        
    }
}

// throwCard(competitor): pick random card and show it in the playing area, either for player or the dealer.
function throwCard(competitor){
    // pcik random card...
    let randomCard = pickRandomImage();

    // insert the card into the dom
    addImageIntoPlayignArea(competitor, randomCard);
    
    // play the hit card sound.
    hitCardSoundTrack.play();

    return randomCard;
}

// pickRandomImage(): functon that retruns  an image from BlackjackGame based on random random
function pickRandomImage(){
    let randomNumber = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomNumber];
}

// addImageIntoPlayignArea(): function adds a playing card into eaither the player or dealr area. 
function addImageIntoPlayignArea(competitor,card){
    var competitorDiv = document.querySelector(competitor['div']);
    var competitorImg = document.createElement('img'); 
    competitorImg.src = `statics/images/${card}.png`;
    competitorImg.width = 150;
    competitorImg.height = 150;
    competitorDiv.appendChild(competitorImg);
}

// incrementCardValue(card): incremnt either the player or dealer score based on card value.
function incrementCardValue(card, competitor){
    let cardValue;
    if(card === 'a'){
        if(competitor['score'] === 20){
            cardValue = blackjackGame['cardsValues'][card][0];
        }else{
            cardValue = blackjackGame['cardsValues'][card][1]; 
        }
    }else{
        cardValue = blackjackGame['cardsValues'][card];
    }
    blackjackGame[competitor.name]['score'] += cardValue;
}

function updateScore(competitor){
    // select the competitor ssocre elemnt fromt the dom.
    // todo: update the function to update the value of busted in case if the socre is more than 21.
    if(competitor ===  player){
        if(player['score'] >= 21){
            bustedSoundTrack.play();
            var playerSocreText = document.querySelector('#player-score-text');
            player['busted'] = true;
            playerSocreText.innerHTML = 'Busted!';
            playerSocreText.style.color = 'red'; 
        }else {
            var scoreValueElement = document.querySelector('#player-score');
            scoreValueElement.innerHTML = player['score'].toString(); 
        }
            
    }else{
        if(dealer['score'] >= 21){
            // bustedSoundTrack.play();
            var dealerSocreText = document.querySelector('#dealer-score-text');
            dealer['busted'] = true;
            dealerSocreText.innerHTML = 'Busted!';
            dealerSocreText.style.color = 'red'; 
        }else{
            var scoreElement = document.querySelector('#dealer-score');
            scoreElement.textContent =  dealer['score'].toString(); 
        }
    }
}