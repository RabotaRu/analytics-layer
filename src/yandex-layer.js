import { Layer } from "./layer";

const YANDEX_LAYER_KEY = 'Ya';
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
    try {
      counters.forEach(counterOptions => {
        window[ `yaCounter${counterOptions.id}` ] = new Ya.Metrika2( counterOptions );
      });
    } catch (e) {
      console.warn( e );
    }
  }

  /**
   * @param {string} eventName
   * @param {*} params
   * @param {*} args
   */
  event (eventName, params = {}, ...args) {
    this.eachIds(id => {
      this.eventTo( id, eventName, params, ...args );
    });
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
    const counter = this._getMetrikaInstance( counterId );
    const [ fnName, ...rest ] = args;
    counter[ fnName ]( ...rest );
  }

  /**
   * @param id
   * @returns {*}
   * @private
   */
  _getMetrikaInstance (id) {
    return window[ `yaCounter${id}` ];
  }
}
