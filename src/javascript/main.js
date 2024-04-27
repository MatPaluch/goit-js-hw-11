const axios = require('axios').default;
import Notiflix from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
var lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});
import { searchPhrase } from './requests';

const inputForm = document.querySelector('#search-form input');
const buttonForm = document.querySelector('#search-form button');
const searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', ev => {
  ev.preventDefault();

  const form = ev.target;
  const input = form.elements.searchQuery;

  searchPhrase(input.value)
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(error => console.log(error));
});
