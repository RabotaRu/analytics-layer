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
   * Initialize all yandex metrika counters
   *
   * @param {Array<*>?} counters
   */
  init (counters = this.counters) {
    counters.forEach(counterOptions => {
      this.pushTo( counterOptions.id, 'init', counterOptions );
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
   * @param {Object} params
   */
  setParams (params = {}) {
    this.eachIds(id => this.setParamsTo( id, params ));
  }

  /**
   * @param {string|number} counterId
   * @param {Object} params
   */
  setParamsTo (counterId, params = {}) {
    this.pushTo( counterId, 'params', params );
  }

  /**
   * @param {number} counterId
   * @param {*} args
   */
  pushTo (counterId, ...args) {
    this.push( counterId, ...args );
  }
}
