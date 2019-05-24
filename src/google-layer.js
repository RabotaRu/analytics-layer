import { Layer } from "./layer";
import { isObject, last } from './utils';

const GOOGLE_LAYER_KEY = 'gtag';
const GOOGLE_PROVIDER_NAME = 'google';

export class GoogleLayer extends Layer {

  /**
   * @param {Object} params
   */
  constructor (params) {
    super( params );

    this.setLayer( GOOGLE_LAYER_KEY );
    this.setProvider( GOOGLE_PROVIDER_NAME );
  }

  /**
   * Init all GA counters
   *
   * @param {string|Array<*>?} counters
   * @param {*} options
   */
  init (counters = this.counters, options = {}) {
    const ids = this.resolveCountersIds( counters );

    [].concat( ids || [] ).forEach(id => this.push( 'config', id, options ));
  }

  /**
   * @param {string} actionName
   * @param {*} params
   * @param {*} args
   */
  event (actionName, params = {}, ...args) {
    this.pushAll( 'event', actionName, params, ...args );
  }

  /**
   * @param {string} counterId
   * @param {string} eventName
   * @param {*} params
   * @param {*} args
   */
  eventTo (counterId, eventName, params = {}, ...args) {
    this.pushTo( counterId, 'event', eventName, params, ...args );
  }

  /**
   * @param {string} toPath
   * @param {string} fromPath
   * @param {*} opts
   */
  hit (toPath, fromPath = null, opts = {}) {
    const mergedOptions = Object.assign(
      {}, opts, { 'page_path': toPath || '/' }
    );

    this.init( this.counters, mergedOptions );
  }

  /**
   * @param {string|number} counterId
   * @param {string} toPath
   * @param {string} fromPath
   * @param {*} opts
   */
  hitTo (counterId, toPath, fromPath = null, opts = {}) {
    const mergedOptions = Object.assign(
      {}, opts, { 'page_path': toPath || '/' }
    );

    this.init(
      [].concat( counterId ),
      mergedOptions
    );
  }

  /**
   * @param {*} args
   */
  pushAll (...args) {
    this.push( ...args );
  }

  /**
   * @param {string|Array<string>} counters
   * @param {*} args
   */
  pushTo (counters, ...args) {
    [].concat( counters || [] ).forEach(id => {
      const params = last( args );
      const hasParams = isObject( params );

      // create new object with params
      const newParams = Object.assign({
        'send_to': id
      }, params || {});

      if (hasParams) {
        // remove last argument only if we have params as last argument
        args.pop();
      }

      // push arguments with created params
      this.push( ...args, newParams );
    });
  }
}
