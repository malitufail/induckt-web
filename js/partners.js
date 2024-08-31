var apiUrl = "https://66d35e0cd497be5953e1d359--induckt-be.netlify.app/.netlify/functions"
 $(document).ready(function () {
fetchPartners();
 });

function fetchPartners() {

    $.ajax({
        url: `${apiUrl}/api/partners`,
        type: 'GET',
        success: function (response) {
            let partnersList = $('.partnersList');
            let investorList = $('.investorList');
           partnersList.empty();
            response.reverse();
          
            for (var i = 0; i < response.length; i++) {
              if(response[i].type == "partner"){
                partnersList.append(`
                   <div class="col-md-4">
          <img class="img-responsive w-25" loading="lazy" alt="" src="${apiUrl}${response[i].logo}">
        </div>
           `);
            } else {
              investorList.append(`
                  <div class="col-md-4">
          <img class="img-responsive w-25" loading="lazy" alt="" src="${apiUrl}${response[i].logo}">
        </div>
         `);
            }
                
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