const doc = document;
const numOfMoviesPerPage = doc.querySelector('#numOfMoviesPerPage');
const pageList = doc.querySelector('.page-list')
const parentElementFilms = '.films'

const token = 'EAGCSKQ-760M1MQ-H731SRK-16C0C1C';

const baseUrl = 'https://api.kinopoisk.dev';
const headers = { "accept": "application/json" }

const resourses = {
  health: '/v1/health',
  movies: {
    movie: '/v1.3/movie?page=1&limit=10'
  }
}



// getMovies().then(data => {
//   renderMovies(data.docs, parentElementFilms);
//   renderPagination(10, pageList);
// });

numOfMoviesPerPage.onchange = (e) => {
  const parEl = doc.querySelector(parentElementFilms);
  const numPPage = e.target.value;

  resourses.movies.movie = getNewFilms(1, numPPage);

  parEl.innerHTML = ' ';
  pageList.innerHTML = ''

  getMovies().then(data => {
    renderMovies(data.docs, parentElementFilms)
    renderPagination(numPPage, pageList)
  });

}
function getNewFilms(page, limit){
  return `/v1.3/movie?page=${page}&limit=${limit}`
}
function renderPagination(numOfMoviesPerPage, parentElement) {
  const numMPPV = numOfMoviesPerPage;
  const pagesNum = 100 / numMPPV;
  const parEl = parentElement;

  for (let i = 1; i <= pagesNum; i++) {
    const page = document.createElement('li');
    page.className = 'page';
    if (i === 1) page.classList.add('active');
    page.id = i;
    page.innerText = i.toString();
    parEl.appendChild(page);

    page.onclick = (e) => {
      const clickedPage = e.target;

      const allPages = parEl.querySelectorAll('.page');
      allPages.forEach((p) => p.classList.remove('active'));

      clickedPage.classList.add('active');

      resourses.movies.movie = getNewFilms(Number(page.innerText), numOfMoviesPerPage);

      const parElFilms = doc.querySelector(parentElementFilms);
      parElFilms.innerHTML = ' ';
      getMovies().then(data => {
        renderMovies(data.docs, parentElementFilms);
      });
    };
  }
}

function renderMovies(filmArr, parentElementSelector) {
  filmArr.forEach(film => renderMovie(film, parentElementSelector));
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
      if (rating[key] == null) continue;
      html += `
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
    console.warn(e);
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
