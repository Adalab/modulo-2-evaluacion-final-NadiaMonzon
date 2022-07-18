'use strict';

const input = document.querySelector('.js_input');
const searchBtn = document.querySelector('.js_search-btn');
const resetBtn = document.querySelector('.js_reset-btn');

const searchResult = document.querySelector('.js_result');

const inputValue = input.value.toLowerCase(); 

let arrayAnimes = [];
let favAnimes = [];

function renderAnimes (){
    let animeHTML = ''
    let favAnimeHTML = ''
    for (const oneAnime of arrayAnimes) {
        animeHTML += `<li class="anime js_anime" id="${oneAnime.mal_id}">`
        animeHTML += `<h2 class="anime__title">${oneAnime.title}</h2>`
        const brokenImg = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
        if(oneAnime.images.jpg.image_url === brokenImg){
            oneAnime.images.jpg.image_url = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
        }
        animeHTML +=`<img src="${oneAnime.images.jpg.image_url}" alt="Cover of ${oneAnime.title} "> </li>`

        
    }
    searchResult.innerHTML = animeHTML;
}

function listenerAnimes () {
    const animesList = document.querySelectorAll('.js_anime')
    for (const itemList of animesList) {
        itemList.addEventListener('click', handleClick)

       
    }
}

function callApiData () {
    fetch (`https://api.jikan.moe/v4/anime?q=${inputValue}`)
        .then((response) => response.json ())
        .then ((favAnimes) =>{
            arrayAnimes = favAnimes.data;
            renderAnimes();
            listenerAnimes();
        }
        )
    }
    callApiData();

function handleClick (ev) {
    ev.preventDefault();
    const animeID = parseInt(ev.currentTarget.id)
    const animeFound = arrayAnimes.find((anime) => anime.mal_id === animeID)
    favAnimes.push(animeFound)

    console.log(favAnimes);
   // callApiData();

}

// searchBtn.addEventListener('click', handleClick);
