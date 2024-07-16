import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchPhrase } from './requests';

const inputForm = document.querySelector('#search-form input');
const searchForm = document.querySelector('#search-form');
const loadMore = document.querySelector('.load_more');

const gallery = document.querySelector('.gallery');
let page = 1;

var lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

function cardTemplate(obj) {
  return `<div class="photo-card">
              <a href="${obj.largeImageURL}"><img src="${obj.webformatURL}" alt="${obj.tags}" title="User: ${obj.user}" loading="lazy" /></a>
              <div class="info">
                <p class="info-item"><b>Likes</b><span>${obj.likes}</span></p>
                <p class="info-item"><b>Views</b><span>${obj.views}</span></p>
                <p class="info-item"><b>Comments</b><span>${obj.comments}</span></p>
                <p class="info-item"><b>Downloads</b><span>${obj.downloads}</span></p>
              </div>
            </div>`;
}

searchForm.addEventListener('submit', ev => {
  ev.preventDefault();

  const form = ev.target;
  const input = form.elements.searchQuery;

  if (input.value === '') {
    Notiflix.Notify.failure('Type some words in search box ;)');
  } else {
    searchPhrase(input.value)
      .then(response => response.data)
      .then(result => {
        const arrayOfHits = result.hits;
        if (arrayOfHits.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          Notiflix.Notify.success(
            `Hooray! We found ${result.totalHits} images in total.`
          );
          const arrayOfCards = arrayOfHits.map(arrObj => {
            return cardTemplate(arrObj);
          });
          gallery.innerHTML = arrayOfCards.join('');
          result.totalHits < 40
            ? loadMore.setAttribute('hidden', '')
            : loadMore.removeAttribute('hidden');
          page = 1;
        }
        lightbox.refresh();
      })
      .catch(error => {
        Notiflix.Report.failure(
          'Failure',
          '"We cant reach the server."<br/><br/>- Try again later',
          'Okay'
        );
        console.log(error);
      });
  }
});

loadMore.addEventListener('click', ev => {
  page++;
  if (inputForm.value === '') {
    Notiflix.Notify.failure('Type some words in search box ;)');
  } else {
    searchPhrase(inputForm.value, page)
      .then(response => response.data)
      .then(result => {
        const arrayOfHits = result.hits;

        if (arrayOfHits.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          if (Math.ceil(result.totalHits / 40) === page) {
            Notiflix.Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
            loadMore.setAttribute('hidden', '');
          } else {
            Notiflix.Notify.success(
              `Hooray! We found ${result.totalHits} images in total.`
            );
          }

          arrayOfHits.map(arrObj => {
            gallery.innerHTML += cardTemplate(arrObj);
          });
        }
        lightbox.refresh();
      })
      .catch(error => {
        Notiflix.Report.failure(
          'Failure',
          '"We cant reach the server."<br/><br/>- Try again later',
          'Okay'
        );
        console.log(error);
      });
  }
});
