import { Layer } from "./layer";

const YANDEX_LAYER_KEY = 'ym';
const YANDEX_PROVIDER_NAME = 'yandex';

export class YandexLayer extends Layer {

  /**
   * @param {Object} params
   */
  constructor (params) {
    super( params );

    this.setLayer( YANDEX_LAYER_KEY );
    this.setProvider( YANDEX_PROVIDER_NAME );
  }

  /**
   * Init all yandex metrika counters
   *
   * @param {Array<string|number>?} counters
   * @param {Object?} options
   */
  init (counters = this.counters, options = {}) {
    const mergedOptions = Object.assign( {}, this.options, options );

    counters.forEach(id => {
      const options = Object.assign(
        {}, mergedOptions, { id }
      );

      this.pushTo( id, 'init', options );
    });
  }

  /**
   * @param {string} eventName
   * @param {*} params
   * @param {*} args
   */
  event (eventName, params = {}, ...args) {
    this.pushAll( 'reachGoal', eventName, params, ...args );
  }

  /**
   * @param {number} counterId
   * @param {string} eventName
   * @param {*} params
   * @param {*} args
   */
  eventTo (counterId, eventName, params = {}, ...args) {
    this.pushTo( counterId, 'reachGoal', eventName, params, ...args );
  }

  /**
   * @param {string} toPath
   * @param {string} fromPath
   * @param {*} opts
   */
  hit (toPath, fromPath = null, opts = {}) {
    this.each(id => this.hitTo( id, toPath, fromPath, opts ));
  }

  /**
   * @param {string|number} counterId
   * @param {string} toPath
   * @param {string} fromPath
   * @param {*} opts
   */
  hitTo (counterId, toPath, fromPath = null, opts = {}) {
    const options = {};

    if (fromPath) {
      Object.assign(options, { referer: fromPath });
    }

    Object.assign( options, opts );

    this.pushTo( counterId, 'hit', toPath || '/', options );
  }

  /**
   * @param {number} counterId
   * @param {*} args
   */
  pushTo (counterId, ...args) {
    this.push( counterId, ...args );
  }
}
