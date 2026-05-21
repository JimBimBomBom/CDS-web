/**
 * App state management + cookie helpers
 */

export function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 864e5);
  document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax';
}

export function getCookie(name) {
  const match = document.cookie.match('(^|;)\\s*' + name + '=([^;]*)');
  return match ? decodeURIComponent(match[2]) : null;
}

let rerenderFn = null;

export function setRerender(fn) {
  rerenderFn = fn;
}

export function triggerRerender() {
  if (rerenderFn) rerenderFn();
}

export const state = {
  city1: null,
  city2: null,
  language: null,
  theme: null,
};

export function loadState() {
  state.theme = getCookie('cds_theme');
  state.language = getCookie('cds_lang');
}

export function saveState() {
  if (state.theme) setCookie('cds_theme', state.theme, 365);
  if (state.language) setCookie('cds_lang', state.language, 365);
}
