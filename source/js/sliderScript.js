var range = document.querySelector('#slider');
var togglerMarker = document.querySelector('#toggler-marker');
var beforeContainer = document.querySelector('#before-container');
var afterContainer = document.querySelector('#after-container');
var beforeBtn = document.querySelector('#before-button');
var afterBtn = document.querySelector('#after-button');

range.addEventListener('input',
  function() {
    afterContainer.style.width = this.value + "%";
  }, false);

beforeBtn.addEventListener('click',
  function() {
    afterContainer.style.width = "0%";
    togglerMarker.style.left = "6px"
    range.value = 1;
  }, false);

afterBtn.addEventListener('click',
  function() {
    afterContainer.style.width = "100%";
    togglerMarker.style.left = "44px"
    range.value = 100;
  }, false)
