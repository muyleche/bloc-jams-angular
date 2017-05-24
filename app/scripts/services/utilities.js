class Utilities {
  /**
   * Function for looping through an array to execute a function on each element.
   * @param  {Array} array   array to loop through.
   * @param  {function(item,index)} handler the function you wish to execute on each item in the array.
   */
  forEach(array, handler) {
    for (var i = 0; i < array.length; i++) {
      handler(array[i], i);
    }
  }

  /**
   * Function to pad a number with the zeros until it is as many characters long as desired.
   * @param  {Number} number     The number to pad.
   * @param  {Number} [digits=0] The number of characters long the final string should be.
   * @return {String}            String representing left-padded version of provided number.
   */
  numberPadLeft(number, digits = 0) {
    var string = number.toString(),
        i;
    for (i = 0, digits -= string.length; i < digits; i++) {
      string = "0" + string;
    }
    return string;
  }

  /**
   * Function for converting the query param to JSON.
   * @return {JSON} A JSON object representing the search query parameter on the URL.
   */
  getHtmlQueryAsJson () {
    var query = location.search.substring(1),
        params = query.split('&'),
        paramLength = params.length,
        i,
        split,
        result = {};
    for (i = 0; i < paramLength; i++) {
      split = params[i].split('=');
      result[split[0]] = split[1];
    }
    return result;
  }

  /**
   * Given a DOM element, get the first parent element that has the provided CSS class.
   * @param  {DOMelement} element
   * @param  {String}     className
   * @return {DOMelement}
   */
  getFirstParentByClassName (element, className) {
    if (!element) {console.log('No parent found');}
    else {
      while (element && !element.classList.contains(className)) {
        element = element.parentElement;
      }
      if (!element) {console.log('No parent found with class name: '+className);}
    }
    return element;
  }

  /**
   * Add the provided CSS class to all the provided DOM elements.
   * @param {String}          classToAdd
   * @param {...DOMelements}  elements
   */
  addClass(classToAdd, ...elements) {
    forEach(elements, (element) => {
      if (element && element.className.indexOf(classToAdd) < 0)
        element.className += ` ${classToAdd}`;
      else if (!element)
        console.log('Element was not found.');
    });
  }

  /**
   * Remove the provided CSS class from all the provided DOM elements.
   * @param {String}          classToRemove
   * @param {...DOMelements}  elements
   */
  removeClass(classToRemove, ...elements) {
    forEach(elements, (element) => {
      if (element)
        element.className = element.className.replace(RegExp(classToRemove,'g'), '').trim();
      else
        console.log('Element was not found.');
    });
  }

  /**
   * Return the total number of seconds represented by the provided duration string with format: mm:ss.secondsToDurationString
   * @param  {String} str
   * @return {Number}
   */
  durationStringToSeconds(str) {
    return (str ? parseInt(str.split(':')[0],10) : 0)*60
          +(str ? parseInt(str.split(':')[1],10) : 0);
  }

  /**
   * Return the time duration with format: mm:ss of the provided number of seconds.
   * @param  {Number} str
   * @return {String}
   */
  secondsToDurationString(seconds) {
    return Math.floor(seconds/60)+':'+this.numberPadLeft(Math.round(seconds)%60,2)
  }
}
