import axios from 'axios';

export async function searchPhrase(text, pageIndex) {
  const searchParams = new URLSearchParams({
    key: '43605256-eead80bfe3e75f279f48bfba2',
    q: text,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: false,
    page: pageIndex,
    per_page: 20,
  });
  return await axios.get(`https://pixabay.com/api/?${searchParams}`);
}
