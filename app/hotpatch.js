/* globals */
/* eslint-disable prefer-rest-params */
window.console.logOrig = window.console.logOrig || window.console.log;
window.console.lastLog = null;
window.console.log = function log() {
  const str = [...arguments].join(' ');
  if (/\[HMR\] bundle rebuilt in/.test(str)) window.location.reload(); // hot reloading

  if (str === window.console.lastLog) return; // ignore duplicate messages
  window.console.lastLog = str;
  window.console.logOrig.call(this, ...arguments);
};
