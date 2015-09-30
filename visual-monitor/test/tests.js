'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');
var projectName = 'Yadvashem';

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=iphone5 mocha

var capsConfig = {
  'chrome': {
    project: projectName,
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    project: projectName,
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  }
};

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://www.yadvashem.org';

var resultsCallback = process.env.DEBUG ? console.log : shoovWebdrivercss.processResults;

describe('Visual monitor testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the home page',function(done) {
    client
      .url(baseUrl)
      .pause(5000)
      .click('a.pp_close')
      .webdrivercss(testName + '.homepage', {
        name: '1',
        exclude:
          [
            // Top sidebar.
            '.slider-wrapper',
            // Online store.
            '.ym-gbox-left'
          ],
        remove:
          [
            // Social Networks.
            '.sticky-container',
          ],
        hide:
          [
            // articles.
            '.ym-grid li a',
            '#featured_items'
          ],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the education page',function(done) {
    client
      .url(baseUrl + '/yv/en/education/index.asp')
      .webdrivercss(testName + '.education', {
        name: '1',
        exclude:
          [
            // Top sidebar.
            '#slideshow',
            // Online store.
            '.ym-gbox-left',
            // Educational materials.
            'ym-gbox-right img',
            // Recurring events.
            '.ym-gbox-left img',
          ],
        remove:
          [
            // Social Networks.
            '.sticky-container',
          ],
        hide:
          [
            // articles.
            '.ym-grid li a',
            '#featured_items',
            //Special Focus from the e-Newsletter
            '.ym-gbox-left strong',
            '.ym-gbox-left p',
          ],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });
});
