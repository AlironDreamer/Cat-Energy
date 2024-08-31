const range = document.querySelector('#slider');
const togglerMarker = document.querySelector('#toggler-marker');
const beforeContainer = document.querySelector('#before-container');
const afterContainer = document.querySelector('#after-container');
const beforeBtn = document.querySelector('#before-button');
const afterBtn = document.querySelector('#after-button');

range.addEventListener('input',
  function() {
    beforeContainer.style.clipPath = "polygon(100% 0%, 100% 100%, " + (0 + this.value) +"% 100%, " + (0 + this.value) +"% 0%)";
    afterContainer.style.width = this.value + "%";
  }, false);

beforeBtn.addEventListener('click',
  function() {
    beforeContainer.style.clipPath = "polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)";
    afterContainer.style.width = "0%";
    togglerMarker.style.left = "6px"
    togglerMarker.style.right = "50%";
    range.value = 0;
  }, false);

afterBtn.addEventListener('click',
  function() {
    beforeContainer.style.clipPath = "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)";
    afterContainer.style.width = "100%";
    togglerMarker.style.right = "6px";
    togglerMarker.style.left = "50%";
    range.value = 100;
  }, false)
