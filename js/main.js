const arr = [-2, 0, 3, 6, -24];
const arr1 = [
  {a: 1, b: 3},
  {a: 11, b: 34}
];
Array.prototype.myForeach = myForeach

arr.myForeach((item) => {
  console.log(item);
});

function myForeach(f) {
  for (let i = 0; i < this.length; i++) {
      f(this[i]);
  }
}