/**
 * Injects a <style> tag into the document head.
 * Will not inject again if style with same id already exists.
 * 
 * @param {string} id - A unique ID for the style tag
 * @param {string} css - The CSS content to inject
 */

export function injectStyles(id, css) {
  if (document.getElementById(id)) return;

  const styleEl = document.createElement('style');
  styleEl.id = id;
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
};