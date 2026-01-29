// Waitlist form functionality
const waitlistForm = document.getElementById('waitlist-form');

if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();
        
        if (email) {
            // Simulate successful submission
            showSuccessMessage();
            emailInput.value = '';
        }
    });
}

function showSuccessMessage() {
    const form = document.getElementById('waitlist-form');
    const originalHTML = form.innerHTML;
    
    form.innerHTML = `
        <div style="text-align: center; color: white;">
            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <h3>Welcome to the Waitlist!</h3>
            <p>We'll notify you as soon as StudyAI is ready.</p>
        </div>
    `;
    
    // Reset form after 3 seconds
    setTimeout(() => {
        form.innerHTML = originalHTML;
        // Reattach event listener
        document.getElementById('waitlist-form').addEventListener('submit', arguments.callee);
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to pricing cards on scroll
const pricingCards = document.querySelectorAll('.pricing-card');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

pricingCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add hover effect to feature cards
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
    });
});

// Mobile menu toggle (for future implementation)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('nav-active');
}