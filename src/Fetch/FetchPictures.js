const BASE_URL = 'https://pixabay.com/api';
const MY_KEY = '36047309-6afabc13df76b1d6d60efac24';

function fetchPictures(name, pageNumber) {

    const searchName = name.replace(" ", "+");
   
    return fetch(`${BASE_URL}/?key=${MY_KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${pageNumber}`)
        .then(response => {
            return response.json();
        }
  );
}

export default fetchPictures;