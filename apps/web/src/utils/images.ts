/**
 * Convert a string to a base64 encoded string.
 *
 * @param {string} value
 * @returns {string}
 */
export const toBase64 = (value: string) =>
  typeof window === "undefined" ? Buffer.from(value).toString("base64") : window.btoa(value);

/**
 * Generate a base64 encoded.
 *
 * @param {number|string} width
 * @param {number|string} height
 * @returns {string} A base64 encoded string.
 */
export const generateImageToBase64 = (width: number | string, height: number | string): string => {
  const convertImage = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="#f0f0f0" /></svg>`;

  return `data:image/svg+xml;base64,${toBase64(convertImage)}`;
};
