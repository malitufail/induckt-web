var apiUrl = "https://induckt-be.netlify.app/.netlify/functions"
var imageUrl = "https://induckt-be.netlify.app"
$(document).ready(function () {
  fetchTestimonials();
});

function fetchTestimonials() {

  $.ajax({
    url: `${apiUrl}/api/testimonials`,
    type: 'GET',
    success: function (response) {
      let partnersList = $('.testimonialsList');
      partnersList.empty();
      response.reverse();
  
      let itemsPerCarousel = 4; // Number of items per carousel
      let itemCount = 0;        // Counter for items in the current carousel
      let carouselItem = $('<div class="carousel-item"><div class="row"></div></div>'); // Initialize a new carousel item
  
      for (var i = 0; i < response.length; i++) {
        // Create the card content based on type
        let cardContent = '';
        if (response[i].type == "text") {
          cardContent = `
            <div class="col-md-3">
              <div class="card insta-card" style="border-radius: 8%; height: auto; text-align: left; background-color: #EECECB;">
                <img src="${imageUrl}${response[i].attachment}" class="card-img-top" alt="Post Image" style="width: 100%; height: 250px;">
                <div class="card-footer d-flex justify-content-between">
                  <div>
                    <h5><strong>${response[i].name}</strong></h5>
                    <p style="color: #000;"> ${response[i].description} </p>
                  </div>
                </div>
              </div>
              <br>
            </div>`;
        } else if (response[i].type == "video-text") {
          cardContent = `
            <div class="col-md-3">
              <div class="card insta-card" style="border-radius: 8%; height: auto; text-align: left; background-color: #EECECB;">
                <video class="card-video" controls style="width: 100%; height: 250px;" alt="Post Video">
                  <source src="${imageUrl}${response[i].attachment}" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
                <div class="card-footer d-flex justify-content-between">
                  <div>
                    <h5><strong>${response[i].name}</strong></h5>
                    <p style="color: #000;">${response[i].description}</p>
                  </div>
                </div>
              </div>
              <br>
            </div>`;
        } else if (response[i].type == "video") {
          cardContent = `
            <div class="col-md-3">
              <div class="card insta-card" style="border-radius: 8%; height: auto; text-align: left; background-color: #EECECB;">
                <video class="card-video" controls style="width: 100%; height: 250px;" alt="Post Video">
                  <source src="${imageUrl}${response[i].attachment}" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
                <div class="card-footer d-flex justify-content-between">
                  <div>
                    <h5><strong>${response[i].name}</strong></h5>
                  </div>
                </div>
              </div>
              <br>
            </div>`;
        }
  
        // Add the card content to the carousel item
        carouselItem.find('.row').append(cardContent);
        itemCount++;
  
        // If 3 items have been added, append the carousel item to the list and reset
        if (itemCount === itemsPerCarousel) {
          partnersList.append(carouselItem);
          itemCount = 0;
          carouselItem = $('<div class="carousel-item"><div class="row"></div></div>'); // Start a new carousel item
        }
      }
  
      // Append any remaining items if not filled to the carousel
      if (itemCount > 0) {
        partnersList.append(carouselItem);
      }
  
      // Add the 'active' class to the first carousel item
      $('.testimonialsList .carousel-item:first').addClass('active');
    }
  });
  

}