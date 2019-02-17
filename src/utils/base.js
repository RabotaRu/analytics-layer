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
