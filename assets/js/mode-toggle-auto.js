// https://www.aleksandrhovhannisyan.com/blog/the-perfect-theme-switch/ (2023-11-21)

(function () {
  const Theme = { AUTO: 'auto', LIGHT: 'light', DARK: 'dark' };
  const THEME_STORAGE_KEY = 'theme';
  const THEME_OWNER = document.documentElement;

  const cachedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (cachedTheme) {
    THEME_OWNER.dataset[THEME_STORAGE_KEY] = cachedTheme;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const themePicker = document.getElementById('theme-picker');
    if (!themePicker) return;

    themePicker.addEventListener('change', (e) => {
      const theme = e.target.value;
      if (theme === Theme.AUTO) {
        delete THEME_OWNER.dataset[THEME_STORAGE_KEY];
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        THEME_OWNER.dataset[THEME_STORAGE_KEY] = theme;
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      }
    });

    const initialTheme = cachedTheme ?? Theme.AUTO;
    themePicker.querySelector('input[checked]').removeAttribute('checked');
    themePicker.querySelector(`input[value="${initialTheme}"]`).setAttribute('checked', '');
  });
})();
