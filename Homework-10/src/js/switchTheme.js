const refs = {
  bodyTheme: document.querySelector('body'),
  buttonSwitchTheme: document.querySelector(
    'button[data-action="theme-switch"]',
  ),
  toolbarIcons: document.querySelector('.toolbar__icon'),
};

const themeData = {
  light: ['theme-light', 'wb_sunny'],
  dark: ['theme-dark', 'brightness_3'],
};

const previousTheme = localStorage.getItem('theme');

if (previousTheme === themeData.dark[0]) {
  switchTheme(themeData.dark);
} else {
  switchTheme(themeData.light);
}

refs.buttonSwitchTheme.addEventListener('click', handleChangeTheme);
function handleChangeTheme(e) {
  if (!refs.bodyTheme.classList.toggle(themeData.light[0])) {
    addLocalStorage(themeData.dark);
  } else {
    refs.bodyTheme.classList.remove(themeData.dark[0]);
    addLocalStorage(themeData.light);
  }
}

function switchTheme(theme) {
  refs.bodyTheme.classList.add(theme[0]);
  refs.toolbarIcons.textContent = theme[1];
}

function addLocalStorage(theme) {
  localStorage.setItem('theme', theme[0]);
  switchTheme(theme);
}
