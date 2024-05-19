var range = document.querySelector('#slider');
var togglerMarker = document.querySelector('#toggler-marker');
var beforeContainer = document.querySelector('#before-container');
var afterContainer = document.querySelector('#after-container');
var beforeBtn = document.querySelector('#before-button');
var afterBtn = document.querySelector('#after-button');

range.addEventListener('input',
  function() {
    beforeContainer.style.clipPath = "polygon(0% 0%, 0% 100%, " + (100-this.value) +"% 100%, " + (100-this.value) +"% 0%)";
    afterContainer.style.width = this.value + "%";
  }, false);

beforeBtn.addEventListener('click',
  function() {
    beforeContainer.style.clipPath = "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)";
    afterContainer.style.width = "0%";
    togglerMarker.style.left = "6px"
    togglerMarker.style.right = "50%";
    range.value = 1;
  }, false);

afterBtn.addEventListener('click',
  function() {
    beforeContainer.style.clipPath = "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)";
    afterContainer.style.width = "100%";
    togglerMarker.style.right = "6px";
    togglerMarker.style.left = "50%";
    range.value = 100;
  }, false)
