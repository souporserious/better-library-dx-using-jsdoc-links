const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

/**
 * Get the width for a single line of text
 * @param {String} text - the string of text to be measured
 * @return {Number} the width of the text passed in
 */
function getTextWidth(text) {
  return context.measureText(text).width
}
