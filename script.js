document.addEventListener('DOMContentLoaded', function() {
  // Better notification system
  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animation for notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      notification.addEventListener('transitionend', () => notification.remove());
    }, 3000);
  };

  // Function to handle special cases
  const handleSpecialCases = (href, event) => {
    if (href === '#forum') {
      event.preventDefault();
      showNotification('Forum section is under construction!', 'warning');
      return true;
    }
    return false;
  };

  // Smooth scrolling for all navigation links
  document.querySelectorAll('nav ul li a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(event) {
      const href = this.getAttribute('href');
      
      // Handle special cases
      if (handleSpecialCases(href, event)) {
        return;
      }
      
      // Smooth scroll to section
      if (href.startsWith('#')) {
        event.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Add active class to navigation items when scrolling
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    let currentSection = '';
    
    let previousActiveItem = null;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= (sectionTop - 150)) {
        currentSection = section.getAttribute('id');
      }
    });

    if (currentSection) {
      const currentActiveItem = document.querySelector(`nav ul li a[href="#${currentSection}"]`);
      if (previousActiveItem !== currentActiveItem) {
        if (previousActiveItem) {
          previousActiveItem.classList.remove('active');
        }
        if (currentActiveItem) {
          currentActiveItem.classList.add('active');
        }
        previousActiveItem = currentActiveItem;
      }
    }
  });
});
