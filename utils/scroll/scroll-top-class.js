
var scroll = require('./scroll-basic');

scroll.on(function () {
  document.documentElement.classList.toggle('scroll-top', !scrollRoot.scrollTop);
});

_.on(document, 'page:updated', function () {
  document.documentElement.classList.add('scroll-top');
});
document.documentElement.classList.add('scroll-top');