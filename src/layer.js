import { capitalize, noop } from "./utils";

export class Layer {

  /**
   * @type {string}
   * @private
   */
  _provider = '';

  /**
   * @type {string}
   * @private
   */
  _layerName = '';

  /**
   * @type {string|number}
   * @private
   */
  _counter = null;

  /**
   * @type {Array<string|number>}
   * @private
   */
  _includedCounters = [];

  /**
   * @type {Object}
   * @private
   */
  _options = {};

  /**
   * @type {boolean}
   * @private
   */
  _logging = false;

  /**
   * @param {Array<string|number>} counters
   * @param {boolean} logging
   */
  constructor ({ counter, includeCounters = [], logging = false, options = {} } = {}) {
    this._counter = counter;
    this._includedCounters = includeCounters;
    this._logging = logging;
    this._options = options;
  }

  /**
   * @param {string} provider
   */
  setProvider (provider) {
    this._provider = provider;
  }

  /**
   * @param {string} layerName
   */
  setLayer (layerName) {
    this._layerName = layerName;
  }

  /**
   * @param {string|number} counterId
   */
  setCounter (counterId) {
    this._counter = counterId;
  }

  /**
   * @param {Array<string|number>} counters
   */
  setIncludedCounters (counters = []) {
    this._includedCounters = counters;
  }

  /**
   * @param {boolean} logging
   */
  setLogging (logging = true) {
    this._logging = logging;
  }

  /**
   * @param {Object} options
   */
  setOptions (options = {}) {
    this._options = options;
  }

  /**
   * @param {Array<string|number>?} counters
   * @param {Object?} options
   * @abstract
   */
  init (counters = [], options = {}) {
  }

  /**
   * @param {string} eventName
   * @param {*} params
   * @param {*} args
   */
  event (eventName, params = {}, ...args) {
  }

  /**
   * @param {string|number} counterId
   * @param {string} eventName
   * @param {*} params
   * @param {*} args
   */
  eventTo (counterId, eventName, params = {}, ...args) {
  }

  /**
   * @param {string} toPath
   * @param {string} fromPath
   * @param {*} opts
   */
  hit (toPath, fromPath = null, opts = {}) {
  }

  /**
   * @param {string|number} counterId
   * @param {string} toPath
   * @param {string} fromPath
   * @param {*} opts
   */
  hitTo (counterId, toPath, fromPath = null, opts = {}) {
  }

  /**
   * @param {*} args
   */
  pushAll (...args) {
    this.each(id => this.pushTo( id, ...args ));
  }

  /**
   * @param {string|number|Array} counters
   * @param {*} args
   * @abstract
   */
  pushTo (counters, ...args) {
  }

  /**
   * @param {*} args
   */
  push (...args) {
    if (typeof window === 'undefined') {
      return;
    }

    if (this._logging) {
      this._log( ...args );
    }

    window[ this._layerName ]( ...args );
  }

  /**
   * @param {Function} fn
   */
  each (fn = noop) {
    const counters = this.counters;

    for (let i = 0; i < counters.length; ++i) {
      fn && fn( counters[ i ] );
    }
  }

  /**
   * @return {string}
   */
  get provider () {
    return this._provider;
  }

  /**
   * @returns {string}
   */
  get layerName () {
    return this._layerName;
  }

  /**
   * @return {string|number}
   */
  get mainCounter () {
    return this._counter;
  }

  /**
   * @return {Array<string|number>}
   */
  get includedCounters () {
    return this._includedCounters || [];
  }

  /**
   * @return {Array<string|number>}
   */
  get counters () {
    return [ this._counter, ...this._includedCounters ];
  }

  /**
   * Analytics service options
   *
   * @return {Object}
   */
  get options () {
    return this._options;
  }

  /**
   * @param args
   * @private
   */
  _log (...args) {
    console.log(
      `[Analytic service: ${capitalize( this._provider )}]`,
      ...args
    );
  }
}
