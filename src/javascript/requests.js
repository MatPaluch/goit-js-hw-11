export async function searchPhrase(text) {
  const searchParams = new URLSearchParams({
    key: '43605256-eead80bfe3e75f279f48bfba2',
    q: text,
    image_type: 'photo',
  });

  return await fetch(`https://pixabay.com/api/?${searchParams}`);
}
