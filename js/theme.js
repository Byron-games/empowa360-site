/* Runs in <head> before first paint so there is no flash of the wrong theme. */
(function () {
  var t = 'light';
  try { t = localStorage.getItem('e360:theme') === 'dark' ? 'dark' : 'light'; } catch (e) {}
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.classList.add('js');
})();
