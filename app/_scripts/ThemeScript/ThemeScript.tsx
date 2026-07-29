import { THEME_STORAGE_KEY } from '@/constants'

const themeScript = `
  (function() {
    const getSystemTheme = () =>                                                                   window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const getCookie = (name) => {                                                                  const prefix = encodeURIComponent(name) + '=';
      const cookie = document.cookie
        .split('; ')                                                                                 .find((item) => item.startsWith(prefix));

      return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null;
    };

    const savedTheme = getCookie('${THEME_STORAGE_KEY}');
    const theme = ['dark', 'light', 'system'].includes(savedTheme) ? savedTheme : 'system';
      const activeTheme = theme === 'system' ? getSystemTheme() : theme;

                           document.documentElement.classList.remove('light', 'dark');                                  document.documentElement.classList.add(activeTheme);
    document.documentElement.style.colorScheme = activeTheme;                                  })();                                                                                      `

const ThemeScript = () => {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />
}

export default ThemeScript
