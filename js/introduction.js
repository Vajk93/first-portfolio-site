let hello = document.getElementById("hello");
let myNameIs = document.getElementById("myNameIs");
let iAm = document.getElementById("iAm");

let helloText = "Hello,";
let myNameIsText = "My name is Vajk";
let iAmText = "I'm a frontend webdeveloper";

//let myArray = ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"];
let helloIndex = 0;
let myNameIndex = 0;
let iAmIndex = 0;

function writeFn(element, index, text) {
  let myArr = [...text];
  let interval = setInterval(() => {
    element.innerHTML += myArr[index];
    if (index < myArr.length - 1) {
      index++;
    } else {
      clearInterval(interval);
    }
  }, 100);
}

writeFn(hello, helloIndex, helloText);

setTimeout(function () {
  writeFn(myNameIs, myNameIndex, myNameIsText);
}, 1700);

setTimeout(function () {
  writeFn(iAm, iAmIndex, iAmText);
}, 3500);
