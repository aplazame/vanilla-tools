
var triggerEvent = document.createEvent ? function (element, eventName, data) {
      var event = document.createEvent("HTMLEvents");
      event.data = data;
      event.initEvent(eventName, true, true);
      element.dispatchEvent(event);
      return event;
    } : function (element, eventName, data) {
      var event = document.createEventObject();
      event.data = data;
      element.fireEvent("on" + eventName, event);
      return event;
    };

module.exports = {
  on: function (el, eventName, handler, useCapture) {
    if( _.isString(el) ) {
      return document.documentElement.addEventListener(el, eventName, handler);
    }
    return el.addEventListener(eventName, handler, useCapture);
  },
  off: function (el, eventName, handler, useCapture) {
    if( _.isString(el) ) {
      return document.documentElement.removeEventListener(el, eventName, handler);
    }
    return el.removeEventListener(eventName, handler, useCapture);
  },
  triggerEvent: triggerEvent
};