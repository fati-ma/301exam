'use strict';

var animeForm = document.getElementById('animeForm');
var animeTable = document.getElementById('animeTable');

var tHeader = ['Anime Title', 'Category', 'Random Season', 'Remove'];

//Array of objects
AnimeList.all = [];

//Constructor
function AnimeList(aTitle, aCategory) {
    this.title = aTitle; 
    this.category = aCategory;
    this.season = 0;

    AnimeList.all.push(this);

}

//Prototype to generate the season number
AnimeList.prototype.getSeason = function (min, max) {
    this.season = getRandomNumber(min, max);
}

//Function to generate random number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Event Listner to handle the ADD button in the form
animeForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {

    event.preventDefault();

    var list = event.target;
    var aTitle = list.title.value;
    var aCategory = list.category.value;

    var myList = new AnimeList(aTitle, aCategory);
    myList.getSeason(1, 7);
    sendListToLS();
    renderAnimeList();
}

//Create table header
function tableHeader() {
    var h3E = document.createElement('h3');
    h3E.textContent = 'My To-Watch Anime List';
    animeTable.appendChild(h3E);

    var trE1 = document.createElement('tr');
    for (var i = 0; i < tHeader.length; i++) {
        var thE1 = document.createElement('th');
        trE1.appendChild(thE1);
        thE1.textContent = tHeader[i];
        animeTable.appendChild(trE1);
    }

}

//Render Anime List on the webpage
function renderAnimeList() {

    //To empty the table 
    animeTable.innerHTML = '';

    tableHeader();

    //Create tds in the table so each one of them contain an information from the list
    for (var i = 0; i < AnimeList.all.length; i++) {
        var trE2 = document.createElement('tr');

        //title of anime
        var tdE1 = document.createElement('td');
        trE2.appendChild(tdE1);
        tdE1.textContent = AnimeList.all[i].title;

        //category of anime
        var tdE2 = document.createElement('td');
        trE2.appendChild(tdE2);
        tdE2.textContent = AnimeList.all[i].category;

        //season of anime
        var tdE3 = document.createElement('td');
        trE2.appendChild(tdE3);
        tdE3.textContent = AnimeList.all[i].season;

        //a remove button to delete an anime
        var removeBtn = document.createElement('button');
        removeBtn.setAttribute('id', AnimeList.all[i].title);
        removeBtn.textContent = 'X'
        trE2.appendChild(removeBtn);

        animeTable.appendChild(trE2);
    }
}

var table = document.getElementById('animeTable');
table.addEventListener('click', removeList);

function removeList(event) {

    event.preventDefault();

    var index;

    if (event.target.id !== 'animeTable') {
        for (var i = 0; i < AnimeList.all.length; i++) {
            if (event.target.id === AnimeList.all[i].title) {
                index = i;
                AnimeList.all.splice(index, 1);
            }
        }
        sendListToLS();
        getListFromLS();
    }

}

//send the array of objects to the local storage
function sendListToLS() {
    localStorage.setItem('animeList', JSON.stringify(AnimeList.all));
}

// get the array of objects from the local storahe and render it on the web page
function getListFromLS() {
    AnimeList.all = JSON.parse(localStorage.getItem('animeList')) || [];
    renderAnimeList();
}
getListFromLS();