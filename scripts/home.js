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

// --- RANDOMIZED INTERACTIVE NAME SLIDER ---
// An array containing alternative cool names, titles, or personality traits
const namesArray = [
  "Creative Mind",
  "a Developer",
  "a Designer",
  "an Innovator",
  "a Problem Solver"
];

const nameElement = document.getElementById('animated-name');
let lastIndex = 0;

function changeNameRandomly() {
  // 1. Instantly trigger a smooth fade/scale animation step out
  nameElement.style.opacity = 0;
  nameElement.style.transform = "scale(0.95) translateY(-5px)";
  
  setTimeout(() => {
    // 2. Select a random entry ensuring it never repeats back-to-back
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * namesArray.length);
    } while (randomIndex === lastIndex);
    
    lastIndex = randomIndex;
    
    // 3. Update the inner rendering text target values
    nameElement.textContent = namesArray[randomIndex];
    
    // 4. Drop smooth keyframe injection wrapper classes 
    nameElement.style.opacity = 1;
    nameElement.style.transform = "scale(1) translateY(0)";
    nameElement.classList.remove('text-pop');
    void nameElement.offsetWidth; // Forces layout engine re-flow reflow trigger
    nameElement.classList.add('text-pop');
  }, 300); // Matches the internal timing sequence offset perfectly
}

// Automatically change every 3.5 seconds
setInterval(changeNameRandomly, 3500);



