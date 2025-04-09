// DOM elements
const mobileMenuButton = document.querySelector('.ri-menu-line');
const mobileMenu = document.createElement('div');

// Initialize mobile menu
function initMobileMenu() {
    // Create mobile menu
    mobileMenu.className = 'mobile-menu fixed inset-0 bg-black bg-opacity-70 z-50 hidden';
    mobileMenu.innerHTML = `
        <div class="bg-white h-full w-3/4 max-w-sm p-6 shadow-lg">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-xl font-bold text-primary">CRG Toastmasters Club</h2>
                <button class="close-menu text-gray-700">
                    <i class="ri-close-line ri-2x"></i>
                </button>
            </div>
            <nav>
                <ul class="space-y-4">
                    <li><a href="#home" class="block py-2 text-gray-800 hover:text-primary transition-colors">Home</a></li>
                    <li><a href="#benefits" class="block py-2 text-gray-800 hover:text-primary transition-colors">Benefits</a></li>
                    <li><a href="#team" class="block py-2 text-gray-800 hover:text-primary transition-colors">Our Team</a></li>
                    <li><a href="#meetings" class="block py-2 text-gray-800 hover:text-primary transition-colors">Meetings</a></li>
                    <li><a href="#" class="block py-2 text-white bg-primary rounded-button px-4 mt-2">Join Now</a></li>
                </ul>
            </nav>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    // Event listeners for mobile menu
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    mobileMenu.querySelector('.close-menu').addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking menu items
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(item => {
        item.addEventListener('click', toggleMobileMenu);
    });
}

// Toggle mobile menu visibility
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize TomTom Map
function initMap() {
    if (typeof tt !== 'undefined') {
        try {
            // Map coordinates for Harmony Living Ed Value Chain Solutions
            const coordinates = [72.63054749391392, 23.18436526489801];
            
            // Create map instance
            const map = tt.map({
                key: 'supu8hAZdQgayQ7E3SfxLUK1M8ocVw7W',
                container: 'map',
                center: coordinates,
                zoom: 15
            });
            
            // Create custom marker element
            const markerElement = document.createElement('div');
            markerElement.className = 'custom-marker';
            markerElement.innerHTML = `
                <svg width="40" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EA4335" d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 16 8 16s8-10.5 8-16c0-4.42-3.58-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                    <circle cx="12" cy="8" r="3" fill="white"/>
                </svg>
            `;
            
            // Add marker to map
            new tt.Marker({
                element: markerElement
            })
            .setLngLat(coordinates)
            .addTo(map);
            
            // Add popup with info when clicking on marker
            const popup = new tt.Popup({
                offset: 30
            }).setHTML(`
                <div class="p-2">
                    <h4 class="font-bold">CRG Toastmasters Club</h4>
                    <p class="text-sm">Harmony Living Ed Value Chain Solutions Pvt Ltd.<br>
                    E-329, 3rd Floor, Pramukh Anand Orbit Mall,<br>Kudasan, Gandhinagar</p>
                </div>
            `);
            
            // Show popup on marker click
            markerElement.addEventListener('click', () => {
                new tt.Marker({
                    element: markerElement
                })
                .setLngLat(coordinates)
                .setPopup(popup)
                .addTo(map);
                
                popup.addTo(map);
            });
            
        } catch (error) {
            console.error("Error initializing map:", error);
            const mapElement = document.getElementById('map');
            if (mapElement) {
                mapElement.innerHTML = '<div class="p-6 bg-gray-200 text-center rounded"><p>Map loading error. Please try again later.</p></div>';
            }
        }
    } else {
        console.error("TomTom SDK not loaded");
        const mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.innerHTML = '<div class="p-6 bg-gray-200 text-center rounded"><p>Map service unavailable. Please try again later.</p></div>';
        }
    }
}

// RSVP form handler
function initRSVPForm() {
    const rsvpButton = document.querySelector('button:contains("RSVP for Next Meeting")');
    if (rsvpButton) {
        rsvpButton.addEventListener('click', () => {
            // Create modal
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50';
            
            modalOverlay.innerHTML = `
                <div class="bg-white p-6 rounded shadow-lg w-full max-w-md mx-4">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold">RSVP for Next Meeting</h3>
                        <button class="close-modal text-gray-500 hover:text-gray-700">
                            <i class="ri-close-line ri-2x"></i>
                        </button>
                    </div>
                    <form id="rsvp-form" class="space-y-4">
                        <div>
                            <label for="name" class="block text-gray-700 mb-1">Full Name</label>
                            <input type="text" id="name" name="name" required class="w-full px-4 py-2 border rounded focus:border-primary">
                        </div>
                        <div>
                            <label for="email" class="block text-gray-700 mb-1">Email Address</label>
                            <input type="email" id="email" name="email" required class="w-full px-4 py-2 border rounded focus:border-primary">
                        </div>
                        <div>
                            <label for="phone" class="block text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" id="phone" name="phone" class="w-full px-4 py-2 border rounded focus:border-primary">
                        </div>
                        <div>
                            <label class="block text-gray-700 mb-1">Are you a first-time visitor?</label>
                            <div class="flex space-x-4">
                                <label class="inline-flex items-center">
                                    <input type="radio" name="first_time" value="yes" class="mr-2">
                                    <span>Yes</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" name="first_time" value="no" class="mr-2">
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="w-full bg-primary text-white py-2 rounded-button hover:bg-opacity-90 transition-colors">Submit RSVP</button>
                    </form>
                </div>
            `;
            
            document.body.appendChild(modalOverlay);
            
            // Close modal event
            modalOverlay.querySelector('.close-modal').addEventListener('click', () => {
                document.body.removeChild(modalOverlay);
            });
            
            // Form submission
            modalOverlay.querySelector('#rsvp-form').addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(e.target);
                const formDataObj = Object.fromEntries(formData.entries());
                
                // Here you would typically send this data to a server
                console.log('RSVP Submission:', formDataObj);
                
                // Show success message
                modalOverlay.innerHTML = `
                    <div class="bg-white p-6 rounded shadow-lg w-full max-w-md mx-4">
                        <div class="text-center">
                            <div class="mb-4 text-green-500">
                                <i class="ri-check-line ri-3x"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-2">RSVP Successful!</h3>
                            <p class="text-gray-600 mb-6">Thank you for your RSVP. We look forward to seeing you at our next meeting.</p>
                            <button class="close-success-modal bg-primary text-white px-6 py-2 rounded-button hover:bg-opacity-90 transition-colors">Close</button>
                        </div>
                    </div>
                `;
                
                // Close success modal
                modalOverlay.querySelector('.close-success-modal').addEventListener('click', () => {
                    document.body.removeChild(modalOverlay);
                });
            });
        });
    }
}

// Animate elements on scroll
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.benefit-card, .team-card');
    
    function checkVisibility() {
        elementsToAnimate.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate-fade-in');
            }
        });
    }
    
    // Add a CSS class for the animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
            animation: fadeIn 0.6s ease forwards;
        }
    `;
    document.head.appendChild(style);
    
    // Set initial state
    elementsToAnimate.forEach(element => {
        element.style.opacity = "0";
    });
    
    // Check elements on load and scroll
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
}

// Initialize all functionality when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize features
    initMobileMenu();
    initSmoothScroll();
    setTimeout(initMap, 1000); // Slight delay to ensure map container is ready
    initRSVPForm();
    initScrollAnimations();
    
    // Fix for Remix Icon display issues
    const style = document.createElement('style');
    style.textContent = `
        [class^="ri-"]::before {
            display: inline-block;
            font-family: 'remixicon' !important;
        }
    `;
    document.head.appendChild(style);
});

// Add polyfill for :contains pseudo-selector
if (!window.jQuery) {
    Element.prototype.contains = function(text) {
        return this.textContent.includes(text);
    };
    
    document.querySelector = (function(originalQuerySelector) {
        return function(selector) {
            try {
                if (selector.includes(':contains(')) {
                    const parts = selector.split(':contains(');
                    const baseSelector = parts[0];
                    const searchText = parts[1].slice(0, -1).replace(/["']/g, '');
                    
                    const elements = document.querySelectorAll(baseSelector);
                    for (let i = 0; i < elements.length; i++) {
                        if (elements[i].textContent.includes(searchText)) {
                            return elements[i];
                        }
                    }
                    return null;
                }
                return originalQuerySelector.call(document, selector);
            } catch (e) {
                return originalQuerySelector.call(document, selector);
            }
        };
    })(document.querySelector);
}

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
      });
    }
    
    // Map initialization code remains largely the same
  });