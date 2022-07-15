'use strict';

const input = document.querySelector('.js_input');
const searchBtn = document.querySelector('.js_search-btn');
const resetBtn = document.querySelector('.js_reset-btn');

const searchResult = document.querySelector('.js_result');

let arrayAnimes = [];
let favAnimes = [];

const inputValue = input.value.toLowerCase(); 

function renderAnimes (){
    let animeHTML = ''
    let favAnimeHTML = ''
    for (const oneAnime of arrayAnimes) {
        animeHTML += `<li class="anime js_anime"> <h2 class="anime__title">${oneAnime.title}</h2><img src="${oneAnime.images.jpg.image_url}" alt="Cover of ${oneAnime.title} "> </li>`

        searchResult.innerHTML = animeHTML;
    }
    
}

 function filterAnimes(){
    //para filtrar los animes a través del botón de buscar
    const filteredAnime = arrayAnimes.filter((oneAnime) => oneAnime.title.toLowerCase().includes(inputValue));
     renderAnimes(filteredAnime);
 }


function handleClick (ev) {
    ev.preventDefault();
    filterAnimes();
    console.log(arrayAnimes)
  
}

function callApiData () {
    fetch (`https://api.jikan.moe/v4/anime?q=${inputValue}`)
        .then((response) => response.json ())
        .then ((favAnimes) =>{
            arrayAnimes = favAnimes.data;
            renderAnimes();
        }
        )
    }
 callApiData();

searchBtn.addEventListener('click', handleClick);

