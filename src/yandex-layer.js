import { Layer } from "./layer";

const YANDEX_LAYER_KEY = 'ym';

export class YandexLayer extends Layer {

  /**
   * @param {Array<number>} counters
   */
  constructor (counters) {
    super( counters );

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
