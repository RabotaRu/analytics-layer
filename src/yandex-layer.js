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
    const yandexParams = {
      [eventName]: params
    };

    this.pushAll( 'reachGoal', eventName, yandexParams, ...args );
  }

  /**
   * @param {number} counterId
   * @param {string} eventName
   * @param {*} params
   * @param {*} args
   */
  eventTo (counterId, eventName, params = {}, ...args) {
    const yandexParams = {
      [eventName]: params
    };

    this.pushTo( counterId, 'reachGoal', eventName, yandexParams, ...args );
  }

  /**
   * @param {number} counterId
   * @param {*} args
   */
  pushTo (counterId, ...args) {
    this.push( counterId, ...args );
  }
}
