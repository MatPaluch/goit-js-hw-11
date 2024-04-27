const axios = require('axios').default;
import Notiflix from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
var lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});
const inputForm = document.querySelector('#search-form input');
const buttonForm = document.querySelector('#search-form button');
const searchForm = document.querySelector('#search-form');

async function searchPhrase(text) {
  const params = new URLSearchParams();
}

searchForm.addEventListener('submit', ev => {
  ev.preventDefault();

  const form = ev.target;
  const input = form.elements.searchQuery;

  searchPhrase(input.value)
    .then(result => {
      console.log(result);
    })
    .catch(error => console.log(error));

  console.log(input.value);
});
