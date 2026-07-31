/* privacy-friendly analytics — GoatCounter (no cookies, no fingerprinting, GDPR-safe).
   OFF until SITE is filled in:
   1. create a free account at goatcounter.com (2 min)
   2. put your code below, e.g. var SITE = 'lizzymcwired';
   3. commit. that's the whole setup.
   conversions: a pageview of /thanks/?from=book IS a booking-form submission;
   ?from=lab = waitlist; no param = newsletter. no extra events needed. */
(function () {
  'use strict';
  var SITE = ''; /* <- goatcounter site code goes here */
  if (!SITE) return;
  window.goatcounter = { path: location.pathname + location.search };
  var s = document.createElement('script');
  s.async = true;
  s.dataset.goatcounter = 'https://' + SITE + '.goatcounter.com/count';
  s.src = 'https://gc.zgo.at/count.js';
  document.head.appendChild(s);
}());
