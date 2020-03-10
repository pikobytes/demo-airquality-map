/**
 * Created by jacob.mendt@pikobytes.de on 10.03.20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/**
 * @param {string} url
 * @returns {{networkId: string, deviceId: string, sensorId: string}}
 */
export function parseSensorHref(url) {
  let href = url.split("/");
  const sensorId = href[href.length - 1];
  const deviceId = href[href.length - 3];
  const networkId = href[href.length - 5];
  return { sensorId, deviceId, networkId };
}
