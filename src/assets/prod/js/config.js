// =====================================================
// Loading config.json properties.
// =====================================================

const REQUEST = new XMLHttpRequest();
REQUEST.open(`GET`, `assets/config.json`, false);
REQUEST.send();

if (REQUEST.status && (typeof window != 'undefined' && window.document)) {
  const RESPONSE = JSON.parse(REQUEST.responseText);
  window = Object.assign(window, RESPONSE);
}
