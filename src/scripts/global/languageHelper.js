function setDocumentLanugage() {
  if (window.location.pathname === '/') {
    document.documentElement.lang = 'en';
  } else {
    const regexPattern = /en/;
    document.documentElement.lang = regexPattern.test(window.location.pathname) ? 'en' : 'de';
  }
}
setDocumentLanugage();
