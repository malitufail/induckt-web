var apiUrl = "http://localhost:5000"
$(document).ready(function () {
  fetchNews();
});

function fetchNews() {

  $.ajax({
    url: `${apiUrl}/api/news`,  // Replace with your actual API URL
    type: 'GET',
    success: function (response) {
      let carouselList = $('.newsList');  // Assuming this is the container for carousel items
      carouselList.empty();
      response.reverse();
  
      let itemsPerCarousel = 2; // Number of cards per carousel item
      let itemCount = 0;        // Counter for items in the current carousel
      let carouselItem = $('<div class="carousel-item"><div class="card-group"></div></div>'); // Initialize a new carousel item
  
      for (var i = 0; i < response.length; i++) {
        // Create the card content dynamically
        let cardContent = `
          <div class="card card-slider">
            <div class="row no-gutters">
              <div class="col-md-6 card-left-line">
                <p class="card-left-text">${response[i].headline}</p>
                <p class="card-left-text">${response[i].description}</p>
              </div>
              <div class="col-md-6">
                <img src="${apiUrl}${response[i].icon}" class="card-img-right" alt="...">
              </div>
            </div>
          </div>`;
  
        // Add the card content to the current carousel item
        carouselItem.find('.card-group').append(cardContent);
        itemCount++;
  
        // If 2 items have been added, append the carousel item to the list and reset
        if (itemCount === itemsPerCarousel) {
          carouselList.append(carouselItem);
          itemCount = 0;
          carouselItem = $('<div class="carousel-item"><div class="card-group"></div></div>'); // Start a new carousel item
        }
      }
  
      // Append any remaining items if not filled to the carousel
      if (itemCount > 0) {
        carouselList.append(carouselItem);
      }
  
      // Add the 'active' class to the first carousel item
      $('.newsList .carousel-item:first').addClass('active');
    }
  });
  
}