// Alert when move to other page
//     https://www.sejuku.net/blog/25316
window.addEventListener('beforeunload', function (e) {
  e.returnValue = 'REALLY MOVE?';
});
