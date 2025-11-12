const ICONS = {
  sun: `<path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 14.32l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM1 13h3v-2H1v2zm19 0h3v-2h-3v2zM12 7a5 5 0 100 10 5 5 0 000-10zm-1-7h2v3h-2V0zm0 18h2v3h-2v-3zM4.22 19.78l1.41 1.41 1.8-1.79-1.41-1.41-1.8 1.79zM18.36 4.64l1.8-1.79-1.41-1.41-1.79 1.8 1.4 1.4z"/>`,
  moon: `<path d="M21.75 15.5A9 9 0 0110.5 2.25 9 9 0 1021.75 15.5z"/>`
};

const toggleBtn = document.getElementById('theme-toggle');
const iconEl = document.getElementById('theme-icon');

function initialTheme(){
  const saved = localStorage.getItem('theme');
  if(saved) return saved;
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}

function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  iconEl.innerHTML = theme === 'light' ? ICONS.moon : ICONS.sun;
}

let theme = initialTheme();
applyTheme(theme);

toggleBtn.addEventListener('click', () => {
  theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(theme);
  localStorage.setItem('theme', theme);
});
