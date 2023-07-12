export default function addPersonioLanugageSuffixToButtons(language) {
  const languages = ['en', 'de'];
  if (languages.includes(language)) {
    document.querySelectorAll('.positions-cms-list .positions-cms-item .positions-row').forEach(function (element) {
      const linkButtonElement = element.lastElementChild?.firstChild;
      if (linkButtonElement) {
        linkButtonElement.setAttribute('href', linkButtonElement.getAttribute('href') + `?display=${language}`);
      }
    });
  }
}
