
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