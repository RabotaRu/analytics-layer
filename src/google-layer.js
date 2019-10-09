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
    options = Object.assign(
      {
        'custom_map': {
          'dimension0': 'client_id'
        }
      },
      options
    );

    this.pushAll( 'config', options );
  }

  /**
   * @param {string} eventName
   * @param {*} params
   * @param {*} args
   */
  event (eventName, params = {}, ...args) {
    this.pushAll( eventName, params, ...args );
  }

  /**
   * @param {string} counterId
   * @param {string} eventName
   * @param {*} params
   * @param {*} args
   */
  eventTo (counterId, eventName, params = {}, ...args) {
    this.pushTo( counterId, eventName, params, ...args );
  }

  /**
   * @param {string|number} counterId
   * @param {*} args
   */
  pushTo (counterId, ...args) {
    const eventName = args[0];
    const lastArg = last( args );
    const hasExternalParams = isObject( lastArg );
    const externalParams = ( hasExternalParams && lastArg ) || {};

    if (eventName === 'hit' || eventName === 'config') {
      const secondArg = args[1];
      const hasPathTo = typeof secondArg === 'string' && /^\//g.test( secondArg );
      const pathTo = hasPathTo
        ? { 'page_path': secondArg }
        : {};
      const eventParams = Object.assign(
        pathTo,
        externalParams
      );

      return this.push( 'config', counterId, eventParams );
    }

    const eventParams = Object.assign(
      { 'send_to': counterId },
      externalParams
    );

    return this.push( 'event', eventName, eventParams );
  }
}
