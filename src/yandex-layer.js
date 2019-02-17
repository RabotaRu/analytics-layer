import { Layer } from "./layer";

const YANDEX_LAYER_KEY = 'ym';

export class YandexLayer extends Layer {

  /**
   * @param {Object} params
   */
  constructor (params) {
    super( params );

    this.setLayer( YANDEX_LAYER_KEY );
    this.setProvider( 'yandex' );
  }

  /**
   * Init all yandex metrika counters
   *
   * @param {Array<string|number>} counters
   */
  init (counters = this.counters) {
    const originalOptions = this.options;

    counters.forEach(id => {
      const options = Object.assign(
        {}, originalOptions, { id }
      );

      this.pushTo( id, 'init', options );
    });
  }

  /**
   * @param {number} counterId
   * @param {*} args
   */
  pushTo (counterId, ...args) {
    this.push( counterId, ...args );
  }
}
