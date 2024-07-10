document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.navbar');
    const modal = document.getElementById("myModal");
    var modalToggle = document.querySelector('.mail-icon');
    var closeIcon = document.querySelector('.close-icon');
    

    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            navbar.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
            navbar.style.backdropFilter = 'blur(20px)'
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.backdropFilter = 'none'
        }
    });

    // Function to toggle the modal
    if (modalToggle) {
        modalToggle.addEventListener('click', toggleModal);
    }
    if (closeIcon) {
        closeIcon.addEventListener('click', closeModal);
    }
});

// Function to toggle modal visibility
function toggleModal(event) {
    event.preventDefault(); // Prevent default link behavior
    var modal = document.getElementById('myModal');
    modal.style.display = modal.style.display === 'none' || modal.style.display === '' ? 'block' : 'none';
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

    // Smooth transition when clicking on small images
    var ProductImg = document.getElementById("ProductImg");
    var SmallImg = document.getElementsByClassName("small-img");

    // Function to handle click on small images
    function handleSmallImageClick(clickedSmallImg) {
        var tempSrc = ProductImg.src; // Store the src of the big image
        ProductImg.style.opacity = "0";
        setTimeout(function() {
            // Swap src between the big image and the clicked small image
            ProductImg.src = clickedSmallImg.src;
            clickedSmallImg.src = tempSrc;
            // Add a class to the clicked small image to make it big
            clickedSmallImg.classList.add("big-img");
            // Remove the "big-img" class from all other small images
            for (let j = 0; j < SmallImg.length; j++) {
                if (SmallImg[j] !== clickedSmallImg) {
                    SmallImg[j].classList.remove("big-img");
                }
            }
            ProductImg.style.opacity = "1";
        }, 300);
    }

    // Event listener for clicking on small images
    for (let i = 0; i < SmallImg.length; i++) {
        SmallImg[i].addEventListener('click', function() {
            handleSmallImageClick(this);
        });
    }

    function toggleExpand(event) {
        event.preventDefault(); // Prevent default anchor behavior

        // Check if the image is already expanded
        if (!ProductImg.classList.contains('expanded')) {
            // If the image is not expanded, toggle the expansion state
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            ProductImg.classList.toggle('expanded');
            if (ProductImg.classList.contains('expanded')) {
                document.body.appendChild(overlay);
                addNextArrow();
                addPreviousArrow();
                closeIcon.style.display = 'block'; // Show close icon only when expanded
            } else {
                document.querySelector('.overlay').remove();
                removeNextArrow();
                removePreviousArrow();
                closeIcon.style.display = 'none'; // Hide close icon when not expanded
            }
        } else {
            // Zoom in on the image instead of toggling expansion state
            ProductImg.classList.toggle('zoomed');

            // Adjust the transformation to center around the cursor position
            if (ProductImg.classList.contains('zoomed')) {
                const rect = ProductImg.getBoundingClientRect();
                const offsetX = event.clientX - rect.left;
                const offsetY = event.clientY - rect.top;
                const scale = 1.5; // Adjust the scale factor as needed
                const translateX = offsetX * (1 - scale);
                const translateY = offsetY * (1 - scale);
                ProductImg.style.transformOrigin = `${offsetX}px ${offsetY}px`;
                ProductImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
            } else {
                ProductImg.style.transformOrigin = ''; // Reset transform origin
                ProductImg.style.transform = ''; // Reset transform
            }
        }
    }

    // Function to add next arrow icon
    function addNextArrow() {
        const arrow = document.createElement('div');
        arrow.classList.add('next-arrow');
        arrow.innerHTML = '<i class="fa fa-chevron-right"></i>';
        document.body.appendChild(arrow);

        // Event listener for clicking on the next arrow
        arrow.addEventListener('click', moveToNextPicture);
    }

    // Function to remove next arrow icon
    function removeNextArrow() {
        const arrow = document.querySelector('.next-arrow');
        if (arrow) {
            arrow.remove();
        }
    }
    let originalBigImageSrc = '';
    // Initialize current image index
let currentIndex = 0;

// Function to move to the next picture
function moveToNextPicture() {
    currentIndex = (currentIndex + 1) % SmallImg.length; // Calculate the index of the next image
    swapImages(currentIndex); // Swap images
}
function moveToPreviousPicture() {
        currentIndex = (currentIndex - 1 + SmallImg.length) % SmallImg.length; // Calculate the index of the previous image
        swapImages(currentIndex); // Swap images
    }
    // Function to swap images based on index
function swapImages(index) {
    var tempSrc = ProductImg.src; // Store the src of the big image
    ProductImg.style.opacity = "0";
    setTimeout(function() {
        // Swap src between the big image and the clicked small image
        ProductImg.src = SmallImg[index].src;
        SmallImg[index].src = tempSrc;
        // Add a class to the clicked small image to make it big
        SmallImg[index].classList.add("big-img");
        // Remove the "big-img" class from all other small images
        for (let j = 0; j < SmallImg.length; j++) {
            if (j !== index) {
                SmallImg[j].classList.remove("big-img");
            }
        }
        ProductImg.style.opacity = "1";
    }, 300);
}
    // Function to add previous arrow icon
    function addPreviousArrow() {
        const arrow = document.createElement('div');
        arrow.classList.add('previous-arrow');
        arrow.innerHTML = '<i class="fa fa-chevron-left"></i>';
        document.body.appendChild(arrow);

        // Event listener for clicking on the previous arrow
        arrow.addEventListener('click', moveToPreviousPicture);
    }

    // Function to remove previous arrow icon
    function removePreviousArrow() {
        const arrow = document.querySelector('.previous-arrow');
        if (arrow) {
            arrow.remove();
        }
    }

    
    

    // Event listener for toggling expanded mode
    ProductImg.addEventListener('click', toggleExpand);

    closeIcon.addEventListener('click', function() {
        const overlay = document.querySelector('.overlay');
        if (overlay) overlay.remove(); // Remove overlay if exists
        
        // Reset transformation and scale
        ProductImg.style.transform = '';
        ProductImg.style.transformOrigin = '';
        
        // Set width and height to their original values
        ProductImg.style.width = ''; // This will remove the inline style, allowing the CSS to take effect
        ProductImg.style.height = ''; // This will remove the inline style, allowing the CSS to take effect
        
        ProductImg.classList.remove('expanded','zoomed');
        removeNextArrow();
        removePreviousArrow();
        closeIcon.style.display = 'none'; // Hide close icon again
    });
    var toggleTriggers = document.querySelectorAll(".toggle-trigger");

    // Loop through each toggle trigger
    toggleTriggers.forEach(function(trigger) {
        // Add click event listener to each toggle trigger
        trigger.addEventListener("click", function() {
            // Find the associated expandable content for this trigger
            var content = this.nextElementSibling;

            // Toggle expand/collapse for the associated content
            if (content.classList.contains("hidden")) {
                content.classList.remove("hidden");
                content.classList.add("visible");
                this.classList.add("expanded"); // Add expanded class to the h3
            } else {
                content.classList.remove("visible");
                content.classList.add("hidden");
                this.classList.remove("expanded"); // Remove expanded class from the h3
            }
        });
    });

