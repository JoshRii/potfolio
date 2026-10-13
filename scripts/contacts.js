document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. THEME SWITCH CONTROLLER
  // ==========================================
  const themeCheckbox = document.getElementById('mode-toggle-checkbox');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark' && themeCheckbox) {
      themeCheckbox.checked = true;
    }
  }

  if (themeCheckbox) {
    themeCheckbox.addEventListener('change', function () {
      if (this.checked) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // ==========================================
  // 2. MULTI-STEP WIZARD FORM & EMAIL CHECKER LOGIC
  // ==========================================
  const form = document.getElementById('project-wizard-form');
  const progressSteps = document.querySelectorAll('.progress-step');
  const panelPanels = document.querySelectorAll('.form-step-panel');
  const successScreen = document.getElementById('success-message');
  const progressBar = document.getElementById('form-progress');
  
  let activeStepNum = 1;

  // Validate fields with strict email checker and phone validation
  function validatePanel(stepNumber) {
    const currentPanel = document.querySelector(`.form-step-panel[data-panel="${stepNumber}"]`);
    if (!currentPanel) return false;
    
    const requiredInputs = currentPanel.querySelectorAll('input[required], textarea[required]');
    let panelValidStatus = true;

    requiredInputs.forEach(input => {
      const groupWrapper = input.parentElement;
      groupWrapper.classList.remove('invalid-field');

      if (!input.value.trim()) {
        groupWrapper.classList.add('invalid-field');
        panelValidStatus = false;
      }
      
      // Strict Email Checker Validation
      if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
        if (!emailRegex.test(input.value.trim())) {
          groupWrapper.classList.add('invalid-field');
          panelValidStatus = false;
        }
      }

      // Phone Number Checker Validation (Supports international codes & formatting)
      if (input.type === 'tel' && input.value.trim()) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(input.value.trim())) {
          groupWrapper.classList.add('invalid-field');
          panelValidStatus = false;
        }
      }
    });

    return panelValidStatus;
  }

  // Update visible panels and navigation progress states
  function navigateToPanel(targetStep) {
    panelPanels.forEach(panel => panel.classList.remove('active-panel'));
    progressSteps.forEach(step => step.classList.remove('active-step'));

    const targetPanelEl = document.querySelector(`.form-step-panel[data-panel="${targetStep}"]`);
    const targetStepEl = document.querySelector(`.progress-step[data-step="${targetStep}"]`);
    
    if (targetPanelEl) targetPanelEl.classList.add('active-panel');
    if (targetStepEl) targetStepEl.classList.add('active-step');
  }

  // Bind panel button triggers
  if (form) {
    form.addEventListener('click', (e) => {
      if (e.target.classList.contains('next-step-btn')) {
        if (validatePanel(activeStepNum)) {
          activeStepNum++;
          navigateToPanel(activeStepNum);
        }
      } else if (e.target.classList.contains('prev-step-btn')) {
        activeStepNum--;
        navigateToPanel(activeStepNum);
      }
    });

    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          input.parentElement.classList.remove('invalid-field');
        }
      });
    });

    // FINAL SUBMISSION & EMAIL DISPATCH CONTROLLER
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (validatePanel(3)) {
        const finalClientName = document.getElementById('client-name').value.trim();
        const finalProjectTitle = document.getElementById('project-title').value.trim();

        document.getElementById('summary-client-name').textContent = finalClientName;
        document.getElementById('summary-project-title').textContent = `"${finalProjectTitle}"`;

        // Submit form data to email service in the background via fetch
        const formData = new FormData(form);
        try {
          await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });
        } catch (error) {
          console.error('Email dispatch notification error:', error);
        }

        // Show success screen card animation
        form.style.display = 'none';
        if (progressBar) progressBar.style.display = 'none';
        if (successScreen) successScreen.style.display = 'flex';
      }
    });
  }
});