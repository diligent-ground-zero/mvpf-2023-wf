export function setCurrentYearLabel() {
  const yearSelector = '[fs-hacks-element="footer-year"]';
  const yearSpan = document.querySelector(yearSelector);
  if (!yearSpan) return;
  const currentYear = new Date().getFullYear();
  yearSpan.innerText = currentYear.toString();
}

export function populateHiddenInputFields() {
  const pathInputList = document.querySelectorAll('input[name="pathname-field"]');
  for (let i = 0; i < pathInputList.length; i++) {
    pathInputList[i].value = location.href;
  }
}

export function mountOnResizeListener() {
  let resizeTimeout;

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      triggerNavMenuClose();
    }, 50);
  });

  const triggerNavMenuClose = () => {
    if (document.querySelector('nav[data-nav-menu-open]')) {
      document.querySelector('.nav-hamburger-icon').click();
    }
  };
}

export function saveCampaignUtmPatameters() {
  const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  const urlParams = new URLSearchParams(window.location.search);
  const filteredSearchParamStrings = new URLSearchParams();
  for (const [key, value] of urlParams) {
    if (utms.includes(key)) {
      sessionStorage.setItem(key, value);
      filteredSearchParamStrings.append(key, value);
    }
  }
  populateHiddenFormFields(filteredSearchParamStrings);
}

export function populateHiddenFormFields(filteredSearchParamStrings) {
  const utmParametersToString = filteredSearchParamStrings.toString();
  document.querySelectorAll('input[type="text"][name="utm-parameters"].utm-parameters').forEach((input) => {
    input.value = utmParametersToString;
  });

  document.querySelectorAll('input[type="text"][name="pathname-field"].pathname-field').forEach((input) => {
    input.value = window.location.pathname;
  });
}
