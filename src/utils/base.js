/**
 * @param {string|*} value
 * @return {string}
 */
export function ensureString (value) {
  if (typeof value === 'string') {
    return value;
  }
  return ( value || '' ).toString();
}

/**
 * @param {string} text
 * @return {string}
 */
export function capitalize (text) {
  text = ensureString( text );

  if (!text.length) {
    return text;
  }

  return text[ 0 ].toUpperCase() + text.substr( 1 );
}

/**
 * @param {*} value
 * @returns {boolean}
 */
export function isObject (value) {
  return typeof value === 'object' && value !== null;
}

/**
 * @param {Array} array
 * @returns {*}
 */
export function first (array) {
  if (!Array.isArray( array )) {
    return array;
  }

  if (!array.length) {
    return null;
  }

  return array[ 0 ];
}


/**
 * @param {Array} array
 * @returns {*}
 */
export function last (array) {
  if (!Array.isArray( array )) {
    return array;
  }

  if (!array.length) {
    return null;
  }

  return array[ array.length - 1 ];
}

export function noop () {}
