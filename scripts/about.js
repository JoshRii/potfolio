// Select the checkbox input element
const themeCheckbox = document.getElementById('mode-toggle-checkbox');

// 1. Check for a previously saved theme preference in local storage
const currentTheme = localStorage.getItem('theme');

// 2. If a saved theme exists, apply it instantly
if (currentTheme) {
  document.body.setAttribute('data-theme', currentTheme);

  // If the saved theme is dark, make sure the checkbox stays checked
  if (currentTheme === 'dark') {
    themeCheckbox.checked = true;
  }
}

// 3. Listen for when the user clicks/toggles the switch
themeCheckbox.addEventListener('change', function () {
  if (this.checked) {
    // If checked, turn on dark mode and save it
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    // If unchecked, revert to light mode and save it
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});


document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. DYNAMIC TIMELINE VERTICAL SCROLL GLOW CONTROL
  // ==========================================================================
  const spineFiller = document.getElementById('spine-filler');
  const timelineSection = document.querySelector('.timeline-section');

  function updateTimelineSpine() {
    if (!timelineSection || !spineFiller) return;

    // Calculate how far down the timeline section the user has scrolled
    const sectionRect = timelineSection.getBoundingClientRect();
    const sectionHeight = sectionRect.height;
    
    // Convert current viewport scroll space into relative numeric tracking limits
    const startOffset = window.innerHeight / 2;
    const currentScrollPos = startOffset - sectionRect.top;
    
    // Turn coordinates into a clean percentage value clamped between 0 and 100
    let scrollPercentage = (currentScrollPos / sectionHeight) * 100;
    scrollPercentage = Math.max(0, Math.min(100, scrollPercentage));

    // Update the height of the CSS linear-gradient filler element directly
    spineFiller.style.height = `${scrollPercentage}%`;
  }

  // Bind the structural rendering engine directly to your window scrolling lifecycle
  window.addEventListener('scroll', updateTimelineSpine);
  window.addEventListener('resize', updateTimelineSpine);


  // ==========================================================================
  // 2. TIMELINE CARD TIMING INTERSECTION OBSERVER DETECTOR
  // ==========================================================================
  const milestones = document.querySelectorAll('.timeline-milestone');

  const milestoneOptions = {
    root: null, // Tracks elements relative to your standard screen viewport window
    threshold: 0.25, // Triggers immediately when 25% of a card element emerges on page
    rootMargin: "0px 0px -10% 0px" // Slight offset padding filter calculation
  };

  const milestoneObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Inject active styling rules to trigger the hidden CSS properties
        entry.target.classList.add('active');
      }
    });
  }, milestoneOptions);

  // Bind all milestone nodes to the observer monitor
  milestones.forEach(milestone => {
    milestoneObserver.observe(milestone);
  });


  // ==========================================================================
  // 3. MATH PERSPECTIVE 3D CURSOR-TILT CARD CALCULATOR
  // ==========================================================================
  const tiltCards = document.querySelectorAll('.tilt-skill-card');

  tiltCards.forEach(card => {
    const glare = card.querySelector('.tilt-card-glare');

    card.addEventListener('mousemove', (e) => {
      // 1. Gather absolute dimensional boundaries of the element target box
      const rect = card.getBoundingClientRect();
      
      // 2. Extract precise mouse tracking coordinates relative to card center axis
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // 3. Compute relative vector offset mapping variables
      const rotateX = ((centerY - y) / centerY) * 12; // Controls maximum tilt angle pitch
      const rotateY = ((x - centerX) / centerX) * 12;

      // 4. Update the card transform rules natively inside 3D space matrix parameters
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // 5. Project glare light source dynamics directly behind cursor location coordinates
      if (glare) {
        const percentageX = (x / rect.width) * 100;
        const percentageY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(255, 255, 255, 0.2) 0%, transparent 75%)`;
      }
    });

    // Reset layout attributes seamlessly when mouse focus leaves canvas boundaries
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      
      // Restore card to its default smooth transition configuration state
      card.style.transition = 'transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
    });

    // Clear smooth transition property while mouse is active to eliminate structural stuttering
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

});