const headers = new Headers({
  'Content-Type': 'application/json',
  'x-api-key': '43605256-eead80bfe3e75f279f48bfba2',
});

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow',
};

export async function searchPhrase(text) {
  const searchParams = new URLSearchParams({
    key: '43605256-eead80bfe3e75f279f48bfba2',
    q: text,
    image_type: 'photo',
  });
  console.log(searchParams);

  return await fetch(
    `https://pixabay.com/api/?${searchParams}`,
    requestOptions
  );
}
