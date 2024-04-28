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

const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', ev => {
  ev.preventDefault();

  const form = ev.target;
  const input = form.elements.searchQuery;

  searchPhrase(input.value)
    .then(response => response.json())
    .then(result => {
      const arrayOfHits = result.hits;
      arrayOfHits.map(obj => {
        gallery.innerHTML += `<div class="photo-card"><img src="${obj.webformatURL}" alt="${obj.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${obj.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${obj.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${obj.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${obj.downloads}</b>
    </p>
  </div>
</div>`;
      });
    })
    .catch(error => console.log(error));
});
