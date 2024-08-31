   var apiUrl = "https://66d35e0cd497be5953e1d359--induckt-be.netlify.app/.netlify/functions"

   // Get all container elements
   const containers = document.querySelectorAll('.box-option');

   // Variable to store the previously clicked container
   let previousContainer = null;

   // Function to change the icon container's background color
   function changeIconColor() {
       // If there is a previous container, reset its background color and icon color
       if (previousContainer) {
           previousContainer.querySelector('.icon-container').style.backgroundColor = '#F3F3F3';
           previousContainer.querySelector('.icon').style.color = '#213672';
       }
       // Set the background color of the clicked container's icon container to red
       this.querySelector('.icon-container').style.backgroundColor = '#F51202';
       this.querySelector('.icon').style.color = 'white';
       // Set the clicked container as the previous container
       previousContainer = this;
   }

   // Loop through each container
   containers.forEach(container => {
       // Add click event listener to each container
       container.addEventListener('click', changeIconColor);
   });

   // Call changeIconColor function on the first container after the DOM content has loaded
   document.addEventListener('DOMContentLoaded', () => {
       containers[0].click();
   });

   // Add click event listener to document to detect clicks outside containers
   document.addEventListener('click', (event) => {
       // Check if the clicked element is not a container or its children
       if (!event.target.closest('.box-option')) {
           // Reset the background color and icon color of the previous container
           if (previousContainer) {
               previousContainer.querySelector('.icon-container').style.backgroundColor = '#F3F3F3';
               previousContainer.querySelector('.icon').style.color = '#213672';
               // Reset the previous container variable
               previousContainer = null;
           }
       }
   });

   $(document).ready(function () {
       // Handle submission for the first form (investorForm)
       $('#investorForm').on('submit', function (event) {
           event.preventDefault();
           var formData = new FormData(this); // Get form data 
           submitForm(formData, 'investor'); // Submit the form with the specific category
       });

       // Handle submission for the second form (startupForm)
       $('#startupForm').on('submit', function (event) {
           event.preventDefault();
           var formData = new FormData(this); 
           submitForm(formData, 'startup');
       });

       // Handle submission for the third form (ecosystemForm)
       $('#ecosystemForm').on('submit', function (event) {
           event.preventDefault();
           var formData = new FormData(this); 
           submitForm(formData, 'ecosystem');
       });

       // Function to get form data
       function getFormData(form) {
           return new FormData(form); // Serialize the form data
       }

       // Function to submit form data via AJAX
       function submitForm(formData, category) {
            // Add category to form data
            console.log(formData);
           $.ajax({
               url: `${apiUrl}/api/website-users`, // Replace with your API endpoint
               type: 'POST',
               data: formData,
               processData: false, // Prevent jQuery from processing the data
               contentType: false, // Prevent jQuery from setting content type
               success: function (response) {
                   console.log('Form submitted successfully:', response);
                   // Optionally, you can handle the success response here
               },
               error: function (error) {
                   console.error('Error submitting form:', error);
                   // Optionally, handle the error response here
               }
           });
       }
   });