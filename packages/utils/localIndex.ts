/** Function to get a CSS custom property value
 *
 * const primaryColor = getColor('--primary');
 *  */
export function getVariableColor(propertyName) {
  let res = getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim()
  return res
}
