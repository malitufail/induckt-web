var apiUrl = "https://induckt-be.netlify.app/.netlify/functions"
var imageUrl = "https://induckt-be.netlify.app"
$(document).ready(function () {
    fetchBlogs();
});

function fetchBlogs() {

    $.ajax({
        url: `${apiUrl}/api/blogs`,
        type: 'GET',
        success: function (response) {
            let partnersList = $('.blogs-items');
            partnersList.empty();
            response.reverse();
            for (var j = 0; j < response.length; j++) {
                $(".blogs-indicator").append(`
                     <li data-target="#carouselExampleIndicators4" data-slide-to="${j}" class="${j==0 ? 'active' : ''}"></li>
                    `)
            }
            for (var i = 0; i < response.length; i += 2) {
                let firstItem = response[i];
                let secondItem = response[i + 1];

                // Add two items in one iteration
                partnersList.append(`
                    <div class="carousel-item ${i == 0 ? 'active' : ''}">
                        <div class="card-group">
                            <div class="card card-slider">
                                <div class="row no-gutters">
                                    <div class="col-md-6 p-2">
                                        <img src="${imageUrl}${firstItem.image}" class="card-img-right" alt="..." style="width: 100%; height: 320px;">
                                        <div class="blog-text">
                                            <h2>${firstItem.title}</h2>
                                            <p>${firstItem.description}</p>
                                            <a href="#" style="color: #0000FF;">Explore integrations <i class="fas fa-arrow-right" style="color: #0000FF;"></i></a><br>
                                        </div>
                                    </div>
                                    ${secondItem ? `
                                    <div class="col-md-6 p-2">
                                        <img src="${imageUrl}${secondItem.image}" class="card-img-right" alt="..." style="width: 100%; height: 320px;">
                                        <div class="blog-text">
                                            <h2>${secondItem.title}</h2>
                                            <p>${secondItem.description}</p>
                                            <a href="#" style="color: #0000FF;">Explore integrations <i class="fas fa-arrow-right" style="color: #0000FF;"></i></a><br>
                                        </div>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });

}