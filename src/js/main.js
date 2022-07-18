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


