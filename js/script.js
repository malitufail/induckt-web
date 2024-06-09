var btnItems = document.querySelector('.btn-items');
var span1 = document.querySelector('span:nth-child(1)');
var span2 = document.querySelector('span:nth-child(2)');
var span3 = document.querySelector('span:nth-child(3)');
var cont = document.querySelector('.menu-container');
var overlay = document.querySelector('#overlay');
btnItems.addEventListener('click', function(){
  span1.classList.toggle('ch1');
  span2.classList.toggle('ch0');
  span3.classList.toggle('ch2');
  cont.classList.toggle('close');
  overlay.classList.toggle('cl');
});
overlay.addEventListener('click', function(){
  span1.classList.toggle('ch1');
  span2.classList.toggle('ch0');
  span3.classList.toggle('ch2');
  cont.classList.toggle('close');
  overlay.classList.toggle('cl');
});