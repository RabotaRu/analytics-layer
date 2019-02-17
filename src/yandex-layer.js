import { Layer } from "./layer";

const YANDEX_LAYER_KEY = 'ym';

export class YandexLayer extends Layer {

  /**
   * @param {Object} options
   */
  constructor (options) {
    super( options );

    this.setLayer( YANDEX_LAYER_KEY );
    this.setProvider( 'yandex' );
  }

  /**
   * @param {number} counterId
   * @param {*} args
   */
  pushTo (counterId, ...args) {
    this.push( counterId, ...args );
  }
}
