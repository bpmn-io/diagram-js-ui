import {
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
  useState
} from 'preact/hooks';

import { html } from 'htm/preact';

import {
  render
} from 'preact';


/**
 * A module that provides preact utilities.
 */
export default function DiagramJSui() {}

/**
 * Provides an html wrapper for preact.
 * html`@param {string} html`
 * @returns {Object} preact html
 */
DiagramJSui.prototype.html = html;

/**
 *
 * @type {import('htm/preact').render}
 */
DiagramJSui.prototype.render = function(component, container) {
  render(component, container);
};

/**
 * @returns {Object<string,function>} preact hooks:
 * useState, useRef, useLayoutEffect, useCallback, useEffect
 */
DiagramJSui.prototype.getHooks = function() {
  return {
    useRef,
    useLayoutEffect,
    useCallback,
    useEffect,
    useState
  };
};