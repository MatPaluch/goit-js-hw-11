export async function searchPhrase(text, pageIndex) {
  const searchParams = new URLSearchParams({
    key: '43605256-eead80bfe3e75f279f48bfba2',
    q: text,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: false,
    lang: 'pl,en',
    page: pageIndex,
    per_page: 40,
  });
  return await fetch(`https://pixabay.com/api/?${searchParams}`);
}
