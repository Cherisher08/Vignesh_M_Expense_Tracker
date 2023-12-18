/**
 *
 * @returns {string} - Amount string formatted to INS form
 * @param {string} n - Amount in string form
 */
export function formatNumber (n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
