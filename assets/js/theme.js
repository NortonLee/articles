// Theme Toggle - Light/Dark Mode
(function() {
    const themeKey = 'articles-theme';
    const preferredTheme = localStorage.getItem(themeKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (preferredTheme === 'dark' || (!preferredTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Toggle function
    window.toggleTheme = function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(themeKey, newTheme);
    };
    
    // Add theme toggle button to page
    document.addEventListener('DOMContentLoaded', function() {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        toggleBtn.innerHTML = '🌓';
        toggleBtn.setAttribute('aria-label', 'Toggle dark/light mode');
        toggleBtn.onclick = toggleTheme;
        document.body.appendChild(toggleBtn);
    });
})();