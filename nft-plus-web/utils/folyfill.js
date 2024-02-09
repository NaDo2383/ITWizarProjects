// array-filter-polyfill.js
if (!Array.prototype.filter) {
    Array.prototype.filter = function(callback, thisArg) {
      if (this == null) {
        throw new TypeError('Array.prototype.filter called on null or undefined');
      }
  
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
  
      var filteredArray = [];
      var array = Object(this);
      var len = array.length >>> 0;
  
      for (var i = 0; i < len; i++) {
        if (i in array) {
          var element = array[i];
  
          // Invoke the callback with the specified this value
          // and arguments: currentValue, index, array
          if (callback.call(thisArg, element, i, array)) {
            filteredArray.push(element);
          }
        }
      }
  
      return filteredArray;
    };
  }