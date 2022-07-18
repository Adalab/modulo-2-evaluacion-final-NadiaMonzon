'use strict';

const inputFilter = document.querySelector('.js_input');
const searchBtn = document.querySelector('.js_search-btn');
const resetBtn = document.querySelector('.js_reset-btn');

const searchResult = document.querySelector('.js_result');
const favList = document.querySelector('.js_fav')

let animes = [];
let favAnimes = [];

const handleSearch = () =>{
    const inputValue = inputFilter.value.toLowerCase();
    const animesFiltered = animes.filter((anime) =>
    anime.title.toLowerCase().includes(inputValue));
    renderAnimes(animesFiltered)
    console.log(animesFiltered);
}

inputFilter.addEventListener('keyup', handleSearch)


function renderAnimes (array){
    let animeHTML = ''
    let favClass = ''
    const brokenImg = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
    const newImg = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
    for (const oneAnime of array) {
        const favAnimeFoundIndex = favAnimes.findIndex ((fav) => oneAnime.mal_id === fav.mal_id)
        if (favAnimeFoundIndex !== -1){
            favClass = 'anime-fav'
        }
        else {
            favClass =''
        }
        animeHTML += `<li class="anime js_anime ${favClass}" id="${oneAnime.mal_id}">`
        animeHTML += `<h2 class="anime__title">${oneAnime.title}</h2>`
        
        if(oneAnime.images.jpg.image_url === brokenImg){
            oneAnime.images.jpg.image_url = newImg
        }
        animeHTML +=`<img src="${oneAnime.images.jpg.image_url}" alt="Cover of ${oneAnime.title} "> </li>`

        
    }
    searchResult.innerHTML = animeHTML; 
    listenerAnimes();
}

function listenerAnimes () {
    const animesList = document.querySelectorAll('.js_anime')
    for (const itemList of animesList) {
        itemList.addEventListener('click', handleClick)

       
    }
}

function callApiData () {
    fetch (`https://api.jikan.moe/v4/anime?q=`)
        .then((response) => response.json ())
        .then ((favAnimes) =>{
            animes = favAnimes.data;
            renderAnimes(animes);

        }
        )
    }
    callApiData();

function handleClick (ev) {
    ev.preventDefault();
    const animeID = parseInt(ev.currentTarget.id)
    const animeFound = animes.find((anime) => anime.mal_id === animeID)
    const favAnimeFound = favAnimes.findIndex((fav) => fav.mal_id === animeID)

    if (favAnimeFound === -1){
        favAnimes.push(animeFound)
    }
    else{
        favAnimes.splice(favAnimeFound, 1)
    }
    renderAnimes(favAnimes)
    console.log(favAnimes);
   // callApiData();

}


