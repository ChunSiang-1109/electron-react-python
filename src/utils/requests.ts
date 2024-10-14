// Electron Inter Process Communication and dialog
const { ipcRenderer } = window.require('electron');

// Dynamically generated TCP (open) port between 3000-3999
const port: number = ipcRenderer.sendSync('get-port-number') as number;

/**
 * @namespace Requests
 * @description - Helper functions for network requests (e.g., get, post, put, delete, etc.)
 */

/**
 * @description - Helper GET method for sending requests to and from the Python/Flask services.
 * @param {string} route - Path of the Python/Flask service you want to use.
 * @param {Function} callback - Callback function which uses the returned data as an argument.
 * @param {Function} [errorCallback] - Optional callback to handle error scenarios.
 * @memberof Requests
 */
export const get = (
  route: string,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
): void => {
  fetch(`http://localhost:${port}/${route}`)
    .then((response) => response.json())
    .then(callback)
    .catch((error) => (errorCallback ? errorCallback(error) : console.error(error)));
};

/**
 * @description - Helper POST method for sending requests to and from the Python/Flask services.
 * @param {any} body - Request body data that you want to pass.
 * @param {string} route - URL route of the Python/Flask service you want to use.
 * @param {Function} callback - Optional callback function to be invoked with the response data.
 * @param {Function} [errorCallback] - Optional callback to handle error scenarios.
 * @memberof Requests
 */
export const post = (
  body: any,
  route: string,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
): void => {
  fetch(`http://localhost:${port}/${route}`, {
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
  })
    .then((response) => response.json())
    .then(callback)
    .catch((error) => (errorCallback ? errorCallback(error) : console.error(error)));
};
