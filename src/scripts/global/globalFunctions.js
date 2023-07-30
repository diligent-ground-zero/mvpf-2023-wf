const debounce = (fn) => {
  let frame;
  return (...params) => {
    if (frame) { 
      cancelAnimationFrame(frame);
    }
    frame = requestAnimationFrame(() => {
      fn(...params);
    });
  } 
};

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
  const triggerNavMenuClose = () => {
    if (
      document.querySelector('nav[data-nav-menu-open]') ||
      (window.innerWidth > 992 && document.body.style.overflow === 'hidden')
    ) {
      document.querySelector('.nav-menu-button').click();
    }
  };

  window.addEventListener('resize', debounce(triggerNavMenuClose), { passive: true });

}

export function saveCampaignUtmPatameters() {
  const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  const filteredSearchParamStrings = new URLSearchParams();
  const searchParams =
    window.location.search.length === 0
      ? getParamsFromSessionStorage(utms, filteredSearchParamStrings)
      : window.location.search;
  const searchParamsObject = new URLSearchParams(searchParams);
  for (const [key, value] of searchParamsObject) {
    if (utms.includes(key)) {
      sessionStorage.setItem(key, value);
      filteredSearchParamStrings.append(key, value);
    }
  }
  populateHiddenFormFields(filteredSearchParamStrings);
}

function getParamsFromSessionStorage(utms, filteredSearchParamStrings) {
  for (const paramName of utms) {
    const parameterValue = sessionStorage.getItem(paramName);
    if (parameterValue !== null) {
      filteredSearchParamStrings.append(paramName, parameterValue);
    }
  }
  return filteredSearchParamStrings.toString();
}

function populateHiddenFormFields(filteredSearchParamStrings) {
  const utmParametersToString = filteredSearchParamStrings.toString();
  document.querySelectorAll('input[type="text"][name="utm-parameters"].utm-parameters').forEach((input) => {
    input.value = utmParametersToString;
  });

  document.querySelectorAll('input[type="text"][name="pathname-field"].pathname-field').forEach((input) => {
    input.value = window.location.pathname;
  });
}

export function initHeaderScrollClassScript() {
  const navbar = document.querySelector('div.navbar');  
  const navbarHeight = navbar.clientHeight;

  const adjustHeaderClass = () => {
    if((window.scrollY >= navbarHeight) && !navbar.classList.contains('--scrolled')) {
      navbar.classList.add('--scrolled');
    } else if(window.scrollY === 0){
      navbar.classList.remove('--scrolled');
    }
  }
  document.addEventListener('scroll', debounce(adjustHeaderClass), { passive: true });
  adjustHeaderClass();
}