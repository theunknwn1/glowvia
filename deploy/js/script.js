document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Sticky Navbar Effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Scroll Reveal Animation
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-in');
  animatedElements.forEach(el => observer.observe(el));

  // Set Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

window.copyOrderTemplateAndOpenIG = function(event) {
  event.preventDefault();
  const template = `Hi Glowvia Lane 🌷\n\nI would like to place an order.\n\nOccasion:\nBudget:\nDelivery Date:\nGift Type:\nCustomization Needed:\n\nPlease share available options. Thank you 💝`;
  
  const originalHtml = event.currentTarget.innerHTML;
  event.currentTarget.innerHTML = `<i class="ph-bold ph-check text-2xl group-hover:drop-shadow-[0_0_8px_rgba(200,165,106,0.4)] transition-all duration-300"></i> Copied & Opening...`;
  
  setTimeout(() => {
    event.currentTarget.innerHTML = originalHtml;
  }, 3000);

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(template).then(() => {
      setTimeout(() => window.open('https://www.instagram.com/glowvia.lane/', '_blank'), 500);
    }).catch(() => {
      window.open('https://www.instagram.com/glowvia.lane/', '_blank');
    });
  } else {
    // Fallback
    const textArea = document.createElement("textarea");
    textArea.value = template;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {}
    textArea.remove();
    setTimeout(() => window.open('https://www.instagram.com/glowvia.lane/', '_blank'), 500);
  }
};
