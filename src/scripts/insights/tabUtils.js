function initializeTabs() {
  const storageKey = 'previousTabId';
  const tabLinks = document.querySelectorAll('[fs-anchor-element="tab"]');

  if (tabLinks.length === 0) return;
  const chosenTabId = sessionStorage.getItem(storageKey);

  tabLinks.forEach((tabLink) => {
    const currentTabId = tabLink.getAttribute('data-w-tab');

    if (chosenTabId === currentTabId) {
      const tabEvent = new CustomEvent('click');
      tabLink.dispatchEvent(tabEvent);
    }

    tabLink.addEventListener('click', () => {
      if (currentTabId) {
        sessionStorage.setItem(storageKey, currentTabId);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.Webflow && window.Webflow.push) {
    window.Webflow.push(initializeTabs);
  } else {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') {
        initializeTabs();
      }
    });
  }
});
