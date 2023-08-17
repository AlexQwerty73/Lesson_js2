
Array.prototype.myForeach = myForeach
Array.prototype.myMap = myMap
Array.prototype.myFilter = myFilter
Array.prototype.myFind = myFind


function myForeach(f) {
  for (let i = 0; i < this.length; i++) {
    f(this[i], i);
  }
}
function myMap(f) {
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(f(this[i]));
  }
  return newArr;
}
function myFilter(f) {
  const filterArr = [];

  for (let i = 0; i < this.length; i++) {
    if (f(this[i], i)) {
      filterArr.push(this[i]);
    }
  }

  return filterArr;
}
function myFind(f) {
  for (let i = 0; i < this.length; i++) {
    if (f(this[i], i)) {
      return this[i];
    }
  }

  return undefined;
}