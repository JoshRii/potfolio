// ==========================================================================
// THEME SWITCHING LOGIC
// ==========================================================================

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


// ==========================================================================
// PROJECT FILTERING SCRIPT LOGIC
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Remove 'active' class from all buttons and add it to the clicked one
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 2. Get the target category value from the clicked button
      const targetCategory = button.getAttribute('data-filter');

      // 3. Loop through cards and show/hide based on category match
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex'; // Display matching cards
        } else {
          card.style.display = 'none';  // Hide non-matching cards
        }
      });
    });
  });
});

// ==========================================================================
// CASE STUDY IFRAME MODAL VIEWER LOGIC
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('caseStudyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalIframe = document.getElementById('caseStudyIframe');
  const caseStudyButtons = document.querySelectorAll('.card-btn');

  // Open modal and blur out background content when a case study link is clicked
  caseStudyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Target page to load inside iframe (you can customize per project via data attributes)
      const targetUrl = button.getAttribute('data-case-url') || 'about.html'; 
      
      modalIframe.src = targetUrl;
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    });
  });

  // Close modal function
  function closeModal() {
    modalOverlay.classList.remove('active');
    modalIframe.src = ''; // Clear iframe content
    document.body.style.overflow = 'auto'; // Restore background scrolling
  }

  modalCloseBtn.addEventListener('click', closeModal);

  // Close when clicking outside the modal box on the blurred overlay
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
});


// ==========================================================================
// CASE STUDY IFRAME MODAL VIEWER LOGIC
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('caseStudyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalIframe = document.getElementById('caseStudyIframe');
  const caseStudyButtons = document.querySelectorAll('.card-btn');

  // Open modal and blur out background content when a case study link is clicked
  caseStudyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Target page to load inside iframe
      const targetUrl = button.getAttribute('data-case-url') || 'about.html'; 
      
      modalIframe.src = targetUrl;
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    });
  });

  // Close modal function
  function closeModal() {
    modalOverlay.classList.remove('active');
    modalIframe.src = ''; // Clear iframe content
    document.body.style.overflow = 'auto'; // Restore background scrolling
  }

  modalCloseBtn.addEventListener('click', closeModal);

  // Close when clicking outside the modal box on the blurred overlay
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
});


// ==========================================================================
// ENHANCED PROJECT DETAILS MODAL SCRIPT LOGIC
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalActionBtn = document.getElementById('modalActionBtn');
  const cardButtons = document.querySelectorAll('.card-btn');

  const modalImg = document.getElementById('modalProjectImg');
  const modalTag = document.getElementById('modalProjectTag');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalDesc = document.getElementById('modalProjectDesc');
  const modalTechStack = document.getElementById('modalTechStack');

  // Open modal and pull dynamic info + image from clicked project card
  cardButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      // Locate parent card element
      const card = button.closest('.project-item-card');
      if (!card) return;

      // Extract details and image source from card
      const imgSrc = card.querySelector('img')?.src || '';
      const tag = card.querySelector('.project-tag')?.textContent || 'Engineering Build';
      const title = card.querySelector('h3')?.textContent || 'Project Details';
      const desc = card.querySelector('p')?.textContent || 'Comprehensive architectural specification overview.';
      const techSpans = card.querySelectorAll('.project-tech-stack span');

      // Populate modal fields
      modalImg.src = imgSrc;
      modalTag.textContent = tag;
      modalTitle.textContent = title;
      modalDesc.textContent = `${desc} This comprehensive case study details the development lifecycle, pipeline configuration, and interface optimization strategies applied during implementation.`;

      // Clone and display tech stack pills inside modal
      modalTechStack.innerHTML = '';
      techSpans.forEach(span => {
        const clone = span.cloneNode(true);
        modalTechStack.appendChild(clone);
      });

      // Show modal overlay and lock background scrolling
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal helper function
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore background scroll
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalActionBtn) modalActionBtn.addEventListener('click', closeModal);

  // Close when clicking outside card box on the blurred overlay backdrop
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }
});