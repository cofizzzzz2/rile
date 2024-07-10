document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.navbar');
    const modal = document.getElementById("myModal");
    const toggleTriggers = document.querySelectorAll(".toggle-trigger");
    let scrollToTopBtn = document.getElementById("scrollToTopBtn");
    
    

    window.addEventListener('scroll', function() {
        if (window.scrollY > 450) {
            navbar.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
            navbar.style.backdropFilter = 'blur(35px)';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    function toggleModal(event) {
        event.preventDefault();
        modal.style.display = modal.style.display === "block" ? "none" : "block";
    }

    document.querySelectorAll('.mail-a, .close').forEach(function(element) {
        element.addEventListener('click', toggleModal);
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    
    if (scrollToTopBtn) {
        scrollToTopBtn.onclick = function() {
            scrollToTop();
        };
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const prdbtn = document.querySelector(".prdbtn");
    if (prdbtn) {
        prdbtn.addEventListener("click", function() {
            window.location.href = "products.html";
        });
    }

    document.querySelectorAll(".btn11, .btn12, .btn13").forEach(function(btn) {
        if (btn) {
            btn.addEventListener("click", function() {
                const productId = btn.classList.contains('btn11') ? 'product1.html' :
                                    btn.classList.contains('btn12') ? 'product2.html' :
                                    'product3.html';
                window.location.href = productId;
            });
        }
    });
    
});
   
