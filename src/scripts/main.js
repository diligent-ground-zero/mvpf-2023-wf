import '../styles/style.css';

document.addEventListener('DOMContentLoaded', () => {
  const setHtmlLangAttr = () => {
    const regexPattern = /en/;
    document.documentElement.lang = regexPattern.test(window.location.pathname) ? 'en' : 'de';
  };

  const setCurrentYearLabel = () => {
    const YEAR_SELECTOR = '[fs-hacks-element="footer-year"]';
    const yearSpan = document.querySelector(YEAR_SELECTOR);
    if (!yearSpan) return;
    const currentYear = new Date().getFullYear();
    yearSpan.innerText = currentYear.toString();
  };

  const populateHiddenInputFields = () => {
    const pathInputList = document.querySelectorAll('input[name="pathname-field"]');
    for (let i = 0; i < pathInputList.length; i++) {
      pathInputList[i].value = location.href;
    }
  };

  const mountOnResizeListener = () => {
    let resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        triggerNavMenuClose();
      }, 100);
    });
    const triggerNavMenuClose = () => {
      if (document.querySelector('nav[data-nav-menu-open]')) {
        document.querySelector('.nav-hamburger-icon').click();
      }
    };
  };

  mountOnResizeListener();
  populateHiddenInputFields();
  setHtmlLangAttr();
  setCurrentYearLabel();
});
