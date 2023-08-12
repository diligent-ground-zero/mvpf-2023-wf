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
  let hasResized = false;
  let lastScreenWidth = window.innerWidth;

  const triggerNavMenuClose = () => {
    if (
      document.querySelector('nav[data-nav-menu-open]') ||
      (window.innerWidth > 992 && document.body.style.overflow === 'hidden')
    ) {
      document.querySelector('.nav-menu-button').click();
    }
  };

  const render = () => {
    const pageX = window.innerWidth;
    let hasResized = pageX !== lastScreenWidth;
    if (document.querySelector('nav[data-nav-menu-open]') && document.body.style.overflow === 'hidden' && hasResized) {
      document.querySelector('.nav-menu-button').click();
    }
    hasResized = false;
    lastScreenWidth = pageX;
  };

  const onResize = () => {
    if (!hasResized) {
      window.requestAnimationFrame(render);
    }
    window.requestAnimationFrame(onResize);
  };
  onResize();
}

export function saveCampaignUtmPatameters() {
  if (window.location.search.length === 0 && sessionStorage.length === 0) return;

  const validUtms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

  const searchParams =
    window.location.search.length === 0 ? getParamsFromSessionStorage(validUtms) : window.location.search;
  const searchParamsObject = new URLSearchParams(searchParams);
  for (const [key, value] of searchParamsObject) {
    if (validUtms.includes(key)) {
      sessionStorage.setItem(key, value);
    }
  }
  populateHiddenFormFields(searchParams);
}

function getParamsFromSessionStorage(validUtms) {
  const filteredSearchParamStrings = new URLSearchParams();
  for (const paramName of validUtms) {
    const parameterValue = sessionStorage.getItem(paramName);
    if (parameterValue !== null) {
      filteredSearchParamStrings.append(paramName, parameterValue);
    }
  }
  return filteredSearchParamStrings.toString();
}

function populateHiddenFormFields(searchParams) {
  document.querySelectorAll('input[type="text"][name="utm-parameters"].utm-parameters').forEach((input) => {
    input.value = searchParams;
  });

  document.querySelectorAll('input[type="text"][name="pathname-field"].pathname-field').forEach((input) => {
    input.value = window.location.pathname;
  });
}

export function initHeaderScrollClassScript() {
  const header = document.querySelector('div.navbar');
  const scrollingClass = '--scrolled';
  let hasScrolled = false;
  let lastScrollTop = 0;

  const config = {
    scrollingClass: '--scrolled',
    downTolerance: 4,
  };

  const render = () => {
    const pageY = window.scrollY;

    if (pageY > lastScrollTop + config.downTolerance) {
      header.classList.add(scrollingClass);
    }

    if (pageY <= config.downTolerance) {
      header.classList.remove(scrollingClass);
    }

    lastScrollTop = pageY;
    hasScrolled = false;
  };

  const onScroll = () => {
    if (!hasScrolled) {
      window.requestAnimationFrame(render);
    }
    hasScrolled = true;
    window.requestAnimationFrame(onScroll);
  };
  onScroll();
}
