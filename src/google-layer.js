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
   * Init all yandex metrika counters
   *
   * @param {string|Array<string>} counters
   */
  init (counters = this.counters) {
    [].concat( counters || [] ).forEach(id => {
      this.push( 'config', id );
    });
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
