document.addEventListener('DOMContentLoaded', () => {
    setRootTheme();
    parseSearchParams();
});

function toggleDarkMode() {
    if (localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    setRootTheme();
}

function setRootTheme() {
    const root = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');
    const isDark = localStorage.getItem('theme') === 'dark';

    if (isDark) {
        root.setAttribute('theme', 'dark');
        if (toggleBtn) toggleBtn.checked = true;
    } else {
        root.removeAttribute('theme');
        if (toggleBtn) toggleBtn.checked = false;
    }
}

function parseSearchParams() {
    const resultsContainer = document.getElementById('results-container');
    
    
    if (resultsContainer) {
        const params = new URLSearchParams(window.location.search);

        if (params.size === 0) {
            resultsContainer.innerHTML = "<p>No Data submitted.</p>";
        } else {
            resultsContainer.innerHTML = ""; 

            params.forEach((value, key) => {
                const row = document.createElement('div');
                row.className = 'grid-row';

                const keyDiv = document.createElement('div');
                keyDiv.className = 'label';
                keyDiv.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ":";

                const valueDiv = document.createElement('div');
                valueDiv.className = 'value';
                valueDiv.textContent = value;

                row.appendChild(keyDiv);
                row.appendChild(valueDiv);
                resultsContainer.appendChild(row);
            });
        }
    }
}