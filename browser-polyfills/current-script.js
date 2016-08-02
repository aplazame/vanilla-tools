
document.currentScript = document.currentScript || (function() {
   var scripts = document.getElementsByTagName('script');
   return scripts[scripts.length - 1];
 })();