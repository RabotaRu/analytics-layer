import { capitalize, isObject, noop } from "./utils";

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
   * @type {Array<*>}
   * @private
   */
  _staticCounters = null;

  /**
   * @type {Array<string|number>}
   * @private
   */
  _staticCountersIds = null;

  /**
   * @type {Array<*>}
   * @private
   */
  _dynamicCounters = [];

  /**
   * @type {Array<string|number>}
   * @private
   */
  _dynamicCountersIds = null;

  /**
   * @type {boolean}
   * @private
   */
  _logging = false;

  /**
   * @param {Array<string|number>} counters
   * @param {boolean} logging
   */
  constructor ({ staticCounters, dynamicCounters = [], logging = false } = {}) {
    this._staticCounters = staticCounters;
    this._staticCountersIds = this.resolveCountersIds( staticCounters );

    this._dynamicCounters = dynamicCounters;
    this._dynamicCountersIds = this.resolveCountersIds( dynamicCounters );

    this._logging = logging;
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
   * @param {Array<string|number>} counters
   */
  setStaticCounters (counters = []) {
    this._staticCounters = counters;
  }

  /**
   * @param {Array<string|number>} counters
   */
  setDynamicCounters (counters = []) {
    this._dynamicCounters = counters;
  }

  /**
   * @param {boolean} logging
   */
  setLogging (logging = true) {
    this._logging = logging;
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
   * Set visit params for all counters
   *
   * @param {Object} params
   */
  setParams (params = {}) {
  }

  /**
   * Set visit params for specific counter
   *
   * @param {string|number} counterId
   * @param {Object} params
   */
  setParamsTo (counterId, params = {}) {
  }

  /**
   * @param {*} args
   */
  pushAll (...args) {
    this.eachIds(id => this.pushTo( id, ...args ));
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
   * @param {Function} fn
   */
  eachIds (fn = noop) {
    const countersIds = this.countersIds;

    for (let i = 0; i < countersIds.length; ++i) {
      fn && fn( countersIds[ i ] );
    }
  }

  /**
   * @param {Array<>} counters
   */
  resolveCountersIds (counters = []) {
    return [].concat( counters ).map(counter => {
      return isObject( counter )
        ? counter.id
        : counter;
    });
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
   * @return {Array<*>}
   */
  get staticCounters () {
    return this._staticCounters;
  }

  /**
   * @return {Array<string|number>}
   */
  get staticCountersIds () {
    return this._staticCountersIds;
  }

  /**
   * @return {Array<*>}
   */
  get dynamicCounters () {
    return this._dynamicCounters || [];
  }

  /**
   * @return {Array<string|number>}
   */
  get dynamicCountersIds () {
    return this._dynamicCountersIds || [];
  }

  /**
   * @return {Array<*>}
   */
  get counters () {
    return [
      ...this._staticCounters,
      ...this._dynamicCounters
    ];
  }

  /**
   * @return {Array<string|number>}
   */
  get countersIds () {
    return [
      ...this._staticCountersIds,
      ...this._dynamicCountersIds
    ];
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
