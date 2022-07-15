'use strict';

const input = document.querySelector('.js_input');
const searchBtn = document.querySelector('.js_search-btn');
const resetBtn = document.querySelector('.js_reset-btn');

const searchResult = document.querySelector('.js_result');

let arrayAnimes = [];
let favAnimes = [];

const inputValue = input.value; 

function renderAnimes (){
    let animeHTML = ''
    let favAnimeHTML = ''
    for (const oneAnime of arrayAnimes) {
        animeHTML += `<li class="anime js_anime"> <h2 class="anime__title">${oneAnime.title}</h2><img src="${oneAnime.images.jpg.image_url}" alt="Cover of ${oneAnime.title} "> </li>`

        searchResult.innerHTML = animeHTML;
        console.log(animeHTML);
    }
    
}


function handleClick (ev) {
    ev.preventDefault();
    

}


fetch (`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json ())
    .then ((favAnimes) =>{
        arrayAnimes = favAnimes.data;
        renderAnimes();
    })


searchBtn.addEventListener('click', handleClick);

