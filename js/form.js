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