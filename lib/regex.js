/**
 * angular-addtocalendar
 * An AngularJS directive for adding an event to calendar apps. 
 * 
 * Regular expression library for testing angular-addtocalendar features.
 * Library exists specifically for testing.
 */
'use strict';

var CalendarRegex;

(function() {

  /* universal timestamp format */
  var dateRegex = '[0-9]{8}T[0-9]{6}';

  /**
   * Escapes a string so it is treated literally in regex.
   * 
   * @param  {String} s  string to escape
   * @return {String}    escape string
   */
  function escapeRegex(s) {

    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  }

  /**
   * Returns a regular expression for a calendar service url.
   * 
   * @param  {String} baseUrl   the host name of the calendar service
   * @param  {Object} urlParams query string parameters to send
   * @return {RegExp}           regular expression of cal. service url
   */
  function getUrlRegex(baseUrl, urlParams) {

  	var regex = 'http(s?)\\:\\/\\/' + escapeRegex(baseUrl) + '\\?';
  	var params = [];

  	for(var key in urlParams) { 
  		params.push(key + '\=' + urlParams[key]);
  	}

  	regex += params.join('\\&');

  	return new RegExp(regex, 'g');

  }

  /**
   * Renders the regex for testing a .ics and its download prefix.
   * 
   * @return {RegExp} regex of ics
   */
  function getIcsCalendarRegex() {

    var regex = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'CLASS:PUBLIC',
      'DESCRIPTION:(.*)',
      'DTSTART:' + dateRegex,
      'DTEND:' + dateRegex,
      'LOCATION:(.*)',
      'SUMMARY:(.*)',
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    return new RegExp(regex, 'g');
    
  }

  CalendarRegex = {
    dateRegex: dateRegex,
    getUrlRegex: getUrlRegex,
    getIcsCalendarRegex: getIcsCalendarRegex
  }
  
})();