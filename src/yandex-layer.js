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
   * @param {string} toPath
   * @param {string} fromPath
   * @param {*} opts
   */
  hit (toPath, fromPath = null, opts = {}) {
    this.eachIds(id => this.hitTo( id, toPath, fromPath, opts ));
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

    const restArgs = Object.keys( options ).length > 0
      ? [ options ]
      : [];

    this.pushTo( counterId, 'hit', toPath || '/', ...restArgs );
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
