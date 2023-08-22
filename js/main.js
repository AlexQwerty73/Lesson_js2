const doc = document;
const token = 'EAGCSKQ-760M1MQ-H731SRK-16C0C1C';

const baseUrl = 'https://api.kinopoisk.dev';
const headers = { "accept": "application/json" }

const resourses = {
  health: '/v1/health',
  movies: {
    movie: '/v1.3/movie?page=2&limit=10'
  }
}

//  getMovies().then(data => renderMovie(data.docs[0], '.films'))
// getMovies().then(data => renderMovies(data.docs, '.films'));
function renderMovies(filmArr, parentElementSelector) {
  filmArr.forEach(film => {
    renderMovie(film, parentElementSelector)
  });
}

function renderMovie(filmObj, parentElementSelector) {
  const parEl = doc.querySelector(parentElementSelector);
  const film = doc.createElement('div');

  const {
    name,
    alternativeName,
    year,
    description,
    countries,
    rating,
    genres
  } = filmObj;

  const countriesHtml =
    countries
      .map(countrie => `<li class="film__country">${countrie.name}</li> `)
      .join('');

  const genresHtml =
    genres
      .map(genre => `<li class="film__genre">${genre.name}</li> `)
      .join('');

  function ratingHtml() {
    let html = '';
    for (let key in rating) {
      if(rating[key] == null) continue;
      html +=`
        <li class="film__rate">
          <span>${key}</span>
          <span>${rating[key]}</span>
        </li>
        `;
    }
    return html;
  }

  film.className = 'film';
  film.innerHTML = `
    <div class="film__front">
      <div class="film__header mb-2">
        <h3 class="film__name">${name}</h3>
        <p class="film__alt-name">${alternativeName}</p>
        <p class="film__year">${year}</p>
      </div>
    </div>

    <ul class="film__countries mb-2">
      ${countriesHtml}
    </ul>

    <ul class="film__genres mb-2">
      ${genresHtml}
    </ul>

    <div class="film__back mb-2">
      <h3 class="film__name">${name}</h3>
      <p class="film__description">${description}</p>
    </div>

    <ul class="film__rates">
      ${ratingHtml()}
    </ul>
  `;
  parEl.append(film);
}

async function getMovies() {
  const url = baseUrl + resourses.movies.movie;

  headers['X-API-KEY'] = token;

  try {
    const res = await fetch(url, { headers });
    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}

async function getHealth() {
  const url = baseUrl + resourses.health;
  try {
    const res = await fetch(url, { headers });
    const data = await res.json();

    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
