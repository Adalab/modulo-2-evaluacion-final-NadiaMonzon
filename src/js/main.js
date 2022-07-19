'use strict';

const inputFilter = document.querySelector('.js_input');
const searchBtn = document.querySelector('.js_search-btn');
const resetBtn = document.querySelector('.js_reset-btn');

const resultsList = document.querySelector('.js_result');
const favList = document.querySelector('.js_fav');
const animeItem = document.querySelector('.js_anime');

const brokenImg = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
const newImg = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'

let animes = [];
let favAnimes = [];

const callApiData = () => {
    const inputValue = inputFilter.value.toLowerCase();
    fetch (`https://api.jikan.moe/v4/anime?q=${inputValue}`)
        .then((response) => response.json ())
        .then ((data) =>{
            animes = data.data;
            console.log(animes);
            renderAnimes();
        })
}

function renderAnimes (){
    let animeHTML = ''
    let favClass = ''
    for (const oneAnime of animes) {
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
        animeHTML +=`<img class="anime__cover" src="${oneAnime.images.jpg.image_url}" alt="Cover of ${oneAnime.title} "> </li>`
    }
    resultsList.innerHTML = animeHTML
    listenerAnimes();
}

function renderFavAnimes (){
    let favAnimeHTML = ''

    for (const oneFavAnime of favAnimes) {
        favAnimeHTML += `<li class="anime js_anime" id="${oneFavAnime.mal_id}">`
        favAnimeHTML += `<h2 class="anime__title">${oneFavAnime.title}</h2>`
        favAnimeHTML += `<i class="fa-regular fa-circle-xmark fa-xl"></i>`
        if(oneFavAnime.images.jpg.image_url === brokenImg){
            oneFavAnime.images.jpg.image_url = newImg
        }
        favAnimeHTML +=`<img class="anime__cover" src="${oneFavAnime.images.jpg.image_url}" alt="Cover of ${oneFavAnime.title} "> </li> `
        
    }
    favList.innerHTML = favAnimeHTML
    listenerAnimes()
}


function listenerAnimes () {
    const animesList = document.querySelectorAll('.js_anime')
    for (const itemList of animesList) {
        itemList.addEventListener('click', handleClick)      
    }
}

function handleSearch(event) {
    event.preventDefault();
    if (inputFilter.value === '') {
        resultsList.innerHTML = '¡Recuerda escribir algo en el buscador!';
    } else {
        callApiData()
    }
  }

searchBtn.addEventListener('click', handleSearch)

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
    localStorage.setItem('data', JSON.stringify(favAnimes))
    renderFavAnimes();
    renderAnimes(); 
}

function resetData () {
    localStorage.removeItem('data')
}

resetBtn.addEventListener('click', resetData)

function onLoad () {
    const dataLS = JSON.parse(localStorage.getItem('data'))
    if (dataLS){
        favAnimes = dataLS;
        renderFavAnimes();
    }
    else{
        favList.innerHTML = ''
    }
}

onLoad ()
