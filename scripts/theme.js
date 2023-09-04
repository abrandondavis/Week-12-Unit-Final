// Grab dom element
// Never read as of now. Can be removed
const $themeToggleButton = $('#theme-toggle-button')

// Function to toggle the Bootstrap color mode
function toggleTheme() {
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.getAttribute('data-bs-theme');
  const $themeToggleButton = $('#theme-toggle-button');

  // Toggle between 'light' and 'dark' themes
  htmlElement.setAttribute('data-bs-theme', currentTheme === 'light' ? 'dark' : 'light');

  // Toggle the button's CSS class and text
  $themeToggleButton.toggleClass('btn-light btn-dark');
  $themeToggleButton.text(currentTheme === 'light' ? 'I\'m scared of the dark!' : 'Lights Off!');
}

// Export the toggleTheme function
export { toggleTheme };