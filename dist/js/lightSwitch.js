// Immediately invoked function to set the theme on initial load
(function loadLightTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.querySelector('#slider').checked = false;
        // document.querySelector('.get-dark-light').textContent = 'Get light'
    } else {
        setTheme('theme-light');
        document.querySelector('#slider').checked = true;
        // document.querySelector('.get-dark-light').textContent = 'Get dark'
    }

    // Solution for making the lightSwitch change simutaniusly on all open pages
    window.addEventListener('storage', loadLightTheme)
})();

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        // document.querySelector('.get-dark-light').textContent = 'Get dark'
    } else {
        setTheme('theme-dark');
        // document.querySelector('.get-dark-light').textContent = 'Get light'
    }
}


