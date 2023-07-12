function setDefaultConsent() {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 5000,
  });
  gtag('set', 'url_passthrough', true);
  gtag('set', 'ads_data_redaction', true);
}
setDefaultConsent();
