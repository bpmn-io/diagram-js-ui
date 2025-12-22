/// <reference types="webpack/module.d.ts" />

import './globals.js';

const allTests = import.meta.webpackContext('.', {
  recursive: true,
  regExp: /Spec\.js$/,
});

allTests.keys().forEach(allTests);