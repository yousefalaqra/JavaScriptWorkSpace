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