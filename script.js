document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    (function() {
        // Initialize EmailJS with your public key
        emailjs.init("winnx47WIGJzZR862"); // Replace with your actual public key from EmailJS dashboard
    })();
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // Form submission with EmailJS
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const sendAnotherButton = document.getElementById('send-another');
    const formSpinner = document.getElementById('form-spinner');
    
    if (contactForm) {
        // Function to show validation error
        function showValidationError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.textContent = message;
            
            // Remove any existing error
            const existingError = contactForm.querySelector('.form-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Add new error before the submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            contactForm.insertBefore(errorDiv, submitButton);
            
            // Remove error after 5 seconds
            setTimeout(() => {
                errorDiv.classList.add('form-error-fade');
                setTimeout(() => {
                    if (errorDiv.parentNode) {
                        errorDiv.remove();
                    }
                }, 300);
            }, 5000);
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Remove any existing error
            const existingError = contactForm.querySelector('.form-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Изпращане...';
            formSpinner.style.display = 'block';
            
            // Get form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const restaurant = document.getElementById('restaurant').value.trim();
            const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
            const message = document.getElementById('message').value.trim();
            
            // Validate fields
            if (!name || !email || !restaurant || !message) {
                showValidationError('Моля, попълнете всички задължителни полета');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                formSpinner.style.display = 'none';
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showValidationError('Моля, въведете валиден имейл адрес');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                formSpinner.style.display = 'none';
                return;
            }
            
            // Validate phone if present
            if (phone) {
                const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                if (!phoneRegex.test(phone)) {
                    showValidationError('Моля, въведете валиден телефонен номер');
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    formSpinner.style.display = 'none';
                    return;
                }
            }
            
            // Prepare data for EmailJS
            const templateParams = {
                restaurant: restaurant,
                name: name,
                message: message,
                email: email,
                phone: phone || 'Не е предоставен'
            };
            
            // Send email using EmailJS
            emailjs.send("service_5zeefxe", "template_glecl94", templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    formSpinner.style.display = 'none';
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                    
                    // Track successful form submission
                    if (typeof gtag === 'function') {
                        gtag('event', 'form_submission', {
                            'event_category': 'Contact',
                            'event_label': 'Restaurant Partner'
                        });
                    }
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    showValidationError('Възникна грешка при изпращането. Моля, опитайте отново по-късно или се свържете с нас на info@ketaring.bg');
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    formSpinner.style.display = 'none';
                });
        });
        
        // Handle "Send Another Message" button click
        if (sendAnotherButton) {
            sendAnotherButton.addEventListener('click', function() {
                formSuccess.style.display = 'none';
                contactForm.style.display = 'block';
                contactForm.reset();
                
                // Reset submit button state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.textContent = 'Изпрати';
            });
        }
    }
    
    // Smooth scrolling for anchor links with improved performance
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Record click for analytics
                recordNavigation(targetId.substring(1));
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to header on scroll with improved performance
    const header = document.querySelector('header');
    
    if (header) {
        let lastKnownScrollY = 0;
        let ticking = false;
        
        function onScroll() {
            lastKnownScrollY = window.scrollY;
            requestTick();
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(update);
            }
            ticking = true;
        }
        
        function update() {
            ticking = false;
            
            if (lastKnownScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        window.addEventListener('scroll', onScroll, { passive: true });
    }
    
    // Add structured data for FAQ dynamically if FAQs are added later
    function addFAQSchema() {
        const faqSection = document.getElementById('faq');
        if (faqSection) {
            const questions = faqSection.querySelectorAll('.faq-item');
            if (questions.length > 0) {
                const faqSchema = {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": []
                };
                
                questions.forEach(q => {
                    const question = q.querySelector('h3').textContent;
                    const answer = q.querySelector('p').textContent;
                    
                    faqSchema.mainEntity.push({
                        "@type": "Question",
                        "name": question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": answer
                        }
                    });
                });
                
                const script = document.createElement('script');
                script.type = 'application/ld+json';
                script.textContent = JSON.stringify(faqSchema);
                document.head.appendChild(script);
            }
        }
    }
    
    // Call function to add FAQ schema if element exists
    addFAQSchema();
    
    // Add image alt texts to any image without them
    document.querySelectorAll('img:not([alt])').forEach(img => {
        img.alt = 'Ketaring.bg кетъринг услуги';
    });
    
    // Analytics tracking function (placeholder for future implementation)
    function recordNavigation(sectionName) {
        console.log(`User navigated to section: ${sectionName}`);
        // In a real implementation, this would send data to analytics
    }
    
    // Lazy load images for performance
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports 'loading' attribute
        document.querySelectorAll('img').forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        // You would implement a custom lazy loading solution here
    }
}); 