var apiUrl = "https://66d35e0cd497be5953e1d359--induckt-be.netlify.app/.netlify/functions"
 $(document).ready(function () {
fetchEvents();
 });

function fetchEvents() {

    $.ajax({
        url: `${apiUrl}/api/events`,
        type: 'GET',
        success: function (response) {
            let partnersList = $('.eventList');
           partnersList.empty();
            response.reverse();
          
            for (var i = 0; i < response.length; i++) {
                let firstItem = response[i];
                let secondItem = response[i + 1];

                // Add two items in one iteration
                partnersList.append(`
                       <div class="col-md-5 even-box" style="margin-right: 3%;">
        
        <p>
          <i class="far fa-calendar" style="color: #1777E5;"></i> <span>${response[i].eventDate}</span>
          <i class="fas fa-map-marker-alt" style="color: #1777E5;"></i> <span>${response[i].location}</span>
        </p>
        <h4 style="text-align: left;">${response[i].eventName}</h4 style="text-align: left;">
        <p> ${response[i].description}</p>
      </div>
                `);
            }
            initBox();
        }
    });
   
}

function initBox(){
    const boxContainers = document.querySelectorAll('.row > .even-box');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const boxCount = boxContainers.length;
    let currentIndex = 0;

    function showBoxes() {
      boxContainers.forEach(function (box, index) {
        if (index >= currentIndex && index < currentIndex + 2) {
          box.style.display = 'block'; // Show boxes within currentIndex and currentIndex + 2
        } else {
          box.style.display = 'none'; // Hide other boxes
        }
      });
    }

    showBoxes();

    prevBtn.addEventListener('click', function () {
      if (currentIndex > 0) {
        currentIndex -= 2;
        showBoxes();
      }
    });

    nextBtn.addEventListener('click', function () {
      if (currentIndex + 2 < boxCount) {
        currentIndex += 2;
        showBoxes();
      }
    });
}