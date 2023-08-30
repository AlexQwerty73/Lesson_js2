// location.href = `http://127.0.0.1:5500/?sort=desc&filter=nocomplited`

const todos = [
  { id: 2, body: 'todo2', completed: false },
  { id: 6, body: 'todo6', completed: true },
  { id: 4, body: 'todo4', completed: false },
  { id: 3, body: 'todo3', completed: true },
  { id: 5, body: 'todo5', completed: false },
  { id: 1, body: 'todo1', completed: true },
];
const doc = document;
const todosParEl = doc.querySelector('.todos');
const checkBoxComplited = doc.querySelector('.complited');
const checkBoxIdOrder = doc.querySelector('.idOrder');
const resBtn = doc.querySelector('#res-btn');

const sortByIdasc = [...todos].sort((a, b) => a.id - b.id);
const sortByIddesc = [...todos].sort((a, b) => b.id - a.id);

const params = getSearchParams();

renderTodos(todosParEl, getNewData());


checkBoxIdOrder.checked = location.href.includes('sort=desc');
checkBoxComplited.checked = location.href.includes('filter=complited');

resBtn.onclick = () => {
  const locH = location.href;
  const index = locH.indexOf('?');
  console.log(index); 
  
  location.href = locH.substring(0, index);
}

checkBoxIdOrder.onchange = (e) => {
  let url = new URL(location.href);

  if (!url.searchParams.has('sort')) {
    url.searchParams.set('sort', 'asc');
  } else {
    let currentSort = url.searchParams.get('sort');
    url.searchParams.set('sort', currentSort === 'asc' ? 'desc' : 'asc');
  }

  location.href = url.toString();
};

checkBoxComplited.onchange = (e) => {
  let url = new URL(location.href);

  if (!url.searchParams.has('filter')) {
    url.searchParams.set('filter', 'complited');
  } else {
    let currentFilter = url.searchParams.get('filter');
    url.searchParams.set('filter', currentFilter === 'complited' ? 'nocomplited' : 'complited');
  }

  location.href = url.toString();
};

function getNewData() {
  let newData =
    params.sort
      ? params.sort == 'asc'
        ? sortByIdasc
        : params.sort == 'desc'
          ? sortByIddesc
          : todos
      : todos;

  newData =
    params.filter
      ? params.filter == 'complited'
        ? newData.filter(a => a.completed)
        : params.filter == 'nocomplited'
          ? newData.filter(a => !a.completed)
          : newData
      : newData;
  return newData;
}

function getSearchParams() {
  return Object.fromEntries(
    location.search
      .substring(1)
      .split('&')
      .map(item => item.split('=')));
}

function getTodosEls(data) {
  return data
    .map(todo => (
      `<li>
      <span>${todo.id}</span>
      <span>${todo.body}</span>
      <span>${todo.completed}</span>
    </li>`))
    .join('');
}

function renderTodos(parEl, data) {
  parEl.innerHTML = getTodosEls(data);
}