// challenge 2: Cat generator.
function genCat(){
    var img = document.createElement('img');
    img.src = 'http://thecatapi.com/api/images/get?format=src&type=gif&size=small';
    document.getElementById('flex-cat-gen').appendChild(img);
}