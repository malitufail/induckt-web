document.addEventListener('DOMContentLoaded', function() {
  var btnItems = document.querySelector('.btn-items');
  var cont = document.querySelector('.menu-container');
  var overlay = document.querySelector('#overlay');
  var menuIcon = document.querySelector('.btn-items svg');
  var menuIconOpen = '<path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>';
  var menuIconClosed = '<path d="M242.7 256l100.1-100.1c12.3-12.3 12.3-32.2 0-44.5l-22.2-22.2c-12.3-12.3-32.2-12.3-44.5 0L176 189.3 75.9 89.2c-12.3-12.3-32.2-12.3-44.5 0L9.2 111.5c-12.3 12.3-12.3 32.2 0 44.5L109.3 256 9.2 356.1c-12.3 12.3-12.3 32.2 0 44.5l22.2 22.2c12.3 12.3 32.2 12.3 44.5 0L176 322.7l100.1 100.1c12.3 12.3 32.2 12.3 44.5 0l22.2-22.2c12.3-12.3 12.3-32.2 0-44.5L242.7 256z" fill="white"/>';

  // Hide menu items by default
  cont.classList.add('close');

  btnItems.addEventListener('click', function(){
    if (cont.classList.contains('close')) {
      cont.classList.remove('close'); // Remove close class to open the menu
      overlay.classList.add('cl'); // Add cl class to the overlay
      menuIcon.innerHTML = menuIconClosed; // Change icon to X icon
    } else {
      cont.classList.add('close'); // Add close class to close the menu
      overlay.classList.remove('cl'); // Remove cl class from the overlay
      menuIcon.innerHTML = menuIconOpen; // Change icon to menu icon
    }
  });

  overlay.addEventListener('click', function(){
    cont.classList.add('close'); // Add the close class to the menu container
    overlay.classList.remove('cl'); // Remove the cl class from the overlay
    menuIcon.innerHTML = menuIconOpen; // Change icon to menu icon
  });
});
