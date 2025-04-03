document.addEventListener('DOMContentLoaded', function() {
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
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const restaurant = document.getElementById('restaurant').value.trim();
            const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
            const message = document.getElementById('message').value.trim();
            
            // Validate fields
            if (!name || !email || !restaurant || !message) {
                alert('Моля, попълнете всички задължителни полета');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Моля, въведете валиден имейл адрес');
                return;
            }
            
            // Validate phone if present
            if (phone) {
                const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                if (!phoneRegex.test(phone)) {
                    alert('Моля, въведете валиден телефонен номер');
                    return;
                }
            }
            
            // For now, we'll just show a success message
            // In a real implementation, you'd send this data to a server
            alert('Благодарим за интереса! Ще се свържем с вас скоро.');
            contactForm.reset();
            
            // Data that would be sent to server in a real implementation
            const formData = {
                name,
                email,
                restaurant,
                phone,
                message,
                timestamp: new Date().toISOString(),
                language: 'bg',
                source: 'ketaring.bg landing page'
            };
            
            console.log('Form submission data:', formData);
            
            // Placeholder for future API call
            // submitFormToServer(formData);
        });
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
    
    // Future function for API submission
    /* 
    function submitFormToServer(data) {
        fetch('your-api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    */
}); 