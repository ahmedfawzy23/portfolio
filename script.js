document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.querySelector('.theme-toggle');
    const contactForm = document.getElementById('contact-form');
    const navLinks = document.querySelectorAll('nav a');
    
    // Form Elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Error Elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    // Initialize theme based on localStorage
    initTheme();
    
    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Functions
    function initTheme() {
        // Check if user has previously selected a theme
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    function toggleTheme() {
        if (document.body.classList.contains('dark-mode')) {
            // Switch to light mode
            document.body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark mode
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Reset error messages
        resetErrors();
        
        // Validate form
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name';
            isValid = false;
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Please enter your email';
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please enter your message';
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            alert(`Thank you for contacting us, ${nameInput.value}!`);
            contactForm.reset();
        }
    }
    
    function resetErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});