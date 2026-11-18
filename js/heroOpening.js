/** Select one still hero per page opening; alternate on subsequent visits. */
(function () {
  var hero = Math.random() < 0.5 ? 'football' : 'soccer';
  try {
    var last = localStorage.getItem('hardkor-last-hero');
    if (last === 'football') hero = 'soccer';
    else if (last === 'soccer') hero = 'football';
    localStorage.setItem('hardkor-last-hero', hero);
  } catch (_) {
    // Random selection still works when browser storage is unavailable.
  }
  document.documentElement.dataset.hero = hero;
})();
