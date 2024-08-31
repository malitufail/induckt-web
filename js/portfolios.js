var apiUrl = "http://localhost:5000"
$(document).ready(function () {
  fetchPortfolios();
});

function fetchPortfolios() {

  $.ajax({
    url: `${apiUrl}/api/portfolios`, // Replace with your actual API URL
    type: 'GET',
    success: function (response) {
      let carouselList = $('.portfoliosList'); // Assuming this is the container for carousel items
      carouselList.empty();
      response.reverse();

      let itemsPerCarousel = 3; // Number of cards per carousel item
      let itemCount = 0; // Counter for items in the current carousel
      let carouselItem = $('<div class="carousel-item"><div class="card-group"></div></div>'); // Initialize a new carousel item

      for (var i = 0; i < response.length; i++) {
        // Create the card content dynamically
        let cardContent = `
          <div class="card card-slider">
            <div class="row no-gutters">
              <div class="col-md-6">
                <img src="${!!response[i].icon ? apiUrl + response[i].icon : './images/s1.png'}" class="card-img-top" alt="...">
              </div>
              <div class="col-md-6" style="padding-left: 3%;">
                <h5 class="card-slider-text">${response[i].startupType}</h5>
                <h2 class="card-slider-description">${response[i].startupName}</h2>
                <a hef="${response[i].url}" target="_blank"><img class="north-east-icon" loading="lazy" alt="" src="./images/icons/north-east.svg" /></a>
              </div>
            </div>
          </div>`;

        // Add the card content to the current carousel item
        carouselItem.find('.card-group').append(cardContent);
        itemCount++;

        // If 3 items have been added, append the carousel item to the list and reset
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
      $('.carousel-inner .carousel-item:first').addClass('active');
    }
  });
}