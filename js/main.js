
// WINDOW
// const myWindow = window.open(
//   'https://www.youtube.com/',
//   '_blank',
//   'popup=yes, width=300, height=300'
// );
// setTimeout(() => {
//   myWindow.close()
// }, 5000);

// HISTORY

const doc = document;
const btnBack = doc.querySelector('#btnBack');
const btnForward = doc.querySelector('#btnForward');

btnBack.onclick = () => history.back();
btnForward.onclick = () => history.forward()

